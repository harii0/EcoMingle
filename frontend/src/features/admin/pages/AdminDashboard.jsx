import {
  Box,
  CssBaseline,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
  Container,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerCount, getProductsCount } from '../adminSlice';
import VendorApplication from './vendor/VendorApplication';

const mockOrders = [
  {
    id: 1,
    customer: 'John Doe',
    total: 129.99,
    status: 'Delivered',
    date: '2024-10-28',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    total: 79.99,
    status: 'Processing',
    date: '2024-10-28',
  },
  {
    id: 3,
    customer: 'Bob Johnson',
    total: 199.99,
    status: 'Pending',
    date: '2024-10-27',
  },
];

const StatCard = ({ title, value, icon: Icon, trend, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      height: '100%',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-4px)' },
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography color="text.secondary" variant="h6">
          {title}
        </Typography>
        <Icon sx={{ color: 'primary.main' }} />
      </Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TrendingUpIcon
          sx={{
            mr: 1,
            color: trend >= 0 ? 'success.main' : 'error.main',
            transform: trend >= 0 ? 'none' : 'rotate(180deg)',
          }}
        />
        <Typography
          variant="body2"
          sx={{ color: trend >= 0 ? 'success.main' : 'error.main' }}
        >
          {Math.abs(trend)}% from last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { customerCount, productsCount } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCustomerCount());
    dispatch(getProductsCount());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'grey.50',
      }}
    >
      <CssBaseline />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, pt: 2 }}>
        <Container maxWidth="xl">
          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              {
                title: 'Total Revenue',
                value: '$48,234',
                icon: TrendingUpIcon,
                trend: 12,
              },
              {
                title: 'Orders',
                value: '845',
                icon: ShoppingCartIcon,
                trend: -2,
              },
              {
                title: 'Customers',
                value: customerCount,
                icon: PeopleIcon,
                trend: 8,
                onClick: () => {
                  navigate('/users');
                },
              },
              {
                title: 'Products',
                value: productsCount,
                icon: InventoryIcon,
                trend: 5,
                onClick: () => {
                  navigate('/all-products');
                },
              },
            ].map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <StatCard {...stat} />
              </Grid>
            ))}
          </Grid>

          {/* Recent Orders */}
          <Paper sx={{ mb: 4 }}>
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Recent Orders</Typography>
              <Typography
                variant="button"
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.dark' },
                }}
              >
                View all
              </Typography>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{ '&:last-child td': { border: 0 } }}
                    >
                      <TableCell>#{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{
                            bgcolor:
                              order.status === 'Delivered'
                                ? 'success.light'
                                : order.status === 'Processing'
                                ? 'info.light'
                                : 'warning.light',
                            color:
                              order.status === 'Delivered'
                                ? 'success.dark'
                                : order.status === 'Processing'
                                ? 'info.dark'
                                : 'warning.dark',
                          }}
                        />
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <VendorApplication />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
