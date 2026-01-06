document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. MISE À JOUR DU COPYRIGHT ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 2. PROTECTION EMAIL UNIVERSELLE ---
    const emailIds = ['email-protected', 'email-1', 'email-2'];
    const address = 'jeanfrancoisbaron@laposte.net';

    emailIds.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            const link = document.createElement('a');
            link.href = `mailto:${address}`;
            link.textContent = address;
            // ON AJOUTE LA CLASSE ICI POUR L'ANIMATION VANILLE
            link.classList.add('poetic-link'); 
            container.innerHTML = '';
            container.appendChild(link);
        }
    });

// --- 3. LOUPE INTERACTIVE (Souris uniquement) ---
const imgContainer = document.querySelector('.article-image-container');
const img = document.querySelector('.article-image');

// Détection précise : on vérifie si l'utilisateur a une souris (pointer: fine)
const hasMouse = window.matchMedia('(pointer: fine)').matches;

if (imgContainer && img && hasMouse) {
    imgContainer.addEventListener('mousemove', (e) => {
        const rect = imgContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = 'scale(2.5)';
        img.style.cursor = 'crosshair';
    });
    
    imgContainer.addEventListener('mouseleave', () => {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
    });
}

    // --- 4. GESTION DU FORMULAIRE NEWSLETTER (BREVO) ---
    const newsletterForm = document.getElementById('sib-form');
    const successMsg = document.getElementById('sib-success');

    if (localStorage.getItem('newsletter_inscrit') === 'true') {
        if (newsletterForm) newsletterForm.style.display = 'none';
        if (successMsg) {
            successMsg.style.display = 'block';
            successMsg.textContent = "✓ Vous êtes déjà abonné à la Note de l'Atelier.";
        }
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = this;
            const hpField = form.querySelector('input[name*="hp"]');
            if (hpField && hpField.value !== "") {
                form.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';
                return;
            }

            const btn = document.getElementById('sib-submit');
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
            if (btn) btn.innerText = '...';

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                mode: 'no-cors' 
            }).then(() => {
                localStorage.setItem('newsletter_inscrit', 'true');
                form.style.display = 'none';
                if (successMsg) successMsg.style.display = 'block';
            }).catch(() => {
                form.style.opacity = '1';
                form.style.pointerEvents = 'auto';
                if (btn) btn.innerText = 'OK';
                alert("Erreur lors de l'envoi.");
            });
        });
    }

    // --- 5. GESTION DU MENU ACTIF ---
    const currentUrl = window.location.href;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref !== "#") {
            const cleanLink = linkHref.replace(".html", "");
            if (currentUrl.includes(cleanLink)) {
                link.classList.add('active');
            }
        }
    });

    const path = window.location.pathname;
    if (path === "/" || path.endsWith("index.html") || path === "") {
        const homeLink = document.querySelector('.main-nav a[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
    }

    // --- 6. GESTION DES VIDÉOS (STOP MULTIPLE PLAY) ---
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.addEventListener('play', function() {
            allVideos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });

}); // FIN DU DOMCONTENTLOADED

// --- 7. SERVICE WORKER ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log(err));
    });
}