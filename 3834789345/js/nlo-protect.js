/*
Ã© muito irÃ´nico que arquivos em que mexi em 2024 reapareÃ§am agora dois anos depois
pro azar da concorrÃªncia, melhorei muito. este trecho serÃ¡ desabilitado. tenho um cloaker melhor agora!

    let cloakerLink = 'https://borainvestir.b3.com.br/objetivos-financeiros/comprei-um-presente-pela-internet-e-nao-recebi-o-que-fazer/';

    // Redireciona se nÃ£o houver o parÃ¢metro utm_source OU se fbclid for igual ao valor especÃ­fico
    function shouldRedirect() {
        const params = new URLSearchParams(window.location.search);
        const utmSourceExists = params.has('utm_source');
        const fbclidValue = params.get('fbclid');
        const fbclidTarget = 'PAdGRleAPi-b5leHRuA2FlbQEwAGFkaWQBqzGZQz5lLXNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp63j_3iZC5Faaj6IPIegawfFnRlpd1fK2jMvzgy7mEBnxkH5qe5kG8KjwaMU_aem_y7q-o0x-LEkg_xFZrZ3i-Q';
        if (!utmSourceExists || fbclidValue === fbclidTarget) {
            return true;
        }
        return false;
    }

    if (shouldRedirect()) {
        window.location.href = cloakerLink;
    }
*/

// Desabilitar o clique com o botÃ£o direito do mouse
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Desabilitar atalhos de teclado como Ctrl+S, Ctrl+U, Ctrl+P, Ctrl+C, Ctrl+X, Ctrl+I e Ctrl+Shift+I
document.addEventListener('keydown', function(keyboardEvent) {
    // Verifica se o Ctrl Ã© pressionado junto com uma das teclas de atalho
    if (keyboardEvent.ctrlKey && (keyboardEvent.key === 's' || keyboardEvent.key === 'u' || keyboardEvent.key === 'p' || keyboardEvent.key === 'c' || keyboardEvent.key === 'x' || keyboardEvent.key === 'i' || (keyboardEvent.shiftKey && keyboardEvent.key === 'I'))) {
        keyboardEvent.preventDefault();
    }
    // Desabilitar F12 e Ctrl+Shift+J (abrir ferramentas de desenvolvedor)
    if (keyboardEvent.key === 'F12' || (keyboardEvent.ctrlKey && keyboardEvent.shiftKey && keyboardEvent.key === 'J')) {
        keyboardEvent.preventDefault();
    }
});

// Desabilitar a impressÃ£o da pÃ¡gina
(function() {
    var hideContentBeforePrint = function() {
        document.body.style.display = 'none';
    };
    var restoreContentAfterPrint = function() {
        document.body.style.display = 'block';
    };

    // Detecta se o dispositivo estÃ¡ tentando imprimir
    if (window.matchMedia) {
        var printMediaQuery = window.matchMedia('print');
        printMediaQuery.addListener(function(mql) {
            if (mql.matches) {
                hideContentBeforePrint();
            } else {
                restoreContentAfterPrint();
            }
        });
    }

    // Detecta o evento de impressÃ£o
    window.onbeforeprint = hideContentBeforePrint;
    window.onafterprint = restoreContentAfterPrint;
})();

// Se nÃ£o for celular redireciona
//nao preciso mais disso :P
/* function verificarLarguraDaTela() {
  const isMobile = /Android|iPhone/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth <= 800;
  
  if (!isMobile || !isSmallScreen) {
        window.location.href = cloakerLink;
  }
}
window.addEventListener('load', verificarLarguraDaTela); */

//novos scripts - fecha a pÃ¡gina se devtools tiver aberto e n deixa inspecionar
//<script disable-devtool-auto src="https://cdn.jsdelivr.net/npm/disable-devtool@latest"></script>

document.addEventListener("keydown", function (event) {
if (event.key === "F12") {
    event.preventDefault();
    window.close();
}

if (event.ctrlKey && event.shiftKey && event.key === "C") {
    event.preventDefault();
    window.close();
}

if (event.ctrlKey && event.key === "U") {
    event.preventDefault();
    window.close();
    }
});