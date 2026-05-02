import { Button } from "@lazidog/ui";
import { SessionCard } from "./session-card";

export default function Page() {
  const authBase =
    process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? "http://localhost:4002";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-2xl border border-zinc-200 bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">lazidog.dev</h1>
          <p className="text-sm text-zinc-600">
            Web + API + Auth + Gateway + Proxy (R2 Worker) scaffold with shared
            SSO cookies.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={`${authBase}/v1/login/dev?returnTo=/`}>
            <Button>Dev Login</Button>
          </a>
          <a href={`${authBase}/v1/login/mezon?returnTo=/`}>
            <Button variant="secondary">Mezon (Mock)</Button>
          </a>
          <a href={`${authBase}/v1/login/google?state=/`}>
            <Button variant="secondary">Google Login</Button>
          </a>
        </div>

        <div className="mt-8">
          <SessionCard />
        </div>
      </div>
    </main>
  );
}
