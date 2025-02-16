export const queryKeys = {
  epiday: {
    allEpidays: ['epidays'],
    epidays: (limit: number) => ['epidays', { limit }],
    epidayForToday: (date: string) => ['epidays', 'today', { date }],
    epidaysBySearchKeyword: (keyword: string) => ['epidays', 'search', { keyword }],
    epidayDetails: (id: number) => ['epidays', 'detail', { id }],
    myEpidays: ['epidays', 'my'],
  },
  emotionLog: {
    allEmotionLogs: ['emotionLogs'],
    emotionLogForToday: ['emotionLogs', 'today'],
    emotionLogsForMonth: (year: number, month: number) => ['emotionLogs', 'month', { year, month }],
  },
  comment: {
    allComments: ['comments'],
    comments: (limit: number) => ['comments', { limit }],
    commentsForEpiday: (epidayId: number) => ['comments', 'epiday', { epidayId }],
    myComments: ['comments', 'my'],
  },
};
