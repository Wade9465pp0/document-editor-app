import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import FileUpload from "./components/Fileupload"; 
import Share from "./components/Share";

const API = "http://127.0.0.1:8000";

function App() {
  const [docs, setDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDocs = async () => {
    try {
      const res = await axios.get(`${API}/docs/`);
      console.log("API response:", res.data);

      setDocs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setDocs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const createDoc = async (title) => {
    try {
      await axios.post(`${API}/docs/`, { title });
      fetchDocs();
    } catch (err) {
      console.error(err);
    }
  };

  const openDoc = (doc) => {
    setSelectedDoc(doc);
    setContent(doc.content || "");
  };

  const saveDoc = async () => {
    if (!selectedDoc) return;

    try {
      await axios.put(`${API}/docs/${selectedDoc.id}`, {
        content: content,
      });

      console.log("Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  if (loading) return <h2 style={{ padding: 20 }}>Loading...</h2>;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0f172a",
        color: "white",
      }}
    >
      <Sidebar docs={docs} openDoc={openDoc} createDoc={createDoc} />

      <div style={{ flex: 1, padding: 20 }}>
        {selectedDoc ? (
          <>
            <h2>{selectedDoc.title}</h2>

            <FileUpload setContent={setContent} />
            <Share docId={selectedDoc.id} />

            <Editor content={content} setContent={setContent} />

            <button onClick={saveDoc} style={{ marginTop: 10 }}>
              Save
            </button>
          </>
        ) : (
          <>
            <h2>No document selected</h2>
            <p>Select or create a document</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;