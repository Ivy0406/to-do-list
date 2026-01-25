import KEY_VISUAL_EMPTY from "../../images/key-visual-empty.svg";

const Empty = () => {
  return (
    <div className="flex flex-col items-center gap-4 mt-11">
      <p className="text-text-main font-normal">目前尚無待辦事項</p>
      <div><img src={KEY_VISUAL_EMPTY} alt="無待辦事項" /></div>
    </div>
  );
};

export default Empty;
