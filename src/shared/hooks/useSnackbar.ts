import {useContext} from 'react';
import {SnackbarContext} from '../components/molecules/SnackbarProvider';

const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  return context;
};

export default useSnackbar;
