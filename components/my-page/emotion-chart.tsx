import { EMOTIONS } from '@/constants/emotions';
import tailwindConfig from '@/tailwind.config';
import { GetEmotionLog } from '@/types/emotion-types';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import resolveConfig from 'tailwindcss/resolveConfig';
import EmotionImage from '../emotion-image';
import Section from './section';
import Title from './title';

const fullConfig = resolveConfig(tailwindConfig);

const chartColors = [
  fullConfig.theme.colors['var-illust-red'],
  fullConfig.theme.colors['var-illust-green'],
  fullConfig.theme.colors['var-illust-yellow'],
  fullConfig.theme.colors['var-illust-blue'],
  fullConfig.theme.colors['var-illust-brown'],
];

const getEnglishEmotion = (koreanEmotion: string) => {
  const emotion = EMOTIONS.find((emotion) => emotion.korean === koreanEmotion);
  return emotion ? emotion.english : null; // 감정이 없을 경우 null 반환
};

interface Props {
  formattedYearMonth: string;
  emotionLogs: GetEmotionLog[];
}

export default function EmotionChart({ formattedYearMonth, emotionLogs }: Props) {
  // 감정의 발생 횟수를 계산
  const emotionCount = EMOTIONS.reduce(
    (acc, emotion) => {
      acc[emotion.english] = emotionLogs.filter((log) => log.emotion === emotion.english).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  // 총 로그 개수
  const totalLogs = emotionLogs.length;

  // 차트 데이터로 변환
  const data = EMOTIONS.map((emotion, index) => ({
    name: emotion.korean,
    value: totalLogs > 0 ? (emotionCount[emotion.english] / totalLogs) * 100 : 0, // 퍼센트로 계산
    fill: chartColors[index % chartColors.length], // 색상
  }));

  const mostFrequentEmotion =
    data.length !== 0
      ? data.reduce((prev, current) => (current.value > prev.value ? current : prev))
      : null;

  return (
    <Section>
      <div className="flex items-center justify-between">
        <Title>감정 차트</Title>
        <span className="text-xl text-var-blue-400">{formattedYearMonth}</span>
      </div>
      <div className="rounded-lg border border-var-blue-200 py-[24px]">
        <div className="mx-auto flex w-full max-w-[400px] items-center justify-between px-2">
          <div className="relative size-[200px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius="85%" // 도넛 모양으로 만듦
                  outerRadius="100%"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2">
              <EmotionImage type={getEnglishEmotion(mostFrequentEmotion.name)} size="l" />
              <span className="font-bold">{mostFrequentEmotion.name}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2">
            {data.map((entry, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className="size-4 rounded-sm"
                  style={{ backgroundColor: chartColors[index] }}
                />
                <EmotionImage type={getEnglishEmotion(entry.name)} size="s" />
                <span
                  className={`text-xl font-semibold ${entry.name !== mostFrequentEmotion.name ? 'text-var-gray-200' : ''}`}
                >{`${entry.value.toFixed(0)}%`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}