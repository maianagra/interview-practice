import { UserPost, UsersPostsResponse } from "../types/userPosts";
import { fetchFromApi } from "../utils/api";

export async function fetchUsersPosts(): Promise<UsersPostsResponse> {
  // Fetch users from external API
  const usersResponse = await fetchFromApi(
    "https://jsonplaceholder.typicode.com/users"
  );

  // Fetch posts from external API
  const postsResponse = await fetchFromApi(
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Combine users with their posts
  const usersPosts = usersResponse.map((user: any) => {
    const userPosts = postsResponse.filter(
      (post: any) => post.userId === user.id
    );
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      postCount: userPosts.length,
    };
  });

  // Sort users by postCount in descending order
  const usersPostsResponse: UsersPostsResponse = usersPosts.sort(
    (a: UserPost, b: UserPost) => b.postCount - a.postCount
  );

  return usersPostsResponse;
}
