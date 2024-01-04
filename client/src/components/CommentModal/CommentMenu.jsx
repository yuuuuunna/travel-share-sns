import PropTypes from 'prop-types';

export default function CommentMenu({
  deleteComment,
  commentId,
  editMode,
  editModeOn,
  editModeOff,
  updateNewComment,
  newComment,
}) {
  return (
    <>
      {editMode ? (
        <div className="absolute w-[40px] h-[56px] rounded-[4px] text-[12px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] bg-white left-[-4px] bottom-[2px]">
          <button
            className="hover:bg-gray-200 w-full h-[50%]"
            onClick={() => {
              updateNewComment({ commentId, newComment });
            }}
          >
            완료
          </button>
          <button className="hover:bg-gray-200 w-full h-[50%]" onClick={editModeOff}>
            취소
          </button>
        </div>
      ) : (
        <div className="absolute w-[40px] h-[56px] rounded-[4px] text-[12px] drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] bg-white left-[-4px] bottom-[2px]">
          <button className="hover:bg-gray-200 w-full h-[50%]" onClick={editModeOn}>
            수정
          </button>
          <button className="hover:bg-gray-200 w-full h-[50%]" onClick={() => deleteComment({ id: commentId })}>
            삭제
          </button>
        </div>
      )}
    </>
  );
}

CommentMenu.propTypes = {
  deleteComment: PropTypes.func,
  removeComment: PropTypes.func,
  commentId: PropTypes.string,
  editMode: PropTypes.bool,
  editModeOn: PropTypes.func,
  editModeOff: PropTypes.func,
  updateNewComment: PropTypes.func,
  newComment: PropTypes.string,
};
