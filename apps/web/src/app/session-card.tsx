'use client';

import * as React from 'react';
import { createApiClient } from '@lazidog/api-client';
import { Button } from '@lazidog/ui';

type State =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'loaded'; data: unknown; me: unknown }
  | { status: 'error'; message: string };

export function SessionCard() {
  const gatewayBase = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL ?? 'http://localhost:4001';
  const client = React.useMemo(() => createApiClient({ baseUrl: gatewayBase }), [gatewayBase]);
  const [state, setState] = React.useState<State>({ status: 'idle' });

  const load = React.useCallback(async () => {
    setState({ status: 'loading' });
    try {
      const s = await client.session.get();
      const me = await client.api.me();
      setState({ status: 'loaded', data: s, me });
    } catch (e: any) {
      setState({ status: 'error', message: e?.message ?? 'Failed to load session' });
    }
  }, [client]);

  React.useEffect(() => {
    void load();
  }, [load]);

  const logout = React.useCallback(async () => {
    try {
      await client.session.logout();
    } finally {
      await load();
    }
  }, [client, load]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-zinc-900">Session</div>
          <div className="text-xs text-zinc-500">Fetched via gateway with cookies (credentials: include)</div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={load} disabled={state.status === 'loading'}>
            Refresh
          </Button>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-zinc-50 p-4 font-mono text-xs text-zinc-800">
        {state.status === 'loading' && 'Loading...'}
        {state.status === 'idle' && 'Idle'}
        {state.status === 'error' && state.message}
        {state.status === 'loaded' &&
          JSON.stringify({ session: state.data, apiMe: state.me }, null, 2)}
      </div>
    </div>
  );
}
