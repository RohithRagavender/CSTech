import { useState } from "react";
import axios from "../utils/axiosconfig.js";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Alert,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CreateAgent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();


  // This function handles the form data change.
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };


  // This function validates the form data.
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (
      !formData.email.match(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/
      )
    ) {
      setError("Invalid email format");
      return false;
    }
    if (!formData.mobile || formData.mobile.length < 10) {
      setError("Invalid mobile number");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };


  // This function creates a new agent in the database.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("/agents", formData);
      setSuccess("Agent created successfully!");
      setError("");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Error creating agent:", err);
      setError(err.response?.data?.message || "Failed to create agent");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center", 
        justifyContent: "center", 
        background: "linear-gradient(135deg, #1e1e1e, #1e88e5)",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 12px 30px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Back Button */}
        <IconButton
          onClick={() => navigate("/dashboard")}
          sx={{
            alignSelf: "flex-start",
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
            mb: 1,
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/*  Heading */}
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#1e88e5"
          textAlign="center"
        >
          Create Agent
        </Typography>

        {/*  Name Input */}
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        {/* Email Input */}
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        {/*  Phone Input */}
        <PhoneInput
          country={"in"}
          value={formData.mobile}
          onChange={(value) => handleChange("mobile", value)}
          inputStyle={{
            width: "100%",
            height: "48px",
            fontSize: "16px",
            paddingLeft: "48px",
            borderRadius: "8px",
            border: "1px solid #c4c4c4",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
          enableSearch
          placeholder="Enter phone number"
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />

        {/*  Display Error */}
        {error && (
          <Alert
            severity="error"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ffebee",
              color: "#d32f2f",
              "& .MuiAlert-icon": {
                color: "#d32f2f",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/*  Display Success */}
        {success && (
          <Alert
            severity="success"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#e8f5e9",
              color: "#388e3c",
              "& .MuiAlert-icon": {
                color: "#388e3c",
              },
            }}
          >
            {success}
          </Alert>
        )}

        {/*  Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: "20px",
            padding: "12px",
            fontWeight: "bold",
            fontSize: "16px",
            textTransform: "none",
            backgroundColor: "#1e88e5",
            "&:hover": {
              backgroundColor: "#0d47a1",
            },
          }}
        >
          Create Agent
        </Button>
      </Box>
    </Box>
  );
};

export default CreateAgent;
