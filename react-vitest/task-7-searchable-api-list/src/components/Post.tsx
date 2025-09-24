type PostProps = {
  title: string;
  body: string;
};

function Post({ title, body }: PostProps) {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      <div style={{fontWeight:"bold", fontSize:"18px"}}>{title}</div>
      <div>{body}</div>
    </div>
  );
}

export default Post
