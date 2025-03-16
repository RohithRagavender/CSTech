import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  // This function fetches all agents from the database and updates the state.
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('/agents'); 
        setAgents(response.data);
      } catch (err) {
        console.error('Error fetching agents:', err.message);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div>
      <h2>Agents</h2>
      <ul>
        {agents.map((agent) => (
          <li key={agent._id}>
            {agent.name} - {agent.email} - {agent.mobile}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
