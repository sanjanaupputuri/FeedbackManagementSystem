import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ComplaintForm from '../components/complaints/ComplaintForm';
import { complaintService } from '../services/complaintService';
import { useToast } from '../context/ToastContext';
import './SubmitComplaint.css';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('priority', formData.priority);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await complaintService.submit(data);
      toast.success('Complaint submitted successfully!');
      navigate(`/complaints/${response.complaintId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      
      <main className="flex-grow-1 bg-light">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                  <h4 className="mb-0">Submit New Complaint</h4>
                  <p className="text-muted mb-0 small">Fill in the details below to submit a complaint</p>
                </div>
                <div className="card-body p-4">
                  <ComplaintForm onSubmit={handleSubmit} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubmitComplaint;