import { useCallback, useState } from 'react';

export default function useInfinityPaging({ callback }) {
  const [hasNextPage, setHasNextPage] = useState(true);

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage) {
        callback();
      }
    },
    [callback, hasNextPage],
  );

  return { hasNextPage, setHasNextPage, handleObserver };
}
