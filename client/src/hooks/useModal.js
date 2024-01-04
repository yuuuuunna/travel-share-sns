import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../recoils/modalAtom';

export default function useModal() {
  const [modal, setModal] = useRecoilState(modalAtom);

  const closeModal = useCallback(() => {
    setModal((prev) => {
      return { ...prev, isOpen: false };
    });
  }, [setModal]);

  const openModal = useCallback(
    ({ message, callback, type }) => {
      setModal({
        isOpen: true,
        type,
        message: message,
        callback: callback !== undefined ? callback : () => {},
      });
    },
    [setModal],
  );

  return { modal, closeModal, openModal };
}
