import React, { useState } from 'react';
import './ComplaintForm.css';

const categories = [
  { value: 'Electrical', label: 'Electrical', icon: 'bi-lightning-charge', color: '#F59E0B' },
  { value: 'Network', label: 'Network', icon: 'bi-wifi', color: '#3B82F6' },
  { value: 'Maintenance', label: 'Maintenance', icon: 'bi-tools', color: '#10B981' },
  { value: 'Others', label: 'Others', icon: 'bi-folder', color: '#6B7280' }
];

const priorities = [
  { value: 'Low', label: 'Low', desc: 'Non-urgent', color: '#6B7280' },
  { value: 'Medium', label: 'Medium', desc: 'Noticeable', color: '#F59E0B' },
  { value: 'High', label: 'High', desc: 'Critical', color: '#EF4444' }
];

const ComplaintForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Low',
    image: null
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategorySelect = (category) => {
    setFormData(prev => ({ ...prev, category }));
    if (errors.category) {
      setErrors(prev => ({ ...prev, category: '' }));
    }
  };

  const handlePrioritySelect = (priority) => {
    setFormData(prev => ({ ...prev, priority }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image must be less than 5MB' }));
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Only JPG, PNG, GIF allowed' }));
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="complaint-form">
      {/* Title */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          name="title"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Brief title describing the issue"
          value={formData.title}
          onChange={handleChange}
          maxLength={200}
        />
        <div className="d-flex justify-content-between">
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          <small className="text-muted ms-auto">{formData.title.length}/200</small>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Description <span className="text-danger">*</span>
        </label>
        <textarea
          name="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          placeholder="Describe the issue in detail..."
          rows={5}
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="form-label fw-semibold">
          Category <span className="text-danger">*</span>
        </label>
        <div className="category-grid">
          {categories.map(cat => (
            <div
              key={cat.value}
              className={`category-card ${formData.category === cat.value ? 'selected' : ''}`}
              onClick={() => handleCategorySelect(cat.value)}
              style={{ '--cat-color': cat.color }}
            >
              <i className={`bi ${cat.icon}`}></i>
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
        {errors.category && <div className="text-danger small mt-2">{errors.category}</div>}
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Priority</label>
        <div className="priority-grid">
          {priorities.map(pri => (
            <div
              key={pri.value}
              className={`priority-card ${formData.priority === pri.value ? 'selected' : ''}`}
              onClick={() => handlePrioritySelect(pri.value)}
              style={{ '--pri-color': pri.color }}
            >
              <span className="priority-indicator" style={{ background: pri.color }}></span>
              <div>
                <div className="fw-medium">{pri.label}</div>
                <small className="text-muted">{pri.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="form-label fw-semibold">Attachment (Optional)</label>
        {!imagePreview ? (
          <div className="image-upload-area" onClick={() => document.getElementById('imageInput').click()}>
            <i className="bi bi-cloud-arrow-up fs-1 text-muted"></i>
            <p className="text-muted mb-0">Click to upload or drag and drop</p>
            <small className="text-muted">JPG, PNG, GIF up to 5MB</small>
            <input
              type="file"
              id="imageInput"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleImageChange}
              hidden
            />
          </div>
        ) : (
          <div className="image-preview">
            <img src={imagePreview} alt="Preview" />
            <button type="button" className="btn-remove" onClick={removeImage}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        )}
        {errors.image && <div className="text-danger small mt-2">{errors.image}</div>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
            Submitting...
          </>
        ) : (
          <>
            <i className="bi bi-send me-2"></i>
            Submit Complaint
          </>
        )}
      </button>
    </form>
  );
};

export default ComplaintForm;