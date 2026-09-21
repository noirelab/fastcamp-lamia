import { RegisterScreen } from "@/modules/auth/screens/RegisterScreen";
import { PageShell } from "@/shared/components/PageShell";

// Server Component
export default function RegisterPage() {
  return (
    <PageShell>
      <RegisterScreen />
    </PageShell>
  );
}
