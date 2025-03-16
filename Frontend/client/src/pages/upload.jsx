import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const navigate = useNavigate();

  //  Handle File Change Event 
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
  };

  //  Handle Upload File to Server 
  const handleUpload = async () => {
    if (!file) {
      setDialogMessage("Please select a file to upload!");
      setDialogOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setDialogMessage(response.data.message || "File uploaded successfully!");
      setDialogOpen(true);

      //  Redirect to Dashboard after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Upload Error:", err);
      setDialogMessage(
        err.response?.data?.message || "Failed to upload file"
      );
      setDialogOpen(true);
    }
  };

  //  Handle Close Dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #000000, #0d47a1)", // ✅ Background Gradient
        padding: "20px",
      }}
    >
      {/* ✅ Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color="#ffffff"
        textAlign="center"
      >
        📤 Upload CSV File
      </Typography>

      {/* ✅ Styled File Input */}
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          background: "linear-gradient(90deg, #1e88e5, #0d47a1)",
          padding: "12px 24px",
          color: "#ffffff",
          borderRadius: "30px",
          fontSize: "16px",
          cursor: "pointer",
          "&:hover": {
            background: "linear-gradient(90deg, #0d47a1, #1e88e5)",
            boxShadow: "0 4px 12px rgba(30, 136, 229, 0.5)",
          },
        }}
      >
        Choose File
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {/* ✅ Display Selected File */}
      {file && (
        <Typography
          color="#ffffff"
          sx={{
            fontSize: "14px",
            marginTop: "4px",
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          Selected File: {file.name}
        </Typography>
      )}

      {/* ✅ Upload Button */}
      <Button
        onClick={handleUpload}
        variant="contained"
        sx={{
          background: "linear-gradient(90deg, #1e88e5, #0d47a1)",
          padding: "12px 24px",
          color: "#ffffff",
          borderRadius: "30px",
          fontSize: "16px",
          "&:hover": {
            background: "linear-gradient(90deg, #0d47a1, #1e88e5)",
            boxShadow: "0 4px 12px rgba(30, 136, 229, 0.5)",
          },
        }}
      >
        Upload File
      </Button>

      {/* ✅ Progress Bar */}
      {progress > 0 && (
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            marginTop: "10px",
          }}
        >
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: "10px",
              borderRadius: "5px",
              backgroundColor: "#0d47a1",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#1e88e5",
              },
            }}
          />
          <Typography
            textAlign="center"
            color="#ffffff"
            mt={1}
            fontSize="14px"
          >
            Uploading... {progress}%
          </Typography>
        </Box>
      )}

      {/* ✅ Back to Dashboard Button */}
      <Button
        onClick={() => navigate("/dashboard")}
        sx={{
          color: "#ffffff",
          border: "1px solid #1e88e5",
          "&:hover": {
            backgroundColor: "#1e88e5",
            color: "#ffffff",
          },
          marginTop: "10px",
          borderRadius: "30px",
        }}
      >
        🔙 Back to Dashboard
      </Button>

      {/* ✅ Dialog for Success/Failure */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>📢 Status</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            sx={{
              "&:hover": {
                backgroundColor: "#0d47a1",
                color: "#ffffff",
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Upload;
