export type DeviceType = "light" | "switch" | "lock" | "thermostat";

export type BaseDevice = {
  id: string;
  name: string;
  type: DeviceType;
  room: string;
  online: boolean;
  firmware: string;
};

export type LightDevice = BaseDevice & {
  type: "light";
  supportsColor: boolean;
  brightness: number;
  color?: {
    r: number;
    g: number;
    b: number;
  };
};

export type SwitchDevice = BaseDevice & {
  type: "switch";
  isOn: boolean;
  amperage: number;
};

export type LockDevice = BaseDevice & {
  type: "lock";
  locked: boolean;
  battery: number;
};

export type ThermostatDevice = BaseDevice & {
  type: "thermostat";
  currentTemp: number;
  targetTemp: number;
  mode: "heat" | "cool" | "auto" | "off";
};

export type Device = LightDevice | SwitchDevice | LockDevice | ThermostatDevice;

export type Scene = {
  id: string;
  name: string;
  description: string;
  actions: Array<{
    deviceId: string;
    type: DeviceType;
    payload: Record<string, unknown>;
  }>;
};
