document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. MISE À JOUR DU COPYRIGHT ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 2. PROTECTION EMAIL (ANTI-SPAM) ---
    const emailContainer = document.getElementById('email-protected');
    if (emailContainer) {
        const user = 'jeanfrancoisbaron';
        const domain = 'laposte.net';
        const address = `${user}@${domain}`;
        
        const link = document.createElement('a');
        link.href = `mailto:${address}`;
        link.textContent = address;

        emailContainer.innerHTML = ''; 
        emailContainer.appendChild(link);
    }

    // --- 3. LOUPE INTERACTIVE (ARTICLE PRESSE) ---
    const container = document.querySelector('.article-image-container');
    const img = document.querySelector('.article-image');

    // Détection stricte d'un appareil tactile (Pixel 9, iPhone, Tablette)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (container && img && !isTouchDevice) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(2.5)';
        });

        container.addEventListener('mouseleave', () => {
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
        });
    } else if (img) {
        img.style.transform = 'none';
        img.style.pointerEvents = 'auto';
    }

});

// --- 4. ENREGISTREMENT DU SERVICE WORKER (PWA) ---
// Placé à l'extérieur pour ne pas retarder le chargement visuel
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('PWA prête (SW enregistré)'))
            .catch(err => console.log('Erreur PWA SW:', err));
    });
}

/* ==========================================================
   GESTION DU FORMULAIRE NEWSLETTER (BREVO)
   Empêche le rechargement et affiche un message de succès
   ========================================================== */
const newsletterForm = document.getElementById('sib-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        const btn = document.getElementById('sib-submit');
        const successMsg = document.getElementById('sib-success');
        
        // 1. Verrouillage visuel du formulaire
        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none';
        btn.innerText = '...';

        const formData = new FormData(form);

        // 2. Envoi des données en arrière-plan
        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' 
        }).then(() => {
            // 3. Succès : On remplace le formulaire par le message vert
            form.style.display = 'none';
            successMsg.style.display = 'block';
        }).catch(() => {
            // 4. Gestion d'erreur (problème réseau)
            form.style.opacity = '1';
            form.style.pointerEvents = 'auto';
            btn.innerText = 'OK';
            alert("Erreur lors de l'envoi. Veuillez réessayer.");
        });
    });
}