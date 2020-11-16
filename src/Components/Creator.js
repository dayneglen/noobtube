import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { v4 as randomString } from 'uuid';
import { GridLoader } from 'react-spinners';
import '../Styles/creator.scss'

const Creator = props => {

  const [isUploading, setIsLoading] = useState(false),
    [url, setUrl] = useState(''),
    [title, setTitle] = useState(''),
    [description, setDescription] = useState('')

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

  const uploadFile = async (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type,
      },
    };
    try {
      const uploadVideo = await axios.put(signedRequest, file, options);
      const addingVideo = await axios.post('/api/video', { userId: user.user_id, title, description, video_url: url });
      setIsLoading(false);
      console.log('video uploaded');
    }
    catch (err) {
      setIsLoading(false)
      if (err.response.status === 403) {
        alert(
          `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
        );
      } else {
        alert(`ERROR: ${err.status}\n ${err.stack}`);
      }
    }

    // axios
    //   .put(signedRequest, file, options)
    //   .then((response) => {
    //     setIsLoading(false);
    //     axios.post('/api/video', {})
    //   })
    //   .catch((err) => {
    //     setIsLoading(false)
    //     if (err.response.status === 403) {
    //       alert(
    //         `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${err.stack}`
    //       );
    //     } else {
    //       alert(`ERROR: ${err.status}\n ${err.stack}`);
    //     }
    //   });
  };

  const user = useSelector(state => state.user)

  useEffect(() => {
    if (!user.email) {
      props.history.push('/')
    }
  }, [user, props.history])


  return (
    <div className="creator-page">
      <div className='dropzone'>
        <div className='creator-box'>
          <input className='Set2' placeholder='Video Title' value={title} onChange={e => setTitle(e.target.value)} />
          <button className='Set'>Set</button>
          <input id='description' placeholder='Video Description' value={description} onChange={e => setDescription(e.target.value)} />
          <button id='description2' className='Set'>Set</button>
          <div className='warning'>You must add a title and description before uploading a video</div>
          <Dropzone
            onDropAccepted={getSignedRequest}
            accept="video/*"
            multiple={false}
            disabled={description && title ? false : true}
          >
            {({ getRootProps, getInputProps }) => (
              <div className='box'
                style={{
                  position: "relative",
                  alignItems: "center",
                  width: 125,
                  height: 125,
                  borderWidth: 3.5,
                  marginTop: 0,
                  borderColor: "black",
                  borderStyle: "dashed",
                  borderRadius: 5,
                  display: "inline-block",
                  fontSize: 18,
                }}
                {...getRootProps()}
              >
                <input id='drop-input' {...getInputProps()} />
                {isUploading ? (
                  <GridLoader />
                ) : (
                    <p>Drop files here, or click to select files</p>
                  )}
                <p id='info'>Click in the box above to upload a video</p>
              </div>
            )}
          </Dropzone>
          <div id='tags'>
            <input placeholder='tags' />
          </div>
        </div>
      </div>
    </div>
  );
}
export default (Creator);