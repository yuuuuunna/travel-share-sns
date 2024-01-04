import { useMemo } from 'react';

// 시작 날짜 ~ 끝 날짜 계산기
const useDayCalculation = (startDate, endDate) => {
  const startDateData = new Date(startDate);
  const endDateData = new Date(endDate);

  const diffDate = startDateData.getTime() - endDateData.getTime();

  return useMemo(() => Math.abs(diffDate / (1000 * 60 * 60 * 24)), [diffDate]);
};

export default useDayCalculation;
