export interface ResponseType<T = any> {
  message: string;
  isSuccess: boolean;
  data?: T;
}
