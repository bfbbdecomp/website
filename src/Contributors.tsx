import {
  Accordion,
  Avatar,
  Grid,
  Tooltip,
  Text,
  Group,
  Container,
  Anchor,
  Stack,
  Badge,
} from "@mantine/core";
import { IconCalendarEvent, IconCheck, IconGitFork } from "@tabler/icons-react";
import { PERCENT_PUSHES } from "./percent_push";

export function Contributors() {
  const pushes = PERCENT_PUSHES;
  // open the latest milestone
  const open = PERCENT_PUSHES.at(-1)!.milestone;

  return (
    <Container id="main" size={"lg"}>
      <Accordion defaultValue={String(open)} variant="contained">
        {pushes
          // sort milestones by percentage, top being most recent
          .toSorted((a, b) => b.milestone - a.milestone)
          .map((push) => (
            <Accordion.Item key={push.milestone} value={String(push.milestone)}>
              <Accordion.Control
                style={{ borderLeft: `8px solid ${push.bg_color}` }}
              >
                <Group>
                  <IconGitFork size={18} />
                  <Text>{push.milestone}% Milestone</Text>
                  <Text size="xs" color="dimmed">
                    {push.contributors.length} contributors
                  </Text>
                </Group>
                <Group gap={"sm"} align="center">
                  <IconCalendarEvent size={16} stroke={1.5} color="gray" />
                  <Text
                    size="xs"
                    color="dimmed"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Reached {push.date_reached.toDateString()}
                  </Text>
                  <IconCheck size={16} stroke={2} color="green" />
                </Group>
              </Accordion.Control>

              <Accordion.Panel>
                <Stack>
                  <Grid>
                    {push.contributors
                      .sort((a, b) =>
                        a.github_username.localeCompare(b.github_username)
                      )
                      .map((c) => {
                        const avatar_src =
                          "bfbb/contributors/" + c.github_username + ".png";

                        return (
                          <Grid.Col key={c.github_username} span="content">
                            <Tooltip label={c.github_username}>
                              <Anchor
                                href={"https://github.com/" + c.github_username}
                                target={"_blank"}
                              >
                                <Avatar
                                  src={avatar_src}
                                  size={"lg"}
                                  alt={c.github_username}
                                  radius="xl"
                                />
                              </Anchor>
                            </Tooltip>
                          </Grid.Col>
                        );
                      })}
                  </Grid>
                  <Tooltip label="Special Discord Role">
                    <Badge color={push.bg_color} autoContrast>
                      Percent Push Contributor - {push.milestone}%
                    </Badge>
                  </Tooltip>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
      </Accordion>
    </Container>
  );
}
