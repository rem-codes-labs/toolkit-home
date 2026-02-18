# Toolkit Home

Initial web app skeleton for Toolkit Home. Includes device models, onboarding flow, Internet Identity auth stub, HomeKit integration stub, and cloud API contract placeholders.

## Development
```bash
npm install
npm run dev
```

## Internet Identity
- `src/auth/internetIdentity.ts` uses `@dfinity/auth-client` to sign in.
- Configure your IC canister IDs and identity provider as needed.

## Device models
- `src/models/devices.ts` includes lights (RGB optional), switches, locks, and thermostats.
- Extend with device capabilities and firmware metadata as needed.

## Cloud control API contracts
Defined in `src/api/contracts.ts`:
- `listDevices()`
- `setDeviceState()` — on/off, brightness, RGB, lock, setpoint payloads
- `setScene()`
- `provisionDevice()` — for toolkit:// onboarding

## Onboarding flow
Phone-first flow uses a custom protocol:
```
toolkit://pair?device_id=LOCK-3921&room=Entry
```
Your mobile app should sign the request and forward metadata to the cloud.

## HomeKit stub
`src/integrations/homekit.ts` provides pairing state placeholders.

## Privacy & security notes
- All device commands should be authenticated via Internet Identity + JWT.
- Enforce per-user device ownership in canister logic.
- Encrypt telemetry at rest for sensitive sensors (locks, presence).
- Log access and provide audit exports for compliance.
