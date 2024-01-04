import { useRef, useCallback } from 'react';

export function useBottomSheet(closeModal) {
  const record = useRef({
    firstTouch: '',
    process: '',
  });

  // 터치 시작 Y좌표
  function handleTouchStart(e) {
    record.current.firstTouch = e.touches[0].screenY;
  }

  // 이동한 좌표 기록
  const handleTouchMove = useCallback(
    (e) => {
      record.current.process = e.touches[0].screenY;
    },
    [record],
  );

  // 터치 종료 Y좌표
  function handleTouchEnd() {
    if (record.current.firstTouch < record.current.process) {
      record.current.firstTouch = '';
      record.current.process = '';
      closeModal();
    }
  }

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
}
