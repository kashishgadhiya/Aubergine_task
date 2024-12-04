import React from 'react';
import * as htmlToImage from 'html-to-image';

const Card = ({ university, id }) => {
  const handleDownload = async () => {
    const element = document.getElementById(id);
    if (element) {
      
        const dataUrl = await htmlToImage.toJpeg(element, { quality: 0.95 });
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${id}.jpeg`;
        link.click();
      
    }
  };

  return (
    <div
      id={id}
      style={{
        border: '1px solid #ccc',
        padding: '10px 20px',
        borderRadius: '5px',
        width: '200px',
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
      }}
    >
      <h3>{university.name}</h3>
      <a
        href={university.web_pages[0]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'block', marginBottom: '10px', color: 'blue' }}
      >
        Website
      </a>
      <button
        onClick={handleDownload}
        style={{
          background: '#007BFF',
          color: '#fff',
          padding: '5px 10px',
          border: 'none',
          margin:"20px",
          borderRadius: '3px',
          cursor: 'pointer',
        }}
      >
        Download
      </button>
    </div>
  );
};

export default Card;
