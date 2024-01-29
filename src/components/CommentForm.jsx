import { useState } from "react";

export const CommentForm = ({
  setComments,
  comments,
  postId,
  sendJsonMessage,
}) => {
  const [newComment, setNewComment] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setComments([
      {
        postId: postId,
        name: "new user",
        body: newComment,
        email: "sth",
        id: 23,
      },
      ...comments,
    ]);
    setNewComment("");
    sendJsonMessage({ description: "The new comment added" });
  };

  return (
    <>
      <form className="mt-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter your comment"
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 rounded ml-1"
        >
          Submit
        </button>
      </form>
    </>
  );
};
