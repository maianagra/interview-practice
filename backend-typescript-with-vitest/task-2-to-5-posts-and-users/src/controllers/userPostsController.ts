import { Request, Response } from "express";
import { UsersPostsResponse } from "../types/userPosts";
import { fetchUsersPosts } from "../services/userPostsService";

export const getUserPosts = async (_req: Request, res: Response) => {
  try {
    const response: UsersPostsResponse = await fetchUsersPosts();
    return res.json(response);
  } catch (error: any) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    } else {
      // Unexpected error
      return res.status(500).json({ error: "Failed to fetch user posts" });
    }
  }
};
