import { devices, scenes } from "../data/devices";
import { CloudApiContract, ProvisionDeviceRequest } from "./contracts";

export const mockCloud: CloudApiContract = {
  listDevices: async () => ({ ok: true, data: devices }),
  setDeviceState: async (request) => {
    const device = devices.find((item) => item.id === request.deviceId);
    if (!device) {
      return { ok: false, data: devices[0], error: "Device not found" };
    }
    return { ok: true, data: { ...device, ...request.payload } as typeof device };
  },
  setScene: async (request) => {
    const scene = scenes.find((item) => item.id === request.sceneId);
    if (!scene) {
      return { ok: false, data: scenes[0], error: "Scene not found" };
    }
    return { ok: true, data: scene };
  },
  provisionDevice: async (request: ProvisionDeviceRequest) => ({
    ok: true,
    data: {
      id: `new-${request.deviceMetadata.model ?? "device"}`,
      name: request.deviceMetadata.name ?? "New device",
      type: "switch",
      room: request.deviceMetadata.room ?? "Unassigned",
      online: true,
      firmware: "0.1.0",
      isOn: false,
      amperage: 0.5,
    },
  }),
};
