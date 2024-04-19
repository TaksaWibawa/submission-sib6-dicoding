import { useToast } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from '@/utils';
import { clearToast, toastSelector } from '@/stores/slices';

export function Toast() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { title, description, status } = useSelector(toastSelector);
  const toastRef = useRef();

  useEffect(() => {
    if (title && description && status) {
      if (toastRef.current) {
        toast.close(toastRef.current);
      }

      toastRef.current = toast({
        title: utils.capitalize(title),
        description: utils.capitalize(description),
        status,
        position: 'top',
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => dispatch(clearToast()),
      });
    }
  }, [title, description, status, toast, dispatch]);

  return null;
}
