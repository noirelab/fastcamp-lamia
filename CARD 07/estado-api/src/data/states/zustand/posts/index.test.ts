import { beforeEach, describe, expect, it } from "vitest";
import { usePostsStore } from "./index";

describe("usePostsStore", () => {
  beforeEach(() => {
    localStorage.clear();
    usePostsStore.setState({ readIds: [], favoriteIds: [] });
  });

  it("marca e desmarca um post como lido", () => {
    usePostsStore.getState().toggleRead(1);

    expect(usePostsStore.getState().readIds).toEqual([1]);

    usePostsStore.getState().toggleRead(1);

    expect(usePostsStore.getState().readIds).toEqual([]);
  });

  it("marca e desmarca um post como favorito", () => {
    usePostsStore.getState().toggleFavorite(2);

    expect(usePostsStore.getState().favoriteIds).toEqual([2]);

    usePostsStore.getState().toggleFavorite(2);

    expect(usePostsStore.getState().favoriteIds).toEqual([]);
  });
});
