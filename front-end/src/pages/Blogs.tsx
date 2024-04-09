import BlogCard from "../components/BlogCard";
import AppBar from "../components/AppBar";
import { useBlogs } from "../hooks";
import Skeleton from "../components/Skeleton";

const Blog = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className=" flex justify-center ">
          <div className="w-screen max-w-2xl">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div className="max-w-2xl">
            <BlogCard
              authorName="Rayyan"
              title="How does one go from an ugly duckling to a beautiful swan within a span of one year  and 6 months?"
              content="Some content of the thing is init and here is what I can add. I wanna do great things in life"
              publishedDate="12AM"
            />

            {blogs.map((blog) => {
              return (
                <BlogCard
                  key={blog.id}
                  authorName={blog.author.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={blog.createdAt}
                  id={blog.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Blog;
