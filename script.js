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
            container.innerHTML = '';
            container.appendChild(link);
        }
    });

    // --- 3. LOUPE INTERACTIVE ---
    const container = document.querySelector('.article-image-container');
    const img = document.querySelector('.article-image');
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
    }

    // --- 4. GESTION DU FORMULAIRE NEWSLETTER (BREVO) ---
    const newsletterForm = document.getElementById('sib-form');
    const successMsg = document.getElementById('sib-success');

    // On vérifie si l'utilisateur est déjà inscrit
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

            // --- SECURITE HONEYPOT (Anti-Spam) ---
            const hpField = form.querySelector('input[name*="hp"]');
            if (hpField && hpField.value !== "") {
                // Robot détecté : on simule le succès sans rien envoyer
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
                // Succès réel : on mémorise et on cache le formulaire
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

});

// --- 5. SERVICE WORKER ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log(err));
    });
}