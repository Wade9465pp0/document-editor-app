import axios from "axios";
import API from "../api";

export default function Share({ docId }) {
  const shareDoc = async () => {
    const userId = prompt("Enter user ID:");
    if (!userId) return;

    await axios.post(`${API}/share/${docId}`, {
      user_id: Number(userId),
    });

    alert("Shared!");
  };

  return <button onClick={shareDoc}>Share</button>;
}