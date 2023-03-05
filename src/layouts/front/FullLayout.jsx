
import React, { useEffect } from "react";
import {Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function FullLayout(props) {

        return(
          <div>
            <div className="wrapper" >
                <div  id="content">
                  <Navbar />
                  <div className="container p-10">
                        <Outlet />
                  </div>
                </div>
            </div>
        </div>
      )
 
}

export default FullLayout;
