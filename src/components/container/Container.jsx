import React from "react";

function Container({ children, width = "max-w-6xl" }) {
  return <div className={`mx-auto ${width}`}>{children}</div>;
}

export default Container;
