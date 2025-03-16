import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosconfig.js";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const EditAgent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [agent, setAgent] = useState(null);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // 'success' or 'error'

  // ✅ Fetch agent data
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

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle update agent
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/agents/${id}`, agent);

      // ✅ Show success dialog
      setDialogType("success");
      setDialogMessage("Agent updated successfully!");
      setDialogOpen(true);

      // ✅ Close dialog and redirect to dashboard
      setTimeout(() => {
        setDialogOpen(false);
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Failed to update agent:", err.message);

      // ✅ Show error dialog
      setDialogType("error");
      setDialogMessage(err.response?.data?.message || "Failed to update agent");
      setDialogOpen(true);
    }
  };

  if (!agent) return <p>Loading agent data...</p>;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #000000, #1a237e, #6200ea)", // ✅ Gradient Background
        padding: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 12px 24px rgba(0,0,0,0.3)",
          },
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#1a237e" }}
        >
          Edit Agent
        </Typography>

        {/* ✅ Error Alert */}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {/* ✅ Form */}
        <form onSubmit={handleSubmit}>
          {/* ✅ Name Input */}
          <TextField
            label="Agent Name"
            name="name"
            value={agent.name || ""}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          {/* ✅ Email Input */}
          <TextField
            label="Email"
            type="email"
            name="email"
            value={agent.email || ""}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          {/* ✅ Mobile Input */}
          <TextField
            label="Mobile"
            type="tel"
            name="mobile"
            value={agent.mobile || ""}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />

          {/* ✅ Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              padding: "12px",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "#1a237e",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3949ab",
              },
            }}
          >
            Update Agent
          </Button>
        </form>
      </Paper>

      {/* ✅ Dialog Component */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle
          sx={{
            backgroundColor:
              dialogType === "success" ? "#e8f5e9" : "#ffebee",
            color: dialogType === "success" ? "#2e7d32" : "#d32f2f",
            fontWeight: "bold",
          }}
        >
          {dialogType === "success" ? "Success" : "Error"}
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              color: dialogType === "success" ? "#2e7d32" : "#d32f2f",
            }}
          >
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              backgroundColor:
                dialogType === "success" ? "#1a237e" : "#d32f2f",
              color: "#fff",
              "&:hover": {
                backgroundColor:
                  dialogType === "success" ? "#3949ab" : "#b71c1c",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditAgent;
