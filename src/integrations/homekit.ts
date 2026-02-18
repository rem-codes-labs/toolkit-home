export type HomeKitBridgeStatus = {
  paired: boolean;
  lastSync: string | null;
  notes: string;
};

export const homeKitStatus: HomeKitBridgeStatus = {
  paired: false,
  lastSync: null,
  notes: "HomeKit bridge stub — replace with pairing flow and HAP bridge service.",
};
