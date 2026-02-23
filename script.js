document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const navBtns = {
        trans: document.getElementById('nav-translator'),
        calc: document.getElementById('nav-calculator'),
        prog: document.getElementById('nav-programmer')
    };

    const screens = {
        trans: document.getElementById('screen-translator'),
        calc: document.getElementById('screen-calculator'),
        prog: document.getElementById('screen-programmer')
    };

    const watermark = document.getElementById('bg-watermark');

    // 2. NAVIGATION FUNCTION
    function switchTab(activeKey) {
        // Hide all screens and remove active class from buttons
        Object.keys(screens).forEach(key => {
            screens[key].classList.add('hidden');
            navBtns[key].classList.remove('active');
        });

        // Show the clicked screen and activate button
        screens[activeKey].classList.remove('hidden');
        navBtns[activeKey].classList.add('active');

        // Update Watermark
        if (activeKey === 'trans') {
            watermark.textContent = 'A ا B ب C ج D د';
            watermark.style.transform = 'translate(-50%, -50%) rotate(-10deg)';
        } else if (activeKey === 'calc') {
            watermark.textContent = '+ - × ÷ % =';
            watermark.style.transform = 'translate(-50%, -50%) rotate(5deg)';
        } else if (activeKey === 'prog') {
            watermark.textContent = '010000111100';
            watermark.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        }
    }

    // 3. ATTACH EVENTS (The Fix)
    if (navBtns.trans) navBtns.trans.addEventListener('click', () => switchTab('trans'));
    if (navBtns.calc) navBtns.calc.addEventListener('click', () => switchTab('calc'));
    if (navBtns.prog) navBtns.prog.addEventListener('click', () => switchTab('prog'));

    // --- REMAINDER OF YOUR LOGIC (Calculator & Base Converter) ---
    // (Ensure you keep your calculation/conversion logic here)
    const baseDec = document.getElementById('base-dec');
    const baseBin = document.getElementById('base-bin');
    const baseOct = document.getElementById('base-oct');
    const baseHex = document.getElementById('base-hex');

    function updateBases(source, val) {
        if (!val) { baseDec.value = baseBin.value = baseOct.value = baseHex.value = ''; return; }
        let dec;
        if (source === 'dec') dec = parseInt(val, 10);
        if (source === 'bin') dec = parseInt(val, 2);
        if (source === 'oct') dec = parseInt(val, 8);
        if (source === 'hex') dec = parseInt(val, 16);
        if (isNaN(dec)) return;
        if (source !== 'dec') baseDec.value = dec.toString(10);
        if (source !== 'bin') baseBin.value = dec.toString(2);
        if (source !== 'oct') baseOct.value = dec.toString(8);
        if (source !== 'hex') baseHex.value = dec.toString(16).toUpperCase();
    }

    [baseDec, baseBin, baseOct, baseHex].forEach(el => {
        if (el) el.addEventListener('input', (e) => updateBases(el.id.split('-')[1], e.target.value));
    });
});
