/**
 * 오늘 날짜를 2024.05.25 형태 string으로 변환하는 함수
 */
export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};
