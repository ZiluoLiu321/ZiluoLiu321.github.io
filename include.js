function getTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    elements.forEach(element => {
        const file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                const yearEl = element.querySelector('#footer-year');
                if (yearEl) yearEl.textContent = new Date().getFullYear();

                // wire theme toggle after footer loads
                const toggle = document.getElementById('theme-toggle');
                if (toggle) {
                    toggle.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
                    toggle.addEventListener('click', () => {
                        const current = document.documentElement.getAttribute('data-theme');
                        const next = current === 'dark' ? 'light' : 'dark';
                        applyTheme(next);
                        toggle.textContent = next === 'dark' ? 'Light' : 'Dark';
                    });
                }
            })
            .catch(error => {
                element.innerHTML = '<p>Error loading content</p>';
            });
    });
}

applyTheme(getTheme());
document.addEventListener('DOMContentLoaded', includeHTML);
