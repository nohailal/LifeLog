import React from "react";
import "../styles/ShowcaseSection.css";
import services from "../images/services.png";

function ShowcaseSection() {
  return (
    <section className="showcase-section">
    
      <div className="showcase-item1"> 
        <img src={services} alt="services" className="images" />
      </div>
        <div className="showcase-item">Health Journal</div>
        <div className="showcase-item">Blog</div>
        <div className="showcase-item">TO-DO List</div>
        <div className="showcase-item">Secret Diary</div>       
        <div className="showcase-item">Your Steps</div>
     
    </section>
  );
}

export default ShowcaseSection;
