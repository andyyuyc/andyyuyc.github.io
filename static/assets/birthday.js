/* Easter egg: a flock of Woodstock birds flies across the homepage on Andy's
   birthday. Set params.birthday ("MM-DD") in config.yml.
   params.birthdayBird can override the bundled Woodstock artwork.
   The bundled PNG is clipped into a body and an independently flapping wing.
   Append ?birthday=1 to the homepage URL to preview it on a normal day. */
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

    var sprite = (host.getAttribute('data-bird') || '').trim();
    if (!sprite) return;
    var flapWing = host.getAttribute('data-bird-flap') === 'true';

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
        '.wb-maneuver{transform-origin:50% 55%}' +
        // The original artwork includes transparent space on both sides.
        '.wb-sprite{display:block;width:calc(100px * var(--wb-scale));height:auto}' +
        '.wb-bird.wb-rtl .wb-sprite{transform:scaleX(-1)}' +
        '.wb-wing{transform-box:view-box;transform-origin:260px 218px;' +
        'animation:wb-flap var(--wb-flapdur) linear infinite;animation-delay:var(--wb-flapdelay)}' +
        '@keyframes wb-flap{0%,100%{transform:rotate(62deg) scaleY(.82)}' +
        '25%{transform:rotate(0deg) scaleY(.55)}50%{transform:rotate(-48deg) scaleY(1)}' +
        '75%{transform:rotate(0deg) scaleY(.55)}}' +
        '@media (max-width:600px){.wb-bird .wb-sprite{width:calc(68px * var(--wb-scale))}}';

    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    var MAX_BIRDS = 7;
    var TUMBLE_CHANCE = 0.35;
    var spriteId = 0;

    function rand(lo, hi) { return lo + Math.random() * (hi - lo); }

    function animateFlight(maneuver, duration, rightToLeft) {
        if (typeof maneuver.animate !== 'function') return null;
        // Most birds complete a normal flight; only some lose their balance.
        if (Math.random() >= TUMBLE_CHANCE) return null;

        var frames = [];
        var heading = rightToLeft ? -1 : 1;
        var angle = 0;
        var altitude = 0;
        var crossingWidth = window.innerWidth + 320;
        var visibleStart = duration * 200 / crossingWidth;
        var visibleTime = duration * Math.max(160, window.innerWidth - 80) / crossingWidth;
        var count = visibleTime > 6 && Math.random() < 0.25 ? 2 : 1;
        var slot = visibleTime / count;
        var lift = Math.min(52, window.innerHeight * 0.065);

        function pose(time, x, y, rotation, easing) {
            frames.push({
                offset: time / duration,
                transform: 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) +
                    'px) rotate(' + rotation.toFixed(1) + 'deg)',
                easing: easing || 'ease-in-out'
            });
        }

        pose(0, 0, 0, 0);
        for (var i = 0; i < count; i++) {
            // Leave calm flight between stumbles and keep the last recovery
            // on screen. Each bird gets different timing and a different arc.
            var tumbleTime = Math.min(rand(1.55, 2.05), slot * 0.7);
            var start = visibleStart + i * slot + rand(slot * 0.08, slot - tumbleTime - slot * 0.08);
            var turn = heading * (Math.random() < 0.2 ? -1 : 1);
            var drop = lift * rand(0.7, 1);
            var hesitation = Math.min(42, window.innerWidth * 0.06) * heading;
            var nextAltitude = rand(-lift * 0.25, lift * 0.25);

            pose(start, 0, altitude, angle);
            // A small climb, loss of balance, then a brief upside-down hang.
            pose(start + tumbleTime * 0.12, -hesitation * 0.12,
                altitude - drop * 0.55, angle - turn * 18, 'ease-in');
            pose(start + tumbleTime * 0.32, -hesitation * 0.5,
                altitude - drop * 0.8, angle + turn * 150, 'ease-out');
            pose(start + tumbleTime * 0.46, -hesitation * 0.85,
                altitude - drop * 0.3, angle + turn * 182, 'ease-in');
            pose(start + tumbleTime * 0.62, -hesitation,
                altitude + drop * 0.35, angle + turn * 198, 'ease-in');
            // Drop, finish the somersault and wobble back into forward flight.
            pose(start + tumbleTime * 0.78, -hesitation * 0.55,
                altitude + drop, angle + turn * 310, 'ease-out');
            pose(start + tumbleTime * 0.90, hesitation * 0.12,
                nextAltitude + drop * 0.3, angle + turn * 378);
            angle += turn * 360;
            altitude = nextAltitude;
            pose(start + tumbleTime, 0, altitude, angle);
        }
        pose(duration, 0, 0, angle);
        return maneuver.animate(frames, { duration: duration * 1000, fill: 'both' });
    }

    function createSprite() {
        if (!flapWing) {
            var img = new Image();
            img.src = sprite;
            img.alt = '';
            img.draggable = false;
            img.className = 'wb-sprite';
            return img;
        }

        // Reuse the original artwork for both layers; unique IDs keep each
        // bird's clips independent when another bird leaves the screen.
        var id = 'wb-art-' + (++spriteId);
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 500 330');
        svg.setAttribute('width', '500');
        svg.setAttribute('height', '330');
        svg.setAttribute('class', 'wb-sprite');
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        svg.innerHTML = '<defs>' +
            '<image id="' + id + '" width="500" height="330"/>' +
            '<clipPath id="' + id + '-body"><path d="M0 0H500V330H0V258H253' +
            'C245 244 258 224 270 208L261 202H0Z"/></clipPath>' +
            '<clipPath id="' + id + '-wing"><path d="M172 202H271V216' +
            'C260 226 251 242 232 249Q207 260 181 249Z"/></clipPath>' +
            '</defs>' +
            '<use href="#' + id + '" clip-path="url(#' + id + '-body)"/>' +
            // Close the body outline where the wing was attached.
            '<path d="M266 211C258 224 245 244 252 257" fill="none"' +
            ' stroke="#281e13" stroke-width="8" stroke-linecap="round"/>' +
            '<g class="wb-wing"><use href="#' + id + '" clip-path="url(#' + id + '-wing)"/></g>';
        svg.querySelector('image').setAttribute('href', sprite);
        return svg;
    }

    function spawn() {
        if (document.hidden) return;
        if (host.childElementCount >= MAX_BIRDS) return;

        var rightToLeft = Math.random() < 0.35;
        var duration = rand(12, 19);
        var scale = rand(0.55, 1.3);
        var spriteWidth = (window.innerWidth <= 600 ? 68 : 100) * scale;
        var edge = spriteWidth * 0.5 + Math.min(52, window.innerHeight * 0.065) * 1.25 + 14;
        var topMin = Math.max(window.innerHeight * 0.16, edge);
        var topMax = Math.min(window.innerHeight * 0.68, window.innerHeight - edge - spriteWidth * 0.66);
        var top = topMax > topMin ? rand(topMin, topMax) : (window.innerHeight - spriteWidth * 0.66) / 2;
        var bird = document.createElement('div');
        bird.className = 'wb-bird' + (rightToLeft ? ' wb-rtl' : '');
        // Reserve room above and below for rolls, including on short screens.
        bird.style.setProperty('--wb-top', (top / window.innerHeight * 100).toFixed(1) + 'vh');
        bird.style.setProperty('--wb-scale', scale.toFixed(2));
        bird.style.setProperty('--wb-dur', duration + 's');
        bird.style.setProperty('--wb-bob', rand(6, 12).toFixed(1) + 'px');
        bird.style.setProperty('--wb-bobdur', rand(0.8, 1.7).toFixed(2) + 's');
        bird.style.setProperty('--wb-flapdur', rand(0.16, 0.22).toFixed(2) + 's');
        bird.style.setProperty('--wb-flapdelay', '-' + rand(0, 0.22).toFixed(2) + 's');

        var bob = document.createElement('div');
        bob.className = 'wb-bob';
        var maneuver = document.createElement('div');
        maneuver.className = 'wb-maneuver';
        maneuver.appendChild(createSprite());
        bob.appendChild(maneuver);
        bird.appendChild(bob);

        var flight;
        bird.addEventListener('animationend', function (e) {
            if (e.target !== bird) return;
            if (flight) flight.cancel();
            bird.remove();
        });
        host.appendChild(bird);
        flight = animateFlight(maneuver, duration, rightToLeft);
    }

    // A small flock to start, then a steady trickle all day.
    for (var i = 0; i < 3; i++) setTimeout(spawn, i * 1400 + 600);
    setInterval(spawn, 2600);
})();
