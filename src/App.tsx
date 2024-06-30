import { AppShell, Group, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { RouteSwitcher } from "./RouteSwitcher";

function App() {
  const navigate = useNavigate();

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
