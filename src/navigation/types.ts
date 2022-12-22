import {RouteProp} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {NavigatorScreenParams} from '@react-navigation/native';
import {BookRemoteType} from '../features_libgen/types';

export type RootStackParamList = {
  main_tab: NavigatorScreenParams<MainTabParamList>;
  search: undefined;
  book_details: {
    md5: string;
    book_type: BookRemoteType;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type BookDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'book_details'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type MainTabParamList = {
  library: undefined;
  settings: undefined;
  collections: undefined;
};
