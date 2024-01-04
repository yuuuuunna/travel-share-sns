import { useState, useContext } from 'react';
import { ModalContext } from '../../pages/detail/Detail';
import { useBottomSheet } from '../../hooks/useBottomSheet';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoils/userAtom';

import PropTypes from 'prop-types';

import Comment from './Comment';
import Input from './Input';
import Background from './Background';
import { useCommentsQuery } from '../../pages/comment/queries';

export default function Modal({ postId }) {
  const { commentList, addComment, removeComment, removeReplyComment } = useCommentsQuery(postId);

  // 유저정보
  const user = useRecoilValue(userState);
  const { commentModalMode, setCommentModalMode } = useContext(ModalContext);
  const commentPostId = postId;
  const [inputValue, setInputValue] = useState('');
  const [commentReplyContent, setCommentReplyContent] = useState('');
  const [commentNickname, setCommentNickname] = useState('');
  const [commentParentsComment, setCommentParentsComment] = useState('');

  // 대댓글 모드
  const [replyMode, setReplyMode] = useState(false);

  // bottom sheet
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useBottomSheet(() => {
    setCommentModalMode(false);
  });

  function replyOn() {
    setReplyMode(true);
  }

  function replyOff() {
    setReplyMode(false);
  }

  // 댓글 추가
  function addCommentHandler() {
    setInputValue('');
    replyOff();
  }

  // comment & reply post API
  async function createCommentReply(parentComment, postId, content) {
    await addComment({ parentComment, postId, content });
    setCommentReplyContent('');
  }

  // 댓글 삭제
  async function deleteComment({ id }) {
    await removeComment({ id });
    setCommentReplyContent('');
  }

  //대댓글 삭제
  async function deleteReplyComment({ id }) {
    await removeReplyComment({ id });
  }

  // 자식 컴포넌트에서 다른 자식 컴포넌트로 전달
  const getAuthorId = (nickname, parentsCommentId) => {
    setCommentNickname(nickname);
    setCommentParentsComment(parentsCommentId);
  };

  return (
    <div>
      <Background commentModalMode={commentModalMode} setCommentModalMode={setCommentModalMode} />
      <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="w-full h-[80vh] bg-white absolute bottom-0 rounded-t-[20px] z-[10] animate-[bottom-sheet-up_200ms_ease-in-out]">
          <div className="flex justify-center">
            <div className="w-1/6 h-[4px] bg-gray-3 rounded-[8px] mt-[16px]"></div>
          </div>
          <p className="text-[14px] font-bold text-center mt-[40px] mb-[10px]">댓글</p>
          <hr className="border-gray-3  mb-[18px]" />
          <div className="w-full h-[50vh] overflow-scroll scrollbar-hide">
            {commentList?.length === 0 ? (
              <p className="text-[14px] text-gray-1 text-center">작성된 댓글이 없습니다.</p>
            ) : (
              commentList?.map((comment) => (
                <div key={comment._id}>
                  <Comment
                    image={comment.authorId.profileImageSrc}
                    nickname={comment.authorId.nickname}
                    date={comment.createdAt.slice(0, 10)}
                    content={comment.content}
                    commentId={comment._id}
                    setGetReplyId={comment.authorId.nickname}
                    authorId={comment.authorId._id}
                    replyOn={replyOn}
                    getAuthorId={getAuthorId}
                    reply={comment.reply}
                    deleteComment={deleteComment}
                    deleteReplyComment={deleteReplyComment}
                  />
                </div>
              ))
            )}
          </div>
          <Input
            className={'absolute bottom-[28px] w-full'}
            inputValue={inputValue}
            addCommentHandler={addCommentHandler}
            setInputValue={setInputValue}
            disabled={!user}
            createCommentReply={createCommentReply}
            postId={postId}
            authorNickname={commentNickname}
            replyMode={replyMode}
            replyOff={replyOff}
            setCommentReplyContent={setCommentReplyContent}
            commentReplyContent={commentReplyContent}
            commentParentsComment={commentParentsComment}
            setCommentParentsComment={setCommentParentsComment}
            commentPostId={commentPostId}
          />
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  postId: PropTypes.string,
};
