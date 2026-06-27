export const success = <T extends unknown>(message: string, data: T) => ({
  success: true,
  message,
  data,
});
