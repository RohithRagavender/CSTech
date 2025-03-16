import { useEffect, useState } from "react";
import axios from "../utils/axiosconfig";

const AgentList = ({ refresh }) => {
  const [agents, setAgents] = useState([]);


  // This function fetches all agents from the database and updates the state.
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("/agents");
        setAgents(response.data);
      } catch (err) {
        console.error("Error fetching agents:", err);
      }
    };

    fetchAgents();
  }, [refresh]);



// This function deletes an agent from the database and updates the state.
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    try {
      await axios.delete(`/agents/${id}`);
      alert("Agent deleted successfully");
      setAgents((prev) => prev.filter((agent) => agent._id !== id));
    } catch (err) {
      console.error("Error deleting agent:", err);
      alert("Failed to delete agent");
    }
  };

  return (
    <div>
      <h3>Agent List</h3>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} - {agent.email} - {agent.mobile}
            <button onClick={() => handleDelete(agent._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
