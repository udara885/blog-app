export interface Article {
  _id?: string;
  title: string;
  image: string;
  category: string;
  description: string;
  createdAt?: Date;
  isBookmarked?: boolean;
  comments?: Comment[];
}

export interface Comment {
  _id?: string;
  name: string;
  email: string;
  comment: string;
  createdAt?: Date;
}
