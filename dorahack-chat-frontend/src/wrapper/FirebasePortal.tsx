import { PropsWithChildren } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import environment from '../environment';
import { useDeepEffect } from '../hook/useDeepEffect';
import Error500 from '../page/miscellaneous/Error500';
import { toast } from 'react-toastify';
import { errorFormat } from '../helper/error-format';
import { useDispatch, useSelector } from '../redux';
import {
  initializeDatabaseSuccess,
  initializeFirebaseFailure,
} from '../redux/firebase';

export default function FirebasePortal({ children }: PropsWithChildren) {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.firebase);

  useDeepEffect(() => {
    try {
      const firebaseApp = initializeApp(environment.firebaseConfig);
      const database = getDatabase(firebaseApp);

      dispatch(initializeDatabaseSuccess({ database }));
    } catch (error) {
      dispatch(initializeFirebaseFailure());
      toast.error(errorFormat(error).message);
    }
  }, []);

  if (error) {
    return <Error500 />;
  }

  return <>{children}</>;
}
