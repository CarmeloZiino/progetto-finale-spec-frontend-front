//Import React
import { useState, useEffect } from "react";

//Import Immagini
import imgUno from "../assets/carousel/uno.jpg";
import imgDue from "../assets/carousel/due.jpg";
import imgTre from "../assets/carousel/tre.jpg";
import imgQuattro from "../assets/carousel/quattro.jpg";

export default function Carousel() {
  const images = [imgUno, imgDue, imgTre, imgQuattro];
  const [currIndex, setCurrIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(images.length - 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currIndex);
      setCurrIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [currIndex]);

  return (
    <div className="carousel  mb-5">
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item ${
              index === currIndex ? "active" : index === prevIndex ? "exit" : ""
            }`}
          >
            <img src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
