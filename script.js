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

    // Détection améliorée pour ton Pixel 9 : on vérifie le tactile ET la précision du pointeur
    const isTouchDevice = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0 || 
                          window.matchMedia("(pointer: coarse)").matches;

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
        // Pour mobile : on s'assure que l'image reste statique
        img.style.transform = 'scale(1)';
        img.style.transformOrigin = 'center center';
        // On libère l'image pour que le zoom natif "pincé de doigts" fonctionne
        img.style.pointerEvents = 'auto'; 
    }

});