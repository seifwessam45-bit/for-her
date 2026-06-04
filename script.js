document.addEventListener('DOMContentLoaded', () => {
    // Logo Typewriter Effect Setup
    const logoEl = document.querySelector('.logo');
    let logoText = '';
    if (logoEl) {
        logoText = logoEl.textContent.trim();
        logoEl.textContent = ''; // clear initially so it's empty under the overlay
    }

    function triggerLogoTypewriter() {
        if (!logoEl || !logoText) return;
        logoEl.textContent = '';
        logoEl.classList.add('logo-typing');

        let index = 0;
        function typeLogo() {
            if (index < logoText.length) {
                logoEl.textContent += logoText.charAt(index);
                index++;
                setTimeout(typeLogo, 180);
            } else {
                setTimeout(() => {
                    logoEl.classList.remove('logo-typing');
                }, 1000);
            }
        }
        typeLogo();
    }

    // Welcome & Login Handler
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const welcomeBtn = document.getElementById('welcome-btn');
    const loginForm = document.getElementById('login-form');
    const loginUsername = document.getElementById('login-username');
    const loginPassword = document.getElementById('login-password');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const loginMessage = document.getElementById('login-message');
    const continueBtn = document.getElementById('continue-btn');

    const allowedUsers = {
        'Lujain S': '1162003',
        'Seif W': '11192004'
    };

    const countdownDate = document.getElementById('countdown-date');
    const countdownDisplay = document.getElementById('countdown-display');
    let countdownInterval = null;

    function formatCountdownValue(value) {
        return String(value).padStart(2, '0');
    }

    function updateCountdown(targetTime) {
        const now = new Date();
        const diff = targetTime - now;

        if (diff <= 0) {
            countdownDisplay.textContent = 'The selected date has arrived!';
            clearInterval(countdownInterval);
            countdownInterval = null;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownDisplay.textContent = `${formatCountdownValue(days)}d ${formatCountdownValue(hours)}h ${formatCountdownValue(minutes)}m ${formatCountdownValue(seconds)}s`;
    }

    function startCountdown(dateValue) {
        if (!dateValue) {
            countdownDisplay.textContent = 'Choose a date above to see the countdown.';
            return;
        }

        const targetDate = new Date(dateValue + 'T00:00:00');
        if (Number.isNaN(targetDate.getTime())) {
            countdownDisplay.textContent = 'Please choose a valid date.';
            return;
        }

        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        updateCountdown(targetDate);
        countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
    }

    if (countdownDate.value) {
        startCountdown(countdownDate.value);
    }

    // Show login form when user clicks Enter
    welcomeBtn.addEventListener('click', () => {
        document.querySelector('.welcome-content').classList.add('hidden');
        loginForm.classList.remove('hidden');
        loginUsername.focus();
    });

    // Handle login submit — check one of two user/password pairs
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        loginError.classList.add('hidden');
        const u = loginUsername.value.trim();
        const p = loginPassword.value.trim();

        if (!u || !p) {
            loginError.textContent = 'Please enter both username and password.';
            loginError.classList.remove('hidden');
            return;
        }

        if (!allowedUsers[u] || allowedUsers[u] !== p) {
            loginError.textContent = 'Invalid username or password.';
            loginError.classList.remove('hidden');
            return;
        }

        // Show logout button and dismiss overlay
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        if (loginMessage) {
            if (u === 'Lujain S') {
                loginMessage.querySelector('h2').textContent = 'ahlan beke gwa albe';
                loginMessage.querySelector('p:nth-of-type(1)').textContent = 'gwa htshofe ale fe albe leke w a7sase mn n7ytk w ana shyfk azy';
                loginMessage.querySelector('p:nth-of-type(2)').textContent = 'ast3de l ra7la momkn ttawl m3ake shwaya';
            } else {
                loginMessage.querySelector('h2').textContent = `أهلاً يا ${u}! ❤️`;
                loginMessage.querySelector('p:nth-of-type(1)').textContent = 'لقد تم تسجيل الدخول بنجاح، وها هو الموقع في انتظارك ليستكشفه قلبك ويستمتع بكل زاوية فيه.';
                loginMessage.querySelector('p:nth-of-type(2)').textContent = 'اضغط على الزر لتظهر لك باقي الصفحات، الصور، و الكلمات اللي جهزتها خصيصاً لك.';
            }

            // Hide the login form smoothly
            loginForm.classList.add('hidden');

            // Show the romantic message modal smoothly with scaling transition
            loginMessage.classList.remove('hidden');
        }
    });

    // Logout behavior: show welcome overlay again and clear inputs
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Show the overlay and display the sign-in form directly
            welcomeOverlay.style.animation = '';
            welcomeOverlay.classList.remove('hidden');
            document.querySelector('.welcome-content').classList.add('hidden');
            loginForm.classList.remove('hidden');
            loginUsername.value = '';
            loginPassword.value = '';
            loginError.classList.add('hidden');
            // hide logout until next successful login
            logoutBtn.classList.add('hidden');
            if (loginMessage) {
                loginMessage.classList.add('hidden');
            }
            if (logoEl) {
                logoEl.textContent = '';
            }
            loginUsername.focus();
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            // Dismiss welcome overlay with fadeOut animation
            welcomeOverlay.style.animation = 'welcomeFadeOut 0.6s ease forwards';
            setTimeout(() => {
                welcomeOverlay.classList.add('hidden');
            }, 600);

            if (loginMessage) {
                loginMessage.classList.add('hidden');
            }

            // Start typing logo when overlay begins fading out
            triggerLogoTypewriter();
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            follower.style.left = e.clientX - 16 + 'px';
            follower.style.top = e.clientY - 16 + 'px';
        }, 50);
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
    });

    // Handle hover states for links
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
            follower.style.borderColor = 'transparent';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
            follower.style.borderColor = 'var(--accent)';
        });
    });

    // Surprise Button
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseContent = document.getElementById('surprise-content');
    const brushBtn = document.getElementById('brush-btn');
    const brushContent = document.getElementById('brush-content');

    surpriseBtn.addEventListener('click', () => {
        surpriseContent.classList.toggle('hidden');
        if (!surpriseContent.classList.contains('hidden')) {
            surpriseContent.style.opacity = '0';
            setTimeout(() => {
                surpriseContent.style.opacity = '1';
            }, 10);
            surpriseBtn.textContent = 'Close';
        } else {
            surpriseBtn.textContent = 'Dose hena ya lola';
        }
    });

    brushBtn.addEventListener('click', () => {
        brushContent.classList.toggle('hidden');
        if (!brushContent.classList.contains('hidden')) {
            brushContent.style.opacity = '0';
            setTimeout(() => {
                brushContent.style.opacity = '1';
            }, 10);
            brushBtn.textContent = 'Close message';
        } else {
            brushBtn.textContent = 'Iza ma3aya 7obk';
        }
    });

    // Scroll Reveal (Simple Implementation)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.memory-card, .vibe-text, .glass-card, .wgod-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Add reveal-active class logic in JS for simplicity
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Modal preview for memory cards
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalMedia = document.querySelector('.modal-media');
    const modalClose = document.querySelector('.modal-close');
    const modalEditBtn = document.getElementById('modal-edit');
    const modalSaveBtn = document.getElementById('modal-save');
    const modalCancelBtn = document.getElementById('modal-cancel');
    const modalTextarea = document.getElementById('modal-textarea');
    let currentCard = null;

    function openModalForCard(card) {
        const titleEl = card.querySelector('.card-info h3');
        const textEl = card.querySelector('.card-info p');
        modalTitle.textContent = titleEl ? titleEl.textContent : '';
        modalText.textContent = textEl ? textEl.textContent : '';
        modalTextarea.value = textEl ? textEl.textContent : '';
        currentCard = card;
        // reset edit UI
        modalTextarea.classList.add('hidden');
        modalText.classList.remove('hidden');
        if (modalEditBtn) modalEditBtn.classList.remove('hidden');
        if (modalSaveBtn) modalSaveBtn.classList.add('hidden');
        if (modalCancelBtn) modalCancelBtn.classList.add('hidden');

        // Show image if present
        const img = card.querySelector('img.card-image');
        if (img && img.src) {
            modalMedia.innerHTML = `<img src="${img.src}" alt="${modalTitle.textContent}" class="modal-image">`;
        } else {
            const cardImageDiv = card.querySelector('.card-image');
            if (cardImageDiv) {
                const bg = window.getComputedStyle(cardImageDiv).backgroundImage;
                if (bg && bg !== 'none') {
                    modalMedia.innerHTML = `<div class="modal-image-bg" style="background-image: ${bg};"></div>`;
                } else {
                    modalMedia.innerHTML = '';
                }
            } else {
                modalMedia.innerHTML = '';
            }
        }

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('open'), 10);
    }

    function closeModal() {
        modal.classList.remove('open');
        setTimeout(() => modal.classList.add('hidden'), 250);
    }

    // Edit / Save / Cancel logic
    function enterEditMode() {
        modalTextarea.classList.remove('hidden');
        modalText.classList.add('hidden');
        if (modalEditBtn) modalEditBtn.classList.add('hidden');
        if (modalSaveBtn) modalSaveBtn.classList.remove('hidden');
        if (modalCancelBtn) modalCancelBtn.classList.remove('hidden');
        modalTextarea.focus();
    }

    function exitEditMode(save) {
        if (save && currentCard) {
            const newText = modalTextarea.value;
            modalText.textContent = newText;
            const cardText = currentCard.querySelector('.card-info p');
            if (cardText) cardText.textContent = newText;
        }
        modalTextarea.classList.add('hidden');
        modalText.classList.remove('hidden');
        if (modalEditBtn) modalEditBtn.classList.remove('hidden');
        if (modalSaveBtn) modalSaveBtn.classList.add('hidden');
        if (modalCancelBtn) modalCancelBtn.classList.add('hidden');
    }

    document.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', () => openModalForCard(card));
    });

    if (modalEditBtn) modalEditBtn.addEventListener('click', enterEditMode);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', () => exitEditMode(false));
    if (modalSaveBtn) modalSaveBtn.addEventListener('click', () => exitEditMode(true));
    // Save on Ctrl/Cmd+Enter
    if (modalTextarea) modalTextarea.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            exitEditMode(true);
        }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
