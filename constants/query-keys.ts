export const queryKeys = {
  epiday: {
    allEpidays: ['epidays'],
    epidays: (limit: number) => ['epidays', { limit }],
    epidayForToday: (date: string) => ['epidays', 'today', { date }],
    epidaysBySearchKeyword: (keyword: string) => ['epidays', 'search', { keyword }],
    epidayDetails: (id: number) => ['epidays', 'detail', { id }],
  },
  emotionLog: {
    allEmotionLogs: ['emotionLogs'],
    emotionLogForToday: ['emotionLogs', 'today'],
    emotionLogsForMonth: ['emotionLogs', 'month'],
  },
  comment: {
    allComments: ['comments'],
    comments: (limit: number) => ['comments', { limit }],
    commentsForEpiday: (epidayId: number) => ['comments', 'epiday', { epidayId }],
  },
};
