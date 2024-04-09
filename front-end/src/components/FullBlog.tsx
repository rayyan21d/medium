import AppBar from "./AppBar";
import { Blog } from "../hooks";
import Avatar from "./Avatar";
const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-12">
        <div className="h-screen w-full  grid grid-cols-12 px-10 max-w-screen-xl">
          <div className="col-span-8 ">
            <div className="text-4xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-4">Posted on 2nd Dec 2023 </div>
            <div>{blog.content}</div>
          </div>
          <div className="col-span-4 ">
            <div className="text-md font-semibold text-slate-800">Author</div>

            <div className="flex ">
              <div className="mt-8">
                <Avatar name={blog.author?.name || "Anonymous"} size="big" />
              </div>
              <div className="flex flex-col text-left pl-5">
                <div className=" my-3 font-bold text-lg">
                  {blog.author?.name || "Anonymous"}
                </div>

                <div className="text-slate-500 text-sm font-medium">
                  Random ability of author to catch user's attention.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
