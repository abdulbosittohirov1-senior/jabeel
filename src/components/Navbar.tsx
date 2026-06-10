import { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, ShieldCheck, Globe, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { useLanguage, LanguageType } from '../LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'uz' as LanguageType, name: "O'zbek", flag: '🇺🇿' },
    { code: 'oz' as LanguageType, name: "Ўзбекча", flag: '🇺🇿' },
    { code: 'ru' as LanguageType, name: "Русский", flag: '🇷🇺' },
    { code: 'en' as LanguageType, name: "English", flag: '🇬🇧' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticking navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { name: t("nav_home"), id: "hero" },
    { name: t("nav_about"), id: "about" },
    { name: t("nav_products"), id: "products" },
    { name: t("nav_why_us"), id: "why-us" },
    { name: t("nav_contact"), id: "contact" },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2 sm:py-3'
          : 'bg-white/90 backdrop-blur-sm sm:bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop and Tablet/Mobile Main Row */}
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Top Tier: Logo & Phone (on mobile/tablet, they sit side-by-side) */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group animate-fade-in"
              onClick={() => scrollToSection('hero')}
              id="nav-logo"
            >
              <Logo size={38} />
              <div>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 block leading-none">
                  {t("brand")}
                </span>
                <span className="text-orange-500 font-semibold text-[10px] sm:text-xs block tracking-widest uppercase mt-0.5">
                  {t("premium")}
                </span>
              </div>
            </div>

            {/* Mobile/Tablet Call Button and Language dropdown Sit side-by-side next to logo */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Language Switcher Mobile Compact */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-lg text-slate-700 font-bold text-xs cursor-pointer hover:bg-slate-100 active:scale-95 transition-all"
                  aria-label="Change Language"
                >
                  <Globe className="w-3.5 h-3.5 text-orange-500" />
                  <span className="uppercase text-[11px] font-bold text-slate-700">
                    {language === 'en' ? 'EN' : language === 'ru' ? 'RU' : language === 'oz' ? 'OZ' : 'UZ'}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-100 rounded-xl shadow-xl py-1 z-50 animate-fade-in">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs font-semibold hover:bg-orange-50 transition-colors cursor-pointer ${
                          language === lang.code ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span>{lang.name}</span>
                        {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="tel:+998958132212"
                className="flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-600 px-2.5 py-1.5 rounded-lg transition-colors font-bold text-xs"
                id="mobile-phone-shortcut"
              >
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span className="sm:inline hidden">+998 95 813 22 12</span>
                <span className="sm:hidden inline">{t("call")}</span>
              </a>
            </div>
          </div>

          {/* Navigation Links directly visible in Header */}
          {/* On mobile/tablet: Multi-item slide bar. On Desktop: Traditional flex row */}
          <div className="w-full lg:w-auto overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 py-0.5 border-t border-slate-100/60 lg:border-none lg:py-0">
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-8 min-w-max pb-1 lg:pb-0">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-slate-650 hover:text-orange-500 hover:bg-orange-50 lg:hover:bg-transparent font-semibold text-xs sm:text-sm px-2.5 py-1.5 lg:px-0 lg:py-0 rounded-lg transition-all cursor-pointer whitespace-nowrap"
                  id={`lnk-${link.id}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Right side (CTA & Phone & Language Selector) */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Desktop Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 hover:bg-slate-50 border border-slate-200/50 px-3.5 py-2.5 rounded-xl text-slate-800 font-bold text-xs cursor-pointer transition-colors"
                id="desktop-lang-switcher"
              >
                <Globe className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="font-bold text-slate-700">{currentLangObj.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl py-1.5 z-50 animate-fade-in">
                  <div className="px-4 py-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {t("lang_select_title")}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs sm:text-sm font-semibold hover:bg-orange-50 transition-colors cursor-pointer ${
                        language === lang.code ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="tel:+998958132212"
              className="flex items-center gap-2 text-slate-700 hover:text-orange-500 transition-colors font-semibold text-sm"
              id="nav-phone-btn"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+998 95 813 22 12</span>
            </a>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 hover:-translate-y-0.5 transition-all cursor-pointer"
              id="nav-contact-cta"
            >
              {t("nav_contact")}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
