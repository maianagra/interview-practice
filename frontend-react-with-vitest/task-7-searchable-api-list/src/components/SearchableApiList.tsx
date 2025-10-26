import { useEffect, useState } from "react";
import Post from "./Post";
import SearchPosts from "./SearchPosts";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function SearchableApiList() {
  const [posts, setPosts] = useState<Post[]>();
  const [filteredPosts, setFilteredPosts] = useState<Post[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10"
        );
        const data = await response.json();

        setPosts(data);
        setFilteredPosts(data)
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  function onInputChange(value: string) {
    setInput(value);

    setFilteredPosts(
      posts?.filter(
        (post) =>
          post.body.toLowerCase().includes(value.toLowerCase()) ||
          post.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  return (
    <>
      {loading ? (
        <>loading ...</>
      ) : (
        <>
          {posts?.length ? (
            <div>
                <SearchPosts value={input} onChangeAction={onInputChange}/>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                }}
              >
                {filteredPosts?.map((post) => (
                  <Post key={post.id} title={post.title} body={post.body} />
                ))}
              </div>
            </div>
          ) : (
            <>No posts to show</>
          )}
          {error && <div data-testid="error">{error}</div>}
        </>
      )}
    </>
  );
}

export default SearchableApiList;
