import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImg from '../Assets/images/logo.a03215d1.png';
import sliderImage from '../Assets/images/login-v2.75039949.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Audio } from 'react-loader-spinner';
import * as yup from 'yup';
import { UserContext } from '../Context/userContext';


export default function Login() {
  const { handleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Yup schema for validation
  const SignupSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password too short').required('Password is required'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = async () => {
    try {
      await SignupSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const loginUser = () => {
    setLoading(true);
    axios.post('/dashboard/login', formData)
      .then((response) => {
        if (response.data && response.data.accessToken) {
          handleLogin(response.data.accessToken);
          toast.success('Login Successfully!');
          navigate('/Home');
          resetForm();
        } else {
          toast.error('Unexpected error. Please try again.');
        }
      })
      .catch((error) => {
        const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Email or password is invalid';
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm().then((isValid) => {
      if (isValid) {
        loginUser();
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row h-100">
        <div className="col-md-8 d-flex justify-content-center align-items-center">
          <img src={sliderImage} alt="Illustration" className="img-fluid" />
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center mt-5">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <div className="text-center mb-5">
              <img src={logoImg} alt="Logo" className="w-25" />
              <h2 className="mt-3">Welcome to Champions!</h2>
              <p>Please sign in to your account and start the adventure</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <button type="submit" className="btn btn-danger w-100" disabled={isLoading}>
                {isLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Audio height="20" width="20" radius="9" color="white" ariaLabel="loading" />
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
