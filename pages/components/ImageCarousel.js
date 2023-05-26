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
                <img src="/Cleopatra.jpg" alt="Cleopatra" />
                <img src="/Socrates.jpg" alt="Socrates" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/alexTheGreat.jpg" alt="Alexander the Great" />
                <img src="/Antionette.jpg" alt="Marie Antionette" />
                <img src="/GenghisKhan.jpg" alt="Genghis Khan" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Galileo.jpg" alt="Galileo" />
                <img src="/Sacagawea.jpg" alt="Sacagawea" />
                <img src="/HarrietTubman.jpg" alt="Harriet Tubman" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/NapoleonTest.png" alt="Napoleon" />
                <img src="/MansaMusaRS.jpg" alt="Mansa Musa" />
                <img src="/Gandhi-2.jpg" alt="Ghandi" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/DaVinciRS.jpg" alt="Leonardo Davinci" />
                <img src="/FridaKahlo-Resized.jpg" alt="Frida Kahlo" />
                <img src="/Confucius.jpg" alt="Confucius" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/Einstein.jpg" alt="Albert Einstein" />
                <img src="/QueenNzinga.jpg" alt="Queen Nzinga" />
                <img src="/Lincoln.jpg" alt="Abraham Lincoln" />
                {/* ...more images */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img src="/williamShake.jpg" alt="William Shakespeare" />
                <img src="/QueenElizabeth1.jpg" alt="Queen Elizabeth 1" />
                <img src="/frederickDouglas.jpg" alt="Frederick Douglas" />
                {/* ...more images */}
            </div>
            {/* ...more divs */}
        </Carousel>
    );
}

export default ImageCarousel;
