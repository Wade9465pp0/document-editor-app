import axios from "axios";

const API = "http://127.0.0.1:8000";

export default function FileUpload({ setContent }) {
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(`${API}/upload`, formData);
    setContent(res.data.content);
  };

  return <input type="file" onChange={uploadFile} />;
}