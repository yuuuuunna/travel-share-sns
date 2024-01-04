import PropTypes from 'prop-types';

export default function SearchInput({ newKeyword, onChangeHandler, onKeyPress }) {
  return (
    <input
      className="w-full h-[48px] pl-[20px] rounded-[24px] focus:outline-none bg-gray-3/30 text-black"
      type="text"
      placeholder="지역 이름으로 검색해보세요."
      value={newKeyword}
      onChange={onChangeHandler}
      onKeyPress={onKeyPress}
    />
  );
}

SearchInput.propTypes = {
  newKeyword: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onKeyPress: PropTypes.func,
};
