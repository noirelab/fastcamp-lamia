import { api } from "@/data/services/api";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export class PostsService {
  static async getAll(): Promise<Post[]> {
    const response = await api.get<Post[]>("/posts?_limit=8");
    return response.data;
  }
}
