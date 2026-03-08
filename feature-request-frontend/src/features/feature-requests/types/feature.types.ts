export type Feature = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  votes: number;
  likedByUser: boolean;
  isOwner: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

export type CreateFeatureInput = {
  title: string
  description: string
  creatorIdentifier: string
}