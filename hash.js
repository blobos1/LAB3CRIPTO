(async function computeMd5() {
  const url = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
  function loadScriptOnce(src) {
    return new Promise((resolve, reject) => {
      if (window.CryptoJS) return resolve(); // ya cargado
      const existing = Array.from(document.scripts).find(s => s.src === src);
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('load failed')));
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('No se pudo cargar CryptoJS'));
      document.head.appendChild(script);
    });
  }

  try {
    await loadScriptOnce(url);
    const pwd = (prompt('Ingresa la contraseña a hashear', '1adminn23') || '1adminn23');
    const hash = CryptoJS.MD5(pwd).toString(CryptoJS.enc.Hex);

    console.log('Contraseña:', pwd);
    console.log('MD5:', hash);

    return hash; 
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
})();
