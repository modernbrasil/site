// Funções gerais do site
document.addEventListener('DOMContentLoaded', function () {
    // Preloader
    setTimeout(function () {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 1000);

    // Mobile Menu
    document.getElementById('mobileMenuBtn').addEventListener('click', function () {
        document.getElementById('mainNav').classList.toggle('show');
        this.innerHTML = document.getElementById('mainNav').classList.contains('show') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Inicializar Swiper para o Hero Slider
    if (document.querySelector('.swiper')) {
        new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Inicializar Swiper para Cases de Sucesso
    if (document.querySelector('.cases-slider')) {
        new Swiper('.cases-slider', {
            slidesPerView: 3,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    }

    // Botão Voltar ao Topo
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Modal de Orçamento
    const quoteBtn = document.getElementById('quoteBtn');
    const quoteModal = document.getElementById('quoteModal');
    const closeModal = document.querySelector('.close-modal');

    if (quoteBtn && quoteModal) {
        quoteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            quoteModal.classList.add('show');
        });

        closeModal.addEventListener('click', function () {
            quoteModal.classList.remove('show');
        });

        window.addEventListener('click', function (e) {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('show');
            }
        });
    }

    // Modal de Área do Cliente
    const clientAreaBtn = document.getElementById('clientAreaBtn');
    const clientAreaModal = document.getElementById('clientAreaModal');
    const closeClientModal = document.querySelector('#clientAreaModal .close-modal');

    if (clientAreaBtn && clientAreaModal) {
        clientAreaBtn.addEventListener('click', function (e) {
            e.preventDefault();
            clientAreaModal.classList.add('show');
        });

        closeClientModal.addEventListener('click', function () {
            clientAreaModal.classList.remove('show');
        });

        window.addEventListener('click', function (e) {
            if (e.target === clientAreaModal) {
                clientAreaModal.classList.remove('show');
            }
        });
    }

    // Chatbot
    const chatbotBtn = document.querySelector('.chatbot-btn');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotInput = document.querySelector('.chatbot-input');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotBody = document.querySelector('.chatbot-body');

    if (chatbotBtn && chatbotWindow) {
        chatbotBtn.addEventListener('click', function () {
            chatbotWindow.classList.toggle('show');
            if (chatbotWindow.classList.contains('show')) {
                setTimeout(function () {
                    addBotMessage('Olá! Como posso ajudar você hoje?');
                }, 500);
            }
        });

        if (chatbotSend && chatbotInput) {
            chatbotSend.addEventListener('click', sendMessage);
            chatbotInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }

        function sendMessage() {
            const message = chatbotInput.value.trim();
            if (message !== '') {
                addUserMessage(message);
                chatbotInput.value = '';

                // Simular resposta do bot após 1 segundo
                setTimeout(function () {
                    let response;
                    if (message.toLowerCase().includes('preço') || message.toLowerCase().includes('valor') || message.toLowerCase().includes('custo')) {
                        response = 'Para informações sobre preços, por favor entre em contato com nossa equipe comercial pelo telefone (71) 3381-9032 ou envie um e-mail para comercial@modernbrasil.com.br';
                    } else if (message.toLowerCase().includes('entrega') || message.toLowerCase().includes('prazo')) {
                        response = 'Nossos prazos de entrega variam conforme o produto e a região. Geralmente, entregamos em até 7 dias úteis após a confirmação do pedido.';
                    } else if (message.toLowerCase().includes('licitação') || message.toLowerCase().includes('dispensa')) {
                        response = 'A Modern Brasil tem ampla experiência em licitações e dispensas eletrônicas. Nossa equipe especializada pode te ajudar com todo o processo. Gostaria de falar com um de nossos consultores?';
                    } else {
                        response = 'Obrigado pelo seu contato! Um de nossos atendentes entrará em contato em breve. Você pode deixar seu e-mail ou telefone para agilizarmos o atendimento.';
                    }
                    addBotMessage(response);
                }, 1000);
            }
        }

        function addUserMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message user';
            messageElement.innerHTML = `<div class="chat-bubble">${message}</div>`;
            chatbotBody.appendChild(messageElement);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }

        function addBotMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message bot';
            messageElement.innerHTML = `<div class="chat-bubble">${message}</div>`;
            chatbotBody.appendChild(messageElement);
            chatbotBody.scrollTop = chatbotBody.scrollHeight;
        }
    }

    // Formulário de Contato
    emailjs.init('YDkaQ9_-Yxu3J-ezZ'); // Substitua pela sua chave pública do EmailJS

    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
           // e.preventDefault();

            const serviceID = 'service_c7hvwf2';
            const templateID = 'template_jyud0c3';

            const formData = {
                assunto: document.getElementById('subject').value,
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
            };

            emailjs.send(serviceID, templateID, formData)
                .then(response => {
                    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
                    contactForm.reset();
                })
                .catch(error => {
                    alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
                    console.error("Erro:", error);
                });
        });
    }

    /*
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            fetch('/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(result => {
                    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    contactForm.reset();
                })
                .catch(error => {
                    alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
                    console.error('Erro:', error);
                });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    } */

    // Formulário de Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Inscrição realizada com sucesso!');
            newsletterForm.reset();
        });
    }

    // Formulário de Orçamento
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Solicitação de orçamento enviada com sucesso! Nossa equipe entrará em contato em breve.');
            quoteForm.reset();
            if (quoteModal) {
                quoteModal.classList.remove('show');
            }
        });
    }

    // Formulário de Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Funcionalidade em desenvolvimento. Por favor, entre em contato com o suporte.');
            loginForm.reset();
            if (clientAreaModal) {
                clientAreaModal.classList.remove('show');
            }
        });
    }

    // Animação ao scroll para elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature, .segment-card, .product-card, .case-card, .partner-logo');

        elements.forEach(function (element) {
            const position = element.getBoundingClientRect();

            // Verificar se o elemento está visível na tela
            if (position.top < window.innerHeight && position.bottom >= 0) {
                element.classList.add('animated');
            }
        });
    }

    // Adicionar classe para animação
    document.querySelectorAll('.feature, .segment-card, .product-card, .case-card, .partner-logo').forEach(function (element) {
        element.classList.add('animate-on-scroll');
    });

    // Adicionar evento de scroll
    window.addEventListener('scroll', animateOnScroll);

    // Chamar uma vez para elementos já visíveis
    animateOnScroll();
});

// Funções específicas para a página de acesso remoto
if (document.querySelector('.remote-access')) {
    document.addEventListener('DOMContentLoaded', function () {
        // Animação ao scroll para elementos da página de acesso remoto
        function animateOnScroll() {
            var elements = document.querySelectorAll('.step, .remote-access-img');

            elements.forEach(function (element) {
                var position = element.getBoundingClientRect();

                // Verificar se o elemento está visível na tela
                if (position.top < window.innerHeight && position.bottom >= 0) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Inicializar elementos com opacidade 0
        document.querySelectorAll('.step, .remote-access-img').forEach(function (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        // Adicionar evento de scroll
        window.addEventListener('scroll', animateOnScroll);

        // Chamar uma vez para elementos já visíveis
        animateOnScroll();
    });
}
