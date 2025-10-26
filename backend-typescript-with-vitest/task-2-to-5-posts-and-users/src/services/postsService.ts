import { PostsResponse } from "../types/posts";
import { fetchFromApi } from "../utils/api";
import { transformPosts } from "../utils/posts";

export async function fetchPosts(): Promise<PostsResponse> {
  // Fetch posts from external API
  const response = await fetchFromApi(
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Limit to just first 5 posts
  const posts = response.slice(0, 5);

  // Transform posts to only include id, title, and shortTitle (first 20 characters of title)
  const transformedPosts: PostsResponse = transformPosts(posts);

  return transformedPosts;
}

export async function fetchPostsByUserId(id:number): Promise<PostsResponse> {
  // Fetch posts from external API
  const response = await fetchFromApi(
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Filter posts by userId
  const filteredPosts = response.filter((post: any) => post.userId === id);

  // Transform posts to only include id, title, and shortTitle (first 20 characters of title)
  const transformedPosts: PostsResponse = transformPosts(filteredPosts);

  return transformedPosts;
}
