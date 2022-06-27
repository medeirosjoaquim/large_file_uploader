import React, { useState } from 'react';
import * as UpChunk from '@mux/upchunk';

function Page() {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUpload = async (inputRef) => {
    try {
      const response = await fetch('/api/upload', { method: 'POST' });
      const url = await response.text();
    
      const upload = UpChunk.createUpload({
        endpoint: url, // Authenticated url
        file: inputRef.files[0], // File object with your video file’s properties
        chunkSize: 500, //
      });
    
      // Subscribe to events
      upload.on('error', error => {
        setStatusMessage(error.detail);
      });

      upload.on('progress', progress => {
        setProgress(progress.detail);
      });

      upload.on('success', () => {
        setStatusMessage("Wrap it up, we're done here. 👋");
      });
    } catch (error) {
      setErrorMessage(error);
    }
  }
  return (<div>works</div>)

  // return (
  //   <div className="page-container">
  //     <h1>File upload button</h1>
  //     <label htmlFor="file-picker">Select a video file:</label>
  //     <input type="file" onChange={(e) => handleUpload(e.target)}
  //       id="file-picker" name="file-picker"/ >

  //     <label htmlFor="upload-progress">Downloading progress:</label>
  //     <progress value={progress} max="100"/>
      
  //     <em>{JSON.stringify(statusMessage)}</em>
        
  //   </div>
  // );
}

export default Page;