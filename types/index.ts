export interface LoginType {
  username: string;
  email: string;
}

export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string | null;
  googleId: string | null;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  website: string;
  createdAt: Date;
  posts: PostCard[];
  comments: Comment[];
  likes: Like[];
}

export interface CurrentUserType {
  id: string;
  username: string;
  email: string;
  password: string | null;
  googleId: string | null;
  name: string;
  role: 'ADMIN' | 'READER' | 'WRITER';
  bio: string;
  avatarUrl: string;
  website: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogData {
  title: string;
  description: string;
  content: string;
  tags: string;
  category: string;
  newCategory: string;
  image: File | null;
}

export interface PostCard {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  published: boolean;
  publishedDate: Date;
  description: string;
  authorId: string;
  author: {
    name: string;
  };
  Categories: { category: { name: string } }[];
  createdAt: Date;
  tags: {
    tag: {
      name: string;
    };
  }[];
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  post: PostCard;
  authorId: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  postId: string;
  post: PostCard;
  userId: string;
  user: UserType;
  createdAt: Date;
}
