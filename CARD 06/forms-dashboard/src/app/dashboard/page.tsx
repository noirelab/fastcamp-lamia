import { DashboardScreen } from "@/modules/dashboard/screens/DashboardScreen";
import { AuthGuard } from "@/modules/auth/components/AuthGuard";
import { PageShell } from "@/shared/components/PageShell";

export default function DashboardPage() {
  return (
    <PageShell>
      <AuthGuard>
        <DashboardScreen />
      </AuthGuard>
    </PageShell>
  );
}
