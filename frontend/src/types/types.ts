export interface Article {
  _id?: string;
  title: string;
  image: string;
  category: string;
  description: string;
  createdAt?: Date;
  isBookmarked?: boolean;
}
