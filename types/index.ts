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
}

export interface BlogData {
  title: string;
  description: string;
  content: string;
  tags: string;
}
