'use client';

import { ChangeEvent, useState } from 'react';
import Button from '../buttons/button';
import InnerLayout from '../inner-layout';
import Input from '../inputs/input';
import Label from '../inputs/label';
import RadioInput from '../inputs/radio-input';
import Textarea from '../inputs/textarea';

export default function EpidayForm() {
  const [selectedAuthor, setSelectedAuthor] = useState('직접입력');

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAuthor(e.target.value);
  };

  return (
    <InnerLayout className="py-[136px]">
      <h1 className="mb-10 text-2xl font-semibold text-black">에피그램 만들기</h1>
      <form className="flex flex-col gap-[54px]">
        <Label label="내용" isRequired>
          <Textarea placeholder="500자 이내로 입력해주세요." maxLength={500} />
        </Label>
        <Label label="저자" isRequired>
          <div className="mb-4 flex gap-6">
            <RadioInput
              name="author"
              value="직접입력"
              label="직접 입력"
              checked={selectedAuthor === '직접입력'}
              onChange={handleRadioChange}
            />
            <RadioInput
              name="author"
              value="알수없음"
              label="알 수 없음"
              checked={selectedAuthor === '알수없음'}
              onChange={handleRadioChange}
            />
            <RadioInput
              name="author"
              value="본인"
              label="본인"
              checked={selectedAuthor === '본인'}
              onChange={handleRadioChange}
            />
          </div>
          <Input placeholder="저자 이름 입력" />
        </Label>
        <Label label="출처">
          <Input placeholder="출처 제목 입력" className="mb-4" />
          <Input placeholder="URL (ex. https://www.website.com)" />
        </Label>
        <Label label="태그">
          <Input placeholder="입력하여 태그 작성 (최대 10자)" />
        </Label>
        <Button design="wide">작성 완료</Button>
      </form>
    </InnerLayout>
  );
}
