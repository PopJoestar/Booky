import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  library: undefined;
  search: undefined;
  book_details: {
    md5: string;
  };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export enum Routes {
  library,
  search,
  book_details,
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
