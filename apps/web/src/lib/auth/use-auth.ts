'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import * as React from 'react';
import { authApi } from '../api/auth';
import { usersApi } from '../api/users';
import { authStatusAtom, sessionAtom, userProfileAtom } from '../state/auth';

export function useAuth() {
  const queryClient = useQueryClient();
  const setAuthStatus = useSetAtom(authStatusAtom);
  const setSession = useSetAtom(sessionAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  const sessionQuery = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: authApi.session,
    retry: false,
  });

  const meQuery = useQuery({
    queryKey: ['users', 'me'],
    queryFn: usersApi.me,
    enabled: sessionQuery.isSuccess,
    retry: false,
  });

  const clearAuth = React.useCallback(() => {
    setAuthStatus('anonymous');
    setSession(null);
    setUserProfile(null);
    queryClient.removeQueries({ queryKey: ['auth'] });
    queryClient.removeQueries({ queryKey: ['users'] });
  }, [queryClient, setAuthStatus, setSession, setUserProfile]);

  React.useEffect(() => {
    if (sessionQuery.data) {
      setSession(sessionQuery.data);
      setAuthStatus('authenticated');
    } else if (sessionQuery.isError) {
      clearAuth();
    }
  }, [clearAuth, sessionQuery.data, sessionQuery.isError, setAuthStatus, setSession]);

  React.useEffect(() => {
    if (meQuery.data) {
      setUserProfile(meQuery.data);
    }
  }, [meQuery.data, setUserProfile]);

  React.useEffect(() => {
    window.addEventListener('lazidog:auth-expired', clearAuth);
    return () => window.removeEventListener('lazidog:auth-expired', clearAuth);
  }, [clearAuth]);

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSettled: clearAuth,
  });

  return {
    session: sessionQuery.data ?? null,
    profile: meQuery.data ?? null,
    isLoading: sessionQuery.isLoading || meQuery.isLoading,
    isAuthenticated: sessionQuery.isSuccess,
    error: sessionQuery.error ?? meQuery.error,
    reload: () => {
      void sessionQuery.refetch();
      void meQuery.refetch();
    },
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
}
