export const queryKeys = {
  epiday: {
    allEpidays: ['epidays'],
    todayEpiday: ['epidays', 'todayEpiday'],
    recentEpidays: (limit: number) => ['epidays', 'recentEpidays', { limit }],
  },
  emotionLog: {
    allEmotionLogs: ['emotionLogs'],
    todayEmotionLog: (sessionId: number) => ['emotionLogs', 'todayEmotionLog', { sessionId }],
  },
  comment: {
    allComments: ['comments'],
    recentComments: (limit: number) => ['comments', 'recentComments', { limit }],
  },
};
