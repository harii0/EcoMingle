import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductByCategory,
  getProductsThunk,
} from '../../product/productSlice.js';
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

// Custom hook for products
const useProducts = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.product);
  const [category, setCategory] = useState(null);

  const fetchProductsByCategory = (category) => {
    dispatch(getProductByCategory(category));
  };

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    } else {
      dispatch(getProductsThunk());
    }
  }, [category, dispatch]);

  return { products, status, setCategory };
};

// Sidebar for Filters
const SideNav = ({
  selectedCategories,
  toggleCategory,
  selectedColors,
  toggleColor,
  selectedMaterials,
  toggleMaterial,
  priceRange,
  setPriceRange,
}) => {
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
              py: 1,
              cursor: 'pointer',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Checkbox
              checked={selectedCategories.includes(category.name)}
              onChange={() => toggleCategory(category.name)}
              size="small"
            />
            <Typography variant="body2" fontSize={12} fontWeight={400}>
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
                    '&.Mui-checked': { color: color.toLowerCase() },
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

const AppliedFilters = ({
  selectedCategories,
  selectedColors,
  selectedMaterials,
  handleDeleteFilter,
}) => {
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

const SortBy = ({ sortBy, setSortBy }) => {
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

const ProductGrid = ({ products, loading, error }) => {
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
  const { products, status, error, setCategory } = useProducts();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    if (searchQuery) {
      setCategory([searchQuery]);
    }
  }, [searchQuery, setCategory]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
    setCategory(category);
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
    if (filterType === 'category')
      setSelectedCategories((prev) => prev.filter((item) => item !== label));
    if (filterType === 'color')
      setSelectedColors((prev) => prev.filter((item) => item !== label));
    if (filterType === 'material')
      setSelectedMaterials((prev) => prev.filter((item) => item !== label));
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <SideNav
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        selectedColors={selectedColors}
        toggleColor={toggleColor}
        selectedMaterials={selectedMaterials}
        toggleMaterial={toggleMaterial}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <AppliedFilters
            selectedCategories={selectedCategories}
            selectedColors={selectedColors}
            selectedMaterials={selectedMaterials}
            handleDeleteFilter={handleDeleteFilter}
          />
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
        </Box>
        <ProductGrid
          products={products}
          loading={status === 'loading'}
          error={error}
        />
      </Box>
    </Box>
  );
};

export default Catalog;
