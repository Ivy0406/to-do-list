const AuthVisual = () => {
  return (
    <div className="pt-12 lg:pt-0">
      <div className="flex justify-center items-center">
        <img
          className="h-10 aspect-square"
          src="/src/images/logo_lg.svg"
          alt="logo"
        />
        <h1 className="font-sub font-bold text-text-main text-[32px]">
          ONLINE TODO LIST
        </h1>
      </div>
      <div className="hidden w-full max-w-96.5 aspect-square lg:block lg:pt-3.75">
        <img
          src="/src/images/key-visual.svg"
          alt="主視覺"
          className="w-full aspect-square object-contain"
        />
      </div>
    </div>
  );
};

export default AuthVisual;
