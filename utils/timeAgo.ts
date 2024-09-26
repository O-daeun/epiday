/**
 *
 * @param dateString string - 2024-09-25T07:17:35.033Z
 * @returns string - 1시간 전
 */
export function timeAgo(dateString: string): string {
  const now = new Date();
  const pastDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const timeIntervals = [
    { label: '년', seconds: 31536000 },
    { label: '개월', seconds: 2592000 },
    { label: '일', seconds: 86400 },
    { label: '시간', seconds: 3600 },
    { label: '분', seconds: 60 },
    { label: '초', seconds: 1 },
  ];

  for (const interval of timeIntervals) {
    const timePassed = Math.floor(diffInSeconds / interval.seconds);
    if (timePassed >= 1) {
      return `${timePassed}${interval.label} 전`;
    }
  }

  return '방금 전';
}
