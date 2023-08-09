import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {useEffect} from 'react';

const useNavigationOptions = (options: NativeStackNavigationOptions) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
};

export default useNavigationOptions;
