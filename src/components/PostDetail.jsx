import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Post from "./Post";
import Comment from "./Comment";
import { CommentForm } from "./CommentForm";
import { Notification } from "./Notification";
import useWebSocket from "react-use-websocket";

const PostDetail = (props) => {
  const WS_URL = "wss://echo.websocket.org/";
  const [isOpen, setIsOpen] = useState(false);
  const [postData, setPostData] = useState();
  const [comments, setComments] = useState();
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.description) {
      setNotificationMessage(lastJsonMessage.description);
      setShowNotification(true);
    }
  }, [lastJsonMessage]);

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
  };

  useEffect(() => {
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
    fetchCommentsData();
  }, [id]);

  return (
    <>
      <div className="bg-white p-6 rounded-md shadow-md mb-4">
        {showNotification && (
          <Notification
            message={notificationMessage}
            onClose={() => setShowNotification(false)}
            closeAfter={2000}
          />
        )}
        {!!postData && <Post title={postData.title} body={postData.body} />}
        <button
          className="rounded px-4 py-2 bg-blue-300 hover:bg-blue-300 duration-300 mt-2"
          onClick={handleChange}
        >
          Show comments
        </button>

        {isOpen && (
          <CommentForm
            setComments={setComments}
            comments={comments}
            postId={id}
            sendJsonMessage={sendJsonMessage}
          />
        )}
        {isOpen &&
          comments &&
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
