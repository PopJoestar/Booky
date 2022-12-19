import LibgenModule from './LibgenModules';
import {GetDetailsResponse, NativeModuleError} from './types';

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
