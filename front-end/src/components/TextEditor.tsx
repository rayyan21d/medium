const TextEditor = () => {
  return (
    <>
      <form>
        <div className="w-full rounded-lg bg-black">
          <div className="mx-2 mt-4 py-2 bg-white rounded-b-lg">
            <textarea
              id="editor"
              rows={8}
              className="block w-full text-sm text-gray-800 bg-white  "
              placeholder="Write an article..."
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg "
          >
            Publish post
          </button>
        </div>
      </form>
    </>
  );
};

export default TextEditor;
