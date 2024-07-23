import commits from "../json/commits.json";
import users from "../json/users.json";

type CommitRaw = (typeof commits)[number];

type Commit = Omit<CommitRaw, "differences">;

export type User = {
  name: string;
  commits: Commit[];
};

export const Users: User[] = users.map((u) => ({
  name: u.github,
  commits: commits.filter((x) => u.emails.includes(x.email)),
}));
