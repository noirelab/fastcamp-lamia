import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/data/states/zustand/user";
import { AuthService } from "@/modules/auth/data/services/auth";

export const useLoginMutation = () => {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: AuthService.login,
    onSuccess: (user) => setUser(user),
  });
};
