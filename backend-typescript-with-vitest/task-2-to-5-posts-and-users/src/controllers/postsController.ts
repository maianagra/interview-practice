import { Request, Response } from "express";
import { PostsResponse } from "../types/posts";
import { fetchPosts, fetchPostsByUserId } from "../services/postsService";

export const getPosts = async (_req: Request, res: Response) => {
  try {
    const response: PostsResponse = await fetchPosts();
    return res.json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    } else {
      // Unexpected error
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  }
};

export const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    // Handle invalid ID parameter
    if (!idParam || !/^\d+$/.test(idParam)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    
    const id = Number(idParam);
    const response: PostsResponse = await fetchPostsByUserId(id);

    // Handle case where no posts are found for the user
    if (response.length === 0) {
      return res.status(404).json({ error: "No posts found for this user" });
    }

    return res.json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    } else {
      // Unexpected error
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  }
};
