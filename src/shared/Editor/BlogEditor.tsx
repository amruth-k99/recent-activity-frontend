import React from 'react';
import { Editor } from '@surajpheudin/react-markdown';

function uploadImageCallBack(file: any) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.imgur.com/3/image');
    xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
    const data = new FormData();
    data.append('image', file);
    xhr.send(data);
    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.responseText);
      resolve(response);
    });
    xhr.addEventListener('error', () => {
      const error = JSON.parse(xhr.responseText);
      reject(error);
    });
  });
}
const BlogEditor = () => {
  const [value, setValue] = React.useState('');

  return (
    <div
      style={{
        flexGrow: 1,
        height: '100%',
      }}
    >
      <Editor
        className="editor text-black"
        onChange={(e: any) => {
          setValue(e.target.value);
        }}
      ></Editor>
    </div>
  );
};
export default BlogEditor;
