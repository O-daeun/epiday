import Image from 'next/image';

export default function SearchForm() {
  return (
    <form className="flex h-20 items-center border-b-4 border-var-blue-800">
      <input className="grow text-2xl text-var-black-700 outline-none" />
      <button type="submit">
        <Image src="/search.svg" width={36} height={36} alt="검색" />
      </button>
    </form>
  );
}
