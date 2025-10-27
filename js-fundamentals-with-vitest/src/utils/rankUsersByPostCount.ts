export interface UserWithPosts {
  id: number;
  name: string;
  posts: any[];
}

export interface RankedUser {
  id: number;
  name: string;
  postCount: number;
}

export function rankUsersByPostCount(users: UserWithPosts[]): RankedUser[] {
  const rankedUsers = users
    .map((user) => {
      const postCount = user.posts.length;
      return {
        id: user.id,
        name: user.name,
        postCount: postCount,
      };
    })
    .sort((a: RankedUser, b: RankedUser) => b.postCount - a.postCount);

  return rankedUsers;
}
