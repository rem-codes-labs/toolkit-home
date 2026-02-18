import { Device, Scene } from "../models/devices";

export const devices: Device[] = [
  {
    id: "light-aurora",
    name: "Aurora Lamp",
    type: "light",
    room: "Living Room",
    online: true,
    firmware: "1.4.2",
    supportsColor: true,
    brightness: 72,
    color: { r: 255, g: 190, b: 90 },
  },
  {
    id: "switch-kitchen",
    name: "Kitchen Switch",
    type: "switch",
    room: "Kitchen",
    online: true,
    firmware: "2.1.0",
    isOn: false,
    amperage: 1.4,
  },
  {
    id: "lock-front",
    name: "Front Door Lock",
    type: "lock",
    room: "Entry",
    online: false,
    firmware: "3.0.8",
    locked: true,
    battery: 68,
  },
  {
    id: "thermo-main",
    name: "Main Thermostat",
    type: "thermostat",
    room: "Hallway",
    online: true,
    firmware: "5.2.1",
    currentTemp: 21.2,
    targetTemp: 22.5,
    mode: "auto",
  },
  {
    id: "light-hall",
    name: "Hall Sconce",
    type: "light",
    room: "Hallway",
    online: true,
    firmware: "1.2.0",
    supportsColor: false,
    brightness: 45,
  },
];

export const scenes: Scene[] = [
  {
    id: "scene-evening",
    name: "Evening Wind-down",
    description: "Dim lights, lock doors, and set the thermostat for night.",
    actions: [
      { deviceId: "light-aurora", type: "light", payload: { brightness: 40 } },
      { deviceId: "lock-front", type: "lock", payload: { locked: true } },
      { deviceId: "thermo-main", type: "thermostat", payload: { targetTemp: 20 } },
    ],
  },
  {
    id: "scene-away",
    name: "Away Mode",
    description: "Turn off switches and set eco temperature.",
    actions: [
      { deviceId: "switch-kitchen", type: "switch", payload: { isOn: false } },
      { deviceId: "thermo-main", type: "thermostat", payload: { targetTemp: 18 } },
    ],
  },
];
