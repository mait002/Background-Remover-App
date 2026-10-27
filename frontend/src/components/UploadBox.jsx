import React, { useState } from "react";
import ResultFile from "./ResultFile";


export default function UploadBox() {
  const [isUpload, setUpload] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [isDone, setDone] = useState(true);
  const [imageURL, setImageURL] = useState("");
  
  const [loading, setLoading] = useState(false)
  
  const [file, setFile] = useState({})

  
  

  

  function handleUpload(){
    setUpload(true)
    setDone(false)
    setSubmit(false)
  }

  function handleCancel(){
    setSubmit(false)
    
    setUpload(false)
  }

  function getFile(event){
    console.log(event.target.files)
    const file = event.target.files[0]

    if (!file){
      return;
    }

    setFile(file);
}
  async function handleSubmit() {
    
    setUpload(false);
    setSubmit(true);


    
    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

   

    try{
      const response = await fetch("http://localhost:8000/remove-bg", {
      method: "POST",
      body: formData,
    })

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setImageURL(url)

    } finally {
      setLoading(false)
      setDone(true)
    }
    

  }

  

  return (
    <>
    
      <div className="container">
        
        {!isUpload && isDone && !isSubmit && (
            <div className="upload-container">
                <h3>Upload image to remove background!</h3>
                <button onClick={handleUpload}>Upload</button>

            </div>
          
        )}

        {isUpload && !isDone && (
          <div className="file-submit-container">
            <input onChange={getFile} type="file" id="imageInput" />
            <button id="removeBtn" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}

        { 
            isSubmit && loading && 
            <div className="fileProcessing">
              <img className="userImage" src={URL.createObjectURL(file)} alt="user uploaded image" />
              <div className="scanLine"></div>
                <p>Removing Background...</p>
                <button onClick={handleCancel}>Cancel</button>

            </div>
            
        }

        {isSubmit && isDone && !loading && (
          <div className="output-display">
            <ResultFile imageURL={imageURL} />
            <button onClick={handleUpload}>Try with another image?</button>
          </div>
        )}
      </div>
    </>
  );
}
