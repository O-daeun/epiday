export interface GetWriterData {
  id: number;
  nickname: string;
  image: string | null;
}

export interface GetCommentData {
  id: number;
  content: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  writer: GetWriterData;
  epigramId: number;
}

export interface GetCommentsData {
  list: GetCommentData[] | [];
  nextCursor: number | null;
  totalCount: number;
}
