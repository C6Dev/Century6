/* @tweakable GitHub repository configuration */
const GITHUB_OWNER = 'C6Dev';
const GITHUB_REPO = 'C6GE';
const GITHUB_API_BASE_URL = 'https://api.github.com';

// --- UTILITY FUNCTIONS ---

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function elementInView(el, threshold = 0.1) {
    if (!el) return false;
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (1 - threshold)
    );
}

// Helper function to escape HTML special characters and prevent XSS
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, function (match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    });
}

// --- SCROLL ANIMATIONS ---
let handleScrollAnimationThrottled;

function displayScrollElement(element) {
    element.classList.add('is-visible');
}

function handleScrollAnimation() {
    const elementsToReveal = document.querySelectorAll('.scroll-reveal:not(.is-visible)');
    elementsToReveal.forEach((el) => {
        if (elementInView(el, 0.1)) {
            displayScrollElement(el);
        }
    });
}

function initScrollAnimations() {
    if (!document.querySelector('.scroll-reveal')) return;

    handleScrollAnimationThrottled = throttle(handleScrollAnimation, 100);
    
    // Initial check for elements already in view
    handleScrollAnimation(); 
    window.addEventListener('scroll', handleScrollAnimationThrottled);
}

// Function to explicitly re-check scroll elements, e.g., after dynamic content load
export function refreshScrollElements() {
    // Immediately check if any new/existing elements are now in view
    handleScrollAnimation();
}

// --- HEADER SCROLL EFFECT ---
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100));
}

// --- PAGE TRANSITIONS ---
function initPageTransitions() {
    // Page load fade-in
    // Set initial opacity via JS to ensure it's applied before class for transition
    document.body.style.opacity = '0'; 
    // Use requestAnimationFrame to ensure the style is applied, then add class for transition
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { // Double RAF for robustness
            document.body.classList.add('page-loaded');
            document.body.style.opacity = ''; // Let CSS class control opacity
        });
    });

    // Handle navigation for internal links
    const internalLinks = document.querySelectorAll('a');
    internalLinks.forEach(link => {
        // Ensure it's an internal link, not opening in a new tab, 
        // not a hash link on the same page, and not a javascript action.
        if (link.hostname === window.location.hostname &&
            link.pathname !== window.location.pathname && // Only for actual page changes
            link.target !== '_blank' &&
            !link.getAttribute('href').startsWith('#') &&
            !link.getAttribute('href').startsWith('javascript:') &&
            !link.hasAttribute('data-no-transition')) {

            link.addEventListener('click', function(event) {
                event.preventDefault();
                const destinationUrl = this.href;
                document.body.classList.remove('page-loaded');
                document.body.classList.add('page-leaving'); // Optional if using same class for fade out
                
                setTimeout(() => {
                    window.location.href = destinationUrl;
                }, 400); // Match CSS transition duration (0.4s)
            });
        }
    });

    // Handle browser back/forward navigation (bfcache)
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) { // Page loaded from bfcache
            document.body.classList.remove('page-leaving');
            document.body.classList.add('page-loaded');
            document.body.style.opacity = ''; // Ensure CSS class takes over
        }
    });
}

// --- INTERACTIVE EFFECTS ---
function initInteractiveEffects() {
    // Add interactive cursor effect
    /* @tweakable cursor size */
    const cursorSize = 18;
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: ${cursorSize}px;
        height: ${cursorSize}px;
        background: radial-gradient(circle, rgba(120, 119, 198, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = (e.clientX - cursorSize/2) + 'px';
        cursor.style.top = (e.clientY - cursorSize/2) + 'px';
    });

    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('button, .nav-link, .btn, a');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });

    // Particle effect on button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            /* @tweakable number of particles on button click */
            const particleCount = 6;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                this.appendChild(particle);
                
                const angle = (i / particleCount) * Math.PI * 2;
                /* @tweakable particle explosion distance */
                const distance = 30 + Math.random() * 20;
                const duration = 600 + Math.random() * 200;
                
                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: duration,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => particle.remove();
            }
        });
    });

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        /* @tweakable parallax speed multiplier */
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.floating-glass').forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Initialize liquid glass filter parameters
    updateLiquidGlassFilter();
    animateLiquidGlassJitter();
}

/* Liquid glass filter tweakables focused on "less blur, more glass" */
/* @tweakable warping intensity (RGB displacement base). 30–60 recommended */
const lgScaleBase = 44;
/* @tweakable color separation amount between channels (iridescence) */
const lgIridescenceDelta = 12;
/* @tweakable noise frequency (lower = larger blobby refractions, higher = fine ripples) */
const lgNoiseFrequency = 0.0038;
/* @tweakable noise octaves for texture detail */
const lgNoiseOctaves = 2;
/* @tweakable pre-blur on source before displacement (keep very low for crisp edges) */
const lgPreBlur = 0.08;
/* @tweakable post-blur after channel recombine (0 keeps it sharp) */
const lgPostBlur = 0.0;
/* @tweakable saturation boost for glass color separation */
const lgSaturation = 1.25;
/* @tweakable micro-jitter amplitude of turbulence (set 0 to disable if header looks jittery) */
const lgJitterAmplitude = 0.0006;
/* @tweakable turbulence seed */
const lgSeed = 11;

/* UI glass look (wired into CSS variables) */
/* @tweakable glass card blur in px */
const GLASS_CARD_BLUR_PX = 5;
/* @tweakable header blur in px */
const HEADER_BLUR_PX = 14;
/* @tweakable button blur in px */
const BUTTON_BLUR_PX = 5;
/* @tweakable global glass border radius in px */
const GLASS_BORDER_RADIUS_PX = 18;
/* @tweakable mobile dropdown item tint alpha (0-1) */
const MOBILE_NAV_ITEM_TINT_ALPHA = 0.30;
/* @tweakable mobile dropdown item vertical spacing (px) */
const MOBILE_NAV_ITEM_GAP_PX = 16;

function applyGlassCSSVars() {
    const root = document.documentElement?.style;
    if (!root) return;
    root.setProperty('--glass-card-blur', `${GLASS_CARD_BLUR_PX}px`);
    root.setProperty('--header-blur', `${HEADER_BLUR_PX}px`);
    root.setProperty('--button-blur', `${BUTTON_BLUR_PX}px`);
    root.setProperty('--glass-border-radius', `${GLASS_BORDER_RADIUS_PX}px`);
    root.setProperty('--mobile-nav-item-tint', `${MOBILE_NAV_ITEM_TINT_ALPHA}`);
    root.setProperty('--mobile-nav-item-gap', `${MOBILE_NAV_ITEM_GAP_PX}px`);
}

function updateLiquidGlassFilter() {
    const noise = document.getElementById('lg-noise');
    const pre = document.getElementById('lg-preblur');
    const post = document.getElementById('lg-postblur');
    const sat = document.getElementById('lg-sat');
    const dispR = document.getElementById('lg-dispR');
    const dispG = document.getElementById('lg-dispG');
    const dispB = document.getElementById('lg-dispB');

    if (noise) {
        noise.setAttribute('baseFrequency', String(lgNoiseFrequency));
        noise.setAttribute('numOctaves', String(lgNoiseOctaves));
        noise.setAttribute('seed', String(lgSeed));
    }
    if (pre) pre.setAttribute('stdDeviation', String(lgPreBlur));
    if (post) post.setAttribute('stdDeviation', String(lgPostBlur));
    if (sat) sat.setAttribute('values', String(lgSaturation));

    if (dispR && dispG && dispB) {
        /* Calibrated scales to push visible corner warping without instability */
        dispR.setAttribute('scale', String(Math.max(0, lgScaleBase - lgIridescenceDelta)));
        dispG.setAttribute('scale', String(lgScaleBase));
        dispB.setAttribute('scale', String(lgScaleBase + lgIridescenceDelta));
    }
}

let lgAnimRAF = null;
function animateLiquidGlassJitter() {
    const noise = document.getElementById('lg-noise');
    if (!noise || lgJitterAmplitude <= 0) return;

    let t = 0;
    const base = parseFloat(noise.getAttribute('baseFrequency')) || lgNoiseFrequency;

    const tick = () => {
        t += 0.016;
        // small sinusoidal variance to make edges look more "alive" like modern OS glass
        const f = base + Math.sin(t) * lgJitterAmplitude;
        noise.setAttribute('baseFrequency', String(Math.max(0.001, f)));
        lgAnimRAF = requestAnimationFrame(tick);
    };
    lgAnimRAF = requestAnimationFrame(tick);
}

function stopLiquidGlassJitter() {
    if (lgAnimRAF) cancelAnimationFrame(lgAnimRAF);
    lgAnimRAF = null;
}

// --- COMMON INITIALIZATION ---
export function initCommon() {
    // Mobile Nav Toggle
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
    }

    // Ensure dropdown starts closed (defensive)
    if (mainNav && !mainNav.classList.contains('active')) {
        mainNav.style.visibility = 'hidden';
        requestAnimationFrame(() => {
            mainNav.style.visibility = ''; // let CSS handle visibility via class
        });
    }

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Apply CSS variable-based glass tweakables early
    applyGlassCSSVars();

    initScrollAnimations();
    handleHeaderScroll();
    initPageTransitions();
    initInteractiveEffects();

    // Typing effect for hero title if present
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                /* @tweakable typing speed in milliseconds */
                setTimeout(typeWriter, 45);
            }
        };
        setTimeout(typeWriter, 300);
    }
}

// --- ENGINE PAGE SPECIFIC ---
export function initStelaEnginePage() {
    loadLatestCommit();
}

async function loadLatestCommit() {
    const commitContainer = document.getElementById('latest-commit-info');
    if (!commitContainer) return;

    commitContainer.innerHTML = '<p class="scroll-reveal">Loading latest commit from GitHub...</p>';
    refreshScrollElements(); // Make "Loading..." message animate if applicable

    try {
        const response = await fetch(`${GITHUB_API_BASE_URL}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits`);

        if (!response.ok) {
            let errorMsg = `GitHub API error: ${response.status}`;
            if (response.status === 403) {
                 errorMsg += ' (Rate limit exceeded or private repo without token)';
            } else if (response.status === 404) {
                errorMsg += ` (Repository not found. Check GITHUB_OWNER: ${GITHUB_OWNER} and GITHUB_REPO: ${GITHUB_REPO})`;
            }
            throw new Error(errorMsg);
        }

        const commits = await response.json();
        if (commits && commits.length > 0) {
            const latest = commits[0];
            const commitMessage = escapeHTML(latest.commit.message.split('\n')[0]);
            const authorName = escapeHTML(latest.commit.author.name);
            const authorLogin = latest.author ? escapeHTML(latest.author.login) : 'N/A';
            const commitDate = new Date(latest.commit.author.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const commitInfoHTML = `
                <div class="commit-card scroll-reveal">
                    <h4 class="scroll-reveal d-100">Latest Engine Update</h4>
                    <p class="scroll-reveal d-200"><strong>Message:</strong> ${commitMessage}</p>
                    <p class="scroll-reveal d-300"><strong>Author:</strong> ${authorName} (${authorLogin})</p>
                    <p class="scroll-reveal d-400"><strong>Date:</strong> ${commitDate}</p>
                    <a href="${latest.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary scroll-reveal d-500">View Commit on GitHub</a>
                </div>
            `;
            commitContainer.innerHTML = commitInfoHTML;
        } else {
            commitContainer.innerHTML = `<p class="scroll-reveal">No commits found. The repository <span class="highlight">${GITHUB_OWNER}/${GITHUB_REPO}</span> might be empty or new.</p>`;
        }
    } catch (error) {
        console.error('Failed to load commit:', error);
        commitContainer.innerHTML = `<p class="error-message scroll-reveal">Could not load latest commit. ${error.message}</p>`;
    }
    refreshScrollElements(); // Re-check all scroll-reveal elements after content update
}