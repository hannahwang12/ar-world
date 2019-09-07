import React from 'react';
import { Steps, Icon } from 'antd';
import './UploadContainer.css';

const { Step } = Steps;

export default class UploadPage extends React.Component {
  render() {
    return (
      <div className="upload-container">
        <h1>Upload</h1>
        <iframe name="hiddenFrame" width="0" height="0" border="0" style={{display: "none"}}></iframe>
        <form id="upload" encType="multipart/form-data" method="post" action="http://localhost:3001/upload" target="hiddenFrame">
        <Steps>
          <Step
            title="Upload Image"
            description={
              <input id="image-upload" name="image" type="file" />
            }
          />
          <Step
            title="Upload Video"
            description={
              <input id="video-upload" name="video" type="file" />
            }
            />
          <Step
            title="Submit"
            description={
              <input type="submit" value="submit" id="submit" />
            }
          />
        </Steps>     
        </form> 
      </div>
    );
  }
};
