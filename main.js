/* Let's Attune — shared behavior (vanilla JS, no deps) */
(function () {
  'use strict';

  /* Sticky header shrink */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 40); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile nav toggle */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');

  /* Our Work now has its own page */
  document.querySelectorAll('a[href="index.html#our-work"], a[href="#our-work"]').forEach(function (link) {
    link.setAttribute('href', 'our-work.html');
  });

  /* meCove is a separate website */
  document.querySelectorAll('a[href^="https://mecove.com"]').forEach(function (link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (link) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener');
  });

  var gatheringInterest = document.querySelector('.upcoming-gathering__actions .btn');
  if (gatheringInterest) {
    gatheringInterest.setAttribute('target', '_blank');
    gatheringInterest.setAttribute('rel', 'noopener');
  }

  /* Shared social links in every footer */
  document.querySelectorAll('.site-footer h4').forEach(function (heading) {
    if (heading.textContent.trim().toLowerCase() !== 'connect') return;
    var list = heading.nextElementSibling;
    if (!list || list.querySelector('.footer-social-links')) return;
    var item = document.createElement('li');
    item.className = 'footer-social-links';
    item.innerHTML =
      '<a href="https://www.instagram.com/lets.attune/" target="_blank" rel="noopener" aria-label="Let’s Attune on Instagram">Instagram ↗</a>' +
      '<a href="https://www.youtube.com/@LetsAttune" target="_blank" rel="noopener" aria-label="Let’s Attune on YouTube">YouTube ↗</a>';
    list.appendChild(item);
  });

  /* Shared "Work with us" dropdown */
  if (nav) {
    var workLink = nav.querySelector('a.link[href="#ways"], a.link[href="index.html#ways"]');
    if (workLink) {
      var workMenu = document.createElement('div');
      var workToggle = document.createElement('button');
      var workPanel = document.createElement('div');
      var currentPage = window.location.pathname.split('/').pop() || 'index.html';
      var workPages = ['coaching.html', 'working-professionals.html', 'workshops.html', 'gatherings.html'];

      workMenu.className = 'nav-dropdown';
      if (workLink.classList.contains('active') || workPages.indexOf(currentPage) !== -1) {
        workMenu.classList.add('active');
      }

      workToggle.className = 'nav-dropdown__toggle';
      workToggle.type = 'button';
      workToggle.setAttribute('aria-expanded', 'false');
      workToggle.setAttribute('aria-controls', 'work-with-us-menu');
      workToggle.innerHTML = 'Work with us <span class="nav-dropdown__chevron" aria-hidden="true"></span>';

      workPanel.className = 'nav-dropdown__menu';
      workPanel.id = 'work-with-us-menu';
      workPanel.innerHTML =
        '<a href="coaching.html"><span>Individual coaching</span><small>Space to understand what is going on</small></a>' +
        '<a href="working-professionals.html"><span>For working professionals</span><small>Mentoring for workplace challenges and career decisions</small></a>' +
        '<a href="workshops.html"><span>Workshops</span><small>Experiences designed for groups</small></a>' +
        '<a href="gatherings.html"><span>Attune Gatherings</span><small>Shared spaces around one experience</small></a>';

      workLink.parentNode.insertBefore(workMenu, workLink);
      workLink.remove();
      workMenu.appendChild(workToggle);
      workMenu.appendChild(workPanel);

      var currentWorkLink = workPanel.querySelector('a[href="' + currentPage + '"]');
      if (currentWorkLink) {
        currentWorkLink.classList.add('current');
        currentWorkLink.setAttribute('aria-current', 'page');
      }

      var closeWorkMenu = function () {
        workMenu.classList.remove('open');
        workToggle.setAttribute('aria-expanded', 'false');
      };

      workToggle.addEventListener('click', function (e) {
        if (window.innerWidth > 900) {
          window.location.href = 'index.html#ways';
          return;
        }
        e.stopPropagation();
        var isOpen = workMenu.classList.toggle('open');
        workToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
      document.addEventListener('click', function (e) {
        if (!workMenu.contains(e.target)) closeWorkMenu();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          closeWorkMenu();
          workToggle.focus();
        }
      });
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Hero typewriter (only if present, respects reduced motion) */
  var tw = document.getElementById('typewriter');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (tw) {
    var plain = tw.getAttribute('data-plain') || 'Tune Into ';
    var accent = tw.getAttribute('data-accent') || 'Yourself';
    if (reduce) {
      tw.innerHTML = plain + '<span class="accent">' + accent + '</span>';
    } else {
      var total = plain.length + accent.length, i = 0;
      (function type() {
        if (i > total) { tw.innerHTML = plain + '<span class="accent">' + accent + '</span>'; return; }
        var p = plain.slice(0, Math.min(i, plain.length));
        var a = accent.slice(0, Math.max(0, i - plain.length));
        tw.innerHTML = p + (a ? '<span class="accent">' + a + '</span>' : '') + '<span class="cursor"></span>';
        i++; setTimeout(type, 75);
      })();
    }
  }

  /* Footer year */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();

  /* Shared footer privacy link */
  var footerCopy = document.querySelector('.footer-copy');
  if (footerCopy && !footerCopy.querySelector('a[href="privacy.html"]')) {
    var separator = document.createElement('span');
    var privacyLink = document.createElement('a');
    separator.className = 'footer-separator';
    separator.textContent = '·';
    privacyLink.href = 'privacy.html';
    privacyLink.textContent = 'Privacy Policy';
    footerCopy.appendChild(separator);
    footerCopy.appendChild(privacyLink);
  }
})();
