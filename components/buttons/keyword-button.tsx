interface Props {
  text: string;
}

export default function KeywordButton({ text }: Props) {
  return (
    <button
      type="button"
      className="w-fit rounded-[22px] bg-var-background px-[14px] py-3 text-2xl text-var-black-300"
    >
      {text}
    </button>
  );
}
