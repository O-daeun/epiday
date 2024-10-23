export const queryKeys = {
  epiday: {
    allEpidays: ['epidays'],
    todayEpiday: (date: string) => ['epidays', 'today', { date }],
    recentEpidays: (limit: number) => ['epidays', 'recent', { limit }],
    searchedEpidays: (keyword: string) => ['epidays', 'search', { keyword }],
  },
  emotionLog: {
    allEmotionLogs: ['emotionLogs'],
    todayEmotionLog: (sessionId: number) => ['emotionLogs', 'today', { sessionId }],
  },
  comment: {
    allComments: ['comments'],
    recentComments: (limit: number) => ['comments', 'recent', { limit }],
  },
};
