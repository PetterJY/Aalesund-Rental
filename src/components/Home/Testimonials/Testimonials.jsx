import React, { useState, useEffect } from 'react';
import testimonialPersonImg from '../../../resources/images/testimonialPerson.png';
import { CaretLeft, CaretRight, Quotes } from '@phosphor-icons/react';
import './Testimonials.css'

const Testimonials = () => {
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3, 4]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  const handleNextClick = () => {
    if (isButtonDisabled) return;

    if (autoPlayInterval) clearInterval(autoPlayInterval);
    const interval = setInterval(() => {
      handlePreviousClick();
    }, 5000);
    setAutoPlayInterval(interval);

    setCardOrder(prev => [...prev.slice(1), prev[0]]);
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  const handlePreviousClick = () => {
    if (isButtonDisabled) return;

    setCardOrder(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  const pauseAutoplay = () => {
    console.log("paused autoplay!")
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
  };

  const resumeAutoplay = () => {
    console.log("resumed autoplay!")
    if (!autoPlayInterval) {
      const interval = setInterval(() => {
        handleNextClick();
      }, 7500);
      setAutoPlayInterval(interval);
    }
  }

  const isCardActive = (cardId) => {
    const position = cardOrder.indexOf(cardId);
    return position >= 1 && position <= 3;
  }

  const getCardPosition = (cardId) => {
    const position = cardOrder.indexOf(cardId);
    if (position === 0) return 'hidden-card-left';
    if (position === 1) return 'left-card';
    if (position === 2) return 'center-card';
    if (position === 3) return 'right-card';
    if (position === 4) return 'hidden-card-right';
  }

  const shouldIndicatorBeActive = (cardId) => {
    const position = cardOrder.indexOf(cardId);
    return position === 2;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handlePreviousClick();
    }, 5000);

    setAutoPlayInterval(interval);

    return () => {
      clearInterval(interval);
    }
  }, []);


  return (
  <div className="testimonials-wrapper">
      <div className="testimonials-slideshow">
        <h1>What Our Customers Say</h1>
          <div className="testimonials-with-controls">
          <div className="testimonials">
          <div
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            className={`testimonial ${isCardActive(0) ? 'active' : ''} ${getCardPosition(0)}`} id="testimonial-1">
            <Quotes weight="fill" className="quote-icon"/>
            <p className="testimonial-quote">"Great service and friendly staff!"</p>
            <p className="testimonial-name">- John Doe</p>
            <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
          </div>
          <div
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            className={`testimonial ${isCardActive(1) ? 'active' : ''} ${getCardPosition(1)}`}
            id="testimonial-2">
            <Quotes weight="fill" className="quote-icon"/>
            <p className="testimonial-quote">"Rented a Chevrolet Pitana Monchen, I drove it from Vigra to Sula and it drove just like my old car at home! 10/10"</p>
            <p className="testimonial-name">- Jane Smith</p>
            <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
          </div>
          <div
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            className={`testimonial ${isCardActive(2) ? 'active' : ''} ${getCardPosition(2)}`}
            id="testimonial-3">
            <Quotes weight="fill" className="quote-icon"/>
            <p className="testimonial-quote">"Sometimes cars make me happy, other times Ålesund Rental makes me even happier!"</p>
            <p className="testimonial-name">- John Doe</p>
            <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
          </div>
          <div
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            className={`testimonial ${isCardActive(3) ? 'active' : ''} ${getCardPosition(3)}`}
            id="testimonial-4">
            <Quotes weight="fill" className="quote-icon"/>
            <p className="testimonial-quote">"أنا أحب القيادة."</p>
            <p className="testimonial-name">- Jonas Pettersen</p>
            <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
          </div>
          <div
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            className={`testimonial ${isCardActive(4) ? 'active' : ''} ${getCardPosition(4)}`}
            id="testimonial-5">
            <Quotes weight="fill" className="quote-icon"/>
            <p className="testimonial-quote">"Car goes "Wrooooooom""</p>
            <p className="testimonial-name">- John Doe</p>
            <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
          </div>
        </div>
          <div className="testimonial-controls">
            <div className="indicators">
              <div className={`indicator ${shouldIndicatorBeActive(0) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(1) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(2) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(3) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(4) ? 'active' : ''}`}/>
            </div>
            <div className="buttons">
              <button className={`prev-button ${isButtonDisabled ? 'disabled' : ''}`}
                      onClick={handlePreviousClick}
                      disabled={isButtonDisabled}>
                <CaretLeft size={18} weight="bold" className="caret-icon" id="caret-previous"/>
              </button>
              <button className={`next-button ${isButtonDisabled ? 'disabled' : ''}`}
                      onClick={handleNextClick}
                      disabled={isButtonDisabled}>
                <CaretRight size={18} weight="bold" className="caret-icon" id="caret-next"/>
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Testimonials;
