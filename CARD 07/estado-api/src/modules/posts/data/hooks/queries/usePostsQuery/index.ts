import { useQuery } from "@tanstack/react-query";
import { PostsService } from "../../../services/posts";

export const usePostsQuery = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: PostsService.getAll,
  });
};
