/* Easter egg: a flock of little yellow birds (糊塗塌客) drifts across the
   homepage on Andy's birthday. Set params.birthday ("MM-DD") in config.yml.
   Append ?birthday=1 to any URL to preview it on a normal day. */
(function () {
    var host = document.getElementById('birthday-egg');
    if (!host) return;

    var forced = /[?&]birthday=1(&|$)/.test(window.location.search);
    if (!forced) {
        var bday = (host.getAttribute('data-birthday') || '').trim();
        if (!/^\d{2}-\d{2}$/.test(bday)) return;
        var now = new Date();
        var mm = ('0' + (now.getMonth() + 1)).slice(-2);
        var dd = ('0' + now.getDate()).slice(-2);
        if (mm + '-' + dd !== bday) return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var BIRD = '' +
        '<svg viewBox="0 0 50 40" aria-hidden="true" focusable="false">' +
        '<path class="wb-tail" d="M32 22 L46 17 L43 22 L46 28 Z"/>' +
        '<path class="wb-legs" d="M20 31 C19 34 17 35 15.5 35 M24 31 C23.5 34 22 35.5 20.5 35.5"/>' +
        '<ellipse class="wb-body" cx="22" cy="21" rx="12.5" ry="10"/>' +
        '<path class="wb-tuft" d="M17 11 C15.5 7.5 14 6 12.5 5 M22 10 C22 6.5 21.5 5 21 4 M27 11 C28.5 7.5 30 6 31.5 5"/>' +
        '<path class="wb-beak" d="M11 20 L2.5 22 L11 24.5 Z"/>' +
        '<circle class="wb-eye" cx="15" cy="17.5" r="1.6"/>' +
        '<path class="wb-wing" d="M23 17.5 C27.5 11.5 34.5 12.5 36 16 C33 21.5 26.5 22 23 19.5 Z"/>' +
        '</svg>';

    var CSS = '' +
        '#birthday-egg{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:60}' +
        '.wb-bird{position:absolute;top:var(--wb-top);left:0;will-change:transform;' +
        'animation:wb-cross var(--wb-dur) linear forwards}' +
        '.wb-bird.wb-rtl{animation-name:wb-cross-back}' +
        '@keyframes wb-cross{from{transform:translateX(-160px)}to{transform:translateX(calc(100vw + 160px))}}' +
        '@keyframes wb-cross-back{from{transform:translateX(calc(100vw + 160px))}to{transform:translateX(-160px)}}' +
        '.wb-bob{animation:wb-bob var(--wb-bobdur) ease-in-out infinite alternate}' +
        '@keyframes wb-bob{from{transform:translateY(calc(var(--wb-bob) * -1)) rotate(-9deg)}' +
        'to{transform:translateY(var(--wb-bob)) rotate(9deg)}}' +
        '.wb-bird svg{display:block;width:calc(50px * var(--wb-scale));height:auto;overflow:visible}' +
        '.wb-bird.wb-rtl svg{transform:scaleX(-1)}' +
        '.wb-body{fill:#ffd93d}' +
        '.wb-tail{fill:#f5c518}' +
        '.wb-wing{fill:#f2bf10;transform-origin:23px 17.5px;' +
        'animation:wb-flap var(--wb-flap) ease-in-out infinite alternate}' +
        '@keyframes wb-flap{from{transform:rotate(-30deg) scaleY(.8)}to{transform:rotate(22deg) scaleY(1)}}' +
        '.wb-tuft{fill:none;stroke:#ffd93d;stroke-width:2.2;stroke-linecap:round}' +
        '.wb-legs{fill:none;stroke:#f0a500;stroke-width:1.6;stroke-linecap:round}' +
        '.wb-beak{fill:#f0a500}' +
        '.wb-eye{fill:#2e2e33}' +
        '@media (max-width:600px){.wb-bird svg{width:calc(36px * var(--wb-scale))}}';

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var MAX_BIRDS = 7;

    function rand(lo, hi) { return lo + Math.random() * (hi - lo); }

    function spawn() {
        if (document.hidden) return;
        if (host.childElementCount >= MAX_BIRDS) return;

        var bird = document.createElement('div');
        bird.className = 'wb-bird' + (Math.random() < 0.35 ? ' wb-rtl' : '');
        bird.style.setProperty('--wb-top', rand(6, 82).toFixed(1) + 'vh');
        bird.style.setProperty('--wb-scale', rand(0.55, 1.3).toFixed(2));
        bird.style.setProperty('--wb-dur', rand(9, 18).toFixed(1) + 's');
        bird.style.setProperty('--wb-bob', rand(6, 18).toFixed(1) + 'px');
        bird.style.setProperty('--wb-bobdur', rand(0.8, 1.7).toFixed(2) + 's');
        bird.style.setProperty('--wb-flap', rand(0.14, 0.26).toFixed(2) + 's');

        var bob = document.createElement('div');
        bob.className = 'wb-bob';
        bob.innerHTML = BIRD;
        bird.appendChild(bob);

        bird.addEventListener('animationend', function (e) {
            if (e.target === bird) bird.remove();
        });
        host.appendChild(bird);
    }

    // A small flock to start, then a steady trickle all day.
    for (var i = 0; i < 3; i++) setTimeout(spawn, i * 1400 + 600);
    setInterval(spawn, 2600);
})();
