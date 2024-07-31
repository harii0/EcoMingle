import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  contact: {
    type: {
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
    required: true,
  },
  location: {
    type: {
      address: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
      postalCode: { type: String, trim: true },
    },
  },
  website: {
    type: String,
    trim: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  gstin: {
    type: String,
    trim: true,
  },
  pan: {
    type: String,
    trim: true,
  },
  categories: [
    {
      type: String,
      enum: [String],
    },
  ],
  ethicsCertifications: [
    {
      type: String,
    },
  ],
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'vendor',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

vendorSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 8);
  next();
  // Trim whitespace from string properties before saving
  this.name = this.name.trim();
  if (this.description) {
    this.description = this.description.trim();
  }
  if (this.contact.email) {
    this.contact.email = this.contact.email.trim();
  }
  if (this.contact.phone) {
    this.contact.phone = this.contact.phone.trim();
  }
  if (this.location) {
    this.location.address = this.location.address?.trim();
    this.location.city = this.location.city?.trim();
    this.location.state = this.location.state?.trim();
    this.location.country = this.location.country?.trim();
    this.location.postalCode = this.location.postalCode?.trim();
  }
  if (this.website) {
    this.website = this.website.trim();
  }
  next();
});

vendorSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
