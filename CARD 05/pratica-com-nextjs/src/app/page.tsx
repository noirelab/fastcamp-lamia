import type { Metadata } from "next";
import { HomeScreen } from "@/modules/blog/screens/HomeScreen";

export const metadata: Metadata = {
  title: "Posts | F1 2021 - Mini Blog",
};

export default function HomePage() {
  return <HomeScreen />;
}
