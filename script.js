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

        // --- CORRECTION ICI ---
        // On vide le texte "[Activer JavaScript...]" avant d'ajouter le lien
        emailContainer.innerHTML = ''; 
        emailContainer.appendChild(link);
    }

    // --- 3. LOUPE INTERACTIVE (ARTICLE PRESSE) ---
    const container = document.querySelector('.article-image-container');
    const img = document.querySelector('.article-image');

    if (container && img) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            
            // Calcul précis de la position de la souris en % dans l'image
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Le point de focus suit la souris et l'image grandit
            img.style.transformOrigin = `${x}% ${y}%`;
            img.style.transform = 'scale(2.5)';
        });

        container.addEventListener('mouseleave', () => {
            // L'image reprend sa place et sa taille initiale doucement
            img.style.transformOrigin = 'center center';
            img.style.transform = 'scale(1)';
        });
    }
});