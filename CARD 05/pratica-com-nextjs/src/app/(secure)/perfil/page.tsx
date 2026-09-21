import { ProfileScreen } from "@/modules/profile/screens/ProfileScreen";
import { PageShell } from "@/shared/components/PageShell";

// Server Component
export default function ProfilePage() {
  return (
    <PageShell>
      <ProfileScreen />
    </PageShell>
  );
}
