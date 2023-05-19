import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageCarousel() {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={10000} // Adjust this to slow down the rotation
            transitionTime={2000} // Adjust this to slow down the transition
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Washington.jpg" alt="George Washington" />
                <img src="/JoanOfArc.png" alt="Joan of Arc" />
                <img src="/williamShake.jpg" alt="William Shakespeare" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/AlexTheGreat.jpg" alt="Alexander the Great" />
                <img src="/Socrates.jpg" alt="Alexander the Great" />
                <img src="/GenghisKhan.jpg" alt="Alexander the Great" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/AlexTheGreat.jpg" alt="Alexander the Great" />
                <img src="/Socrates.jpg" alt="Alexander the Great" />
                <img src="/GenghisKhan.jpg" alt="Alexander the Great" />
                {/* ...more images */}
            </div>
            {/* ...more divs */}
        </Carousel>
    );
}

export default ImageCarousel;
