import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Court.css";

const Court = () => {
  const navigate = useNavigate();

  const maps = [
    {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.82762075128!2d76.92197827534935!3d28.69480267563078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d09adaf494579%3A0xf0aefc2abbfbc332!2sAnytime%20Fitness!5e0!3m2!1sen!2sin!4v1725646456468!5m2!1sen!2sin',
      directUrl: 'https://www.google.com/maps/dir/?api=1&destination=Anytime+Fitness',
      title: 'Court 1'
    },
    {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.5776940944693!2d76.9070472753497!3d28.70227677562674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0b4dc5b93b2f%3A0xc1f013602396abb!2sGoldsgym%20bahadurgarh!5e0!3m2!1sen!2sin!4v1725646982967!5m2!1sen!2sin',
      directUrl: 'https://www.google.com/maps/dir/?api=1&destination=Goldsgym+bahadurgarh',
      title: 'Court 2'
    },
    {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.9722930028547!2d76.92345048137607!3d28.690475412804858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d095267177ef1%3A0x41c32ea19c4bc032!2sRoyal%20Fitness!5e0!3m2!1sen!2sin!4v1725647095227!5m2!1sen!2sin',
      directUrl: 'https://www.google.com/maps/dir/?api=1&destination=Royal+Fitness',
      title: 'Court 3'
    },
    {
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2361575209306!2d76.91187257534894!3d28.682581475637473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0c00c269cabf%3A0xb0518812b7840d56!2sThe%20New%20Gym!5e0!3m2!1sen!2sin!4v1725647207687!5m2!1sen!2sin',
      directUrl: 'https://www.google.com/maps/dir/?api=1&destination=The+New+Gym',
      title: 'Court 4'
    }
  ];

  return (
    <div className="container-1">
      <button className="btn-D1" onClick={() => navigate('/Dashboard')}>Go to Dashboard</button>
      <h2>Book Court</h2>
      <div className="grid-container">
        {maps.map((map, index) => (
          <div key={index} className="map-item">
            <a href={map.directUrl} target="_blank" rel="noopener noreferrer">
            <div className="map-title">{map.title}</div>
              <iframe
                src={map.embedUrl}
                title={`Map ${index + 1}`}
                frameBorder="0"
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
           
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Court;
