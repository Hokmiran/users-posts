import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "reactstrap";

function Posts({ selectedUser }) {
  const [posts, setPosts] = useState({
    loading: true,
    data: undefined,
    error: undefined,
  });

  useEffect(() => {
    setPosts((prev) => ({
      ...prev,
      loading: true,
      data: undefined,
      error: undefined,
    }));
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(({ data }) =>
        setPosts((prev) => ({
          ...prev,
          loading: false,
          data,
          error: undefined,
        }))
      )
      .catch((err) => {
        setPosts({
          loading: false,
          data: undefined,
          error: err.message,
        });
      });
  }, []);

  const filteredPosts = posts.data?.filter((item) => {
    if (selectedUser !== 0) {
      return item.userId === selectedUser;
    }
    return posts.data;
  });

  return (
    <>
      {posts.error && "Posts not found"}
      {posts.loading && "Loading"}
      {posts.data && (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Ttile</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts &&
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <th>{post.id}</th>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default Posts;