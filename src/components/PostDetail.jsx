import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Post from "./Post";
import Comment from "./Comment";

const PostDetail = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState();
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!response.ok) {
          return new Error("Network response was not ok");
        }
        const result = await response.json();
        setPostData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPostData();
  }, [id]);
  const handleChange = () => {
    setIsOpen((isOpen) => !isOpen);
    fetchCommentsData();
  };
  const fetchCommentsData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${id}`
      );
      if (!response.ok) {
        return new Error("Network response was not ok");
      }
      const result = await response.json();
      setComments(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-md shadow-md mb-4">
        {!!postData && <Post title={postData.title} body={postData.body} />}
        <button
          class="rounded-lg px-4 py-2 bg-green-300 hover:bg-green-400 duration-300 mt-2"
          onClick={handleChange}
        >
          Show comments
        </button>
        {isOpen &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              name={comment.name}
              body={comment.body}
              email={comment.email}
            />
          ))}
      </div>
    </>
  );
};

export default PostDetail;
