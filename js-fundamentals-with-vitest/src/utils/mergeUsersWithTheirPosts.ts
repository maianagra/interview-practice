export interface User {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  userId?: number;
  title: string;
}

export interface UserWithPosts {
  id: number;
  name: string;
  posts: Post[];
}

export function mergeUsersWithTheirPosts(
  users: User[],
  posts: Post[]
): UserWithPosts[] {
  const usersPosts = users.map((user) => {
    const userPosts: Post[] = posts
      .filter((post) => post.userId === user.id)
      .map(({ id, title }) => ({ id, title }));
    return { ...user, posts: userPosts };
  });
  return usersPosts;
}
