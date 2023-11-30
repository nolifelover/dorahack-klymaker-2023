import { AxiosError } from 'axios';

export const errorFormat = (error: unknown) => {
  if (error instanceof TypeError) {
    return {
      code: undefined,
      message: error.message,
    };
  } else if (error instanceof AxiosError) {
    return {
      code:
        error?.code ||
        error?.response?.data?.status ||
        error?.response?.data?.statusCode,
      message:
        error?.message ||
        error?.response?.data?.errors?.message ||
        error?.response?.data?.message,
    };
  } else if (typeof error === 'string') {
    return {
      code: undefined,
      message: error,
    };
  } else {
    const e = error as any; // eslint-disable-line
    return {
      code: e?.code || e?.status || undefined,
      message: e?.message || 'unknown error instance',
    };
  }
};
