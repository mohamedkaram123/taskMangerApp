import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";

const LoaderBottom = () => (
  <div className="">
    <div className="d-flex flex-row justify-content-center align-items-center">
      <Spinner style={{color:"#4f46e5" }} />
    </div>
  </div>
);
export default LoaderBottom;
