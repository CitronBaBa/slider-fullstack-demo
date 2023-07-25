import { toast } from 'react-toastify';
import { Logger } from '../util/logger';

export const clientApiBaseUrl =
  import.meta.env.CLIENT_API_DOMAIN ?? 'http://localhost:4000/api/v1';

export type ServerErrorDto = {
  statusCode: number;
  timestamp: string;
  path: string;
  hint: string;
  bizCode: string;
};

export class ClientApiError extends Error {
  serverError?: ServerErrorDto;

  constructor({
    uri,
    statusCode,
    serverError,
  }: {
    uri: string;
    statusCode: number;
    serverError?: ServerErrorDto;
  }) {
    super(`Request for ${uri} failed with status ${statusCode}`);
    this.serverError = serverError;
  }

  get displayMsg(): string {
    return this.serverError?.hint ? `${this.serverError.hint}` : this.message;
  }
}

export async function fetchApi<T = void>({
  uri,
  catchAndDisplayError = true,
  requestInit: init,
}: {
  uri: string;
  catchAndDisplayError?: boolean;
  requestInit?: RequestInit;
}): Promise<T> {
  if (!catchAndDisplayError) {
    return fetchApiRaw<T>(uri, init);
  }

  // a default error display behavior
  try {
    return await fetchApiRaw<T>(uri, init);
  } catch (error: unknown) {
    if (error instanceof ClientApiError) {
      toast.error(error.displayMsg);
    } else {
      toast.error('Request failed.');
    }
    throw error;
  }
}

async function fetchApiRaw<T = void>(
  uri: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(clientApiBaseUrl + uri, {
    headers: init?.headers ?? {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...init,
  });

  if (!res.ok) {
    let serverError;
    try {
      serverError = (await res.json()) as ServerErrorDto;
    } catch (error: unknown) {
      Logger.error(error);
    }
    throw new ClientApiError({
      uri: uri,
      statusCode: res.status,
      serverError,
    });
  }
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    return res.json() as Promise<T>;
  }
  return undefined as unknown as T;
}
