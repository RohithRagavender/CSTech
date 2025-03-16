import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "../src/utils/ProtectedRoutes";
import { CssBaseline } from "@mui/material";
import Upload from "./pages/upload";
import EditAgent from "../src/components/EditAgent";
import CreateAgent from "./pages/CreateAgent"

function App() {
  return (
    <>
      <CssBaseline / >  {/*  This component resets the default styles of the browser. Reset default browser styles */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-agent/:id"
            element={
              <ProtectedRoute>
                <EditAgent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-agent"
            element={
              <ProtectedRoute>
               <CreateAgent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
