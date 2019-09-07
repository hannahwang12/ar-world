import React from 'react';
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
  handleChange = info => {
    console.log("change")
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
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
                onChange={this.handleChange}
                action="localhost:4001"
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
                onChange={this.handleChange}
                action="localhost:4001"
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
