import { useState } from "react";
import axios from "../utils/axiosconfig";

const AgentForm = ({ onAgentAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");


  // This function creates a new agent in the database.
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/agents", {
        name,
        email,
        mobile,
        password,
      });

      alert(response.data.message);
      onAgentAdded(); // Refresh the list after adding
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create agent");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Agent</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Create Agent</button>
    </form>
  );
};

export default AgentForm;
    