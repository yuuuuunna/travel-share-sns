import PropTypes from 'prop-types';

export default function Background({ setCommentModalMode }) {
  function onClickHandler() {
    setCommentModalMode(false);
  }
  return (
    <div
      className="w-full h-screen fixed z-[10] bg-black bg-opacity-40 inset-0"
      style={{ transition: 'opacity 3s ease' }}
      onClick={onClickHandler}
    ></div>
  );
}

Background.propTypes = {
  setCommentModalMode: PropTypes.func.isRequired,
};
