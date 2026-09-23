import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { useUserStore } from "@/data/states/zustand/user";
import { ReactQueryProvider } from "./index";

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("ReactQueryProvider", () => {
  it("zera o cache e rebusca a tela quando o usuário sai, venha o logout de onde vier", async () => {
    let client: QueryClient | undefined;
    let fetches = 0;
    const Capture = () => {
      client = useQueryClient();
      const { data } = useQuery({ queryKey: ["posts"], queryFn: async () => [{ id: ++fetches }] });
      return createElement("p", null, data?.[0].id ?? "vazio");
    };
    const container = document.createElement("div");
    const root = createRoot(container);

    await act(async () =>
      root.render(createElement(ReactQueryProvider, null, createElement(Capture))),
    );
    await act(flush);
    expect(container.textContent).toBe("1");

    useUserStore.getState().setUser({ name: "Piloto", email: "piloto@f1.com" });
    useUserStore.getState().logout();
    expect(client!.getQueryData(["posts"])).toBeUndefined();

    await act(flush);
    expect(fetches).toBe(2);
    expect(container.textContent).toBe("2");
    act(() => root.unmount());
  });
});
