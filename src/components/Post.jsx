import React from "react";

const Post = ({ title, body }) => {
  return (
    <div>
      <div className="bg-white p-6 rounded-md shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default Post;
