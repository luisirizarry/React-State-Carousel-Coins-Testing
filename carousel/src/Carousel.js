import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const [isLeftHidden, setLeftHidden] = useState(true);
  const [isRightHidden, setRightHidden] = useState(false);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx((currIdx) => currIdx + 1);
  }
  
  function goBackward() {
    setCurrCardIdx((currIdx) => currIdx - 1);
  }

  function hideArrow(imageNumber) {
    if (imageNumber === 0) { 
      setLeftHidden(true);
    } else {
      setLeftHidden(false);
    }
  
    if (imageNumber === total - 1) { 
      setRightHidden(true);
    } else {
      setRightHidden(false);
    }
  }
  

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        <i
          className="bi bi-arrow-left-circle"
          style={{visibility: isLeftHidden ? "hidden" : "visible"}}
          onClick={() => {
            const nextIdx = currCardIdx - 1; 
            goBackward();
            hideArrow(nextIdx);
          }}
        />
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        <i
          className="bi bi-arrow-right-circle"
          style={{visibility: isRightHidden ? "hidden" : "visible"}}
          onClick={() => {
            const nextIdx = currCardIdx + 1; 
            goForward();
            hideArrow(nextIdx);
          }}
          
        />
      </div>
    </div>
  );
}

export default Carousel;
