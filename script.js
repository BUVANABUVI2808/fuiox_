/* ================================================
   FUIOX TECHNOLOGIES - PREMIUM JAVASCRIPT
   Advanced Interactivity & Performance Optimization
   ================================================ */

// Utility: Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ================================================
// NAVBAR SCROLL DETECTION
// ================================================

const navbar = document.getElementById("mainNav");
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

window.addEventListener(
  "scroll",
  throttle(() => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, 100),
);

// Close navbar when link is clicked
document.querySelectorAll(".navbar-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  });
});

// ================================================
// SMOOTH SCROLL BEHAVIOR
// ================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Skip modal anchors
    if (href === "#" || href.includes("[")) return;

    const target = document.querySelector(href);

    if (target) {
      e.preventDefault();

      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ================================================
// SCROLL REVEAL ANIMATIONS
// ================================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe service cards on scroll
document.querySelectorAll(".service-card-wrapper").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Observe case cards on scroll
document.querySelectorAll(".case-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Observe team cards on scroll
document.querySelectorAll(".team-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Observe testimonial cards on scroll
document.querySelectorAll(".testimonial-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Observe FAQ items on scroll
document.querySelectorAll(".accordion-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-30px)";
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(item);
});

// Observe pricing cards on scroll
document.querySelectorAll(".pricing-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "scale(0.95)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// ================================================
// FORM HANDLING
// ================================================

const contactForm = document.getElementById("contactForm");
const contactModal = document.getElementById("contactModal");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
      name: document.getElementById("name").value,
      company: document.getElementById("company").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      challenge: document.getElementById("challenge").value,
      timestamp: new Date().toISOString(),
    };

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // Simulate network delay
    setTimeout(() => {
      // In production, send to backend API
      console.log("Form submitted:", formData);

      // Show success feedback
      submitButton.textContent = "✓ Submitted Successfully!";
      submitButton.classList.add("btn-success");

      // Reset form after 1.5 seconds
      setTimeout(() => {
        contactForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        submitButton.classList.remove("btn-success");

        // Close modal
        const modal = bootstrap.Modal.getInstance(contactModal);
        if (modal) {
          modal.hide();
        }
      }, 1500);
    }, 1200);
  });
}

// ================================================
// COUNTER ANIMATION FOR METRICS
// ================================================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animate metrics when they come into view
const metricsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const value = entry.target.textContent;
        const numericValue = parseInt(value.replace(/\D/g, ""));

        if (!isNaN(numericValue)) {
          entry.target.dataset.animated = true;
          animateCounter(entry.target, numericValue, 2000);
        }
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".metric-value").forEach((metric) => {
  metricsObserver.observe(metric);
});

// ================================================
// ACTIVE NAV LINK ON SCROLL
// ================================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');

const updateActiveLink = throttle(() => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}, 100);

window.addEventListener("scroll", updateActiveLink);

// ================================================
// TESTIMONIALS CAROUSEL ROTATION
// ================================================
document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".vision-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
        } else {
          /* reverse animation when scrolling away */
          section.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.2 /* starts at 20% */,
    },
  );

  observer.observe(section);
});
document.addEventListener("DOMContentLoaded", function () {
  const services = document.querySelector(".services-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          services.classList.add("in-view");
        } else {
          services.classList.remove("in-view"); // reverse
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(services);
});
document.addEventListener("DOMContentLoaded", function () {
  const process = document.querySelector(".process-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          process.classList.add("in-view");
        } else {
          /* reverse when scroll up */
          process.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(process);
});

document.addEventListener("DOMContentLoaded", function () {
  const security = document.querySelector(".security-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          security.classList.add("in-view");
        } else {
          /* reverse on scroll up */
          security.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(security);
});

document.addEventListener("DOMContentLoaded", function () {
  const team = document.querySelector(".team-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          team.classList.add("in-view");
        } else {
          team.classList.remove("in-view"); // reverse
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(team);
});

document.addEventListener("DOMContentLoaded", function () {
  function observeSection(selector) {
    const el = document.querySelector(selector);

    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
          } else {
            /* reverse slide out */
            el.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(el);
  }

  observeSection(".testimonials-section");
  observeSection(".faq-section");
});

document.addEventListener("DOMContentLoaded", function () {
  const pricing = document.querySelector(".pricing-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pricing.classList.add("in-view");
        } else {
          pricing.classList.remove("in-view"); // reverse slide out
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(pricing);
});

document.addEventListener("DOMContentLoaded", function () {
  const cases = document.querySelector(".cases-section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cases.classList.add("in-view");
        } else {
          cases.classList.remove("in-view");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(cases);
});

const testimonialCards = document.querySelectorAll(".testimonial-card");
let currentTestimonial = 0;

function rotateTestimonials() {
  testimonialCards.forEach((card, index) => {
    card.style.animation = "none";
    setTimeout(() => {
      if (index === currentTestimonial) {
        card.style.display = "block";
        card.style.animation = "testimonialFade 0.6s ease-out";
      } else {
        card.style.display = "none";
      }
    }, 10);
  });

  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Only rotate on mobile/tablet
if (window.innerWidth < 992) {
  setInterval(rotateTestimonials, 5000);
}

// ================================================
// PARALLAX EFFECT ON HERO SECTION
// ================================================

const heroSection = document.querySelector(".hero-section");
const heroOverlay = document.querySelector(".hero-overlay");

if (heroSection && heroOverlay) {
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrolled = window.scrollY;
      const speed = 0.5;

      heroOverlay.style.transform = `translateY(${scrolled * speed}px)`;
    }, 50),
  );
}

// ================================================
// ANIMATED ELEMENTS ON PAGE LOAD
// ================================================

window.addEventListener("load", () => {
  // Add loaded state to body
  document.body.classList.add("loaded");

  // Stagger animations for hero content
  const heroBadge = document.querySelector(".hero-badge");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const ctaGroup = document.querySelector(".cta-group");
  const trustBadges = document.querySelector(".trust-badges");

  const elements = [
    { el: heroBadge, delay: 0.1 },
    { el: heroTitle, delay: 0.2 },
    { el: heroSubtitle, delay: 0.3 },
    { el: ctaGroup, delay: 0.4 },
    { el: trustBadges, delay: 0.5 },
  ];

  elements.forEach(({ el, delay }) => {
    if (el) {
      el.style.opacity = "1";
    }
  });
});

// ================================================
// KEYBOARD ACCESSIBILITY
// ================================================

document.addEventListener("keydown", (e) => {
  // Close modals on Escape
  if (e.key === "Escape") {
    const openModals = document.querySelectorAll(".modal.show");
    openModals.forEach((modal) => {
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    });
  }

  // Trap focus in modal when open
  if (e.key === "Tab") {
    const activeModal = document.querySelector(".modal.show");
    if (activeModal) {
      const focusableElements = activeModal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    }
  }
});

// ================================================
// PERFORMANCE OPTIMIZATION - LAZY LOADING
// ================================================

const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Load image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }

        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  },
  {
    rootMargin: "50px",
  },
);

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});

// ================================================
// CURSOR GLOW EFFECT (Optional - for premium feel)
// ================================================

const cursorDot = document.createElement("div");
cursorDot.className = "cursor-glow";
cursorDot.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: rgba(0, 185, 96, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
    box-shadow: 0 0 20px rgba(0, 185, 96, 0.4);
`;

// Only show on desktop
if (window.innerWidth > 768) {
  document.body.appendChild(cursorDot);

  document.addEventListener(
    "mousemove",
    throttle((e) => {
      cursorDot.style.left = e.clientX - 10 + "px";
      cursorDot.style.top = e.clientY - 10 + "px";
      cursorDot.style.display = "block";
    }, 30),
  );

  document.addEventListener("mouseleave", () => {
    cursorDot.style.display = "none";
  });
}

// ================================================
// BUTTON RIPPLE EFFECT
// ================================================

document
  .querySelectorAll(".btn-primary-lg, .btn-outline-lg, .btn-cta")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
        `;

      if (!this.style.position || this.style.position === "static") {
        this.style.position = "relative";
      }

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================================
// SMOOTH PAGE LOAD
// ================================================

window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "1";
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
  });
} else {
  document.body.style.opacity = "1";
}

// ================================================
// ACCORDION SMOOTH OPEN/CLOSE
// ================================================

const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const button = item.querySelector(".accordion-button");
  const body = item.querySelector(".accordion-body");

  button.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      body.style.animation = "slideUp 0.3s ease-out";
    } else {
      body.style.animation = "slideDown 0.3s ease-out";
    }
  });
});

// Add slide animations
const slideStyles = document.createElement("style");
slideStyles.textContent = `
    @keyframes slideUp {
        from {
            opacity: 1;
            max-height: 1000px;
        }
        to {
            opacity: 0;
            max-height: 0;
        }
    }

    @keyframes slideDown {
        from {
        opacity: 0;
            max-height: 0;
        }
        to {
            opacity: 1;
            max-height: 1000px;
        }
    }
`;
document.head.appendChild(slideStyles);

// ================================================
// DEBUGGING & PERFORMANCE MONITORING
// ================================================

// Uncomment for debugging
/*
console.log('Fuiox Landing Page Initialized');
console.log('DOM Ready:', document.readyState);

// Log page load time
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time:', pageLoadTime + 'ms');
});
*/

// ================================================
// LOCAL STORAGE - REMEMBER USER PREFERENCES
// ================================================

// Optional: Track user interactions for analytics
function trackEvent(eventName, eventData = {}) {
  try {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      data: eventData,
    };

    console.log("Event tracked:", event);

    // In production, send to analytics service
    // analytics.track(event);
  } catch (error) {
    console.error("Error tracking event:", error);
  }
}

// Track CTA clicks
document.querySelectorAll(".btn-primary-lg, .btn-cta").forEach((button) => {
  button.addEventListener("click", () => {
    trackEvent("cta_click", {
      buttonText: button.textContent.trim(),
    });
  });
});

// Track section views
window.addEventListener(
  "scroll",
  throttle(() => {
    document.querySelectorAll("section[id]").forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight * 0.5) {
        trackEvent("section_view", {
          sectionId: section.id,
        });
      }
    });
  }, 1000),
);

// ================================================
// READY
// ================================================

console.log("✓ Fuiox Premium Landing Page Loaded Successfully");
console.log(
  "Built with attention to performance, accessibility, and UX excellence.",
);
