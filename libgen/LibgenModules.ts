import {NativeModules} from 'react-native';
import {
  LibgenBookCategory,
  LibgenBookExtension,
  LibgenBookLanguage,
} from './types';

const {LibgenModule} = NativeModules;

interface LibgenInterface {
  search(
    query: string,
    page: number,
    category: LibgenBookCategory,
    language: LibgenBookLanguage,
    extension: LibgenBookExtension,
  ): Promise<string>;
  getDetails(detailsUrl: string): Promise<string>; // string because the native module encode the result as JSON string
}

export default LibgenModule as LibgenInterface;
