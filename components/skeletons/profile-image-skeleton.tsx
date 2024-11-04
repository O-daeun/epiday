const SIZES = {
  s: {
    circle: 24,
    text: 14,
  },
  m: {
    circle: 48,
    text: 24,
  },

  l: {
    circle: 120,
    text: 60,
  },
};

interface Props {
  size: 's' | 'm' | 'l';
}

export default function ProfileImageSkeleton({ size }: Props) {
  const style = {
    width: SIZES[size].circle,
    height: SIZES[size].circle,
  };
  return <div className="shrink-0 rounded-[50%] bg-var-gray-300 shadow-md" style={style} />;
}
