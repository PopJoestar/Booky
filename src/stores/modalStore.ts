import {create} from 'zustand';

export type ModalStore<T> = {
  params: T;
  modals: (keyof T)[];
  openModal<K extends keyof T>(
    ...args: K extends unknown
      ? undefined extends T[K]
        ? [screen: K] | [screen: K, params: T[K]]
        : [screen: K, params: T[K]]
      : never
  ): void;
  closeModal: (modalName: keyof T) => void;
};

export type OpenModalFunction<T> = <K extends keyof T>(
  ...args: K extends unknown
    ? undefined extends T[K]
      ? [screen: K] | [screen: K, params: T[K]]
      : [screen: K, params: T[K]]
    : never
) => void;

const useModalImpl = create<ModalStore<any>>()(set => ({
  params: {},
  modals: [],
  openModal: function () {
    return set(state => {
      const modalName = arguments[0];
      const params = arguments[1];

      const temp = [...state.modals];
      temp.push(modalName);
      return {
        ...state,
        modals: temp,
        params: {
          [modalName]: params,
        },
      };
    });
  },
  closeModal: modalName =>
    set(state => {
      const temp = [...state.modals];
      const index = temp.findIndex(t => t === modalName);

      if (index !== -1) {
        temp.splice(index, 1);
      }

      return {
        ...state,
        modals: temp,
        params: {
          [modalName]: undefined,
        },
      };
    }),
}));

export const useModal = useModalImpl as {
  <T>(): ModalStore<T>;
  <T, U>(selector: (s: ModalStore<T>) => U): U;
};
