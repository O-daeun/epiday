interface Props {
  text: string;
  keyword: string;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // 정규식 특수문자들을 escape 처리
}

export default function HighlightKeyword({ text, keyword }: Props) {
  if (!keyword) return <>{text}</>;

  const escapedKeyword = escapeRegExp(keyword);
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="font-[inherit] text-var-illust-blue">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
