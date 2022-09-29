export interface IResponse {
  statusCode: number;
  success: boolean;
  data: any;
  message: string;
  validationError: any;
}
