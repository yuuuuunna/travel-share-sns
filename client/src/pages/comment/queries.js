import { useMutation, useQuery } from 'react-query';
import { queryClient, queryKeys } from '../../store/reactQuery';
import commentAPI from '../../services/comment';

// 내 여행
export const useCommentsQuery = (postId) => {
  const { data: commentList } = useQuery({
    queryKey: [queryKeys.comment],
    queryFn: () => commentAPI.getAllCommentByPost(postId),
    useErrorBoundary: false,
    select: (data) => data.data.postComments,
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.comment],
    });

  // 댓글, 대댓글 post
  const addComment = useMutation({
    mutationFn: commentAPI.postComment,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  //댓글 삭제
  const removeComment = useMutation({
    mutationFn: commentAPI.removeOne,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  //대댓글 삭제
  const removeReplyComment = useMutation({
    mutationFn: commentAPI.removeReply,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  //댓글 수정
  const updateComment = useMutation({
    mutationFn: commentAPI.updateComment,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  //대댓글 수정
  const updateReplyComment = useMutation({
    mutationFn: commentAPI.updateReply,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { commentList, addComment, removeComment, removeReplyComment, updateComment, updateReplyComment };
};
