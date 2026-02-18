import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMemo, useState } from "react";
import { Link as RouterLink, Route, Routes } from "react-router-dom";
import { devices, scenes } from "./data/devices";
import { mockCloud } from "./api/mockCloud";
import { homeKitStatus } from "./integrations/homekit";
import { useInternetIdentity } from "./auth/useInternetIdentity";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "Devices", to: "/devices" },
  { label: "Scenes", to: "/scenes" },
  { label: "Onboarding", to: "/onboarding" },
  { label: "Security", to: "/security" },
];

const onboardingSteps = ["Connect device", "Name", "Assign room", "Done"];

function Layout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, principal, login, logout, loading } = useInternetIdentity();

  const drawer = useMemo(
    () => (
      <Box sx={{ p: 3 }} role="presentation" onClick={() => setDrawerOpen(false)}>
        <Stack spacing={2}>
          {navItems.map((item) => (
            <Link key={item.label} component={RouterLink} to={item.to} underline="none">
              <Typography variant="h6">{item.label}</Typography>
            </Link>
          ))}
        </Stack>
      </Box>
    ),
    []
  );

  return (
    <Box>
      <AppBar position="sticky" elevation={0} sx={{ background: "#fff" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography component={RouterLink} to="/" variant="h6" sx={{ fontWeight: 700 }}>
            Toolkit Home
          </Typography>
          <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems.map((item) => (
              <Link key={item.label} component={RouterLink} to={item.to} underline="none">
                <Typography variant="body1">{item.label}</Typography>
              </Link>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            {!loading && isAuthenticated && principal && (
              <Chip label={`Principal: ${principal.slice(0, 10)}…`} />
            )}
            {!loading && isAuthenticated ? (
              <Button variant="outlined" onClick={logout}>
                Sign out
              </Button>
            ) : (
              <Button variant="contained" onClick={login}>
                Sign in
              </Button>
            )}
            <IconButton
              aria-label="open navigation"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawer}
      </Drawer>
      {children}
      <Divider />
      <Box sx={{ background: "#fff", py: 4 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between">
            <Box>
              <Typography variant="h6" gutterBottom>
                Toolkit Home
              </Typography>
              <Typography variant="body2">
                Secure smart home control with Internet Identity and device-first privacy.
              </Typography>
            </Box>
            <Stack direction="row" spacing={3} sx={{ flexWrap: "wrap" }}>
              {navItems.map((item) => (
                <Link key={item.label} component={RouterLink} to={item.to} underline="hover">
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

function DashboardPage() {
  const { isAuthenticated, principal, login, error, loading } = useInternetIdentity();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={5}>
        <Box>
          <Typography variant="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700 }}>
            Control lights, switches, locks, and thermostats with Internet Identity sign-in and
            future HomeKit pairing.
          </Typography>
          {!loading && !isAuthenticated && (
            <Stack spacing={1} sx={{ mt: 3 }}>
              <Button variant="contained" onClick={login}>
                Sign in with Internet Identity
              </Button>
              <Typography variant="caption" color="text.secondary">
                No password required. Uses DFINITY Internet Identity.
              </Typography>
              {error && (
                <Typography variant="caption" color="error" role="alert" aria-live="polite">
                  {error}
                </Typography>
              )}
            </Stack>
          )}
          {!loading && isAuthenticated && principal && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Signed in as {principal}
            </Typography>
          )}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Devices online" />
              <CardContent>
                <Typography variant="h2">{devices.filter((item) => item.online).length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Live status across rooms and zones.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Scenes" />
              <CardContent>
                <Typography variant="h2">{scenes.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Automations ready for nightly routines.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="HomeKit status" />
              <CardContent>
                <Typography variant="h3">{homeKitStatus.paired ? "Paired" : "Not paired"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {homeKitStatus.notes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card sx={{ p: 3 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2">Add device</Typography>
              <Typography variant="body2" color="text.secondary">
                Launch the phone-first onboarding flow to pair a new device.
              </Typography>
            </Box>
            <Button variant="contained" component={RouterLink} to="/onboarding">
              Start onboarding
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

function DevicesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3}>
        <Typography variant="h2">Devices</Typography>
        <Grid container spacing={3}>
          {devices.map((device) => (
            <Grid item xs={12} md={4} key={device.id}>
              <Card sx={{ height: "100%" }}>
                <CardHeader
                  title={device.name}
                  subheader={`${device.room} · ${device.type}`}
                  action={<Chip label={device.online ? "Online" : "Offline"} color="primary" />}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Firmware {device.firmware}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {device.type === "light" && (
                      <Typography>
                        Brightness: {device.brightness}%
                        {device.supportsColor ? " · RGB enabled" : ""}
                      </Typography>
                    )}
                    {device.type === "switch" && (
                      <Typography>Switch: {device.isOn ? "On" : "Off"}</Typography>
                    )}
                    {device.type === "lock" && (
                      <Typography>
                        Lock: {device.locked ? "Locked" : "Unlocked"} · Battery {device.battery}%
                      </Typography>
                    )}
                    {device.type === "thermostat" && (
                      <Typography>
                        {device.currentTemp}°C now · Target {device.targetTemp}°C · {device.mode}
                      </Typography>
                    )}
                  </Box>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        mockCloud.setDeviceState({ deviceId: device.id, type: device.type, payload: {} })
                      }
                    >
                      Toggle
                    </Button>
                    <Button variant="text">Details</Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

function ScenesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3}>
        <Typography variant="h2">Scenes</Typography>
        <Grid container spacing={3}>
          {scenes.map((scene) => (
            <Grid item xs={12} md={4} key={scene.id}>
              <Card>
                <CardHeader title={scene.name} subheader={scene.description} />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {scene.actions.length} actions
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => mockCloud.setScene({ sceneId: scene.id })}
                  >
                    Run scene
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}

function OnboardingPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3}>
        <Typography variant="h2">Mobile onboarding</Typography>
        <Typography variant="body1">
          Pair new devices with a phone-first flow using the toolkit:// protocol. The app sends
          metadata and certificates, then the cloud provisions the device record.
        </Typography>
        <Card>
          <CardContent>
            <Stepper activeStep={1} alternativeLabel>
              {onboardingSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Typography variant="h3">Step 1 — Connect device</Typography>
              <Typography variant="body2">
                Scan the QR code on the device or tap the NFC tag. This opens:
              </Typography>
              <Box
                component="pre"
                sx={{ background: "#f4f4f4", p: 2, borderRadius: 2, overflowX: "auto" }}
              >
                toolkit://pair?device_id=LOCK-3921&room=Entry
              </Box>
              <Typography variant="body2">
                Assign the room and choose a default scene. Unsupported devices can be added
                manually.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

function SecurityPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3}>
        <Typography variant="h2">Privacy & security</Typography>
        <Typography variant="body1">
          Toolkit Home stores device metadata and control history in your IC canister. Sensitive
          events are encrypted in transit (mTLS + JWT), and Internet Identity protects all sessions.
        </Typography>
        <Card>
          <CardContent>
            <Stack spacing={1.5}>
              <Typography variant="h3">Required API contracts</Typography>
              <Typography variant="body2">
                • POST /api/devices — list + update device states
              </Typography>
              <Typography variant="body2">• POST /api/scenes/run — trigger scenes</Typography>
              <Typography variant="body2">
                • POST /api/provision — handle toolkit:// onboarding requests
              </Typography>
              <Typography variant="body2">• GET /api/homekit/status — HomeKit pairing state</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/scenes" element={<ScenesPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/security" element={<SecurityPage />} />
      </Routes>
    </Layout>
  );
}
