import PropTypes from 'prop-types';

export default function CheckBox({ tag, checked, setChecked }) {
  function onClickHandler() {
    setChecked(!checked);
  }

  return (
    <div className="items-center flex flex-wrap gap-2">
      {/* 기본상태 */}
      {tag.map((item, index) => (
        <span
          key={index}
          className={`${
            checked ? 'bg-primary bg-opacity-30 text-primary' : 'bg-gray-3 bg-opacity-30 text-gray-3'
          } rounded-[20px] cursor-pointer px-[16px] text-[14px] font-bold py-[10px] inline-block`}
          onClick={onClickHandler}
        >
          <input type="checkbox" className="hidden" />
          <label>{item}</label>
        </span>
      ))}
    </div>
  );
}

CheckBox.propTypes = {
  tag: PropTypes.arrayOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
};
