const Empty = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-text-main font-normal">目前尚無待辦事項</p>
      <div><img src="/src/images/key-visual-empty.svg" alt="無待辦事項" /></div>
    </div>
  );
};

export default Empty;
