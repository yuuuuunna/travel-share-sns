import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';

export default function DayButton({ startDate, dayCount, dayTitle, setIndex }) {
  // 클릭한 날짜 데이터 저장
  const [selectedDay, setSelectedDay] = useState(0);

  // 클릭시 클릭한 날짜 데이터에 저장
  function handleOnClick(day) {
    setSelectedDay(day);
  }
  // 시작 날짜
  const newStartDate = useMemo(() => new Date(startDate), [startDate]);
  const startDateDate = newStartDate.getDate();

  // 요일 계산기
  function getTodayLabel(selectedNewDate) {
    const day = new Array('일', '월', '화', '수', '목', '금', '토');
    const startDateDay = selectedNewDate.getDay();
    const todayLabel = day[startDateDay];

    return todayLabel;
  }

  useEffect(() => {
    // 선택한 day 날짜 계산
    const selectedNewDate = new Date(newStartDate);
    selectedNewDate.setDate(startDateDate + selectedDay);

    const selectedDateMonth = selectedNewDate.getMonth();
    const selectedDateDate = selectedNewDate.getDate();
    const selectedDateLabel = getTodayLabel(selectedNewDate);

    const selectedDayTitle = `${selectedDateMonth + 1}월 ${selectedDateDate}일 ${selectedDateLabel}요일`;

    if (dayTitle) {
      dayTitle(selectedDayTitle);
    }
    if (setIndex) {
      setIndex(selectedDay);
    }
  }, [selectedDay, newStartDate, startDateDate, dayTitle, setIndex]);

  // day 버튼을 생성할 변수 길이
  const mapDayCount = Array.from({ length: dayCount + 1 });

  return (
    <>
      <div className="flex ml-[24px] mb-[26px]">
        {mapDayCount.map((_, index) => (
          <button
            key={index}
            className={`w-[74px] h-[36px] rounded-full flex-shrink-0 flex justify-center items-center text-[14px] mr-[9px] ${
              index === selectedDay ? 'bg-primary text-white font-bold' : 'bg-white border border-gray-3 text-gray-3'
            }`}
            onClick={() => handleOnClick(index)}
          >
            day {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

DayButton.propTypes = {
  startDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  dayCount: PropTypes.number.isRequired,
  dayTitle: PropTypes.func,
  setIndex: PropTypes.func,
};
