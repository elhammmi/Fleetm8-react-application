import React from "react";

const Comment = ({ name, body, email }) => {
  return (
    <div className="bg-slate-100 p-2 mt-2">
      <p>
        User <span className="font-semibold">{name}</span> says:
      </p>
      <p>{body}</p>
      <p>email-address: {email}</p>
    </div>
  );
};

export default Comment;
