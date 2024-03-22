import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
  ['link', 'image'],
];

const EditorComponent = ({formData, setFormData, notes}) => {
  const [editorContent, setEditorContent] = useState(null);

  const handleEditorChange = (editorContent) => {
    setEditorContent(editorContent);
    setFormData({ ...formData, notes: editorContent})
  };

  useEffect(() => {
    setEditorContent(notes);
  }, [notes]);
  
  return (
    <ReactQuill
      value={editorContent}
      onChange={handleEditorChange}
      modules={{ toolbar: toolbarOptions }}
      preserveWhitespace
    />
  );
};
export default EditorComponent;
