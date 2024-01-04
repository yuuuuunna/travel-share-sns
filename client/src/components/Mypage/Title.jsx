import PropTypes from 'prop-types';

export default function Title({ title, icon, count = 0 }) {
  return (
    <>
      <div className="text-center mb-[20px]">
        <div className="flex items-center justify-center gap-[4px]">
          <strong className="text-black text-[14px]">{title}</strong>
          {icon}
        </div>
        <span className="block text-darkgray text-[12px]">총 {count}건</span>
      </div>
    </>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element,
  count: PropTypes.number.isRequired,
};
