import { XMarkIcon } from '@heroicons/react/24/outline';
import { InputHTMLAttributes, KeyboardEvent, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { EpidayFormValues } from '../forms/epiday-form';
import ErrorMessage from './error-message';
import Input from './input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  setValue: (name: string, value: any) => void;
  register: UseFormRegister<EpidayFormValues>;
  error?: string;
}

export default function TagsInput({ setValue, register, error, ...rest }: Props) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setValue('tags', [...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (selectedTag: string) => {
    setTags(tags.filter((tag) => tag !== selectedTag));
  };

  useEffect(() => {
    setValue('tags', tags);
  }, []);

  return (
    <>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={addTag}
        maxLength={10}
        placeholder="입력하여 태그 작성 (최대 10자)"
        {...rest}
      />
      {error && <ErrorMessage isRight>{error}</ErrorMessage>}
      {tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="relative rounded-3xl bg-var-background px-[14px] py-3 text-xl font-light text-var-black-300"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="absolute -right-[5px] -top-[2px]"
              >
                <XMarkIcon className="size-5 stroke-var-black-300 stroke-2" />
              </button>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
