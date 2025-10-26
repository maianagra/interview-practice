import { PostsResponse } from "../types/posts";

export function transformPosts(data: any[]): PostsResponse {
  // Transform posts to only include id, title, and shortTitle (first 20 characters of title)
  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    shortTitle: post.title.slice(0, 20),
  }));
}
