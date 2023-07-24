import LibgenModule from './LibgenModules';
import {
  LibgenBookDetails,
  LibgenSearchBooksParams,
  LibgenSearchBooksResponse,
  NativeModuleError,
} from './types';

export async function getDetails(
  detailsUrl: string,
): Promise<LibgenBookDetails> {
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
}: LibgenSearchBooksParams): Promise<LibgenSearchBooksResponse> {
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
