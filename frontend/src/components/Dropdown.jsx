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

  return (
    <>
      {matches ? (
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
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    color: '#000',
                    fontWeight: 'medium',
                    fontSize: '12px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {category.name}
                </Button>
                {hoveredCategory === category && (
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMouseLeave}
                    onMouseLeave={handleMouseLeave}
                    MenuListProps={{
                      onMouseLeave: handleMouseLeave,
                    }}
                    PaperProps={{
                      sx: {
                        backgroundColor: '#ffffff',
                        color: '#000',
                        borderRadius: '10px',
                        marginTop: '10px',
                      },
                    }}
                  >
                    {category.subcategories.map((sub, subIndex) => (
                      <MenuItem
                        key={subIndex}
                        onClick={handleMouseLeave}
                        sx={{
                          color: '#000',
                          fontSize: '14px',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Link
                          style={{
                            textDecoration: 'none',
                            cursor: 'pointer',
                            color: '#000',
                          }}
                          to={`/category/${sub}`}
                        >
                          {sub}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            ))}
          </Toolbar>
        </AppBar>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default EcoFriendlyNavbar;
