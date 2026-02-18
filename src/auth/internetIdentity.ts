export type IdentitySession = {
  principal: string;
  expiresAt: string;
};

export async function signInWithInternetIdentity(): Promise<IdentitySession> {
  return new Promise((resolve) => {
    setTimeout(() =>
      resolve({
        principal: "aaaa-bbbb-cccc-dddd",
        expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      }),
    600);
  });
}

export async function signOut() {
  return Promise.resolve();
}
