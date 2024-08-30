/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, Box, Grid, Paper } from '@mui/material';
import { InfoOutlined, TrendingDown } from '@mui/icons-material';

const EmissionCard = ({ totalEmission, emissionReduction }) => {
  return (
    <Paper>
      <Card>
        <CardContent sx={{ p: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6">Eco Impact</Typography>
            <InfoOutlined fontSize="medium" sx={{ color: 'text.custom' }} />
          </Box>

          <Box
            sx={{
              bgcolor: 'rgba(144, 238, 144, 0.1)',
              borderRadius: 2,
              p: 0.5,
            }}
          >
            <Typography variant="h4" component="div" fontWeight="medium">
              {totalEmission}
              <Typography component="span" ml={0.5}>
                kg
              </Typography>
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              CO2 Saved This Year
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
            <TrendingDown fontSize="small" color="success" sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component={'div'}
              fontWeight="medium"
              display="inline-flex"
              alignItems={'center'}
              gap={1}
            >
              {emissionReduction}%
              <Typography
                variant="subtitle2"
                component={'span'}
                color="text.secondary"
              >
                reduction
              </Typography>
            </Typography>
          </Box>

          <Grid container spacing={1} mt={2.5}>
            {[
              { label: 'Trees Saved', value: Math.round(totalEmission / 20) },
              {
                label: 'Water Saved',
                value: `${Math.round(totalEmission * 1.5)}L`,
              },
              {
                label: 'Energy Saved',
                value: `${Math.round(totalEmission * 2.5)}kWh`,
              },
            ].map((stat, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" fontWeight="medium">
                    {stat?.value}
                  </Typography>
                  <Typography variant="caption">{stat?.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  );
};

export default EmissionCard;
