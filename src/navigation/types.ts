import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  library: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export enum Routes {
  choose_infra,
  add_infra,
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
