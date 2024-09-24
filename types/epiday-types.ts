export interface GetTagData {
  id: number;
  name: string;
}

export interface GetEpidayData {
  author: string;
  content: string;
  id: number;
  isLiked: boolean;
  likeCount: number;
  referenceTitle: string | null;
  referenceUrl: string | null;
  tags: GetTagData[] | [];
  writerId: number;
}

export interface PostEpidayData {
  tags: string[];
  referenceUrl?: string;
  referenceTitle?: string;
  author: string;
  content: string;
}
