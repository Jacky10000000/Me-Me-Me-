document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const inspirationsSection = document.getElementById('inspirationsSection');

    toggleButton.addEventListener('click', function() {
        if (inspirationsSection.classList.contains('hidden')) {
            inspirationsSection.classList.remove('hidden');
            inspirationsSection.classList.add('visible');
            toggleButton.textContent = 'Hide Inspirations';
        } else {
            inspirationsSection.classList.remove('visible');
            inspirationsSection.classList.add('hidden');
            toggleButton.textContent = 'Show Inspirations';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const largeImage = document.querySelector('.large-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            openModal(this.src);
        });
    });

    largeImage.addEventListener('click', function() {
        openModal(this.src);
    });

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <span class="close">&times;</span>
        <div class="modal-content">
            <img>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.close');

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    function openModal(src) {
        modalImg.src = src;
        modal.style.display = 'block';
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});



/*------------------------------------------------
                FLASHLIGHT FUNCTION 
 -------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('.scene');
    const navSection = document.querySelector('.nav');
    const mythSection = document.querySelector('.theMyth');

    if (scene && navSection && mythSection) {
        scene.addEventListener('animationend', function() {
            navSection.classList.remove('hidden');
            mythSection.classList.remove('hidden');
        });
    }

    const flashlight = document.createElement('div');
    flashlight.classList.add('flashlight');
    document.body.appendChild(flashlight);

    document.addEventListener('mousemove', function(e) {
        flashlight.style.left = `${e.pageX - flashlight.offsetWidth / 2}px`;
        flashlight.style.top = `${e.pageY - flashlight.offsetHeight / 2}px`;

        const elements = document.querySelectorAll('h1, h2, h3, h4, p, figcaption, nav a');
        let flashlightZIndex = -1; // Initial z-index for the flashlight

        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const flashlightRect = flashlight.getBoundingClientRect();
            const isIntersecting = !(rect.right < flashlightRect.left || 
                                      rect.left > flashlightRect.right || 
                                      rect.bottom < flashlightRect.top || 
                                      rect.top > flashlightRect.bottom);

            if (isIntersecting) {
                const letters = el.textContent.split('');
                el.innerHTML = '';
                letters.forEach(letter => {
                    const span = document.createElement('span');
                    span.textContent = letter;
                    el.appendChild(span);
                });
                el.querySelectorAll('span').forEach(span => {
                    const spanRect = span.getBoundingClientRect();
                    const isSpanIntersecting = !(spanRect.right < flashlightRect.left || 
                                                 spanRect.left > flashlightRect.right || 
                                                 spanRect.bottom < flashlightRect.top || 
                                                 spanRect.top > flashlightRect.bottom);

                    span.style.color = isSpanIntersecting ? '#000' : '#fff';
                    span.style.backgroundColor = isSpanIntersecting ? '#FFD37E' : 'transparent';

                    // Adjust the z-index of the flashlight based on its position relative to the text elements
                    if (isSpanIntersecting) {
                        flashlightZIndex = Math.max(flashlightZIndex, parseInt(el.style.zIndex || 0) - 1);
                    }
                });
            } else {
                el.innerHTML = el.textContent;
                el.style.color = '#fff';
            }
        });

        // Set the z-index of the flashlight to be below the text elements it's hovering over
        flashlight.style.zIndex = flashlightZIndex;
    });
});

/*-------------------------------------------------------------------------
                                  CARASEL
---------------------------------------------------------------------------*/

// carousel.js

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    const setSlidePosition = (slide, index) => {
        slide.style.left = `${index * 100}%`;
    };

    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = `translateX(-${targetSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        
        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
        }
    });

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        
        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
        }
    });
});