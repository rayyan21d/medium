import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import { useParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import { BigSkeleton } from "../components/Skeleton";

const Blog = () => {
  const { id } = useParams();
  console.log(useParams());

  const { loading, blog } = useBlog({ id: id || "cluqvydux00049csxyuxubimg" });

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className=" flex justify-center ">
          <div className="w-screen max-w-6xl">
            <BigSkeleton />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <FullBlog blog={blog} />
      </div>
    );
  }
};

export default Blog;
