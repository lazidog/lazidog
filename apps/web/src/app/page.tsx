import { SessionCard } from './session-card';
import { Button } from '../components/ui/button';
import { authRoutes } from '../lib/config';

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-2xl border border-zinc-200 bg-white/70 p-8 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight">lazidog.dev</h1>
          <p className="text-sm text-zinc-600">
            Web + API + Auth + Worker + Proxy foundation with shared secure identity.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={authRoutes.googleLogin}>
            <Button>Continue with Google</Button>
          </a>
        </div>

        <div className="mt-8">
          <SessionCard />
        </div>
      </div>
    </main>
  );
}
