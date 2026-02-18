import { Device, DeviceType, Scene } from "../models/devices";

export type ApiEnvelope<T> = {
  ok: boolean;
  data: T;
  error?: string;
};

export type SetDeviceStateRequest = {
  deviceId: string;
  type: DeviceType;
  payload: Record<string, unknown>;
};

export type SetDeviceStateResponse = ApiEnvelope<Device>;

export type SetSceneRequest = {
  sceneId: string;
};

export type SetSceneResponse = ApiEnvelope<Scene>;

export type ProvisionDeviceRequest = {
  protocol: "toolkit";
  deepLink: string;
  deviceMetadata: Record<string, string>;
};

export type ProvisionDeviceResponse = ApiEnvelope<Device>;

export type CloudApiContract = {
  listDevices: () => Promise<ApiEnvelope<Device[]>>;
  setDeviceState: (request: SetDeviceStateRequest) => Promise<SetDeviceStateResponse>;
  setScene: (request: SetSceneRequest) => Promise<SetSceneResponse>;
  provisionDevice: (request: ProvisionDeviceRequest) => Promise<ProvisionDeviceResponse>;
};
