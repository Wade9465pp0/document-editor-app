export default function Sidebar({ docs, openDoc, createDoc }) {
  // Ensure docs is always an array
  const safeDocs = Array.isArray(docs) ? docs : [];

  const handleCreate = () => {
    const title = prompt("Enter document name");
    if (title) createDoc(title);
  };

  return (
    <div style={{ width: "250px", borderRight: "1px solid #ccc", padding: 10 }}>
      <h3>Documents</h3>
      <button onClick={handleCreate}>+ New</button>

      {safeDocs.length === 0 ? (
        <p>No documents</p>
      ) : (
        safeDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => openDoc(doc)}
            style={{ cursor: "pointer", marginTop: 10 }}
          >
            {doc.title}
          </div>
        ))
      )}
    </div>
  );
}