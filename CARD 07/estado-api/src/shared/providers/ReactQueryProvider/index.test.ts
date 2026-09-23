import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";
import { useUserStore } from "@/data/states/zustand/user";
import { ReactQueryProvider } from "./index";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("ReactQueryProvider", () => {
  it("limpa o cache quando o usuário sai, venha o logout de onde vier", () => {
    let client: QueryClient | undefined;
    const Capture = () => {
      client = useQueryClient();
      return null;
    };
    const root = createRoot(document.createElement("div"));

    act(() => root.render(createElement(ReactQueryProvider, null, createElement(Capture))));

    useUserStore.getState().setUser({ name: "Piloto", email: "piloto@f1.com" });
    client!.setQueryData(["posts"], [{ id: 1 }]);
    useUserStore.getState().logout();

    expect(client!.getQueryData(["posts"])).toBeUndefined();
    act(() => root.unmount());
  });
});
