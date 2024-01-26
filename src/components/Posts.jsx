import React, { useEffect, useState } from "react";
import Post from "./Post";

const Posts = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          return new Error("Network response was not ok");
        }
        const result = await response.json();
        setPost(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [posts]);
  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

export default Posts;
