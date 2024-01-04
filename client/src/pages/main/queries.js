import { useMutation, useQuery } from 'react-query';
import { queryKeys } from '../../store/reactQuery';
import likesAPI from '../../services/likes';
import { queryClient } from '../../store/reactQuery';
import { isValidUser } from '../../utils/isValidUser';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoils/userAtom';

export const useLikeQuery = () => {
  const user = useRecoilValue(userState);
  const { data: likeList, refetch } = useQuery({
    queryKey: [queryKeys.like],
    queryFn: () => {
      if (isValidUser(user)) {
        return likesAPI.getAllLikesByMe();
      }
    },
    select: (data) => {
      return {
        myLikePost: data.data.likedPosts,
        myLikePostId: data.data.likedPosts.map((item) => item.postId._id),
      };
    },
  });

  const invalidateMatchQuery = () =>
    queryClient.invalidateQueries({
      queryKey: [queryKeys.like],
    });

  const postLikes = useMutation(({ userId, postId }) => likesAPI.postLike(userId, postId), {
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  const removeLikes = useMutation((removeLikeList) => likesAPI.removeAll(removeLikeList), {
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return {
    refetch,
    likeList,
    postLikes,
    removeLikes,
  };
};
