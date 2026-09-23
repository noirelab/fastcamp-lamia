export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6 py-16">
      <p className="text-sm font-semibold text-blue-600">FastCamp LAMIA</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Projeto base do FastCamp
      </h1>
      <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Setup com Next.js 16 (App Router), TypeScript strict, Tailwind CSS,
        ESLint, Prettier e Husky. Os próximos cards evoluem a partir daqui.
      </p>
    </main>
  );
}
