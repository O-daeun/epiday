export const queryKeys = {
  epiday: {
    todayEpiday: ['todayEpiday'],
    recentEpidays: ['recentEpidays'],
  },
  emotionLog: {
    todayEmotionLog: (sessionId: number) => ['todayEmotionLog', sessionId],
  },
};
