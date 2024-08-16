import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, Stack } from "@mui/material";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../actions/adminAction'; 
import { toast} from 'react-toastify';


const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { isAdmin, loading, error } = useSelector((state) => state.admin);

    // State for the secret key
    const [secretKey, setSecretKey] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey));
        navigate("/admin/dashboard")
    };

    // Show error or success messages
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (isAdmin) return <Navigate to="/admin/dashboard" />;

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Stack alignItems="center">
                    <Typography component="h1" variant="h5">
                        Admin Login
                    </Typography>
                </Stack>
                <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="secretKey"
                        label="Secret Key"
                        type="password" // Use "text" if you don't want to mask the input
                        id="secretKey"
                        autoComplete="current-password"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)} // Directly update state
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: '20px 0 10px' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>
            </Paper>
          
        </Container>
    );
}

export default AdminLogin;
