export default interface ApiResponseDto<T> {
  data: T;
  pagination: unknown;
  message: string;
}
