/* js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SISTEMA DE TEMA (DARK / LIGHT MODE - DESKTOP & MOBILE)
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    const mobileThemeSegments = document.querySelectorAll('[data-theme-opt]');
    const mobileThemeLabelIcon = document.querySelector('.mobile-theme-label-icon');

    // Recupera o tema salvo ou adota 'light' como padrão
    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
        updateMobileThemeButtons(theme);
    }

    function updateToggleIcon(theme) {
        if (!sunIcon || !moonIcon) return;
        if (theme === 'dark') {
            // Se está escuro, mostra o sol (botão para ir pro claro)
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            // Se está claro, mostra a lua (botão para ir pro escuro)
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }

    function updateMobileThemeButtons(theme) {
        mobileThemeSegments.forEach(btn => {
            if (btn.getAttribute('data-theme-opt') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        if (mobileThemeLabelIcon) {
            if (theme === 'dark') {
                mobileThemeLabelIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
            } else {
                mobileThemeLabelIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
            }
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    mobileThemeSegments.forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenTheme = btn.getAttribute('data-theme-opt');
            if (chosenTheme) {
                setTheme(chosenTheme);
            }
        });
    });


    // 2. Navbar State on Scroll (Glassmorphism Effect)
    const nav = document.querySelector('nav');
    
    if (nav) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        };
        
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }


    // 3. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 4. SISTEMA DE TRADUÇÃO (i18n)
    const translations = {
      pt: {
        nav_home: "Início",
        nav_identidade: "Identidade",
        nav_servicos: "Serviços",
        nav_time: "Time",
        nav_contato: "Contato",
        hero_title_sub: "Desenvolvimento de<br>Projetos Web",
        hero_title_main: "Saia da bolha comum",
        hero_btn: "Inicializar Infraestrutura",
        sobre_sec_title: "Quem nós somos",
        sobre_title: "A Excelência como Padrão",
        sobre_text: "Inspirada na origem grega de algo grandioso, a TERA nasceu para romper o comum. Enquanto muitos se mantêm seguros na bolha de padrões previsíveis, nós somos o elemento que projeta para fora, desafiando limites em um mercado saturado. Nossa missão é clara: ajudar marcas a abandonarem o convencional para atingirem um novo patamar de excelência. Mais do que resultados, entregamos a evolução necessária para quem ousa ir além. Na TERA, o sucesso é o resultado natural de quem escolhe romper barreiras todos os dias.",
        serv_sec_title: "Nossas Soluções",
        serv_sub_title: "Engenharia de software, design e processos para acelerar o seu negócio sem enrolação.",
        serv_action_btn: "Solicitar Orçamento",
        serv_1_tit: "Presença Digital & Web",
        serv_1_tag: "WEB & CONVERSÃO",
        serv_1_desc: "Desenvolvimento de sites de alta conversão, portais e landing pages responsivas.",
        serv_2_tit: "Infraestrutura de Redes",
        serv_2_tag: "CONECTIVIDADE & SEGURANÇA",
        serv_2_desc: "Cabeamento estruturado, servidores e redes corporativas seguras.",
        serv_3_tit: "Design Estratégico & UI/UX",
        serv_3_tag: "IDENTIDADE & UI/UX",
        serv_3_desc: "Identidade visual corporativa, prototipagem e design de produtos.",
        serv_4_tit: "Gestão Administrativa",
        serv_4_tag: "PROCESSOS & OPERAÇÃO",
        serv_4_desc: "Mapeamento de processos, automação de rotinas e eficiência operacional.",
        serv_5_tit: "Controle Financeiro",
        serv_5_tag: "FINANÇAS & CONTROLE",
        serv_5_desc: "Planejamento orçamentário, controle de fluxo e viabilidade econômica.",
        serv_6_tit: "Suporte & Performance",
        serv_6_tag: "SUPORTE & SEGURANÇA",
        serv_6_desc: "Manutenção contínua, otimização de velocidade e segurança digital.",
        team_sec_title: "Nosso time",
        team_1_role: "Gestor de Desenvolvimento",
        team_2_role: "Gestor ADM/Financeiro",
        team_3_role: "Gestor de Design",
        contact_heading: "FALE CONOSCO",
        contact_subheading: "Pronto para transformar seu projeto em realidade? Entre em contato ou venha nos visitar.",
        contact_label_wpp: "WHATSAPP",
        contact_label_email: "E-MAIL",
        contact_label_hours: "HORÁRIO DE ATENDIMENTO",
        contact_val_hours: "Seg – Sex: 08h às 18h",
        contact_label_location: "LOCALIZAÇÃO",
        contact_val_location: "Americana – SP",
        contact_label_social: "REDES GLOBAIS",
        contact_btn_wpp: "INICIAR CONVERSA NO WHATSAPP",
        footer_text: "TERA Desenvolvimento & Design © 2026. Todos os direitos reservados.",
        footer_title_atendimento: "CENTRAL DE ATENDIMENTO",
        footer_address: "Avenida Brasil, 2000 - Parque Residencial Nardini, Americana - SP",
        footer_title_redes: "REDES GLOBAIS",
        footer_copyright: "© 2026 TERA Desenvolvimento & Design. Todos os direitos reservados.",
        nav_back_services: "Voltar aos Serviços",
        mobile_lang_title: "Idioma",
        mobile_theme_title: "Aparência",
        theme_light: "Claro",
        theme_dark: "Escuro",
        hero_btn_proposta: "Solicitar Proposta"
      },
      en: {
        nav_home: "Home",
        nav_identidade: "Identity",
        nav_servicos: "Services",
        nav_time: "Team",
        nav_contato: "Contact",
        hero_title_sub: "Web Project<br>Development",
        hero_title_main: "Break out of the ordinary",
        hero_btn: "Initialize Infrastructure",
        sobre_sec_title: "Who We Are",
        sobre_title: "Excellence as the Standard",
        sobre_text: "Inspired by the Greek origin of something grand, TERA was born to break the ordinary. While many remain safely inside the bubble of predictable patterns, we are the element that projects outward, defying limits in a saturated market. Our mission is clear: to help brands abandon the conventional to reach a new level of excellence. More than just results, we deliver the evolution necessary for those who dare to go beyond. At TERA, success is the natural result for those who choose to break barriers every single day.",
        serv_sec_title: "Our Solutions",
        serv_sub_title: "Software engineering, design, and processes to accelerate your business without friction.",
        serv_action_btn: "Request a Quote",
        serv_1_tit: "Digital Presence & Web",
        serv_1_tag: "WEB & CONVERSION",
        serv_1_desc: "Development of high-conversion websites, portals, and responsive landing pages.",
        serv_2_tit: "Network Infrastructure",
        serv_2_tag: "CONNECTIVITY & SECURITY",
        serv_2_desc: "Structured cabling, servers, and secure corporate networks.",
        serv_3_tit: "Strategic Design & UI/UX",
        serv_3_tag: "IDENTITY & UI/UX",
        serv_3_desc: "Corporate visual identity, prototyping, and product design.",
        serv_4_tit: "Administrative Management",
        serv_4_tag: "PROCESSES & OPERATIONS",
        serv_4_desc: "Process mapping, routine automation, and operational efficiency.",
        serv_5_tit: "Financial Control",
        serv_5_tag: "FINANCE & CONTROL",
        serv_5_desc: "Budget planning, cash flow management, and economic viability.",
        serv_6_tit: "Support & Performance",
        serv_6_tag: "SUPPORT & SECURITY",
        serv_6_desc: "Continuous maintenance, speed optimization, and digital security.",
        team_sec_title: "Our Team",
        team_1_role: "Development Manager",
        team_2_role: "Admin/Financial Manager",
        team_3_role: "Design Manager",
        contact_heading: "CONTACT US",
        contact_subheading: "Ready to turn your project into reality? Get in touch or come visit us.",
        contact_label_wpp: "WHATSAPP",
        contact_label_email: "EMAIL",
        contact_label_hours: "BUSINESS HOURS",
        contact_val_hours: "Mon – Fri: 8am to 6pm",
        contact_label_location: "LOCATION",
        contact_val_location: "Americana – SP, Brazil",
        contact_label_social: "GLOBAL NETWORKS",
        contact_btn_wpp: "START WHATSAPP CHAT",
        footer_text: "TERA Web Development & Design © 2026. All rights reserved.",
        footer_title_atendimento: "SUPPORT CENTER",
        footer_address: "Brasil Avenue, 2000 - Nardini Residential Park, Americana - SP",
        footer_title_redes: "GLOBAL NETWORKS",
        footer_copyright: "© 2026 TERA Web Development & Design. All rights reserved.",
        nav_back_services: "Back to Services",
        mobile_lang_title: "Language",
        mobile_theme_title: "Appearance",
        theme_light: "Light",
        theme_dark: "Dark",
        hero_btn_proposta: "Request Proposal"
      }
    };

    const langToggle = document.getElementById('langToggle');
    const mobileLangSegments = document.querySelectorAll('[data-lang-opt]');
    let currentLang = localStorage.getItem('lang') || 'pt';

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
        if (langToggle) {
            langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';
        }
        mobileLangSegments.forEach(btn => {
            if (btn.getAttribute('data-lang-opt') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        localStorage.setItem('lang', lang);
    }

    applyLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            applyLanguage(currentLang);
        });
    }

    mobileLangSegments.forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenLang = btn.getAttribute('data-lang-opt');
            if (chosenLang) {
                currentLang = chosenLang;
                applyLanguage(currentLang);
            }
        });
    });

    // 5. Suporte Dinâmico para Título de Serviços (Padrão: TERA | Serviços - ${nomeDoServico})
    window.setServiceTitle = function(nomeDoServico) {
        if (nomeDoServico) {
            document.title = `TERA | Serviços - ${nomeDoServico}`;
        }
    };

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const servicoParam = urlParams.get('servico') || urlParams.get('service');
        if (servicoParam) {
            window.setServiceTitle(servicoParam);
        }
    } catch (e) {
        // Fallback silencioso
    }

    // 6. CONTROLE DO MENU HAMBÚRGUER (MOBILE)
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, #mobileNavOpenProposta');

    function openMobileMenu() {
        if (!mobileMenu || !hamburgerBtn) return;
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('active');
        mobileMenu.setAttribute('aria-hidden', 'false');
        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add('active');
        document.body.classList.add('mobile-menu-open');
    }

    function closeMobileMenu() {
        if (!mobileMenu || !hamburgerBtn) return;
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
    }

    function toggleMobileMenu() {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Fechar ao pressionar a tecla ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Fechar se redimensionar para tela desktop (> 768px)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
});

