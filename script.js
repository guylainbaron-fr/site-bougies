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
    // Ce code ne s'exécutera JAMAIS sur ton Pixel 9
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
    // Sécurité Mobile : on s'assure que l'image est inerte
    img.style.transform = 'none';
    // On s'assure que le pointer-events n'est pas sur 'none' 
    // pour ne pas gêner le défilement natif
    img.style.pointerEvents = 'auto';
}

});