import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import React, { useRef, useEffect } from 'react';

const TextEditor = ({ onChange, updateErrors,index, subscriptionPlan }) => {
  const editorRef = useRef(null);

  var modules = {
    toolbar: [
      [{ list: "bullet" }], 
    ],
  };

  const handleProcedureContentChange = (content) => {
    if ( content === '<p><br></p>') {
      const quill = editorRef.current.getEditor();
      quill.format('list', 'bullet');
  
      return;
    }
    onChange(content);
  }

  useEffect(() => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor();
      quill.format('list', 'bullet');
      quill.blur();
      updateErrors(index,'features','');
    }
  }, [editorRef.current]);

  useEffect(() => {
    if (subscriptionPlan && subscriptionPlan['features']) {
   
    if(subscriptionPlan['features'].length){
      const quill = editorRef.current.getEditor();
      const featuresList = subscriptionPlan['features']
        .map((feature) => `<li>${feature}</li>`)
        .join("");
      quill.clipboard.dangerouslyPasteHTML(`<ul>${featuresList}</ul>`);
    }
    }
  }, []);

  return (
    <div className='mt-3 border-rounded'>
      <ReactQuill
        theme="snow"
        ref={editorRef}
        modules={modules}
        placeholder="write your features ...."
        onChange={handleProcedureContentChange}
        style={{ height: "120px" }}
      >
      </ReactQuill>
    </div>
  );

}

export default TextEditor;