export type Feature = {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  votes: number
  likedByUser: boolean
  isOwner: boolean
}

export type CreateFeatureInput = {
  title: string
  description: string
  email: string
  creatorIdentifier: string
}