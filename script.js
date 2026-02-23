document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. NAVIGATION LOGIC (The Tab Switcher)
    // ==========================================
    try {
        const tabs = ['translator', 'calculator', 'programmer'];
        const bgWatermark = document.getElementById('bg-watermark');

        function switchTab(activeTab) {
            // Hide all screens and deactivate buttons
            tabs.forEach(tab => {
                const screen = document.getElementById(`screen-${tab}`);
                const nav = document.getElementById(`nav-${tab}`);
                if (screen) screen.classList.add('hidden');
                if (nav) nav.classList.remove('active');
            });

            // Show the clicked screen and activate its button
            const activeScreen = document.getElementById(`screen-${activeTab}`);
            const activeNav = document.getElementById(`nav-${activeTab}`);
            if (activeScreen) activeScreen.classList.remove('hidden');
            if (activeNav) activeNav.classList.add('active');

            // Change the background watermark
            if (bgWatermark) {
                if (activeTab === 'translator') { 
                    bgWatermark.textContent = 'A ا B ب C ج D د'; 
                    bgWatermark.style.transform = 'translate(-50%, -50%) rotate(-10deg)'; 
                }
                if (activeTab === 'calculator') { 
                    bgWatermark.textContent = '+ - × ÷ % ='; 
                    bgWatermark.style.transform = 'translate(-50%, -50%) rotate(5deg)'; 
                }
                if (activeTab === 'programmer') { 
                    bgWatermark.textContent = '010000111100'; 
                    bgWatermark.style.transform = 'translate(-50%, -50%) rotate(0deg)'; 
                }
            }
        }

        // Attach click events to the top buttons
        document.getElementById('nav-translator')?.addEventListener('click', () => switchTab('translator'));
        document.getElementById('nav-calculator')?.addEventListener('click', () => switchTab('calculator'));
        document.getElementById('nav-programmer')?.addEventListener('click', () => switchTab('programmer'));
    } catch (err) { console.error("Navigation Error:", err); }

    // ==========================================
    // 2. TRANSLATOR LOGIC
    // ==========================================
    try {
        const translateBtn = document.getElementById('translate-btn');
        const swapBtn = document.getElementById('swap-btn');
        const inputText = document.getElementById('input-text');
        const outputText = document.getElementById('output-text');
        const langFrom = document.getElementById('lang-from');
        const langTo = document.getElementById('lang-to');

        if (swapBtn) {
            swapBtn.addEventListener('click', () => {
                let tempLang = langFrom.value; langFrom.value = langTo.value; langTo.value = tempLang;
                let tempText = inputText.value; inputText.value = outputText.value; outputText.value = tempText;
            });
        }

        if (translateBtn) {
            translateBtn.addEventListener('click', async () => {
                let text = inputText.value; 
                let from = langFrom.value; 
                let to = langTo.value;
                
                if (!text) {
                    outputText.value = "Please enter some text first!";
                    return;
                }
                
                outputText.value = "Translating...";
                let apiUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
                
                try {
                    let response = await fetch(apiUrl);
                    let data = await response.json();
                    let translatedText = '';
                    data[0].forEach(item => { if (item[0]) translatedText += item[0]; });
                    outputText.value = translatedText;
                } catch (error) { 
                    outputText.value = "Oops! Connection error."; 
                }
            });
        }
    } catch (err) { console.error("Translator Error:", err); }

    // ==========================================
    // 3. CALCULATOR LOGIC
    // ==========================================
    try {
        const num1 = document.getElementById('num1'); 
        const num2 = document.getElementById('num2');
        const operator = document.getElementById('operator'); 
        const calcBtn = document.getElementById('calc-btn');
        const calcResult = document.getElementById('calc-result');

        function performCalculation() {
            const val1 = parseFloat(num1.value); 
            const val2 = parseFloat(num2.value); 
            const op = operator.value;
            
            if (isNaN(val1) || isNaN(val2)) { 
                calcResult.value = "Enter numbers"; 
                return; 
            }
            
            let result = 0;
            switch(op) {
                case '+': result = val1 + val2; break; 
                case '-': result = val1 - val2; break;
                case '*': result = val1 * val2; break; 
                case '/': result = val2 !== 0 ? val1 / val2 : "Error: Div by 0"; break;
            }
            // Round to 4 decimal places so it looks clean
            calcResult.value = Math.round(result * 10000) / 10000;
        }

        if (calcBtn) calcBtn.addEventListener('click', performCalculation);
        
        // Allow pressing 'Enter' to calculate
        if (num1 && num2 && operator) {
            [num1, num2, operator].forEach(el => el.addEventListener('keydown', (e) => { 
                if (e.key === 'Enter') { e.preventDefault(); performCalculation(); } 
            }));
        }
    } catch (err) { console.error("Calculator Error:", err); }

    // ==========================================
    // 4. BASE CONVERTER LOGIC (Left Exactly The Same!)
    // ==========================================
    try {
        const baseDec = document.getElementById('base-dec');
        const baseBin = document.getElementById('base-bin');
        const baseOct = document.getElementById('base-oct');
        const baseHex = document.getElementById('base-hex');

        function updateBases(sourceType, value) {
            if (value.trim() === '') {
                baseDec.value = ''; baseBin.value = ''; baseOct.value = ''; baseHex.value = '';
                return;
            }
            
            let decimalValue;
            if (sourceType === 'dec') decimalValue = parseInt(value, 10);
            if (sourceType === 'bin') decimalValue = parseInt(value, 2);
            if (sourceType === 'oct') decimalValue = parseInt(value, 8);
            if (sourceType === 'hex') decimalValue = parseInt(value, 16);

            if (isNaN(decimalValue)) return;

            if (sourceType !== 'dec') baseDec.value = decimalValue.toString(10);
            if (sourceType !== 'bin') baseBin.value = decimalValue.toString(2);
            if (sourceType !== 'oct') baseOct.value = decimalValue.toString(8);
            if (sourceType !== 'hex') baseHex.value = decimalValue.toString(16).toUpperCase();
        }

        if (baseDec) baseDec.addEventListener('input', (e) => updateBases('dec', e.target.value));
        if (baseBin) baseBin.addEventListener('input', (e) => updateBases('bin', e.target.value));
        if (baseOct) baseOct.addEventListener('input', (e) => updateBases('oct', e.target.value));
        if (baseHex) baseHex.addEventListener('input', (e) => updateBases('hex', e.target.value));
    } catch (err) { console.error("Base Converter Error:", err); }

});
