import { useEffect, useState } from "react";
import { createAuthClient, signInWithInternetIdentity, signOut } from "./internetIdentity";
import type { AuthClient } from "@dfinity/auth-client";

export function useInternetIdentity() {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [principal, setPrincipal] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const client = await createAuthClient();
      if (!isMounted) return;
      setAuthClient(client);
      const authed = await client.isAuthenticated();
      if (!isMounted) return;
      setIsAuthenticated(authed);
      setPrincipal(authed ? client.getIdentity().getPrincipal().toText() : null);
      setLoading(false);
    };
    init();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async () => {
    if (!authClient) return;
    setError(null);
    try {
      const principalText = await signInWithInternetIdentity(authClient);
      setIsAuthenticated(true);
      setPrincipal(principalText);
    } catch (err) {
      setError("Unable to sign in. Please try again.");
    }
  };

  const logout = async () => {
    if (!authClient) return;
    await signOut(authClient);
    setIsAuthenticated(false);
    setPrincipal(null);
  };

  return { loading, isAuthenticated, principal, login, logout, error };
}
