import { HttpException, HttpStatus } from '@nestjs/common';

// exception that results from business logic
export class BizException extends HttpException {
  hint?: string;
  bizCode?: string;
  constructor({
    message,
    hint,
    bizCode,
    httpStatus,
  }: {
    message?: string;
    hint?: string;
    bizCode?: string;
    httpStatus: HttpStatus;
  }) {
    super(message ?? '', httpStatus);
    this.hint = hint;
    this.bizCode = bizCode;
  }
}

export class UserErrorException extends BizException {
  constructor({
    message,
    hint,
    bizCode,
  }: {
    message?: string;
    hint: string;
    bizCode?: string;
  }) {
    super({ message, hint, bizCode, httpStatus: HttpStatus.BAD_REQUEST });
  }
}
