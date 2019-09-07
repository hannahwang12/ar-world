import React from 'react';
import { Steps, Button } from 'antd';
import { Image, Film, Upload, Plus } from 'react-feather'
import './UploadContainer.css';

const { Step } = Steps;

export default class UploadPage extends React.Component {
  constructor() {
    super();
    this.state = {
      imageUpload: null,
      videoUpload: null,
      current: 0,
      submitted: false,
    };
  }

  onUploadFile = (id) => {
    const { value } = document.getElementById(id);
    if (value !== "") {
      const matches = value.match(/.*\\(.*\..*)/);
      if (matches.length >= 2) {
        this.setState({ [id]: matches[1] })
      }
    }

    const imageVal = document.getElementById('imageUpload').value;
    const videoVal = document.getElementById('videoUpload').value;
    if (imageVal !== "" && videoVal != "") this.setState({ current: 2 });
    else if (imageVal !== "") this.setState({ current: 1});
  }

  render() {
    return (
      <div className="upload-container">
        <iframe name="hiddenFrame" width="0" height="0" border="0" style={{display: "none"}}></iframe>
        <form id="upload" encType="multipart/form-data" method="post" action="http://localhost:3001/upload" target="hiddenFrame" onSubmit={() => this.setState({ submitted: true })}>
        <Steps current={this.state.current}>
          <Step
            title="Upload Image"
            description={
              <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
                <span className="ant-upload span" role="button" tabIndex="0">
                  <Image className="icon" />
                  <input id="imageUpload" className="upload-input" name="image" type="file" onChange={() => this.onUploadFile('imageUpload')} />
                  <label for="imageUpload">{this.state.imageUpload ? this.state.imageUpload : 'Upload'}</label>
                </span>
              </div>
            }
          />
          <Step
            title="Upload Video"
            description={
              <div className="ant-upload ant-upload-select ant-upload-select-picture-card">
                <span className="ant-upload span" role="button" tabIndex="0">
                  <Film className="icon" />
                  <input id="videoUpload" className="upload-input" name="image" type="file" onChange={() => this.onUploadFile('videoUpload')} />
                  <label for="videoUpload">{this.state.videoUpload ? this.state.videoUpload : 'Upload'}</label>
                </span>
              </div>
            }
            />
          <Step
            status={this.state.submitted ? "finish" : undefined}
            title="Submit"
            description={
              <button type="submit" value="submit" id="submit" className={`ant-btn ant-btn-primary${this.state.current !== 2 ? " disabled" : ""}`} disabled={this.state.current !== 2}>
                <Upload className="button-icon" /> Submit
              </button>
            }
          />
        </Steps>     
        </form>
        {this.state.submitted && <Button onClick={() => window.location.reload()}><Plus className="button-icon" />Upload More</Button>}
      </div>
    );
  }
};
