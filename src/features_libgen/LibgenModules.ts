import {NativeModules} from 'react-native';
import {LibgenResponse} from './types';
const {LibgenModule} = NativeModules;

interface LibgenInterface {
  search(
    search: string,
    category: string,
    language: string,
    extension: string,
  ): LibgenResponse;
  getDetails(detailsUrl: string): Promise<string>;
}

export default LibgenModule as LibgenInterface;
