import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosconfig.js";

const EditAgent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agent, setAgent] = useState(null);
  const [error, setError] = useState("");


  // This function fetches an agent from the database. 
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(`/agents/${id}`); 
        setAgent(response.data);
        setError("");
      } catch (err) {
        console.error("Failed to load agent:", err.message);
        setError(err.response?.data?.message || "Failed to load agent");
      }
    };

    if (id) fetchAgent(); 
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };



  // This function updates an agent in the database.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/agents/${id}`, agent); 
      alert("Agent updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update agent:", err.message);
      setError(err.response?.data?.message || "Failed to update agent");
    }
  };

  if (!agent) return <p>Loading agent data...</p>;

  return (
    <div>
      <h2>Edit Agent</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={agent.name || ""}
          onChange={handleChange}
          placeholder="Agent Name"
        />
        <input
          type="email"
          name="email"
          value={agent.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="tel"
          name="mobile"
          value={agent.mobile || ""}
          onChange={handleChange}
          placeholder="Mobile"
        />
        <button type="submit">Update Agent</button>
      </form>
    </div>
  );
};

export default EditAgent;
