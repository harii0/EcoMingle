import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../api/api';
import {
  Box,
  Avatar,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { MdEmail, MdAccountCircle, MdDelete, MdBlock } from 'react-icons/md';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!user)
    return (
      <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
        No user data available
      </Typography>
    );

  const handleDelete = () => {
    // Add delete logic here
    console.log('User deleted:', user._id);
  };

  const handleSuspend = () => {
    // Add suspend logic here
    console.log('User suspended:', user._id);
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 800, margin: '2rem auto' }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Avatar and Basic Info */}
        <Grid item xs={12} sm={4}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <Avatar
              src={user.avatar}
              alt={`${user.username}'s avatar`}
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="h5">{user.username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.role}
            </Typography>
          </Box>
        </Grid>

        {/* User Details */}
        <Grid item xs={12} sm={8}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <MdAccountCircle size={20} />
              <Typography>ID: {user._id}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <MdEmail size={20} />
              <Typography>Email: {user.email}</Typography>
            </Box>
            <Typography>
              Created At: {new Date(user.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              Updated At: {new Date(user.updatedAt).toLocaleString()}
            </Typography>
            <Typography>
              Order History: {user.orderHistory.length} orders
            </Typography>
            <Typography>Wishlist: {user.wishlist.length} items</Typography>
            <Typography>Cart: {user.cart.length} items</Typography>
          </Box>
        </Grid>

        {/* Admin Actions */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display="flex"
          justifyContent="flex-end"
          gap={2}
        >
          <Tooltip title="Delete User">
            <IconButton onClick={handleDelete} color="error">
              <MdDelete size={24} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Suspend User">
            <IconButton onClick={handleSuspend} color="warning">
              <MdBlock size={24} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserPage;
