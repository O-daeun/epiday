export interface TagData {
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
  tags: TagData[] | [];
  writerId: number;
}

// GetEpidaysData의 list item type
export interface EpidayItemData {
  likeCount: number;
  id: number;
  content: string;
  author: string;
  referenceTitle: string;
  referenceUrl: string;
  writerId: number;
  tags: TagData[] | [];
}

export interface GetEpidaysData {
  list: EpidayItemData[];
  nextCursor: number;
  totalCount: number;
}

export interface PostEpidayData {
  tags: string[];
  referenceUrl?: string;
  referenceTitle?: string;
  author: string;
  content: string;
}
