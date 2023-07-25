import { ComponentType } from '@fullstack-demo/domain';
import { fetchApi } from './apiCommon';

export async function findAll<T>(type: ComponentType): Promise<T[]> {
  return fetchApi<T[]>({
    uri: '/component' + '/list?type=' + type,
  });
}

export async function createOne<T>(data: unknown): Promise<T> {
  return fetchApi<T>({
    uri: '/component' + '/add',
    requestInit: {
      method: 'POST',
      body: JSON.stringify(data),
    },
  });
}

export async function updateOne<T>(id: string, data: unknown): Promise<T> {
  return fetchApi<T>({
    uri: '/component' + '/update/' + id,
    requestInit: {
      method: 'PUT',
      body: JSON.stringify(data),
    },
  });
}

export async function deleteOne(id: string): Promise<void> {
  return fetchApi({
    uri: '/component' + '/delete/' + id,
    requestInit: { method: 'DELETE' },
  });
}
