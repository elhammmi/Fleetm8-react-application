import { BrowserRouter, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="posts/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
