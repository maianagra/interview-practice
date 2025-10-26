type SearchPostsProps = {
  value: string;
  onChangeAction: any;
};

function SearchPosts({ value, onChangeAction }: SearchPostsProps) {
  return (
    <input
      role="search"
      value={value}
      onChange={(e) => onChangeAction(e.target.value)}
    ></input>
  );
}

export default SearchPosts;
