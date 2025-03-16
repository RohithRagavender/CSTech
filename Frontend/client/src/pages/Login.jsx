import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import { Box, TextField, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogType, setDialogType] = useState('success'); 

  const navigate = useNavigate();


  // This function handles the login form submission. 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });


      localStorage.setItem('token', response.data.token);

  
      setDialogType('success');
      setDialogMessage('Login Successful! Redirecting to Dashboard...');
      setDialogOpen(true);

      setTimeout(() => {
        setDialogOpen(false);
        navigate('/dashboard'); 
      }, 1500);
    } catch (err) {
      setDialogType('error');
      setDialogMessage(err.response?.data?.message || 'Login Failed!');
      setDialogOpen(true);
    }
  };

  return (
    <Box 
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, #000000, #1e1e1e, #1a237e, #4b0082)`, 
      }}
    >
      <Paper 
        elevation={6} 
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: '#ffffff',
          boxShadow: '0px 8px 20px rgba(0,0,0,0.3)', 
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 12px 30px rgba(0,0,0,0.5)', 
          }
        }}
      >
        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom
          sx={{ color: '#1a237e', fontWeight: 'bold' }}
        >
          Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
          {/*  Email Field */}
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& label.Mui-focused': {
                color: '#1a237e',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b0bec5',
                },
                '&:hover fieldset': {
                  borderColor: '#3949ab',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1a237e',
                },
              },
            }}
          />
          
          {/*  Password Field */}
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& label.Mui-focused': {
                color: '#1a237e',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#b0bec5',
                },
                '&:hover fieldset': {
                  borderColor: '#3949ab',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1a237e',
                },
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#3949ab',
              },
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              textTransform: 'none'
            }}
          >
            Login
          </Button>
        </form>
      </Paper>

      {/*  Dialog Component */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle 
          sx={{
            backgroundColor: dialogType === 'success' ? '#e8f5e9' : '#ffebee',
            color: dialogType === 'success' ? '#2e7d32' : '#d32f2f',
            fontWeight: 'bold'
          }}
        >
          {dialogType === 'success' ? 'Success' : 'Error'}
        </DialogTitle>
        <DialogContent>
          <Typography 
            sx={{
              color: dialogType === 'success' ? '#2e7d32' : '#d32f2f'
            }}
          >
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDialogOpen(false)}
            sx={{
              backgroundColor: dialogType === 'success' ? '#1a237e' : '#d32f2f',
              color: '#fff',
              '&:hover': {
                backgroundColor: dialogType === 'success' ? '#3949ab' : '#b71c1c',
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
