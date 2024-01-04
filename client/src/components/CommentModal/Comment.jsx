import PropTypes from 'prop-types';

import { useState, useRef, useEffect } from 'react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import ReplyButton from './ReplyButton';
import CommentMenu from './CommentMenu';
import commentAPI from '../../services/comment';

import defaultProfile from '../../assets/images/defaultProfile.png';

export default function Comment({
  image,
  nickname,
  content,
  date,
  commentId,
  authorId,
  replyOn,
  getAuthorId,
  deleteComment,
  deleteReplyComment,
  reply,
}) {
  // 유저 아이디
  const userId = JSON.parse(localStorage.getItem('user')).info._id;

  // 수정/삭제 메뉴 모드
  const [commentMenuMode, setCommentMenMode] = useState(false);

  // 댓글 더보기 버튼
  const [moreBtn, setMoreBtn] = useState(false);

  // 댓글 content 현재 상태, 바뀐 상태
  const [newContent, setNewContent] = useState(content);

  // 수정 모드시 textarea에 포커스
  const textareaRef = useRef(null);

  // 수정/삭제 메뉴 토글
  function CommentMenuToggle() {
    setCommentMenMode(!commentMenuMode);
  }

  // 수정 모드
  const [editMode, setEditMode] = useState(false);

  function editModeOn() {
    setEditMode(true);
  }

  function editModeOff() {
    setEditMode(false);
    CommentMenuToggle();
  }

  useEffect(() => {
    if (editMode && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editMode]);

  // 댓글 patch API
  async function updateNewComment() {
    await commentAPI.updateComment({ commentId: commentId, content: newContent });
    editModeOff();
  }

  //textarea height 길이 조절
  useEffect(() => {
    if (textareaRef.current.scrollHeight > textareaRef.current.clientHeight)
      //textarea height 확장
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 8 + 'px';
    //textarea height 축소
    else textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div className="`mx-[24px] flex mb-[16px] ml-[24px]">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-3 mr-[10px] flex-shrink-0 overflow-hidden">
            <Profile img={image === 'default' ? defaultProfile : image || defaultProfile} />
          </div>
          <div className="w-full">
            <div className="flex">
              <div className="text-[12px] font-bold mr-[8px]">{nickname}</div>
              <div className="text-[12px] text-gray-2">{date}</div>
            </div>

            <textarea
              className={`w-[200px] text-[12px] bg-white resize-none ${editMode ? 'outline-primary' : ''}`}
              value={newContent}
              disabled={!editMode}
              onChange={(e) => setNewContent(e.target.value)}
              ref={textareaRef}
            />

            <div className="text-[12px]">
              {reply.length !== 0 && (
                <button className="text-blue-500 mr-[8px]" onClick={() => setMoreBtn((prev) => !prev)}>
                  {moreBtn ? '댓글 열기' : '댓글 닫기'}
                </button>
              )}

              <button
                className="text-gray-500"
                onClick={() => {
                  replyOn();
                  getAuthorId(nickname, commentId);
                }}
              >
                댓글 달기
              </button>
            </div>
          </div>
        </div>
        <div className="mr-[24px] relative flex items-center top-[-20px]">
          {userId === authorId && (
            <div>
              <button>
                <IoEllipsisHorizontalSharp onClick={CommentMenuToggle} />
              </button>
              <div className="relative bottom-[-60px] left-[-4px]">
                {commentMenuMode && (
                  <CommentMenu
                    deleteComment={deleteComment}
                    commentId={commentId}
                    editMode={editMode}
                    editModeOn={editModeOn}
                    editModeOff={editModeOff}
                    updateNewComment={updateNewComment}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {reply.length !== 0 &&
          !moreBtn &&
          reply.map((re) => (
            <ReplyComment
              key={re?._id}
              re={re}
              userId={userId}
              deleteReplyComment={deleteReplyComment}
              updateNewComment={updateNewComment}
              nickname={nickname}
            />
          ))}
      </div>
    </>
  );
}

function ReplyComment({ re, userId, deleteReplyComment, nickname }) {
  const [editMode, setEditMode] = useState(false);
  const [commentMenuMode, setCommentMenuMode] = useState(false);
  // 대댓글 현재 상태, 바뀐 상태
  const [newReply, setNewReply] = useState(re?.content);

  function editModeOn() {
    setEditMode(true);
  }

  function editModeOff() {
    setEditMode(false);
    setCommentMenuMode(false);
  }

  // 댓글 patch API
  async function updateNewComment() {
    await commentAPI.updateReply({ commentId: re?._id, content: newReply });
    editModeOff();
  }

  // 댓글 삭제
  async function deleteComment() {
    await deleteReplyComment({ id: re?._id });
    setNewReply('');
  }

  // 수정 모드시 textarea에 포커스
  const textareaRef = useRef(null);
  //textarea height 길이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      let height = textareaRef.current.scrollHeight; // 높이
      textareaRef.current.style.height = `${height + 8}px`;
    }
  }, []);

  useEffect(() => {
    if (editMode && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editMode]);

  return (
    <div className="ml-[20px]" key={re?._id}>
      <div className="flex justify-between">
        <div className="mx-[24px] flex mb-[16px] ml-[44px]">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-3 mr-[10px] flex-shrink-0 overflow-hidden">
            <Profile
              img={
                re?.authorId?.profileImageSrc === 'default'
                  ? defaultProfile
                  : re?.authorId?.profileImageSrc || defaultProfile
              }
            />
          </div>
          <div className="w-full">
            <div className="flex">
              <div className="text-[12px] font-bold mr-[8px]">{re?.authorId?.nickname}</div>
              <div className="text-[12px] text-gray-2">{re?.createdAt?.slice(0, 10)}</div>
            </div>
            <div className="flex w-full gap-1">
              <span className="font-bold text-sm text-primary w-fit whitespace-nowrap">@{nickname}</span>
              <textarea
                className={`w-full text-[12px] bg-white resize-none ${editMode ? 'outline-primary' : ''}`}
                value={newReply}
                disabled={!editMode}
                onChange={(e) => setNewReply(e.target.value)}
                ref={textareaRef}
              />
            </div>
            <div className="text-[12px]">
              {/* <button className="text-gray-500" onClick={() => replyOn()}>
                댓글 달기
              </button> */}
            </div>
          </div>
        </div>
        <div className="mr-[24px] relative flex items-center top-[-20px]">
          {userId === re?.authorId?._id && (
            <div>
              <button>
                <IoEllipsisHorizontalSharp onClick={() => setCommentMenuMode((prev) => !prev)} />
              </button>
              <div className="relative bottom-[-60px] left-[-4px]">
                {commentMenuMode && (
                  <CommentMenu
                    deleteComment={deleteComment}
                    // removeComment={removeComment}
                    commentId={re?._id}
                    editMode={editMode}
                    editModeOn={editModeOn}
                    editModeOff={editModeOff}
                    updateNewComment={updateNewComment}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Profile({ img }) {
  return <img src={img} alt="profile-img" className="rounded-full items-center w-[50px]" />;
}

Comment.propTypes = {
  reply: PropTypes.array.isRequired,
  nickname: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  image: PropTypes.string,
  deleteComment: PropTypes.func,
  commentId: PropTypes.string,
  CommentMenuToggle: PropTypes.func,
  authorId: PropTypes.string,
  replyOn: PropTypes.func,
  getAuthorId: PropTypes.func,
  deleteReplyComment: PropTypes.func,
};

Comment.defaultProps = {
  reply: false,
};

ReplyButton.defaultProps = {
  className: '',
};

Profile.propTypes = {
  img: PropTypes.string,
};
ReplyComment.propTypes = {
  re: PropTypes.object,
  userId: PropTypes.string,
  nickname: PropTypes.string,
  deleteReplyComment: PropTypes.func,
};
