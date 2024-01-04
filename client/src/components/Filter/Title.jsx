import PropTypes from 'prop-types';

export default function Title({ title }) {
  return (
    <div>
      <div className="w-full h-[40px] flex items-center mb-[6px]">
        <p className="text-[14px] font-bold">{title}</p>
      </div>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
};
