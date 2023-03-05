import React from 'react';

import { Button } from 'react-bootstrap';

const NotFoundData = ({ message, onRefresh=false }) => {
  return (
    <div className={`flex flex-col items-center justify-center my-20 h-full space-y-6`}>
     
      <i style={{ color:"#e24724",fontSize:100 }} className=" las la-exclamation-triangle "></i>

      <p className={`text-gray-500 text-100 text-3xl`}>{message}</p>
      
      {onRefresh?<Button onClick={onRefresh} className="text-indigo-600" >
        Refresh
      </Button>:null}
    </div>
  );
};

export default NotFoundData;
