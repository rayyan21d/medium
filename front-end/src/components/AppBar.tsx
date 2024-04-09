import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-2">
      <Link to={"/"} className="flex justify-center flex-col">
        <div>Medium</div>
      </Link>

      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 font-semibold rounded-full text-sm px-4 py-1 text-center mr-6 "
          >
            Publish
          </button>
        </Link>

        <Avatar name="Rayyan" size="big" />
      </div>
    </div>
  );
};

export default AppBar;
