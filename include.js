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
            })
            .catch(error => {
                element.innerHTML = '<p>Error loading content</p>';
            });
    });
}
document.addEventListener('DOMContentLoaded', includeHTML);
