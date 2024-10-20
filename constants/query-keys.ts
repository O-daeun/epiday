export const queryKeys = {
  epiday: {
    allEpidays: ['epidays'],
    todayEpiday: ['epidays', 'todayEpiday'],
    recentEpidays: ['epidays', 'recentEpidays'],
  },
  emotionLog: {
    allEmotionLogs: ['emotionLogs'],
    todayEmotionLog: (sessionId: number) => ['emotionLogs', 'todayEmotionLog', sessionId],
  },
  comment: {
    allComments: ['comments'],
    recentComments: ['comments', 'recentComments'],
  },
};
