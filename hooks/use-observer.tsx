import { RefObject, useEffect } from 'react';

/**
 * 스크롤을 통해 페이지의 끝에 도달했을 때 다음 데이터를 불러오는 기능을 제공하는 커스텀 훅입니다.
 *
 * @param {Object} params - 함수의 매개변수를 담고 있는 객체입니다.
 * @param {boolean} params.isLoading - 현재 데이터 로딩 상태입니다. 로딩 중일 때는 다음 데이터를 불러오지 않습니다.
 * @param {RefObject<Element>} params.ref - 관찰할 DOM 요소의 current 값입니다. 이 요소가 뷰포트에 들어오면 다음 데이터를 불러옵니다.
 * @param {Function} params.fetchNextCursor - 다음 데이터를 불러오는 함수입니다.
 * @returns {void}
 */
export const useObserver = ({
  isLoading,
  ref,
  fetchNextCursor,
}: {
  isLoading: boolean;
  ref: RefObject<Element>;
  fetchNextCursor: () => void;
}): void => {
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const handleObserver: IntersectionObserverCallback = (entries) => {
      const target = entries[0];

      if (target.isIntersecting && !isLoading) {
        fetchNextCursor();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isLoading, ref, fetchNextCursor]);
};
