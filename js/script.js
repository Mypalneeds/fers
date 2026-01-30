/* ===================================
   FERS Website - Modern JavaScript
   Clean & Optimized
   =================================== */

(function($) {
    'use strict';

    $(document).ready(function() {
        
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 100
        });

        // Navbar Scroll Effect
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 50) {
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }

            // Back to Top Button
            if ($(window).scrollTop() > 400) {
                $('.back-to-top').addClass('show');
            } else {
                $('.back-to-top').removeClass('show');
            }
        });

        // Smooth Scroll for Anchor Links
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'swing');
            }
        });

        // Back to Top Button
        $('.back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 1000, 'swing');
        });

        // Mobile Menu Close on Click
        $('.navbar-nav .nav-link').on('click', function() {
            if ($(window).width() < 992) {
                $('.navbar-collapse').collapse('hide');
            }
        });

        // Smooth close dropdown on mobile
        $('.navbar-nav .dropdown-item').on('click', function() {
            if ($(window).width() < 992) {
                $('.navbar-collapse').collapse('hide');
            }
        });

        // Counter Animation for Stats
        function animateCounter() {
            $('.stat-number').each(function() {
                var $this = $(this);
                var countTo = $this.text().replace(/[^0-9]/g, '');
                var suffix = $this.text().replace(/[0-9]/g, '');
                
                if (!$this.hasClass('counted')) {
                    $this.addClass('counted');
                    $({ countNum: 0 }).animate({
                        countNum: countTo
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum) + suffix);
                        },
                        complete: function() {
                            $this.text(countTo + suffix);
                        }
                    });
                }
            });
        }

        // Trigger counter animation when visible
        if ($('.stat-number').length) {
            var counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateCounter();
                        counterObserver.disconnect();
                    }
                });
            }, { threshold: 0.5 });

            $('.hero-stats, .stats-grid').each(function() {
                counterObserver.observe(this);
            });
        }

        // Form Validation
        $('form').on('submit', function(e) {
            var form = $(this);
            var isValid = true;

            // Check required fields
            form.find('input[required], textarea[required], select[required]').each(function() {
                if ($(this).val().trim() === '') {
                    isValid = false;
                    $(this).addClass('is-invalid');
                } else {
                    $(this).removeClass('is-invalid');
                }
            });

            // Email validation
            var email = form.find('input[type="email"]');
            if (email.length && email.val() !== '') {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.val())) {
                    isValid = false;
                    email.addClass('is-invalid');
                }
            }

            // Phone validation
            var phone = form.find('input[type="tel"]');
            if (phone.length && phone.val() !== '') {
                var phoneRegex = /^[0-9+\-\s()]+$/;
                if (!phoneRegex.test(phone.val())) {
                    isValid = false;
                    phone.addClass('is-invalid');
                }
            }

            if (!isValid) {
                e.preventDefault();
                
                // Scroll to first invalid field
                var firstInvalid = form.find('.is-invalid').first();
                if (firstInvalid.length) {
                    $('html, body').animate({
                        scrollTop: firstInvalid.offset().top - 100
                    }, 500);
                }
                
                return false;
            }
        });

        // Remove validation class on input
        $('input, textarea, select').on('input change', function() {
            $(this).removeClass('is-invalid');
        });

        // Lazy Loading for Images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            $('.lazy').each(function() {
                $(this).attr('src', $(this).data('src')).removeClass('lazy');
            });
        }

        // Click to Call Tracking
        $('a[href^="tel:"]').on('click', function() {
            var phoneNumber = $(this).attr('href').replace('tel:', '');
            console.log('Phone call initiated:', phoneNumber);
            // Add analytics tracking here if needed
            // Example: gtag('event', 'click_to_call', { phone_number: phoneNumber });
        });

        // Email Click Tracking
        $('a[href^="mailto:"]').on('click', function() {
            var email = $(this).attr('href').replace('mailto:', '');
            console.log('Email clicked:', email);
            // Add analytics tracking here if needed
        });

        // CTA Button Tracking
        $('.btn-primary, .get-quote-btn, .btn-cta').on('click', function() {
            var buttonText = $(this).text().trim();
            var buttonHref = $(this).attr('href');
            console.log('CTA clicked:', buttonText, buttonHref);
            // Add analytics tracking here if needed
        });

        // Tooltip Initialization
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        // Popover Initialization
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });

        // Dynamic Year in Footer
        $('.current-year').text(new Date().getFullYear());

        // External Links - Open in New Tab
        $('a').filter(function() {
            return this.hostname && this.hostname !== window.location.hostname;
        }).attr({
            target: '_blank',
            rel: 'noopener noreferrer'
        });

        // Dropdown Hover Effect (Desktop Only)
        if ($(window).width() > 991) {
            $('.navbar .dropdown').hover(
                function() {
                    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
                    $(this).addClass('show');
                    $(this).find('.dropdown-toggle').attr('aria-expanded', 'true');
                },
                function() {
                    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
                    $(this).removeClass('show');
                    $(this).find('.dropdown-toggle').attr('aria-expanded', 'false');
                }
            );
        }

        // Prevent dropdown from closing on click inside (for complex dropdowns)
        $('.dropdown-menu').on('click', function(e) {
            e.stopPropagation();
        });

        // Number Input Validation
        $('input[type="number"]').on('input', function() {
            var val = parseFloat($(this).val());
            var min = parseFloat($(this).attr('min'));
            var max = parseFloat($(this).attr('max'));
            
            if (!isNaN(min) && val < min) {
                $(this).val(min);
            }
            if (!isNaN(max) && val > max) {
                $(this).val(max);
            }
        });

        // Copy to Clipboard
        $('.copy-button').on('click', function(e) {
            e.preventDefault();
            var text = $(this).data('copy-text');
            
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function() {
                    console.log('Copied to clipboard:', text);
                    // Show success feedback
                    // You can add a toast notification here
                }).catch(function(err) {
                    console.error('Failed to copy:', err);
                });
            }
        });

        // Print Page Functionality
        $('.print-page').on('click', function(e) {
            e.preventDefault();
            window.print();
        });

        // Share Functionality
        $('.share-button').on('click', function(e) {
            e.preventDefault();
            var url = $(this).data('url') || window.location.href;
            var title = $(this).data('title') || document.title;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                }).catch(function(err) {
                    console.log('Error sharing:', err);
                });
            } else {
                // Fallback: Copy URL to clipboard
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url);
                }
            }
        });

        // Auto-hide Alerts
        $('.alert[data-auto-dismiss]').each(function() {
            var alert = $(this);
            var delay = parseInt(alert.data('auto-dismiss')) || 5000;
            
            setTimeout(function() {
                alert.fadeOut('slow', function() {
                    $(this).remove();
                });
            }, delay);
        });

        // Accordion Animation Enhancement
        $('.accordion-button').on('click', function() {
            $(this).toggleClass('active');
        });

        // Tab Switch - Refresh AOS
        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function() {
            AOS.refresh();
        });

        // Preload Critical Images
        function preloadImages() {
            var images = [
                'images/logo.png',
                'images/hero-main.jpg'
            ];
            
            images.forEach(function(src) {
                var img = new Image();
                img.src = src;
            });
        }
        
        preloadImages();

        // Performance: Debounce scroll events
        var scrollTimeout;
        var lastScrollTop = 0;
        
        $(window).on('scroll', function() {
            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(function() {
                var st = $(window).scrollTop();
                
                // Add additional scroll-based functionality here
                
                lastScrollTop = st;
            }, 50);
        });

    }); // End Document Ready

    // Window Resize Handler
    var resizeTimeout;
    $(window).on('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            AOS.refresh();
            
            // Re-initialize hover effects on resize
            if ($(window).width() > 991) {
                $('.navbar .dropdown').off('mouseenter mouseleave');
                $('.navbar .dropdown').hover(
                    function() {
                        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
                    },
                    function() {
                        $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
                    }
                );
            } else {
                $('.navbar .dropdown').off('mouseenter mouseleave');
            }
        }, 250);
    });

    // Window Load Handler
    $(window).on('load', function() {
        // Remove any loading screens
        $('.page-loader').fadeOut('slow');
        
        // Trigger AOS refresh after all content loads
        AOS.refresh();
    });

})(jQuery);

// Vanilla JavaScript for additional functionality

// Service Worker Registration (for PWA - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment to register service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker registered:', registration);
        //     })
        //     .catch(function(err) {
        //         console.log('ServiceWorker registration failed:', err);
        //     });
    });
}

// Performance monitoring
if (window.performance) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            var perfData = window.performance.timing;
            var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        }, 0);
    });
}

// Console Branding
console.log(
    '%cFERS',
    'color: #FF6B35; font-size: 32px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);'
);
console.log(
    '%cPremium Retail Solutions & Equipment',
    'color: #004E89; font-size: 14px; font-weight: 600;'
);
console.log(
    '%cWebsite developed with ❤️',
    'color: #6C757D; font-size: 12px;'
);