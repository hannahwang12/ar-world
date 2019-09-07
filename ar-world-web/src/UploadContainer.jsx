import React from 'react';
import { Steps, Upload, Icon } from 'antd';
import axios from 'axios';
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
      getBase64(info.file.originFileObj, image => {
        axios.post("http://localhost:3001/imageToMongo", { image })
          .then(() => {
            this.setState({
              image,
              loading: false,
            });
            console.log(this.state.image)
          })
      });
    }
  };

  handleVideoUpload = info => {
    console.log("video")
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
              <Dragger
                name="file"
                onChange={this.handleVideoUpload}
                action="http://localhost:3001/videoToS3"
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
              </Dragger>
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
