import React from 'react';
import { useState,useEffect } from 'react';

function DogGameLogic()
 {
  const [DogImage, setDogImage] = useState('');  
  const [isLoading, setisLoading] = useState(true);
  const fetchDogImage = async () => {
    setisLoading(true);
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    setDogImage(data.message);
  } catch (error) {
    console.error('Error fetching image:', error);
  }
  finally {
      setisLoading(false);
    }
};
useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div>
      <h1>Dog Matcher Game</h1>
      {isLoading ? (<p style={{ fontSize: '32px', fontWeight: 'bold' }}>Loading...</p>) : (<img src={DogImage} alt="Dog" width="400" />)}
      <br />
      <button onClick={fetchDogImage}>SHOW NEXT</button>
    </div>
  );
}

export default DogGameLogic;