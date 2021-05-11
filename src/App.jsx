import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import FileBase from 'react-file-base64';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [page, setPagePosition] = useState({ x: 200, y: 600 });

  const dispatch = useDispatch();

  // trigger redux action and store image
  const handleSubmit = (e) => {
   e.preventDefault();
    dispatch({ type: 'CREATE', payload: data })
  } 
    

  //* FILTERS FOR UPLOADED IMAGE
  const handleImage = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];

    // pass the file info in an image
    let img = new Image();
    img.src = window.URL.createObjectURL(file);

    // pickup the canvas
    const canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');

    // once the image loads...
    img.onload = (e) => {
      canvas.width = img.width; // ...assigns image's width to canvas
      canvas.height = img.height; // ...assigns image's height to canvas

      // create the first filtered Image
      ctx.filter = 'sepia(1) saturate(2))';
      ctx.drawImage(img, 0, 0); // draws the image on canvas

      // create the link for the modified Image
      const image1 = canvas.toDataURL();

      // clean, draw again and apply the second filter
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'sepia(2) contrast(90) hue-rotate(100deg)';
      ctx.drawImage(img, 0, 0); // draws the image on canvas

      // create the link for the modified Image
      const image2 = canvas.toDataURL();

      // and again the same x3

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'blur(5000) contrast(90)';
      ctx.drawImage(img, 0, 0); 
      const image3 = canvas.toDataURL();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'invert(30%) contrast(9) grayscale(100%)';
      ctx.drawImage(img, 0, 0);
      const image4 = canvas.toDataURL();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'invert(30%) contrast(3) saturate(280%)';
      ctx.drawImage(img, 0, 0);
      const image5 = canvas.toDataURL();

      setData([img.src, image1, image2, image3, image4, image5]);
      
    };
  };

  //* display all images
  const names = ['top', 'side', 'cover', 'spine', 'back', 'bottom'];
  const imageList = data.map((src, i) => {
    return <img className={`face ${names[i]}`} src={src} alt=""></img>;
  });


  //* CUBE
  const moveCube = (e) => {
    // set up parameters where the cubes will move
    const x = e.pageX;
    const y = e.pageY;

    setPagePosition({ x: e.pageX, y: e.pageY });
    if (window.innerWidth < 500) {
      setPosition({ x: ((x - window.innerWidth / 2) * 2), y: ((y - window.innerHeight / 2) * 2) });
    } else {
      setPosition({ x: ((x - window.innerWidth / 2) * 0.4), y: ((y - window.innerHeight / 2) * 0.4) });
    };
  };

  // move cube triggered by mousemove
  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
    // eslint-disable-next-line
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", moveCube);
    document.addEventListener("touchmove", moveCube);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", moveCube);
    document.removeEventListener("touchmove", moveCube);
  };

  // cube style
  let cubeStyle = {
    transform: `rotateX(${position.y}deg) rotateY(${position.x}deg) `,
    left: `${page.x}px`,
    top: `${page.y}px`
  }

  return (
    <>
      <div className='cube' style={cubeStyle}>{imageList}</div>

      <div>
        
        <form
        className='form'
        onSubmit={(e) => handleSubmit(e)}
        autoComplete='off'
        noValidate>
        {/* <FileBase type='file' multiple={false} onDone={({ base64 }) => setData({ ...data, selectedFile: base64 })} /> */}
          
        <h2>1. Choose your favourite image from your personal computer</h2>
          <input
            className='input'
            type='file'
            id='image'
            name='image'
            accept='image/png, image/jpeg'
            onChange={handleImage}
          />

        <h2>2. Press "submit" to manage its state with Redux!</h2>
          <input
            className='input'
            type='submit' />
      </form>
      </div>
      
      <canvas id='canvas'>You can hide this</canvas>
    </>
  );
};

export default App;
