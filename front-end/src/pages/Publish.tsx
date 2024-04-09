import { ChangeEvent, useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../config";
const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    if (response.status === 201) {
      navigate(`/blog/${response.data.blog.id}`);
    } else {
      console.log("Error");
    }
  };

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="w-full max-w-screen-lg pt-10">
          <textarea
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="message"
            className="p-2 w-full max-h-14 text-3xl text-black font-serif align-center rounded-lg border border-gray-300 focus:outline-none"
            placeholder="Title"
          ></textarea>
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />

          <button
            type="submit"
            className="items-center px-5 mt-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
            onClick={handleSubmit}
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <>
      <form>
        <div className="w-full mt-4  rounded-lg border border-gray-300">
          <div className="   bg-white rounded-b-lg">
            <textarea
              onChange={onChange}
              id="editor"
              rows={10}
              className="block w-full text-md font-serif pt-4 text-gray-800  p-2.5 focus:outline-none"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </form>
    </>
  );
};
export default Publish;
