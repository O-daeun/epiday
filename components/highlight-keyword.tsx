interface Props {
  text: string;
  keyword: string;
}

export default function HighlightKeyword({ text, keyword }: Props) {
  if (!keyword) return text;

  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="font-[inherit] text-var-illust-blue">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
