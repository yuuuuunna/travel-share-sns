import { useMutation, useQuery } from 'react-query';
import { queryClient, queryKeys } from '../../store/reactQuery';
import bookmarkAPI from '../../services/bookmarks';
import { userState } from '../../recoils/userAtom';
import { useRecoilValue } from 'recoil';
import { isValidUser } from '../../utils/isValidUser';

export const useBookmarkQuery = () => {
  const user = useRecoilValue(userState);
  const { data: myBookmark } = useQuery({
    queryKey: [queryKeys.bookmark],
    queryFn: () => {
      if (isValidUser(user)) {
        return bookmarkAPI.getAllBookmarksByMe();
      }
    },
    select: (data) => ({
      userBookmark: data.data.bookmarks,
      userBookmarkId: data.data.bookmarks.map((bookmark) => bookmark.matchingSchedule._id),
    }),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const invalidateMatchQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.bookmark],
    });
  };

  const postBookmarks = useMutation(
    ({ singleScheduleId, postId }) => bookmarkAPI.postBookmarkByMe(singleScheduleId, postId),
    {
      onSuccess: invalidateMatchQuery,
    },
  ).mutateAsync;

  const removeBookmarks = useMutation((removeBookmarkList) => bookmarkAPI.removeAll(removeBookmarkList), {
    onSuccess: invalidateMatchQuery,
  }).mutateAsync;

  return { myBookmark, postBookmarks, removeBookmarks };
};
