type UserFilterProps = {
  onChangeAction: any;
};

function UserFilter({ onChangeAction }: UserFilterProps) {
  return <input role="search" onChange={onChangeAction}></input>;
}

export default UserFilter