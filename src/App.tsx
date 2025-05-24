import {
  AppShell,
  Group,
  Indicator,
  NavLink,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { RouteSwitcher } from "./RouteSwitcher";
import {
  IconBrandDiscord,
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconGitCherryPick,
} from "@tabler/icons-react";
import { PERCENT_PUSHES } from "./percent_push";

function App() {
  const navigate = useNavigate();

  const push = PERCENT_PUSHES.at(-1)!;

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group ml="xl" gap={"lg"}>
              <UnstyledButton onClick={() => navigate("/about")}>
                About
              </UnstyledButton>
              <UnstyledButton onClick={() => navigate("/")}>
                Progress
              </UnstyledButton>
              <UnstyledButton onClick={() => navigate("/functions")}>
                Functions
              </UnstyledButton>
              <UnstyledButton onClick={() => navigate("/contributors")}>
                <Indicator
                  autoContrast
                  color={push.bg_color}
                  inline
                  label={push.milestone + "%!"}
                  size={16}
                >
                  Contributors
                </Indicator>
              </UnstyledButton>
              {/*
              <UnstyledButton onClick={() => navigate("/contributors")}>
                Contributors
              </UnstyledButton>
              */}
            </Group>
            <Group gap={"lg"}>
              <Tooltip label="Source Code on GitHub">
                <UnstyledButton
                  component="a"
                  target={"_blank"}
                  href="https://github.com/bfbbdecomp/bfbb"
                >
                  <IconBrandGithubFilled size={"1.5rem"} stroke={1.5} />
                </UnstyledButton>
              </Tooltip>
              <Tooltip label="Join us on Discord">
                <UnstyledButton
                  component="a"
                  target={"_blank"}
                  href="https://discord.gg/dVbGFdYU6A"
                >
                  <IconBrandDiscordFilled size={"1.5rem"} stroke={1.5} />
                </UnstyledButton>
              </Tooltip>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <RouteSwitcher />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
