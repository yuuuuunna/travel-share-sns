import { useMutation, useQuery } from 'react-query';
import { queryClient, queryKeys } from '../../store/reactQuery';
import commentAPI from '../../services/comment';
import likesAPI from '../../services/likes';
import bookmarkAPI from '../../services/bookmarks';
import postsAPI from '../../services/posts';

// 내 여행
export const useMypagePostsQuery = () => {
  const { data: postsList } = useQuery({
    queryKey: [queryKeys.mypagePost],
    queryFn: postsAPI.getAllPostsByMe,
    useErrorBoundary: false,
    select: (data) => ({ list: data.data.posts, totalCount: data.data.posts?.length }),
  });

  const { data: post } = useQuery({
    queryKey: [queryKeys.mypagePost],
    queryFn: postsAPI.getPostById,
    useErrorBoundary: false,
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.mypagePost],
    });

  const addPost = useMutation({
    mutationFn: postsAPI.addOne,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const removePost = useMutation({
    mutationFn: postsAPI.removeOne,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const updatePost = useMutation({
    mutationFn: postsAPI.updateOne,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { postsList, post, addPost, removePost, updatePost };
};

// 내 댓글
export const useMypageCommentQuery = () => {
  const { data: commentList } = useQuery({
    queryKey: [queryKeys.mypageComment],
    queryFn: commentAPI.getAllCommentsByMe,
    useErrorBoundary: false,
    select: (data) => ({ list: data.data.myComments, totalCount: data.data.myComments.length }),
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.mypageComment],
    });

  const removeComment = useMutation({
    mutationFn: commentAPI.removeOne,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { commentList, removeComment };
};

// 내 장소
export const useMypageBookmarksQuery = () => {
  const { data: bookmarksList } = useQuery({
    queryKey: [queryKeys.mypageBookmarks],
    queryFn: bookmarkAPI.getAllBookmarksByMe,
    useErrorBoundary: false,
    select: (data) => ({ list: data.data.bookmarks, totalCount: data.data.bookmarks.length }),
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.mypageBookmarks],
    });

  const removeBookmarks = useMutation({
    mutationFn: bookmarkAPI.removeAll,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { bookmarksList, removeBookmarks };
};

// 내 찜 목록
export const useMypageLikesQuery = () => {
  const { data: likesList } = useQuery({
    queryKey: [queryKeys.mypageLikes],
    queryFn: likesAPI.getAllLikesByMe,
    useErrorBoundary: false,
    select: (data) => ({ list: data.data.likedPosts, totalCount: data.data.likedPosts.length }),
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.mypageLikes],
    });

  const removeLikes = useMutation({
    mutationFn: likesAPI.removeAll,
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { likesList, removeLikes };
};
