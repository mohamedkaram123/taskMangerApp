import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function DropImage({type,getImage,imageData=""}) {
    const [image, setImage] = useState(imageData)
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      setImage(base64String);
      let e = {target:{value:`data:image/jpeg;base64,${base64String}` }}
      let imageData = ""
      getImage(type,e)
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop,
  });

const handleRemoveImage = ()=>{
  setImage(null)
}
  
  return (
    <div className='d-flex flex-column'>
    <span style={{ cursor:"pointer" }} onClick={handleRemoveImage}><i  className="bi bi-x-lg"></i></span>
        <div className='d-flex flex-row justify-content-center' style={{ 
          border:"1px solid #eee" ,
          backgroundColor:"#eee",
          borderRadius:5}} {...getRootProps()}>
        <input {...getInputProps()} />
        
        {image? <img style={{ width:100,height:100 }} src={imageData != ""?imageData:`data:image/jpg;base64,${image}`} alt="Uploaded" />:<i style={{ fontSize:64 }} className="bi bi-card-image"></i>}
      </div>
    </div>
 
  );
}

export default DropImage;
