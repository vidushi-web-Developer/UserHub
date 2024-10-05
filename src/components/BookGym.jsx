import React, { useState } from 'react';
import './BookGym.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const gyms = [
  {
    id: 1,
    name: 'Anytime Fitness',
    image: './images/Gym1.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Unisex',
      facilities: ['Sauna', 'Swimming Pool', 'Personal Trainers'],
      latitude: 28.694882974309863,
      longitude: 76.92453329840852,
    },
  },
  {
    id: 2,
    name: 'Goldsgym',
    image: './images/Gym2.jpeg',
    functionalities: {
      parking: false,
      ac: true,
      gender: 'Male Only',
      facilities: ['Cardio Zone', 'Weight Lifting'],
      latitude: 28.702510028237953,
      longitude: 76.90930200776602,
    },
  },
  {
    id: 3,
    name: 'Royal Fitness',
    image: './images/Gym3.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'both',
      facilities: ['Yoga Classes', 'Meditation Room'],
      latitude: 28.690527324673763,
      longitude: 76.92823197977252,
    },
  },
  {
    id: 4,
    name: 'The New Gym',
    image: './images/Gym4.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Unisex',
      facilities: ['Zumaba', 'Boxing Ring'],
      latitude: 28.68257434496792,
      longitude: 76.91443506389408,
    },
  },
  {
    id: 5,
    name: 'Gym Box',
    image: './images/Gym5.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Unisex',
      facilities: ['CrossFit', 'Zumba'], 
      latitude: 28.69581379751493,
      longitude: 76.91246688924448
    },
  },
  {
    id: 6,
    name: 'Reduce Gym',
    image: './images/Gym6.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Male',
      facilities: ['Aerobics', 'Boxing Ring'],
      latitude: 28.69908091199026, 
      longitude: 76.90693177365716,
    },
  },
  {
    id: 7,
    name: 'Shinning Star Gym',
    image: './images/Gym7.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Unisex',
      facilities: ['CrossFit', 'Cardio'],
      latitude: 28.672007418544887, 
      longitude: 76.89778708488632,
    },
  },
  {
    id: 8,
    name: 'Just Fit Gym',
    image: './images/Gym8.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Unisex',
      facilities: ['Cardio', 'Boxing Ring'],
      latitude: 28.69457985559983,
      longitude:  76.94354676839,
    },
  },
  {
    id: 9,
    name: 'D Hulk Gym',
    image: './images/Gym9.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Unisex',
      facilities: ['CrossFit', 'Boxing Ring'],
      latitude: 28.695466407651573, 
      longitude: 76.93321687340809
    },
  },
  {
    id: 10,
    name: 'Shapers Gym',
    image: './images/Gym4.jpeg',
    functionalities: {
      parking: true,
      ac: true,
      gender: 'Female',
      facilities: ['Aerobics', 'Zumba Classes'],
      latitude: 28.67873125388212, 
      longitude: 76.9269470641886,
    },
  },
];

const BookGym = () => {
  const navigate = useNavigate();
  const [selectedGym, setSelectedGym] = useState(null);
  const [distance, setDistance] = useState('Calculating...'); // Store the distance

  const openModal = (gym) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        calculateDistance(position.coords.latitude, position.coords.longitude, gym);
      });
    }
    setSelectedGym(gym);
  };

  const closeModal = () => {
    setSelectedGym(null);
    setDistance('Calculating...'); 
  };

  const calculateDistance = async (userLat, userLon, gym) => {
    try {
      const response = await axios.post('http://localhost:3001/calculate-distance', {
        userLatitude: userLat,
        userLongitude: userLon,
        gymLatitude: gym.functionalities.latitude,
        gymLongitude: gym.functionalities.longitude,
      });
      setDistance(response.data.distance); // Update the distance from the server
    } catch (error) {
      console.error("Error calculating distance:", error);
      setDistance('Error calculating distance');
    }
  };

  return (
    <div className="gym-container">
      <button className="btn-D2" onClick={() => navigate('/Dashboard')}>
        Go to Dashboard
      </button>
      <h1>Explore Gyms</h1>
      <div className="gym-grid">
        {gyms.map((gym) => (
          <div key={gym.id} className="gym-box">
            <img src={gym.image} alt={gym.name} className="gym-image" />
            <h2>{gym.name}</h2>
            <button className="view-button" onClick={() => openModal(gym)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedGym && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedGym.name}</h2>
            <ul>
              <li>
                <strong>Parking:</strong>{' '}
                {selectedGym.functionalities.parking ? 'Available' : 'Not Available'}
              </li>
              <li>
                <strong>AC:</strong>{' '}
                {selectedGym.functionalities.ac ? 'Yes' : 'No'}
              </li>
              <li>
                <strong>Gender:</strong> {selectedGym.functionalities.gender}
              </li>
              <li>
                <strong>Facilities:</strong>{' '}
                {selectedGym.functionalities.facilities.join(', ')}
              </li>
              <li>
                <strong>Distance:</strong> {distance};
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookGym;
