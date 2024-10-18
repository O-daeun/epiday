export const queryKeys = {
  epiday: {
    todayEpiday: ['todayEpiday'],
  },
  emotionLog: {
    todayEmotionLog: (sessionId: number) => ['todayEmotionLog', sessionId],
  },
};
