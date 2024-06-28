import React, { useEffect } from 'react';

export * from './styleUtile';
export * from './dateUtile';

const MAX = 128;
const k = 0.4;
function appr(x: number) {
  return MAX * (1 - Math.exp((-k * x) / MAX));
}

export const usePullToRefresh = (containerRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    const refreshSpinner = document.querySelector('.refresh-spinner') as HTMLDivElement;
    const elem = containerRef.current;
    if (!refreshSpinner || !elem) return () => {};

    let touchstartY = 0;
    elem.addEventListener('touchstart', (e) => {
      touchstartY = e.touches[0].clientY;
    });
    elem.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const touchDiff = touchY - touchstartY;
      if (touchDiff > 0 && window.scrollY === 0) {
        // refreshSpinner.classList.add('visible');
        refreshSpinner.style.transform = `translateY(${appr(touchDiff)}px)`;
        e.preventDefault();
      }
    });
    elem.addEventListener('touchend', () => {
      refreshSpinner.style.transform = `translateY(50px)`;
      setTimeout(() => {
        // refreshSpinner.classList.remove('visible');
        window.location.reload();
      }, 500);
      if (refreshSpinner.classList.contains('visible')) {
        //
      }
    });

    return () => {
      elem.removeEventListener('touchstart', () => {});
      elem.removeEventListener('touchmove', () => {});
      elem.removeEventListener('touchend', () => {});
    };
  }, [containerRef]);

  return {};
};
