import { Users } from "./commit";

export function Contributors() {
  const users = Users;

  return (
    <div>
      {users.map((x, id) => (
        <div key={id}>
          <div>{x.name}:</div>
          <div>{x.commits[0].id}</div>
        </div>
      ))}
    </div>
  );
}
