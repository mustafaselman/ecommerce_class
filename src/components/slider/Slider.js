//// home sayfasındaki slider i yapacağımız yer
import React, { useEffect, useState } from 'react'
import "./Slider.scss"
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"
import {sliderData} from "./slider-data"

const Slider = () => {

  const [currentSlide, setCurrentSlide] = useState(0)

  // data genişliğimiz 4 tür fakat indexler 0,1,2,3 şeklindedir.
  const slideLength = sliderData.length

  // otomatik kaydırmayı kontrol edebiliriz.
  const autoScroll = true;

  // kaydırma süreesini kontrol edebiliriz.
  let intervalTime = 5000;

  // arrow right a bastığımızda sağa slide değişimi için kullanılır. eğer currentslide 3 ise bir sonraki 0 olacak yoksa 1 arttır
  const nextSlide = () => {setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)}

  // arrow left e bastığımızda sola slide değişimi için kullanılır. eğer currentslide 0 ise bir sonraki 3 olacak yoksa 1 azalt
  const prevSlide = () => {setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)}

  // sayfa her açılışında slider ı sıfırlıyor
  useEffect(() => {
    setCurrentSlide(0)
  }, [])
  
  // otomatik slider ı kontrol eder. autoscroll ve intervaltime a göre ayarlanabilir. nextSlide fonksiyonu gibi çalışır, currentslide sürekli ilerler.interval her saymada sıfırlanır. currentSlide sürekli değiştiği için useEffect sürekli çalışır.
  useEffect(() => {
    let slideInterval;
    if(autoScroll) {
      slideInterval = setInterval(() => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
      },intervalTime);
    }
    return () => clearInterval(slideInterval);
  }, [autoScroll,intervalTime,currentSlide,slideLength])

  return (
    <div className="slider">
      
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>

      {sliderData.map((slide, index) =>
            {
                const {image,heading,desc} = slide
                return (
                    <div key={index} className={index === currentSlide ? "slide current" : "slide"}>
                        {index === currentSlide && (
                            <>
                            <img src={image} alt="slide"/>
                            <div className='content'>
                                <h2>{heading}</h2>
                                <p>{desc}</p>
                                <hr/>
                                <a href="#product"
                                className='--btn --btn-primary'>Shop Now</a>
                            </div>
                            </>
                        )
                        }
                    </div>
                )
            })}

    </div>
  )
}

export default Slider