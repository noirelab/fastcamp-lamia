import { ProfileScreen } from "@/modules/profile/screens/ProfileScreen";
import { AuthGuard } from "@/modules/auth/components/AuthGuard";
import { PageShell } from "@/shared/components/PageShell";

export default function ProfilePage() {
  return (
    <PageShell>
      <AuthGuard>
        <ProfileScreen />
      </AuthGuard>
    </PageShell>
  );
}
