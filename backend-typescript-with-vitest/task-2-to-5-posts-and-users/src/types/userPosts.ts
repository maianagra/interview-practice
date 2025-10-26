export interface UserPost {
  id: number;
  name: string;
  email: string;
  postCount: number;
}

export type UsersPostsResponse = UserPost[];
