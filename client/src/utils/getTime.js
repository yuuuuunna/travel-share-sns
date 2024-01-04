// 1분 이내 = 방금 전
// 1분 ~ 60분 = N분 전
// 60분 초과 = N시간 전
// 24시간 초과 = N일 전

export function getTime(date) {
  const currentDate = new Date();
  const prevDate = new Date(date);
  const diff = currentDate.getTime() - prevDate.getTime();

  const minuteDiff = Math.floor(diff / (1000 * 60));
  if (minuteDiff < 1) {
    return `방금 전`;
  } else if (minuteDiff < 60) {
    return `${minuteDiff}분 전`;
  }

  const hourDiff = Math.floor(minuteDiff / 60);
  if (hourDiff < 24) {
    return `${hourDiff}시간 전`;
  }

  const dayDiff = Math.floor(hourDiff / 24);
  return `${dayDiff}일 전`;
}
