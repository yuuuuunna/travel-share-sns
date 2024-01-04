import { useEffect, useState } from 'react';

export default function useIntersectionObserver({ root, rootMargin = '0px', threshold = 1, onIntersect }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget };
}
