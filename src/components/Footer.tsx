import { Phone, Mail, MapPin, ShieldCheck, ArrowUp } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../LanguageContext.tsx';

export default function Footer() {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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

  const footerLinks = [
    { name: t("nav_home"), id: 'hero' },
    { name: t("nav_about"), id: 'about' },
    { name: t("nav_products"), id: 'products' },
    { name: t("nav_features"), id: 'why-us' },
    { name: t("nav_contact"), id: 'contact' },
  ];

  const getBio = () => {
    switch (language) {
      case 'en': return 'Jabeel is a reliable enterprise engaged in purchasing, organic slaughter, hygienic processing, and wholesale of live poultry. Quality and honesty are our founding principles.';
      case 'ru': return 'Jabeel — надежное предприятие, специализирующееся на закупке, бережном убое, высокотехнологичной разделке и оптовой продаже птицы. Качество и честность — наши приоритеты.';
      case 'oz': return 'Jabeel - тирик товуқларни сотиб олиш, қайта ишлаш ва сотиш билан шуғулланувчи ишончли корхона. Сифат ва ҳалоллик бизнинг асосий тамойилларимиз.';
      default: return 'Jabeel - tirik tovuqlarni sotib olish, qayta ishlash va sotish bilan shug\'ullanuvchi ishonchli korxona. Sifat va halollik bizning asosiy tamoyillarimiz.';
    }
  };

  const getQualityStamp = () => {
    switch (language) {
      case 'en': return 'Guarantee of Quality & Honesty';
      case 'ru': return 'Гарантия Качества и Честности';
      case 'oz': return 'Сифат ва Ҳалоллик Кафолати';
      default: return 'Sifat va Halollik Kafolati';
    }
  };

  const getQuickLinksTitle = () => {
    switch (language) {
      case 'en': return 'Quick Links';
      case 'ru': return 'Полезные ссылки';
      case 'oz': return 'Тезкор Ҳаволалар';
      default: return 'Tezkor Havolalar';
    }
  };

  const getProductsTitle = () => {
    switch (language) {
      case 'en': return 'Products';
      case 'ru': return 'Продукция';
      case 'oz': return 'Маҳсулотлар';
      default: return 'Mahsulotlar';
    }
  };

  const getSocialsTitle = () => {
    switch (language) {
      case 'en': return 'Social Networks';
      case 'ru': return 'Социальные сети';
      case 'oz': return 'Ижтимоий Тармоқлар';
      default: return 'Ijtimoiy Tarmoqlar';
    }
  };

  const getSocialsDesc = () => {
    switch (language) {
      case 'en': return 'Follow us on social media networks to stay updated on our products and news.';
      case 'ru': return 'Подписывайтесь на нас в социальных сетях для отслеживания графика свежих поставок и новостей.';
      case 'oz': return 'Бизни ижтимоий тармоқларда кузатиб боринг ва сўнгги янгиликлардан хабардор бўлинг.';
      default: return 'Bizni ijtimoiy tarmoqlarda kuzatib boring va so\'nggi yangiliklardan xabardor bo\'ling.';
    }
  };

  const getProductsList = () => {
    switch (language) {
      case 'en': return ['Chicken drumstick', 'Chicken wings', 'Chicken breast fillet', 'Chicken thighs'];
      case 'ru': return ['Куриная голень', 'Куриные крылышки', 'Куриное филе грудки', 'Куриные бедра'];
      case 'oz': return ['Товуқ Болдири', 'Товуқ Қанотлари', 'Товуқ Филеси', 'Товуқ Бедроси'];
      default: return ['Tovuq Boldiri', 'Tovuq Qanotlari', 'Tovuq Filesi', 'Tovuq Bedrosi'];
    }
  };

  const getCopyright = () => {
    switch (language) {
      case 'en': return `All rights reserved.`;
      case 'ru': return `Все права защищены.`;
      case 'oz': return `Барча ҳуқуқлар ҳимояланган.`;
      default: return `Barcha huquqlar himoyalangan.`;
    }
  };

  const renderMadeBy = () => {
    switch (language) {
      case 'en':
        return (
          <span className="text-slate-450 text-xs font-semibold">
            made by <span className="text-orange-500 font-extrabold hover:text-orange-400 transition-colors uppercase">ABDILBOSIT</span>
          </span>
        );
      case 'ru':
        return (
          <span className="text-slate-450 text-xs font-semibold">
            сделано <span className="text-orange-500 font-extrabold hover:text-orange-400 transition-colors uppercase">ABDILBOSIT</span>
          </span>
        );
      case 'oz':
        return (
          <span className="text-slate-450 text-xs font-semibold">
            <span className="text-orange-500 font-extrabold hover:text-orange-400 transition-colors uppercase">ABDILBOSIT</span> томонидан яратилган
          </span>
        );
      default:
        return (
          <span className="text-slate-450 text-xs font-semibold">
            <span className="text-orange-500 font-extrabold hover:text-orange-400 transition-colors uppercase">ABDILBOSIT</span> tomonidan yaratilgan
          </span>
        );
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 transition-colors relative overflow-hidden">
      {/* Scroll Up Shortcut */}
      <button
        onClick={scrollToTop}
        className="absolute top-8 right-8 bg-white/10 hover:bg-orange-500 hover:text-white text-slate-300 p-3 rounded-full cursor-pointer transition-all"
        title="Yuqoriga qaytish"
        id="scroll-to-top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Column structures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 md:col-span-6 col-span-12 space-y-6 text-left">
            <div className="flex items-center gap-2 cursor-pointer" onClick={scrollToTop}>
              <Logo size={36} theme="dark" />
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block">
                  JABEEL
                </span>
                <span className="text-orange-400 font-bold text-[10px] block -mt-1 tracking-widest uppercase">
                  PREMIUM
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal max-w-sm">
              {getBio()}
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
              <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
              <span className="uppercase tracking-widest">{getQualityStamp()}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 md:col-span-6 col-span-12 space-y-4 text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-orange-500 pb-2">
              {getQuickLinksTitle()}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 list-none p-0 pt-2">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-orange-400 font-semibold cursor-pointer transition-colors block text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="lg:col-span-2 md:col-span-6 col-span-12 space-y-4 text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-orange-500 pb-2">
              {getProductsTitle()}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400 list-none p-0 pt-2">
              {getProductsList().map((p, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection('products')}
                    className="hover:text-orange-400 font-semibold cursor-pointer transition-colors block text-left"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="lg:col-span-4 md:col-span-6 col-span-12 space-y-4 text-left">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-orange-500 pb-2">
              {getSocialsTitle()}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal pt-2">
              {getSocialsDesc()}
            </p>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400 list-none p-0 pt-4 border-t border-white/5">
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:+998958132212" className="hover:text-white transition-colors font-bold text-slate-300">
                  +998 95 813 22 12
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:info@jabeel.uz" className="hover:text-white transition-colors font-semibold text-slate-300">
                  info@jabeel.uz
                </a>
              </li>
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-300 font-medium">
                  {language === 'en' ? 'Tashkent reg., Qibray dist.' : language === 'ru' ? 'Ташкентская обл., Кибрайский р-н.' : 'Toshkent vil., Qibray t.'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-semibold tracking-wider">
          <div className="text-center sm:text-left text-slate-400">
            &copy; {new Date().getFullYear()} {language === 'en' ? 'JABEEL LLC' : language === 'ru' ? 'ООО JABEEL' : 'МЧЖ JABEEL'}. {getCopyright()}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-center sm:text-right">
            {renderMadeBy()}
          </div>
        </div>

      </div>
    </footer>
  );
}
