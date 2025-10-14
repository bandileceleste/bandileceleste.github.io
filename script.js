// Wait until the page is fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = function(event) {
            event.preventDefault(); // stop default jump
            const targetId = this.getAttribute('href'); // get section id
            const targetElement = document.querySelector(targetId); // find the section
            targetElement.scrollIntoView({ behavior: 'smooth' }); // smooth scroll
        };
    }

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].onclick = function() {

            // Remove 'active' from all buttons
            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove('active');
            }

            // Add 'active' to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            // Show/hide project cards
            for (let k = 0; k < projectCards.length; k++) {
                const category = projectCards[k].getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    projectCards[k].style.display = 'block';
                } else {
                    projectCards[k].style.display = 'none';
                }
            }
        };
    }

    // Contact form handling
    const form = document.querySelector('.contact-form');
    const status = document.getElementById('status-message');

    if (form) {
        form.onsubmit = function(event) {
            event.preventDefault(); // prevent page reload

            // Show sending status
            status.style.display = 'block';
            status.style.color = 'black';
            status.textContent = 'Sending...';

            // Send form via EmailJS
            emailjs.sendForm('service_5it809u', 'template_4qyi00c', this)
                .then(function() {
                    status.style.color = 'white';
                    status.textContent = 'Email sent successfully!';
                    form.reset();
                }, function(error) {
                    status.style.color = 'red';
                    status.textContent = 'Failed to send email. Check console.';
                    console.error(error);
                });
        };
    }

    // Smooth scroll for navbar links
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Back to Top button functionality
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initialize EmailJS
    emailjs.init('tFrcFFrmJylXfRFa9'); // your public key

    // Mobile Navbar Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('hidden'); // show/hide mobile menu
            menuToggle.classList.toggle('active'); // optional rotation animation
        });

        // Auto-close menu when a link is clicked (mobile only)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navLinks.classList.add('hidden');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
});
