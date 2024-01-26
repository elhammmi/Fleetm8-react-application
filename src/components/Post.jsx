import React, { useState } from "react";
import Comment from "./Comment";

const Post = ({ title, body, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const handleChange = () => {
    setIsOpen((isOpen) => !isOpen);
    fetchData();
  };

  const fetchData = async () => {
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
    <div>
      <div className="bg-white p-6 rounded-md shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p>{body}</p>
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
    </div>
  );
};

export default Post;
