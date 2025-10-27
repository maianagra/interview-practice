export interface Post {
  id: number;
  userId: number;
  title: string;
}

export function groupPostsByUser(posts: Post[]): Record<number, Post[]> {
  let result = {} as Record<number, Post[]>;

  // For each post, add it to the array for its userId
  for (const post of posts) {
    if (!result[post.userId]) {
      result[post.userId] = [];
    }
    result[post.userId].push(post);
  }

  return result;
}
