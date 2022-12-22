import LibgenModule from './LibgenModules';
import {
  GetDetailsResponse,
  NativeModuleError,
  SearchParams,
  SearchResponse,
} from './types';

export async function getDetails(
  detailsUrl: string,
): Promise<GetDetailsResponse> {
  try {
    const resp = await LibgenModule.getDetails(detailsUrl);

    return JSON.parse(resp);
  } catch (err) {
    const error: NativeModuleError = err as NativeModuleError;
    if (error.userInfo != null) {
      throw error.userInfo;
    }
    throw error;
  }
}

export async function search({
  query,
  category,
  language,
  extension,
  page = 1,
}: SearchParams): Promise<SearchResponse> {
  try {
    const resp = await LibgenModule.search(
      query,
      page,
      category,
      language,
      extension,
    );

    return JSON.parse(resp);
  } catch (err) {
    const error: NativeModuleError = err as NativeModuleError;
    if (error.userInfo != null) {
      throw error.userInfo;
    }
    throw error;
  }
}
