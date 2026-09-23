import { LinkButton } from "@/shared/components/LinkButton";
import { PageShell } from "@/shared/components/PageShell";

export const HomeScreen = () => {
  return (
    <PageShell>
      <section className="rounded border bg-white p-6 shadow-sm sm:p-8">
        <div>
          <p className="text-sm font-semibold text-blue-600">Fórmula 1</p>
          <h1 className="mt-3 text-4xl font-bold">Temporada 2021</h1>
          <p className="mt-3 max-w-2xl leading-7 text-gray-600">
            Acompanhe dados simples dos pilotos e construtores da temporada 2021.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/cadastro">Criar conta</LinkButton>
            <LinkButton href="/dashboard" variant="secondary">
              Ver dashboard
            </LinkButton>
          </div>
        </div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded border bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-blue-600">Piloto</p>
          <h2 className="mt-3 text-xl font-bold text-gray-900">Max Verstappen</h2>
          <p className="mt-2 leading-6 text-gray-600">Campeão mundial de 2021.</p>
        </article>
        <article className="rounded border bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-blue-600">Piloto</p>
          <h2 className="mt-3 text-xl font-bold text-gray-900">Lewis Hamilton</h2>
          <p className="mt-2 leading-6 text-gray-600">Vice-campeão mundial de 2021.</p>
        </article>
        <article className="rounded border bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-blue-600">Equipe</p>
          <h2 className="mt-3 text-xl font-bold text-gray-900">Mercedes</h2>
          <p className="mt-2 leading-6 text-gray-600">Campeã do mundial de construtores.</p>
        </article>
      </section>
    </PageShell>
  );
};
