'use client';

import { atomWithStorage } from 'jotai/utils';

export type UiPreferences = {
  density: 'comfortable' | 'compact';
};

export const uiPreferencesAtom = atomWithStorage<UiPreferences>('lazidog-ui-preferences', {
  density: 'comfortable',
});
