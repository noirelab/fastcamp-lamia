import { DashboardScreen } from "@/modules/dashboard/screens/DashboardScreen";
import { SiteHeader } from "@/shared/components/SiteHeader";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <DashboardScreen />
    </>
  );
}
