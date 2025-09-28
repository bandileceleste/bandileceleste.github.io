document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                const category = card.dataset.category;
                card.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
            });
        });
    });

    // Contact form handling
    const form = document.querySelector('.contact-form');
    const status = document.getElementById('status-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            status.style.display = "block";
            status.style.color = "black";
            status.textContent = "Sending...";

            emailjs.sendForm('service_5it809u', 'template_4qyi00c', this)
                .then(() => {
                    status.style.color = "white";
                    status.textContent = "Email sent successfully!";
                    form.reset();
                }, (error) => {
                    status.style.color = "red";
                    status.textContent = "Failed to send email. Check console.";
                    console.error(error);
                });
        });
    }

    // Initialize EmailJS
    emailjs.init("tFrcFFrmJylXfRFa9"); // your public key
});
