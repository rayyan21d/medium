const Quote = () => {
  return (
    <div className="bg-gray-300 h-screen flex justify-center flex-col px-10">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="w-full max-w-lg text-2xl font-bold">
            "The Customer service I recieved was exceptional. The support team
            went above and beyond to address my concerns."
          </div>

          <div className="max-w-sm  text-start text-xl font-semibold mt-5">
            Jules Winnfield
          </div>
          <div className="max-w-sm  text-start  text-slate-500 ">
            CEO, Acme Inc
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
