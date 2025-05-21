import React from 'react';
import { useState,useEffect } from 'react';

function DogGameLogic()
 {
  const [DogImage, setDogImage] = useState(''); 
  const [breed, setBreed] = useState(''); 
  const [allBreeds, setAllBreeds] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
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
  };

  return (
    <div>
      <h1>Dog Matcher Game</h1>
      {isLoading ? (<p style={{ fontSize: '32px', fontWeight: 'bold' }}>Loading...</p>) : (<><img src={DogImage} alt="Dog" width="400" />
      <div>
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
        </div>

        {selectedOption && (
          <p style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>
            {selectedOption === breed
              ? 'Correct!'
              : `Wrong! The correct answer is "${breed}".`}
          </p>
        )}

          <br />
          <button onClick={fetchDogImage} disabled={isLoading}>
            SHOW NEXT
          </button>
        </>
      )}
    </div>
  );
}

export default DogGameLogic;