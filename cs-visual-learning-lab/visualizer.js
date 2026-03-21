document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    /**
     * Theme Management
     */
    function updateToggleUI(theme) {
        if (!themeIcon || !themeText) return;
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Dark Mode';
        }
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleUI(theme);
        // Dispatch event for components that might need to react
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    /**
     * UI Utilities
     */
    window.showToast = function(msg) {
        const toast = document.getElementById('toast');
        const toastInner = toast.querySelector('.toast');
        if (!toast || !toastInner) return;
        
        toastInner.textContent = msg;
        toastInner.classList.add('show');
        
        setTimeout(() => {
            toastInner.classList.remove('show');
        }, 3000);
    };

    window.delay = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
});
