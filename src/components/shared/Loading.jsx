const Loading = () => {
  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-text-main"></div>
      <p className="text-text-main font-bold">載入中...</p>
    </div>
  );
};

export default Loading;
