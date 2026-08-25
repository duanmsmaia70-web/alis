/**
 * Borracharia & Auto Center Gunther de Andrade
 * Interatividade, Calculadora de Orçamento e Conformidade LGPD
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano no rodapé
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Fechar ao clicar em qualquer link do menu mobile
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        
        // Fechar todos
        faqItems.forEach(otherItem => {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherAnswer) otherAnswer.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        // Alternar atual
        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // 4. Modal de Orçamento Rápido via WhatsApp
  const quoteModal = document.getElementById('quote-modal');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal');
  const closeQuoteBtn = document.getElementById('close-quote-modal');
  const quoteForm = document.getElementById('quick-quote-form');

  if (openQuoteBtns && quoteModal) {
    openQuoteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const servicePreselect = btn.getAttribute('data-service');
        if (servicePreselect && quoteForm) {
          const serviceSelect = quoteForm.querySelector('#service-type');
          if (serviceSelect) serviceSelect.value = servicePreselect;
        }
        quoteModal.classList.remove('hidden');
      });
    });
  }

  if (closeQuoteBtn && quoteModal) {
    closeQuoteBtn.addEventListener('click', () => {
      quoteModal.classList.add('hidden');
    });

    // Fechar clicando no fundo
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        quoteModal.classList.add('hidden');
      }
    });
  }

  // Envio do formulário com redirecionamento formatado para WhatsApp
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const vehicleType = document.getElementById('vehicle-type')?.value || 'Não informado';
      const serviceType = document.getElementById('service-type')?.value || 'Não informado';
      const clientName = document.getElementById('client-name')?.value || 'Cliente';
      const clientLocation = document.getElementById('client-location')?.value || 'Guarujá';
      const userMessage = document.getElementById('user-details')?.value || '';

      const baseText = `Olá! Gostaria de um orçamento na Borracharia Gunther de Andrade:\n\n` +
        `👤 *Nome:* ${clientName}\n` +
        `🚗 *Veículo:* ${vehicleType}\n` +
        `🔧 *Serviço:* ${serviceType}\n` +
        `📍 *Localização:* ${clientLocation}\n` +
        (userMessage ? `📝 *Observações:* ${userMessage}\n\n` : '\n') +
        `_Vim através do site oficial (Google Ads)._`;

      const encodedText = encodeURIComponent(baseText);
      const whatsappUrl = `https://wa.me/5513997000000?text=${encodedText}`;

      // Abre no WhatsApp
      window.open(whatsappUrl, '_blank');
      if (quoteModal) quoteModal.classList.add('hidden');
    });
  }

  // 5. Banner de Cookies / LGPD
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookieBtn = document.getElementById('accept-cookies');
  const rejectCookieBtn = document.getElementById('reject-cookies');

  if (cookieBanner) {
    const consent = localStorage.getItem('gunther_cookie_consent');
    if (!consent) {
      setTimeout(() => {
        cookieBanner.classList.remove('hidden');
      }, 1000);
    }

    if (acceptCookieBtn) {
      acceptCookieBtn.addEventListener('click', () => {
        localStorage.setItem('gunther_cookie_consent', 'accepted');
        cookieBanner.classList.add('hidden');
      });
    }

    if (rejectCookieBtn) {
      rejectCookieBtn.addEventListener('click', () => {
        localStorage.setItem('gunther_cookie_consent', 'necessary_only');
        cookieBanner.classList.add('hidden');
      });
    }
  }

  // 6. Copiar CNPJ ou Endereço com Toast
  window.copyToClipboard = function(text, elementId) {
    navigator.clipboard.writeText(text).then(() => {
      const el = document.getElementById(elementId);
      if (el) {
        const originalText = el.innerHTML;
        el.innerHTML = '✓ Copiado com sucesso!';
        el.classList.add('text-green-400');
        setTimeout(() => {
          el.innerHTML = originalText;
          el.classList.remove('text-green-400');
        }, 2000);
      }
    }).catch(err => {
      console.error('Erro ao copiar:', err);
    });
  };
});
