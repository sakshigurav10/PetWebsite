import React from 'react';

function DogImageList({ images }) {
  return (
    <div
      id="datImages"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 images per row
        gap: '10px', // space between images
        justifyItems: 'center', // center images horizontally
      }}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt="Dog"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  );
}


export default DogImageList;