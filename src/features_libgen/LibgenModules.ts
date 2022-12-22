import {NativeModules} from 'react-native';
import {
  CategoryOption,
  ExtensionOption,
  LanguageOption,
} from '../features_search/constants';
const {LibgenModule} = NativeModules;

interface LibgenInterface {
  search(
    query: string,
    page: number,
    category: CategoryOption,
    language: LanguageOption,
    extension: ExtensionOption,
  ): Promise<string>;
  getDetails(detailsUrl: string): Promise<string>; // string because the native module encode the result as JSON string
}

export default LibgenModule as LibgenInterface;
