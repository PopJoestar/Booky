import {RouteProp} from '@react-navigation/native';
import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  main_tab: NavigatorScreenParams<MainTabParamList>;
  search: undefined;
  remote_book_details: {
    details_url: string;
  };
  collection: {collectionId: string};
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RemoteBookDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'remote_book_details'
>;

export type ColletionScreenRouteProp = RouteProp<
  RootStackParamList,
  'collection'
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
