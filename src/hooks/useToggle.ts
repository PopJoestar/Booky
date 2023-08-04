import {useCallback, useState} from 'react';

const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [toggle, setToggle] = useState<boolean>(initialValue);

  const _setToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  return [toggle, _setToggle];
};

export default useToggle;
