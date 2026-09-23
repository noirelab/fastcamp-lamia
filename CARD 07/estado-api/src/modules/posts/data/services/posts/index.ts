import { api } from "@/data/services/api";
import { postsSchema, type Post } from "@/modules/posts/data/schemas/post";

export class PostsService {
  static async getAll(): Promise<Post[]> {
    const response = await api.get<unknown>("/posts?_limit=8");

    // valida o payload em runtime antes de entregar os dados tipados
    return postsSchema.parse(response.data);
  }
}
