import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import {v4 as randomString } from 'uuid';
import { GridLoader } from 'react-spinners';
import '../Styles/creator.scss'

const Creator = props => {
  
  const [isUploading, setIsLoading] = useState(false),
        [url, setUrl] = useState('');

  const getSignedRequest = ([file]) => {
    setIsLoading(true);

    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    axios
      .get("/sign-s3", {
        params: {
          "file-name": fileName,
          "file-type": file.type,
        },
      })
      .then((response) => {
        const { signedRequest, url } = response.data;
        uploadFile(file, signedRequest, url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    
    console.log(file)
    axios
      .put(signedRequest, file, options)
      .then((response) => {
        setIsLoading(false);
        setUrl(url);
        console.log(response)
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.response.status === 403) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  
    return (
      <div className="creator-page">
        <Dropzone
          onDropAccepted={getSignedRequest}
          accept="video/*"
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              style={{
                position: "relative",
                width: 160,
                height: 80,
                borderWidth: 5,
                marginTop: 25,
                borderColor: "gray",
                borderStyle: "dashed",
                borderRadius: 5,
                display: "inline-block",
                fontSize: 17,
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <GridLoader />
              ) : (
                <p>Drop files here, or click to select files</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    );
  
}

export default (Creator);