import React from 'react';
import UploadContainer from './UploadContainer';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <div className="banner">
        <h1>AR World</h1>
      </div>
      <UploadContainer />
    </div>
  );
}

export default App;
