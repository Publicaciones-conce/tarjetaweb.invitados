(function() {
    'use strict';

    // =========================================
    // 1. CONTADOR REGRESIVO (07/03/2027 19:00)
    // =========================================
    function initCountdown() {
        const countDownDate = new Date('Mar 7, 2027 19:00:00').getTime();
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;

        const update = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(update);
                countdownEl.innerHTML = '<p class="hero-date">¡Ya nos casamos! 🥂</p>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }

    // =========================================
    // 2. ANIMACIONES AL SCROLL (incluye imágenes)
    // =========================================
    function initScrollAnimations() {
        const items = document.querySelectorAll('.detail-card, .message-image-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        items.forEach(item => observer.observe(item));
    }

    // =========================================
    // 3. CORAZONES FLOTANTES
    // =========================================
    function initHearts() {
        const messageSection = document.getElementById('message');
        const heartsContainer = document.querySelector('.hearts-container');
        if (!messageSection || !heartsContainer) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heartsContainer.classList.add('active');
                } else {
                    heartsContainer.classList.remove('active');
                }
            });
        }, { threshold: 0.2 });

        observer.observe(messageSection);
    }

    // =========================================
    // 4. CONFETI DORADO ELEGANTE (30 segundos)
    // =========================================
    function initPetals() {
        const container = document.getElementById('petals-container');
        if (!container) return;
        container.innerHTML = '';

        const colors = ['#D4AF37', '#F0D080', '#FFF8E7', '#E8D5F5', '#C9A0DC', '#FFD700'];
        const numElements = 40;
        const duration = 30;

        for (let i = 0; i < numElements; i++) {
            const el = document.createElement('div');
            el.className = 'confeti';

            const size = 6 + Math.random() * 8;
            el.style.width = size + 'px';
            el.style.height = size + 'px';
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDelay = (Math.random() * 2) + 's';
            const fallDuration = 3 + Math.random() * 3;
            el.style.animationDuration = fallDuration + 's';
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
            el.style.opacity = 0.6 + Math.random() * 0.4;

            container.appendChild(el);
        }

        setTimeout(() => {
            container.style.transition = 'opacity 1.5s ease';
            container.style.opacity = '0';
            setTimeout(() => {
                container.innerHTML = '';
                container.style.opacity = '1';
            }, 1500);
        }, duration * 1000);
    }

    // =========================================
    // 5. COMPARTIR POR WHATSAPP
    // =========================================
    function initWhatsAppShare() {
        const btn = document.getElementById('whatsapp-share');
        if (!btn) return;

        btn.addEventListener('click', function() {
            const url = window.location.href;
            const message = encodeURIComponent(
                '¡Hola! Te invito a nuestra boda 💜\n\n' +
                'Camila & Mauro\n' +
                '07 de marzo de 2027 · Zaita Eventos, Cipolletti\n\n' +
                'Mirá la invitación aquí:\n' +
                url
            );
            window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
        });
    }

    // =========================================
    // 6. INICIALIZAR TODO
    // =========================================
    document.addEventListener('DOMContentLoaded', function() {
        initCountdown();
        initScrollAnimations();
        initHearts();
        initPetals();
        initWhatsAppShare();
    });

})();
