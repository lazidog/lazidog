'use client';

import type { MeResponse, Session } from '@lazidog/shared/client';
import { atom } from 'jotai';

export type AuthStatus = 'unknown' | 'authenticated' | 'anonymous';

export const authStatusAtom = atom<AuthStatus>('unknown');
export const sessionAtom = atom<Session | null>(null);
export const userProfileAtom = atom<MeResponse | null>(null);
