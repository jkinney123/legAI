import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageCarousel() {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={9000} // Adjust this to slow down the rotation
            transitionTime={5000} // Adjust this to slow down the transition
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Washington.jpg" alt="George Washington" />
                <img src="/Cleopatra.jpg" alt="Marie Antionette" />
                <img src="/Socrates.jpg" alt="William Shakespeare" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/AlexTheGreat.jpg" alt="Alexander the Great" />
                <img src="/Antionette.jpg" alt="Cleopatra" />
                <img src="/GenghisKhan.jpg" alt="Genghis Khan" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Galileo.jpg" alt="Galileo" />
                <img src="/sacagawea.jpg" alt="Socrates" />
                <img src="/HarrietTubman.jpg" alt="Sacagawea" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/NapoleonTest.png" alt="Frederick Douglas" />
                <img src="/MansaMusaRS.jpg" alt="Socrates" />
                <img src="/.jpg" alt="Queen Elizabeth 1" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/DaVinciRS.jpg" alt="Frederick Douglas" />
                <img src="/FridaKahlo-Resized.jpg" alt="Socrates" />
                <img src="/Confucius.jpg" alt="Queen Elizabeth 1" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Einstein.jpg" alt="Frederick Douglas" />
                <img src="/QueenNzinga.jpg" alt="Socrates" />
                <img src="/Lincoln.jpg" alt="Queen Elizabeth 1" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/WilliamShake.jpg" alt="Frederick Douglas" />
                <img src="/QueenElizabeth1.jpg" alt="Socrates" />
                <img src="/frederickDouglas.jpg" alt="Queen Elizabeth 1" />
                {/* ...more images */}
            </div>
            {/* ...more divs */}
        </Carousel>
    );
}

export default ImageCarousel;
