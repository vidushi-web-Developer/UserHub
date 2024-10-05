import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import {BsEye } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePhone } from "react-icons/md";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phoneNo: "",
    city: "",
    occupation: "",
    sports: "",
    status: "",
    gender: "",
  });





  const validate = () => {
    let isValid = true;

    // Name validation 
    if (!/^[a-zA-Z\s]{3,30}$/.test(formData.name)) {
      toast.error('Name must be alphabets only and between 3-30 characters.');
      isValid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address.');
      isValid = false;
    }

    // Phone validation 
    if (!/^\d{10}$/.test(formData.phoneNo)) {
      toast.error('Phone number must be  10 digits.');
      isValid = false;
    }

   // Password validation 
 if (!/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/.test(formData.password)) {
  toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  isValid = false;
}

return isValid;
};



  localStorage.setItem("formData", JSON.stringify(formData));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      axios.post('http://localhost:3001/register', formData)
        .then(response => {
          console.log("Success:", response.data);
          toast.success('Registration successful!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            onClose: () => navigate("/"),
          });
          
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            toast.error('User already exists. Please try a different email.');
          } else {
            toast.error('Registration unsuccessful. Please try again.');
          }
        });
    }
  };


 


  return (
    <>
      <div className="container1">
        <div className="container1-box">
          <h1>Register</h1>

          <form onSubmit={handleSubmit}>
            <div className="container1-form">
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <FaRegUser className="icon" />
           
            </div>
            <div className="container1-form">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
               
                required
              />
              <BsEye className="icon" />
            </div>
            <div className="container1-form">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <HiOutlineMail className="icon" />
             
            </div>

            <div className="container1-form">
              <input
                type="phoneNo-."
                name="phoneNo"
                placeholder="Phone Number"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
              <MdOutlinePhone className="icon" />
              
            </div>

            <div className="container1-form">
              <select
                className="container-class"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option name="">City</option>
                <option name="bahadurgarh">Bahadurgarh</option>
                <option name="mundka">Mundka</option>
                <option name="tikri-border">Tikri Border</option>
                <option name="peeragarhi">Peeragarhi</option>
                <option name="tikri-kalan">Tikri Kalan</option>
              </select>
              <div className="arrow1"></div>
            </div>

            <div className="container1-form">
              <select
                className="container-class"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
              >
                <option name="">Occupation</option>
                <option name="student">Student</option>
                <option name="bussinessman">Bussinessman</option>
                <option name="surgeon">Surgeon</option>
                <option name="engineer">Engineer</option>
                <option name="none">None of them</option>
              </select>
              <div className="arrow"></div>
            </div>

            <div className="container1-form">
              <select
                className="container-class"
                name="sports"
                value={formData.sports}
                onChange={handleChange}
                required
              >
                <option name="">Sports</option>
                <option name="badminton">Badminton</option>
                <option name="football">Football</option>
                <option name="kabaddi">Kabaddi</option>
                <option name="hockey">Hockey</option>
                <option name="cricket">Cricket</option>
                <option name="volleyball">Volleyball</option>
              
                <option name="tennis">Tennis</option>
              </select>
              <div className="arrow2"></div>
            </div>

            <div className="container1-checking">
              <label className="heading">Marital Status :-</label>
              <input
                className="radio-btn"
                type="radio"
                name="status"
                value="Single"
                checked={formData.status === "Single"}
                onChange={handleChange}
                required
              />
              <label className="label">Single </label>
              <input
                className="radio-btn"
                type="radio"
                name="status"
                value="Married"
                checked={formData.status === "Married"}
                onChange={handleChange}
                required
              />
              <label className="label">Married</label>
            </div>
            <div className="container1-checking">
              <label className="heading">Gender :-</label>
              <input
                className="radio-btn"
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              <label className="label">Male</label>
              <input
                className="radio-btn"
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              <label className="label">Female</label>
            </div>
            <button className="button1">Register</button>
            <div className="container1-lst">
              <p>
                Already have an account ? <a href="/login">Login</a>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Register;
