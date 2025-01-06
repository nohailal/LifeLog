mport React from "react";
import "../styles/ContactSection.css";
import { useNavigate } from 'react-router-dom';
function ContactSection() {
  const navigate = useNavigate();
  
  const handleSingIn = () => {
    navigate('/SignIn');
  };
  return (
    <div class="container">
    <div class="card">
      <div class="content">
     
        <h2>Join us to start your journey</h2>
        <p>LifeLog is for everyone ,here you write your journey</p>
        <button className="SignIn" onClick={handleSingIn} >Sign In</button>
      </div>
      <div class="gray-section"> </div>
    </div>
  </div>
  );
}

export default ContactSection;

