export type ErrorType = {
  code?: string;
  message?: string;
};

export type NestHttpException = {
  status: number;
  message: string;
};

export type QueryParams = {
  [key: string]: string | number;
};

export type Time = {
  _seconds: number;
  _nanoseconds: number;
};

export type PageInfo = {
  limit: number;
  page: number;
  totalPages: number;
  totalResults: number;
};

export type PaginateLoadingState = {
  fetching: boolean;
  loadingMore: boolean;
};

export type PaginateParams = {
  page: number;
  limit: number;
};
