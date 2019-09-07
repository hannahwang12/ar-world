import React from 'react';
import axios from 'axios';
import AWS from "aws-sdk";
import { Steps, Upload, Icon } from 'antd';
import './UploadContainer.css';

const { Step } = Steps;

const { Dragger } = Upload;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class UploadPage extends React.Component {
  handleImageUpload = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }, () => {
          console.log(this.state.imageUrl)
        }),
      );
    }
  };

  render() {
    return (
      <div className="upload-container">
        <h1>Upload</h1>
        <Steps>
          <Step
            title="Upload Image"
            description={
              <Dragger
                name="file"
                onChange={this.handleImageUpload}
                action="http://localhost:3001/imageToMongo"
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
              </Dragger>
            }
          />
          <Step
            title="Upload Video"
            description={
              <form id="uploadbanner" enctype="multipart/form-data" method="post" action="http://localhost:3001/videoToS3">
                <input id="fileupload" name="video" type="file" />
                <input type="submit" value="submit" id="submit" />
              </form>
            }
            />
          <Step
            title="Submit"
          />
        </Steps>      
      </div>
    );
  }
};
