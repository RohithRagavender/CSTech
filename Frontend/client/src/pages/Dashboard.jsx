import { useEffect, useState } from "react";
import axios from "../utils/axiosconfig.js";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Grid } from "@mui/material";

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // ✅ Redirect to login
  };

  // ✅ Fetch Agents
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/agents");
      setAgents(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching agents:", err.message);
      setError(err.response?.data?.message || "Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  // ✅ DELETE Agent
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;

    try {
      await axios.delete(`/agents/${id}`);
      fetchAgents(); // ✅ Refresh after delete
    } catch (err) {
      console.error("Error deleting agent:", err.message);
    }
  };

  // ✅ EDIT Agent
  const handleEdit = (id) => {
    navigate(`/edit-agent/${id}`);
  };


  // ✅ Remove all tasks from agent
  const handleRemoveTasks = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove all tasks for this agent?"
      )
    )
      return;

    try {
      await axios.delete(`/agents/${id}/tasks`);
      fetchAgents(); // ✅ Refresh after deletion
      alert("All tasks removed successfully!");
    } catch (err) {
      console.error("Failed to remove tasks:", err.message);
      alert("Failed to remove tasks");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 3,
        background: "linear-gradient(135deg, #1e1e1e, #1e88e5)", // ✅ Background gradient
      }}
    >
      {/* ✅ Header with Logout Button */}
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#ffffff">
          Agent List
        </Typography>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          Logout
        </Button>
      </Grid>

      {/* ✅ Display Loading */}
      {loading && <Typography color="#ffffff">Loading agents...</Typography>}

      {/* ✅ Display Error */}
      {error && <Typography color="red">{error}</Typography>}

      {/* ✅ Display Agents */}
      {!loading && !error && agents.length > 0 ? (
        <Box>
          {agents.map((agent) => (
            <Box
              key={agent._id}
              sx={{
                backgroundColor: "#ffffff",
                padding: 2,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                marginBottom: 2,
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="#1e88e5">
                {agent.name}
              </Typography>
              <Typography>
                {agent.email} - {agent.mobile}
              </Typography>

              {/* ✅ Task List with Background Gradient */}
              {agent.tasks.length > 0 ? (
                <Box
                  sx={{
                    marginTop: 1,
                    padding: 2,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #42a5f5, #1e88e5)", // ✅ Sexy gradient
                    color: "#ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  {agent.tasks.map((task, index) => (
                    <Typography
                      key={index}
                      sx={{ fontSize: "16px", fontWeight: "500" }}
                    >
                      ➡️ {task.firstName} - {task.phone} - {task.notes}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography>No tasks assigned</Typography>
              )}

              {/* ✅ Edit & Delete Buttons */}
              <Box mt={1} display="flex" gap={1}>
                <Button
                  onClick={() => handleEdit(agent._id)}
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    padding: "5px 16px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(agent._id)}
                  variant="contained"
                  color="error"
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    padding: "5px 16px",
                  }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleRemoveTasks(agent._id)}
                  variant="contained"
                  color="warning"
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    padding: "5px 16px",
                  }}
                >
                  Remove Tasks
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        !loading && <Typography color="#ffffff">No agents found</Typography>
      )}

      {/* ✅ Upload + Create Buttons */}
      <Box mt={3} display="flex" gap={2}>
        {/* ✅ Upload CSV Button */}
        <Link to="/upload" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Upload CSV
          </Button>
        </Link>

        {/* ✅ Create Agent Button */}
        <Link to="/create-agent" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="success"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "10px 20px",
            }}
          >
            Create Agent
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Dashboard;
