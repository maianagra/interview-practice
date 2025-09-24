type UserRowProps = {
  name: string;
  email: string;
  active: boolean;
  onActiveChange: any;
};

function UserRow({ name, email, active, onActiveChange }: UserRowProps) {
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <input
        role="checkbox"
          type="checkbox"
          checked={active}
          onChange={onActiveChange}
        ></input>
      </td>
    </tr>
  );
}

export default UserRow;
