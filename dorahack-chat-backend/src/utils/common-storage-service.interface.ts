export interface CommonStorageService {
  create(collection: string, payload: any);
  update(collection: string, id: string, payload: any);
  delete(collection: string, id: string);
  paginate(collection: string, filter: any, order: any, page: number, limit: number);
  gets(collection: string, filter: any, order: any, options: any);
  get(collection: string, id: string);
}
