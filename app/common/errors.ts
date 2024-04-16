export enum Status {
  Unauthorized = 401,
  Forbidden = 403,
  Conflict = 409,
}

export type ResponseError = Error & { status: number }
export const ResponseError = (status: number): ResponseError => ({ name: 'ResponseError', status, message: `Response Error (Code ${status})` })
export const isResponseError = (error: any): error is ResponseError => typeof error === 'object' && error !== null && typeof error.name === 'string' && typeof error.message === 'string' && typeof error.status === 'number'
