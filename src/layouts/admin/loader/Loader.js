import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";

const Loader = () => (
  <div className="">
    <div className="loading">
      <Spinner style={{color:"#4f46e5" }} />
    </div>
  </div>
);
export default Loader;
