const Skeleton = () => {
  return (
    <div className="max-w-screen animate-pulse">
      <div className="pb-4 p-4 mt-3 mb-3">
        <div className="flex ">
          <div className="h-6 w-6 bg-gray-200 rounded-full mb-4"></div>

          <div className=" mx-5 ">
            <div className="text-[14px] text-gray-600 text-top font-extrabold"></div>
          </div>

          <div className="flex justify-center flex-col ">
            <div className="text-[14px] text-gray-600 text-top font-extrabold"></div>
          </div>
        </div>

        <div className="text-xl font-bold text-gray-950 pt-2">
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        </div>

        <div className="font-thin pt-2">
          <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div>

        <div className="text-gray-500 pt-4">
          <div className="text-[14px] text-gray-600 text-top font-extrabold"></div>
        </div>

        <div className="bg-slate-500 mt-2 w-full min-h-[0.5px]"></div>
      </div>
    </div>
  );
};

export const BigSkeleton = () => {
  return (
    <div className="max-w-screen animate-pulse">
      <div className="pb-4 p-4 mt-12 mb-3">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5 mt-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-2.5"></div>

        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mt-2.5 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>

        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5 mt-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mt-2.5"></div>

        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mt-2.5 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>

        <div className="bg-slate-500 mt-10 w-full min-h-[0.5px]"></div>
      </div>
    </div>
  );
};

export default Skeleton;
