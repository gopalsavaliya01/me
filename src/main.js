// DOM Elements
const header = document.getElementById('header');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const heroTitle = document.getElementById('hero-title');
const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.padding = '0.5rem 0';
    header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.padding = '1rem 0';
    header.style.boxShadow = 'none';
  }
});

// Typing animation for hero title
function startTypingAnimation() {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  
  let charIndex = 0;
  function typeWriter() {
    if (charIndex < text.length) {
      heroTitle.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    } else {
      // Remove typing class once completed
      setTimeout(() => {
        heroTitle.classList.remove('typing');
      }, 1500);
    }
  }
  
  setTimeout(typeWriter, 1000);
}

// Start typing animation when DOM content is loaded
document.addEventListener('DOMContentLoaded', startTypingAnimation);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Offset for header
        behavior: 'smooth'
      });
    }
  });
});

// Add active class to nav links based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Reveal animations for sections
function revealElements() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      section.classList.add('revealed');
    }
  });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);
