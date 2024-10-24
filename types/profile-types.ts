export interface GetImage {
  url: string;
}

export interface GetProfile {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface PatchProfile {
  nickname: string;
  image?: string;
}
