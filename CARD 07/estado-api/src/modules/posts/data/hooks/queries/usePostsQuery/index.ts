import { useQuery } from "@tanstack/react-query";
import { PostsService } from "@/modules/posts/data/services/posts";

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: PostsService.getAll,
  });
};
