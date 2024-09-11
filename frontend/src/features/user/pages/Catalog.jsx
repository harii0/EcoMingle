import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../product/api.js';
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Typography,
  Grid,
  Chip,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Radio,
  FormControlLabel,
  RadioGroup,
  CircularProgress,
} from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';

// Sample Data
const Categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Books' },
  { id: 4, name: 'Home & Garden' },
  { id: 5, name: 'Sports & Outdoors' },
];

const Colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
const Materials = ['Cotton', 'Leather', 'Plastic', 'Metal', 'Wood'];

// Context to manage catalog state
const CatalogContext = createContext();

// Custom hook to manage catalog state
const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context)
    throw new Error('useCatalog must be used within a CatalogProvider');
  return context;
};

// Custom hook for products
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data.data.products);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

// Sidebar for Filters
const SideNav = () => {
  const {
    selectedCategories,
    toggleCategory,
    selectedColors,
    toggleColor,
    selectedMaterials,
    toggleMaterial,
    priceRange,
    setPriceRange,
  } = useCatalog();

  return (
    <Card
      elevation={2}
      sx={{
        boxShadow: 'none',
        px: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '0px',
        borderBottom: 'none',
        borderLeft: 'none',
        borderTop: 'none',
      }}
    >
      <FilterSection title="Categories">
        {Categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              p: 1,
              cursor: 'pointer',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Checkbox
              checked={selectedCategories.includes(category.name)}
              onChange={() => toggleCategory(category.name)}
              size="small"
            />
            <Typography variant="body2" fontWeight={500}>
              {category.name}
            </Typography>
          </Box>
        ))}
      </FilterSection>

      <FilterSection title="Price">
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Typography variant="body2" fontWeight="medium">
            ${priceRange[0]} - ${priceRange[1]}
          </Typography>
        </Box>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          sx={{ mt: 2 }}
        />
      </FilterSection>

      <FilterSection title="Colors">
        <RadioGroup row sx={{ display: 'flex' }}>
          {Colors.map((color) => (
            <FormControlLabel
              key={color}
              value={color}
              control={
                <Radio
                  checked={selectedColors.includes(color)}
                  onChange={() => toggleColor(color)}
                  sx={{
                    color: color.toLowerCase(),
                    '&.Mui-checked': {
                      color: color.toLowerCase(),
                    },
                  }}
                />
              }
              label={color}
            />
          ))}
        </RadioGroup>
      </FilterSection>

      <FilterSection title="Materials">
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          {Materials.map((material) => (
            <Chip
              key={material}
              label={material}
              clickable
              color={
                selectedMaterials.includes(material) ? 'primary' : 'default'
              }
              onClick={() => toggleMaterial(material)}
              size="small"
            />
          ))}
        </Box>
      </FilterSection>
    </Card>
  );
};

const FilterSection = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" fontSize={16} fontWeight="medium" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const AppliedFilters = () => {
  const {
    selectedCategories,
    selectedColors,
    selectedMaterials,
    handleDeleteFilter,
  } = useCatalog();

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" fontWeight="medium" fontSize={16}>
        Applied Filters
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
        {selectedCategories.map((label) => (
          <Chip
            key={`category-${label}`}
            label={label}
            onDelete={() => handleDeleteFilter(label, 'category')}
            variant="outlined"
            size="small"
          />
        ))}
        {selectedColors.map((label) => (
          <Chip
            key={`color-${label}`}
            label={label}
            onDelete={() => handleDeleteFilter(label, 'color')}
            variant="outlined"
            size="small"
          />
        ))}
        {selectedMaterials.map((label) => (
          <Chip
            key={`material-${label}`}
            label={label}
            onDelete={() => handleDeleteFilter(label, 'material')}
            variant="outlined"
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

const SortBy = () => {
  const { sortBy, setSortBy } = useCatalog();

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <Select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        displayEmpty
        IconComponent={IoIosArrowDown}
      >
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
      </Select>
    </FormControl>
  );
};

const ProductGrid = () => {
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product._id}>
          <Card
            onClick={() => navigate(`/product/${product._id}`)}
            sx={{ cursor: 'pointer' }}
          >
            <CardContent>
              <img
                src={product.ProductImage[0]}
                alt={product.productName}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
              />
              <Typography variant="h6" component="div">
                {product.productName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.label}
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const Catalog = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((item) => item !== color) : [color],
    );
  };

  const toggleMaterial = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((item) => item !== material)
        : [...prev, material],
    );
  };

  const handleDeleteFilter = (label, filterType) => {
    switch (filterType) {
      case 'category':
        setSelectedCategories((prev) => prev.filter((item) => item !== label));
        break;
      case 'color':
        setSelectedColors((prev) => prev.filter((item) => item !== label));
        break;
      case 'material':
        setSelectedMaterials((prev) => prev.filter((item) => item !== label));
        break;
      default:
        break;
    }
  };

  const contextValue = {
    selectedCategories,
    toggleCategory,
    selectedColors,
    toggleColor,
    selectedMaterials,
    toggleMaterial,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    handleDeleteFilter,
  };

  return (
    <CatalogContext.Provider value={contextValue}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SideNav />
        </Grid>
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <AppliedFilters />
            <SortBy />
          </Box>
          <ProductGrid />
        </Grid>
      </Grid>
    </CatalogContext.Provider>
  );
};

export default Catalog;
