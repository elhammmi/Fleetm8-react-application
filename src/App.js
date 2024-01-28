import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import { Comment } from "postcss";
import Post from "./components/Post";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
