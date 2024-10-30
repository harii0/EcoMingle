import React, { useState } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, Button, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

const categories = [
  {
    name: 'Organic Food',
    subcategories: ['Fruits & Vegetables', 'Grains', 'Dairy Products'],
  },
  {
    name: 'Kitchen & Décor',
    subcategories: ['Utensils', 'Furniture', 'Home Décor'],
  },
  {
    name: 'Electronics',
    subcategories: ['Solar Chargers', 'Energy-efficient Appliances'],
  },
  {
    name: 'Kids',
    subcategories: ['Toys', 'Clothing', 'Books'],
  },
  {
    name: 'Fashion',
    subcategories: ['Men', 'Women', 'Eco-friendly Fabrics'],
  },
  {
    name: 'Personal Care',
    subcategories: ['Organic Skincare', 'Haircare', 'Dental Care'],
  },
];

function EcoFriendlyNavbar() {
  const matches = useMediaQuery('(min-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (event, category) => {
    setAnchorEl(event.currentTarget);
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  if (!matches) return null;

  return (
    <AppBar
      position="static"
      sx={{
        p: 0,
        mt: -3,
        width: '100%',
        minHeight: '50px',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <Toolbar
        variant="regular"
        sx={{
          justifyContent: 'center',
        }}
      >
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{ position: 'relative' }}
            onMouseEnter={(e) => handleMouseEnter(e, category)}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              sx={{
                color: '#2c2c2c',
                fontWeight: 'medium',
                fontSize: '12px',

                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {category.name}
            </Button>
            <Menu
              disableAutoFocusItem
              anchorEl={anchorEl}
              open={hoveredCategory === category}
              onClose={handleMouseLeave}
              MenuListProps={{
                onMouseEnter: () => setHoveredCategory(category),
                onMouseLeave: handleMouseLeave,
              }}
              PaperProps={{
                sx: {
                  backgroundColor: '#ffffff',
                  color: '#000',
                  borderRadius: '10px',
                  marginTop: '10px',
                  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                },
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {category.subcategories.map((sub, subIndex) => (
                <MenuItem
                  key={subIndex}
                  onClick={handleMouseLeave}
                  sx={{
                    fontSize: '14px',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <Link
                    to={`/category/${sub.toLowerCase().replace(/ /g, '-')}`}
                    style={{
                      textDecoration: 'none',
                      color: '#000',
                      fontSize: '12px',
                      width: '100%',
                      padding: '8px 16px',
                    }}
                  >
                    {sub}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default EcoFriendlyNavbar;
