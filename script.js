document.addEventListener('DOMContentLoaded', function () {
    // ===== Menú hamburguesa =====
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'auto';
    }

    function openMenu() {
        menuToggle.setAttribute('aria-expanded', 'true');
        mainNav.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    menuToggle.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        expanded ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ===== Dropdown accesible en desktop =====
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(drop => {
        drop.addEventListener('mouseenter', () => {
            const menu = drop.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'block';
        });
        drop.addEventListener('mouseleave', () => {
            const menu = drop.querySelector('.dropdown-menu');
            if (menu) menu.style.display = 'none';
        });
    });

    // ===== Slider de imágenes =====
    function sliderInit() {
        const slidesWrapper = document.querySelector('.slides-wrapper');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const dotsContainer = document.querySelector('.slider-dots');

        if (!slidesWrapper || !slides.length || !prevBtn || !nextBtn || !dotsContainer) return;

        let currentIndex = 0;
        let autoPlayInterval;
        let isAnimating = false;

        function createDots() {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }

        function updateDots() {
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function updateActiveSlide() {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentIndex);
            });
        }

        function goToSlide(index) {
            if (isAnimating || index === currentIndex) return;
            isAnimating = true;
            currentIndex = (index + slides.length) % slides.length;
            slidesWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateActiveSlide();
            updateDots();
            setTimeout(() => isAnimating = false, 500);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex - 1);
            startAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(currentIndex + 1);
            startAutoPlay();
        });

        slidesWrapper.addEventListener('mouseenter', stopAutoPlay);
        slidesWrapper.addEventListener('mouseleave', startAutoPlay);

        createDots();
        updateActiveSlide();
        updateDots();
        startAutoPlay();
    }

    // ===== Mensaje de bienvenida según la hora =====
    function updateWelcomeMessage() {
        const hour = new Date().getHours();
        const welcomeMessage = document.querySelector('.welcome-message');
        if (!welcomeMessage) return;

        const greeting =
            hour < 12 ? '¡Buenos días!' :
                hour < 18 ? '¡Buenas tardes!' :
                    '¡Buenas noches!';

        welcomeMessage.textContent = greeting;
    }

    // Inicializar
    sliderInit();
    updateWelcomeMessage();
    setInterval(updateWelcomeMessage, 3600000); // Cada hora
});

