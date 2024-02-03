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
  posts: Post[];
  comments: Comment[];
  likes: Like[];
}

export interface BlogData {
  title: string;
  description: string;
  content: string;
  tags: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  publishedDate: Date;
  description: string;
  authorId: string;
  author: UserType;
  categories: string[];
  createdAt: Date;
  tags: string[];
  comments: Comment[];
  likes: Like[];
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  post: Post;
  authorId: string;
  author: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  postId: string;
  post: Post;
  userId: string;
  user: UserType;
  createdAt: Date;
}
