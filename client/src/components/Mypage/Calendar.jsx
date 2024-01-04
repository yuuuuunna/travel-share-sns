import Proptypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import moment from 'moment';

export default function ScheduleCalendar({ setStartDate, setEndDate }) {
  const handleDateClick = (e) => {
    setStartDate(e[0]);
    setEndDate(e[1]);
  };

  // 주말인지 확인하는 함수
  const isWeekend = (date) => {
    const day = date.getDay();
    return day; // 0은 일요일, 6은 토요일
  };

  return (
    <Calendar
      onChange={handleDateClick}
      formatDay={(locale, date) => moment(date).format('D')}
      selectRange={true}
      next2Label={null}
      prev2Label={null}
      calendarType="hebrew"
      tileClassName={({ date, view }) =>
        view === 'month' && isWeekend(date) === 0 ? 'sunday' : isWeekend(date) === 6 ? 'saturday' : null
      }
    />
  );
}

ScheduleCalendar.propTypes = {
  setStartDate: Proptypes.func,
  setEndDate: Proptypes.func,
};
