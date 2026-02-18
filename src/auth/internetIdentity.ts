import { AuthClient } from "@dfinity/auth-client";

const IDENTITY_PROVIDER = "https://identity.ic0.app/#authorize";

export async function createAuthClient() {
  return AuthClient.create();
}

export async function signInWithInternetIdentity(authClient: AuthClient) {
  return new Promise<string>((resolve, reject) => {
    authClient.login({
      identityProvider: IDENTITY_PROVIDER,
      onSuccess: () => {
        const principal = authClient.getIdentity().getPrincipal().toText();
        resolve(principal);
      },
      onError: (error) => {
        reject(error);
      },
    });
  });
}

export async function signOut(authClient: AuthClient) {
  await authClient.logout();
}
