import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="pb-4 p-4">
        <div className="flex text-center">
          <div className="flex flex-col justify-center">
            <Avatar name={authorName} />
          </div>
          <div className="font px-2 font-light flex justify-center flex-col text-sm">
            {authorName}
          </div>
          <div className="text-[14px] text-gray-600 text-top font-extrabold">
            .
          </div>
          <div className="flex justify-center flex-col text-sm font-extralight pl-2 text-slate-400">
            {publishedDate}
          </div>
        </div>

        <div className="text-xl font-bold text-gray-950 pt-2">{title}</div>

        <div className="font-thin pt-2">{content.slice(0, 100)}...</div>

        <div className="text-gray-500 pt-4">{`${Math.ceil(
          content.length / 100
        )} minutes`}</div>

        <div className="bg-slate-500 mt-2 w-full min-h-[0.5px]"></div>
      </div>
    </Link>
  );
};

export default BlogCard;
