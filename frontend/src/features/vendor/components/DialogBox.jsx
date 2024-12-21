import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const DialogBox = ({
  open,
  onClose,
  onSubmit,
  defaultValues = {},
  fields = [],
}) => {
  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      productName: '',
      price: '',
      description: '',
      category: '',
      ProductImage: [],
      ...defaultValues,
    },
  });

  const ProductImages = watch('ProductImage');

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + ProductImages.length <= 3) {
      setValue('ProductImage', [...ProductImages, ...files]);
    } else {
      alert('You can upload up to 3 images only.');
    }
  };

  const handleRemoveImage = (index) => {
    setValue(
      'ProductImage',
      ProductImages.filter((_, i) => i !== index),
    );
  };

  const submitForm = (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append('productName', data.productName);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('category', data.category);

    // Append image files
    if (data.ProductImage && Array.isArray(data.ProductImage)) {
      console.log('Files to be sent:', data.ProductImage);

      data.ProductImage.forEach((file, index) => {
        console.log('Appending file:', file);
        if (file instanceof File) {
          formData.append(`ProductImage[]`, file);
        } else {
          console.error('Not a valid file:', file);
        }
      });
    } else {
      console.error('No valid files found in ProductImage');
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Product</DialogTitle>
      <form onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
        <DialogContent>
          {fields.map(
            ({
              name,
              label,
              type = 'text',
              multiline,
              rows,
              select,
              options,
              required,
            }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                rules={required ? { required: `${label} is required` } : {}}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label={label}
                    fullWidth
                    margin="normal"
                    type={type}
                    multiline={multiline}
                    rows={rows || 1}
                    select={select}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {select &&
                      options?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            ),
          )}

          {/* Image Upload Section */}
          <Box mt={2}>
            <Typography>Upload Product Images (Max 3):</Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-button"
              multiple
              type="file"
              name="ProductImage[]"
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-button">
              <Button
                variant="contained"
                startIcon={<PhotoCamera />}
                component="span"
                sx={{ mt: 1 }}
              >
                Upload Images
              </Button>
            </label>
            <Box mt={2} display="flex" gap={1} flexWrap="wrap">
              {ProductImages.map((image, index) => (
                <Box key={index} position="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`product-${index}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: 'white',
                    }}
                  >
                    ✕
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogBox;
