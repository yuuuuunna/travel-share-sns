import 'semantic-ui-css/semantic.min.css';
import Card from './Card';
import PropTypes from 'prop-types';
import { Rating } from 'semantic-ui-react';

import { IoStar } from 'react-icons/io5';
export default function Course({
  editMode,
  schedules,
  handleAddPlaceImgClick,
  handleAddScoreClick,
  handleRemoveSingleScheduleClick,
}) {
  return (
    <ul className="mt-5 flex flex-col gap-5">
      {schedules?.map((schedule, i) => (
        <li key={`${schedule?.id}-${i}`}>
          <Card
            {...schedule}
            editMode={editMode}
            handleAddPlaceImgClick={handleAddPlaceImgClick}
            handleRemoveSingleScheduleClick={handleRemoveSingleScheduleClick}
          />
          <ul role="list">
            <ScheduleItem icon={<IoStar color="#589BF7" size={20} />} title="나의 평점" id="stars">
              <div className="flex gap-1">
                <Rating
                  icon="star"
                  rating={schedule?.star}
                  maxRating={5}
                  onRate={(e, { rating }) => {
                    handleAddScoreClick({ _id: schedule?._id, star: rating });
                  }}
                />
              </div>
            </ScheduleItem>
          </ul>
        </li>
      ))}
    </ul>
  );
}

function ScheduleItem({ icon, title, id, width, children, onClick }) {
  const getWidth = width ? width : 'w-[40%]';

  return (
    <li
      className="border-[#E8E8E8] border-b-[1px] py-[16px] flex items-center justify-between last:border-b-0"
      onClick={onClick}
    >
      <label htmlFor={id} className={`flex items-center gap-[10px] ${getWidth}`}>
        {icon}
        <strong className="text-[12px] font-semibold">{title}</strong>
      </label>
      <div className="flex items-center w-full gap-[2px]">{children}</div>
    </li>
  );
}

ScheduleItem.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  width: PropTypes.string,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

Course.propTypes = {
  editMode: PropTypes.bool,
  schedules: PropTypes.array,
  selectDay: PropTypes.number,
  handleAddPlaceImgClick: PropTypes.func,
  handleAddScoreClick: PropTypes.func,
  handleRemoveSingleScheduleClick: PropTypes.func,
};
