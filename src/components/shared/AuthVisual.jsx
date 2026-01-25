import Logo_IMG from "../../images/logo_lg.svg";
import KEY_VISUAL from "../../images/key-visual.svg";

const AuthVisual = () => {
  return (
    <div className="pt-12 lg:pt-0">
      <div className="flex justify-center items-center">
        <img
          className="h-10 aspect-square"
          src={Logo_IMG}
          alt="logo"
        />
        <h1 className="font-sub font-bold text-text-main text-[32px]">
          ONLINE TODO LIST
        </h1>
      </div>
      <div className="hidden w-full max-w-96.5 aspect-square lg:block lg:pt-3.75">
        <img
          src={KEY_VISUAL}
          alt="主視覺"
          className="w-full aspect-square object-contain"
        />
      </div>
    </div>
  );
};

export default AuthVisual;
