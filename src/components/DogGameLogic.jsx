import React from 'react';
import { useState,useEffect } from 'react';
import './DogGameLogic.css';

function DogGameLogic()
 {
  const [DogImage, setDogImage] = useState(''); 
  const [breed, setBreed] = useState(''); 
  const [allBreeds, setAllBreeds] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showLostPopup, setShowLostPopup] = useState(false);
  function selectBreed(url) {
    const parts = url.split('/');
    const breedIndex = parts.indexOf('breeds');

    if (breedIndex !== -1 && parts.length > breedIndex + 1) {
      const breedPart = parts[breedIndex + 1];
      if (breedPart.includes('-')) {
        const subParts = breedPart.split('-');
        return `${subParts[1]} ${subParts[0]}`;
      }
      return breedPart;
    }

    return 'Unknown';
  }
  function createOptions(correctBreed, allBreeds) {
    const options = new Set();
    options.add(correctBreed);

    while (options.size < 4) {
      const randomBreed = allBreeds[Math.floor(Math.random() * allBreeds.length)];
      options.add(randomBreed);
    }

    const shuffleOptions = [...options].sort(() => Math.random() - 0.5);
    return shuffleOptions;
  }
  const fetchAllBreeds = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await response.json();
      const breedsArray = [];

      Object.entries(data.message).forEach(([mainBreed, subBreeds]) => {
        if (subBreeds.length === 0) {
          breedsArray.push(mainBreed);
        } else {
          subBreeds.forEach(subBreed => {
            breedsArray.push(`${subBreed} ${mainBreed}`);
          });
        }
      });

      setAllBreeds(breedsArray);
    } catch (error) {
      console.error('Error fetching all breeds:', error);
    }
  };

  const fetchDogImage = async () => {
    setisLoading(true);
    setSelectedOption(null);
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    setDogImage(data.message);
    const currentBreed = selectBreed(data.message); 
    setBreed(currentBreed);
    if (allBreeds.length > 0) {
      const newOptions = createOptions(currentBreed, allBreeds);
      setOptions(newOptions);
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }
  finally {
      setisLoading(false);
    }
};
useEffect(() => {
    fetchAllBreeds();
  }, []);
  useEffect(() => {
    if (allBreeds.length > 0) {
      fetchDogImage();
    }
  }, [allBreeds]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option !== breed) {
      setShowLostPopup(true);
    }
  };
  const handleRetry = () => {
    setShowLostPopup(false);
    fetchDogImage();
  };
  return (
    <div>
      <h1>Dog Matcher Game</h1>
      {isLoading ? (<p style={{ fontSize: '32px', fontWeight: 'bold' }}>Loading...</p>) : (
        <>
      <div className="main-container">
        <div><img src={DogImage}  className="Dogimage" alt="Dog" /></div>
        <div className='option-container'>
          {options.map(option => {
            let buttonStyle = {};
            if (selectedOption) {
              if (option === breed) {
                buttonStyle = { backgroundColor: 'green', color: 'white' };
              } else if (option === selectedOption) {
                buttonStyle = { backgroundColor: 'red', color: 'white' };
              }
            }
            return (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                style={buttonStyle}
              >
                {option}
              </button>
            );
          })}
          {selectedOption && (
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '15px',color:'blue' }}>
              {selectedOption === breed
                ? 'Correct!'
                : `Wrong! The correct answer is "${breed}".`}
            </p>
          )}
        </div>
      </div>
          
      <br />
      <div className='nxt-btn-container'>
          <button onClick={fetchDogImage} disabled={isLoading}className='nxt-btn' >
            SHOW NEXT
          </button>
      </div>
        </>
      )}
      {showLostPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>You Lost!</h2>
            <p>Wrong answer selected.</p>
            <button onClick={handleRetry} className="retry-btn">Try Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DogGameLogic;