// ===================================
// GLOBAL STATE & CONFIG
// ===================================
const CONFIG = {
  GITHUB_USERNAME: 'kkhansameer94',
  GITHUB_API_URL: 'https://api.github.com',
  FORMSPREE_ENDPOINT: 'https://formspree.io/f/xjygvzrp',
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_MESSAGE_LENGTH: 10,
  DEBOUNCE_DELAY: 300
};

// ===================================
// UTILITY FUNCTIONS
// ===================================
const utils = {
  // Show toast notification
  showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="toast-icon fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
      <span class="toast-message">${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation with RAF for smoothness
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // Debounce function
  debounce(func, wait = CONFIG.DEBOUNCE_DELAY) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const initMobileMenu = () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when clicking nav links
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
};

// ===================================
// TYPING EFFECT FOR HERO SUBTITLE
// ===================================
const initTypingEffect = () => {
  const words = [
    "DevOps Automation",
    "AWS Cloud Systems",
    "Kubernetes & Docker",
    "CI/CD Pipelines",
    "Linux Infrastructure"
  ];
  
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typedElem = document.getElementById("typed-text");

  if (!typedElem) return;

  function typeEffect() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      typedElem.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedElem.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentWord.length) {
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
};

// ===================================
// STATS COUNTER ANIMATION (RAF Optimized)
// ===================================
const initStatsCounter = () => {
  const statNumbers = document.querySelectorAll('.stat-num');
  let statsCounted = false;

  function countUpStats() {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      const duration = 1500; // milliseconds
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuad = progress => progress * (2 - progress);
        const currentValue = target * easeOutQuad(progress);

        stat.textContent = isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          stat.textContent = isDecimal ? target.toFixed(1) : Math.floor(target);
        }
      };

      requestAnimationFrame(animate);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        countUpStats();
        statsCounted = true;
        observer.disconnect(); // Stop observing after animation
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);
};

// ===================================
// ENHANCED TERMINAL SIMULATOR
// ===================================
const initTerminal = () => {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalBody = document.getElementById('terminal-body');

  if (!terminalInput || !terminalOutput) return;

  // Command history
  let commandHistory = [];
  let historyIndex = -1;

  // Enhanced commands with DevOps focus
  const commands = {
    help: `<span style="color: #10b981;">Available DevOps Commands:</span>
  <span class="highlight-cmd">help</span>        - Display this help menu
  <span class="highlight-cmd">skills</span>      - List technical DevOps stack
  <span class="highlight-cmd">projects</span>    - View highlighted cloud projects
  <span class="highlight-cmd">uptime</span>      - Show system uptime & status
  <span class="highlight-cmd">whoami</span>      - Display engineer profile
  <span class="highlight-cmd">contact</span>     - Direct communication channels
  <span class="highlight-cmd">clear</span>       - Clean terminal window
  
  <span style="color: #38bdf8;">DevOps Operations:</span>
  <span class="highlight-cmd">docker ps</span>   - List running containers
  <span class="highlight-cmd">kubectl get pods</span> - Show Kubernetes pods
  <span class="highlight-cmd">git status</span>  - Check repository status`,

    skills: `<span style="color: #38bdf8;">Primary DevOps Stack:</span>
  <span style="color: #10b981;">[OK]</span> Linux / Ubuntu Administration & Bash
  <span style="color: #10b981;">[OK]</span> Docker Containerization & Multi-stage builds
  <span style="color: #10b981;">[OK]</span> Kubernetes Orchestration (Pods, Helm, Services)
  <span style="color: #10b981;">[OK]</span> AWS (EC2, S3, ECR, IAM, CloudWatch)
  <span style="color: #10b981;">[OK]</span> CI/CD: GitHub Actions, Jenkins
  <span style="color: #10b981;">[OK]</span> Monitoring: Prometheus & Grafana`,

    projects: `<span style="color: #38bdf8;">Featured Projects:</span>
  <span style="color: #fbbf24;">1.</span> Cloud-Native CI/CD Pipeline
     ├─ GitHub Actions + AWS ECR + K8s
     └─ Automated deployment with Helm charts
  
  <span style="color: #fbbf24;">2.</span> Linux Automation Suite
     ├─ Shell scripts for server management
     └─ Automated backups & security audits
  
  <span style="color: #fbbf24;">3.</span> Cluster Monitoring Stack
     ├─ Prometheus metrics collection
     └─ Grafana dashboards with alerting`,

    uptime: `<span style="color: #10b981;">sameer-production-node</span>
  Uptime: <span style="color: #38bdf8;">100 days, 14:32:18</span>
  Load average: <span style="color: #10b981;">0.04, 0.02, 0.00</span>
  Status: <span style="color: #10b981;">● OPERATIONAL</span>
  
  <span style="color: #94a3b8;">All systems nominal. Zero downtime deployment active.</span>`,

    whoami: `<span style="color: #38bdf8;">Sameer Khan</span>
  Role: Aspiring Cloud & DevOps Engineer
  Education: B.Sc. IT Graduate
  Location: Mumbai, Maharashtra, India
  
  <span style="color: #10b981;">Focus Areas:</span>
  • Cloud Infrastructure (AWS)
  • Container Orchestration (K8s)
  • CI/CD Pipeline Automation
  • Infrastructure as Code`,

    contact: `<span style="color: #38bdf8;">Contact Information:</span>
  Email:  <span style="color: #10b981;">samksamk2002@gmail.com</span>
  GitHub: <span style="color: #10b981;">github.com/kkhansameer94</span>
  Status: <span style="color: #10b981;">Open for opportunities</span>`,

    'docker ps': `<span style="color: #94a3b8;">CONTAINER ID   IMAGE                    STATUS         PORTS</span>
  a3f2d8b91c4e   nginx:alpine             Up 12 days     0.0.0.0:80->80/tcp
  7c9e4f21ab8d   postgres:14              Up 12 days     0.0.0.0:5432->5432/tcp
  1b8f3e94cd2a   redis:7-alpine           Up 12 days     0.0.0.0:6379->6379/tcp
  5d2a9c7ef1b8   portfolio-app:latest     Up 3 days      0.0.0.0:3000->3000/tcp
  
  <span style="color: #10b981;">4 containers running</span>`,

    'kubectl get pods': `<span style="color: #94a3b8;">NAME                               READY   STATUS    RESTARTS   AGE</span>
  frontend-deployment-7d9f8c-xk2p9   1/1     Running   0          5d
  frontend-deployment-7d9f8c-m9w4l   1/1     Running   0          5d
  backend-deployment-6c8a4b-7n3k8    1/1     Running   0          8d
  postgres-stateful-0                1/1     Running   0          21d
  redis-deployment-5f9d2c-qw8r4      1/1     Running   0          21d
  
  <span style="color: #10b981;">All pods healthy</span>`,

    'git status': `On branch <span style="color: #38bdf8;">main</span>
  Your branch is up to date with <span style="color: #38bdf8;">'origin/main'</span>.
  
  <span style="color: #10b981;">nothing to commit, working tree clean</span>
  
  Latest commit: <span style="color: #f59e0b;">abc123d</span> - "feat: add monitoring stack"
  Author: Sameer Khan <samksamk2002@gmail.com>`
  };

  // Tab completion
  const allCommands = Object.keys(commands);

  function handleTabCompletion(currentInput) {
    const matches = allCommands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
    
    if (matches.length === 1) {
      terminalInput.value = matches[0];
    } else if (matches.length > 1) {
      const matchLine = document.createElement('p');
      matchLine.style.color = '#94a3b8';
      matchLine.textContent = `Possible commands: ${matches.join(', ')}`;
      terminalOutput.appendChild(matchLine);
      scrollTerminal();
    }
  }

  function scrollTerminal() {
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function appendOutput(content, isError = false) {
    const outputLine = document.createElement('p');
    if (isError) {
      outputLine.style.color = '#ef4444';
      outputLine.textContent = content;
    } else {
      outputLine.innerHTML = content;
    }
    terminalOutput.appendChild(outputLine);
    scrollTerminal();
  }

  // Handle keyboard input with optimized event handling
  terminalInput.addEventListener('keydown', (e) => {
    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const input = terminalInput.value.trim();
      if (input) {
        handleTabCompletion(input);
      }
      return;
    }

    // Command history with arrow keys
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        historyIndex = Math.max(0, historyIndex - 1);
        terminalInput.value = commandHistory[historyIndex];
        // Move cursor to end
        terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
        terminalInput.setSelectionRange(terminalInput.value.length, terminalInput.value.length);
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
      return;
    }

    // Execute command on Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputVal = terminalInput.value.trim();
      if (!inputVal) return;

      // Add to history
      commandHistory.push(inputVal);
      historyIndex = commandHistory.length;

      // Display user input
      const userLine = document.createElement('p');
      userLine.innerHTML = `<span class="prompt-user">sameer@cloud</span>:<span class="prompt-path">~</span>$ ${utils.escapeHtml(terminalInput.value)}`;
      terminalOutput.appendChild(userLine);

      const inputLower = inputVal.toLowerCase();

      // Handle clear command
      if (inputLower === 'clear') {
        terminalOutput.innerHTML = '';
      } else if (commands[inputLower]) {
        appendOutput(commands[inputLower]);
      } else {
        appendOutput(`bash: command not found: ${utils.escapeHtml(inputVal)}. Type 'help' for available commands.`, true);
      }

      terminalInput.value = '';
      
      // Use RAF for smooth scrolling
      requestAnimationFrame(() => {
        scrollTerminal();
      });
    }
  });

  // Focus input when clicking terminal body
  if (terminalBody) {
    terminalBody.addEventListener('click', () => {
      terminalInput.focus();
    });
  }
};

// ===================================
// PROJECT FILTERING (Accessibility Enhanced)
// ===================================
const initProjectFilters = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state and aria-pressed
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filterVal = btn.getAttribute('data-filter');

      // Batch DOM updates for performance
      requestAnimationFrame(() => {
        projectCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filterVal === 'all' || cat === filterVal) {
            card.style.display = 'flex';
            card.classList.add('fade-in', 'visible');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
};

// ===================================
// GITHUB API INTEGRATION
// ===================================
const initGitHubProjects = async () => {
  const projectsGrid = document.querySelector('.projects-grid');
  if (!projectsGrid) return;

  const staticProjects = Array.from(projectsGrid.querySelectorAll('.project-card'));

  try {
    // Show loading skeleton
    showLoadingSkeleton(projectsGrid);

    const response = await fetch(
      `${CONFIG.GITHUB_API_URL}/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Remove skeleton cards
    removeLoadingSkeleton(projectsGrid);

    // Filter out forks and select interesting repos
    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.description)
      .slice(0, 3);

    if (filteredRepos.length > 0) {
      // Add GitHub repos as project cards
      filteredRepos.forEach(repo => {
        const projectCard = createGitHubProjectCard(repo);
        projectsGrid.appendChild(projectCard);
      });
    }

    // Re-initialize 3D tilt on new cards
    init3DTilt();
    
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    // Remove skeleton and fallback to static projects
    removeLoadingSkeleton(projectsGrid);
    utils.showToast('Using static projects (GitHub API rate limit may be reached)', 'error');
  }
};

function showLoadingSkeleton(container) {
  for (let i = 0; i < 3; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'project-card glass-panel skeleton-card';
    skeleton.innerHTML = `
      <div class="skeleton" style="height: 20px; width: 30%; margin-bottom: 1rem; border-radius: 6px;"></div>
      <div class="skeleton" style="height: 24px; width: 80%; margin-bottom: 0.8rem; border-radius: 6px;"></div>
      <div class="skeleton" style="height: 60px; width: 100%; margin-bottom: 1rem; border-radius: 6px;"></div>
      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
        <div class="skeleton" style="height: 20px; width: 60px; border-radius: 4px;"></div>
        <div class="skeleton" style="height: 20px; width: 80px; border-radius: 4px;"></div>
        <div class="skeleton" style="height: 20px; width: 70px; border-radius: 4px;"></div>
      </div>
    `;
    container.appendChild(skeleton);
  }
}

function removeLoadingSkeleton(container) {
  const skeletons = container.querySelectorAll('.skeleton-card');
  skeletons.forEach(skeleton => skeleton.remove());
}

function createGitHubProjectCard(repo) {
  const card = document.createElement('article');
  card.className = 'project-card glass-panel fade-in';
  card.setAttribute('data-category', 'cloud');
  
  // Detect primary language or tech
  const language = repo.language || 'DevOps';
  const topics = repo.topics?.slice(0, 4) || [];
  
  card.innerHTML = `
    <div class="project-top-row">
      <span class="badge-tag">${utils.escapeHtml(language)}</span>
      <div class="project-links">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <i class="fa-brands fa-github"></i>
        </a>
      </div>
    </div>
    <h3 class="project-title">${utils.escapeHtml(repo.name.replace(/-/g, ' ').replace(/_/g, ' '))}</h3>
    <p class="project-desc">
      ${utils.escapeHtml(repo.description || 'A DevOps project showcasing automation and cloud infrastructure.')}
    </p>
    <div class="project-tech-tags">
      ${topics.map(topic => `<span>${utils.escapeHtml(topic)}</span>`).join('')}
      ${repo.language ? `<span>${utils.escapeHtml(repo.language)}</span>` : ''}
    </div>
    <div class="project-footer">
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="link-arrow">
        View Repository <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  `;
  
  // Trigger fade-in animation
  setTimeout(() => card.classList.add('visible'), 100);
  
  return card;
}

// ===================================
// CONTACT FORM WITH VALIDATION
// ===================================
const initContactForm = () => {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Create error message elements
  const createErrorElement = (inputId) => {
    const error = document.createElement('div');
    error.className = 'form-error';
    error.id = `${inputId}-error`;
    return error;
  };

  // Add error elements after each input
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input && !document.getElementById(`${input.id}-error`)) {
      input.parentElement.appendChild(createErrorElement(input.id));
    }
  });

  // Validation functions
  const validateName = () => {
    const value = nameInput.value.trim();
    const error = document.getElementById('name-error');
    
    if (value.length < 2) {
      nameInput.classList.add('error');
      error.textContent = 'Name must be at least 2 characters';
      error.classList.add('show');
      return false;
    }
    
    nameInput.classList.remove('error');
    error.classList.remove('show');
    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const error = document.getElementById('email-error');
    
    if (!CONFIG.EMAIL_REGEX.test(value)) {
      emailInput.classList.add('error');
      error.textContent = 'Please enter a valid email address';
      error.classList.add('show');
      return false;
    }
    
    emailInput.classList.remove('error');
    error.classList.remove('show');
    return true;
  };

  const validateMessage = () => {
    const value = messageInput.value.trim();
    const error = document.getElementById('message-error');
    
    if (value.length < CONFIG.MIN_MESSAGE_LENGTH) {
      messageInput.classList.add('error');
      error.textContent = `Message must be at least ${CONFIG.MIN_MESSAGE_LENGTH} characters`;
      error.classList.add('show');
      return false;
    }
    
    messageInput.classList.remove('error');
    error.classList.remove('show');
    return true;
  };

  // Real-time validation
  nameInput?.addEventListener('blur', validateName);
  emailInput?.addEventListener('blur', validateEmail);
  messageInput?.addEventListener('blur', validateMessage);

  // Form submission with debouncing
  const debouncedSubmit = utils.debounce(async (formData, btn, originalHTML) => {
    try {
      const response = await fetch(CONFIG.FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Success
      contactForm.reset();
      btn.disabled = false;
      btn.innerHTML = originalHTML;
      
      utils.showToast('Thank you! Your message has been sent successfully.', 'success');

    } catch (error) {
      console.error('Form submission error:', error);
      btn.disabled = false;
      btn.innerHTML = originalHTML;
      
      utils.showToast('Failed to send message. Please try again or email directly at samksamk2002@gmail.com', 'error');
    }
  }, 500);

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      utils.showToast('Please fix the errors before submitting', 'error');
      return;
    }

    const btn = contactForm.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    
    // Disable button and show loading
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;

    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    };

    debouncedSubmit(formData, btn, originalHTML);
  });
};

// ===================================
// SCROLL-TRIGGERED ANIMATIONS (Optimized)
// ===================================
const initScrollAnimations = () => {
  // Only observe specific elements, NOT parent sections
  const animatedElements = document.querySelectorAll(
    '.section-header, .project-card, .skill-card, .about-card, .terminal-container, .contact-wrapper'
  );

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in', 'visible');
        // Unobserve immediately after animating to prevent re-triggers
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Check for elements already in viewport on page load
  setTimeout(() => {
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const isInViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
      
      if (isInViewport && !el.classList.contains('visible')) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  }, 100);
};

// ===================================
// 3D TILT EFFECT (Performance Optimized - No Drag)
// ===================================
const init3DTilt = () => {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    let isHovering = false;

    card.addEventListener('mouseenter', () => {
      isHovering = true;
      card.style.willChange = 'transform';
      // Remove transition during hover for instant response
      card.classList.add('is-tilting');
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovering) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      // Restore transition for smooth return
      card.classList.remove('is-tilting');
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      // Remove will-change after transition
      setTimeout(() => {
        card.style.willChange = 'auto';
      }, 300);
    });
  });
};

// ===================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ===================================
const initActiveNavigation = () => {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -66% 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
};

// ===================================
// HIRE ME MODAL FUNCTIONALITY
// ===================================
const initHireMeModal = () => {
  const hireMeBtn = document.getElementById('hire-me-btn');
  const modal = document.getElementById('hire-modal');
  const modalClose = document.getElementById('modal-close');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (!hireMeBtn || !modal) return;

  // Open modal
  const openModal = () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    // Focus trap - focus close button
    setTimeout(() => {
      modalClose?.focus();
    }, 100);
  };

  // Close modal
  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scroll
    hireMeBtn.focus(); // Return focus to trigger button
  };

  // Open modal on button click
  hireMeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  // Close modal on X button click
  modalClose?.addEventListener('click', closeModal);

  // Close modal on background click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Copy email functionality
  copyEmailBtn?.addEventListener('click', async () => {
    const email = emailText.textContent;
    
    try {
      // Modern clipboard API
      await navigator.clipboard.writeText(email);
      
      // Update button state
      const icon = copyEmailBtn.querySelector('i');
      const text = copyEmailBtn.querySelector('span');
      
      // Store original content
      const originalIcon = icon.className;
      const originalText = text.textContent;
      
      // Change to checkmark
      icon.className = 'fa-solid fa-check';
      text.textContent = 'Copied!';
      copyEmailBtn.classList.add('copied');
      
      // Show success toast
      utils.showToast('Email copied to clipboard!', 'success');
      
      // Reset after 2 seconds
      setTimeout(() => {
        icon.className = originalIcon;
        text.textContent = originalText;
        copyEmailBtn.classList.remove('copied');
      }, 2000);
      
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        utils.showToast('Email copied to clipboard!', 'success');
        
        const icon = copyEmailBtn.querySelector('i');
        const text = copyEmailBtn.querySelector('span');
        const originalIcon = icon.className;
        const originalText = text.textContent;
        
        icon.className = 'fa-solid fa-check';
        text.textContent = 'Copied!';
        copyEmailBtn.classList.add('copied');
        
        setTimeout(() => {
          icon.className = originalIcon;
          text.textContent = originalText;
          copyEmailBtn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        utils.showToast('Failed to copy email. Please select and copy manually.', 'error');
      }
      
      document.body.removeChild(textArea);
    }
  });
};

// ===================================
// INITIALIZATION ON DOM LOADED
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initMobileMenu();
  initTypingEffect();
  initStatsCounter();
  initTerminal();
  initProjectFilters();
  initGitHubProjects();
  initContactForm();
  initScrollAnimations();
  init3DTilt();
  initActiveNavigation();
  initHireMeModal(); // Add modal initialization

  console.log('%c🚀 Portfolio Loaded Successfully', 'color: #38bdf8; font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with ❤️ by Sameer Khan', 'color: #10b981; font-size: 12px;');
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images if needed
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
}

// Preload critical resources
window.addEventListener('load', () => {
  // Mark hero as loaded for animations
  document.querySelector('.hero')?.classList.add('loaded');
});
