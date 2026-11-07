'use client';

import { Button } from '../components/ui/button';
import { useAuth } from '../lib/auth/use-auth';

export function SessionCard() {
  const auth = useAuth();
  const errorMessage = auth.error instanceof Error ? auth.error.message : 'Failed to load session';

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-zinc-900">Session</div>
          <div className="text-xs text-zinc-500">
            Fetched with httpOnly cookies and one safe refresh retry
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={auth.reload}
            disabled={auth.isLoading}
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            onClick={auth.logout}
            disabled={auth.isLoggingOut}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-zinc-50 p-4 font-mono text-xs text-zinc-800">
        {auth.isLoading && 'Loading...'}
        {auth.error && errorMessage}
        {!auth.isLoading &&
          !auth.error &&
          JSON.stringify({ session: auth.session, apiMe: auth.profile }, null, 2)}
      </div>
    </div>
  );
}
