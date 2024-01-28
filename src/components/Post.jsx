const Post = ({ title, body }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>{body}</p>
    </div>
  );
};

export default Post;
