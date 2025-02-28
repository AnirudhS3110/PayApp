import React from "react";

export const Container: React.FC = ({ children }) => {
    return <div className="bg-cyello mx-auto  pt-[10px] drop-shadow-[50px] h-auto w-[43vh] border-[2px] px-[20px] rounded-[10px] content-center  ">{children}</div>;
  };