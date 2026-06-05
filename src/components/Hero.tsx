import { heroChicken } from '../data.ts';
import { ArrowRight, ShieldCheck, Truck, Trophy } from 'lucide-react';
import { useLanguage } from '../LanguageContext.tsx';

export default function Hero() {
  const { t } = useLanguage();

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

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex items-center bg-radial from-slate-50 to-white"
    >
      {/* Decorative Warm Ambient Blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-orange-100/35 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text content - block sizes 7 cols on desktop */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Super premium badge overlay */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100/80 animate-fade-in mx-auto lg:mx-0">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-bold text-orange-700 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {t("halal_guaranteed")}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-slate-900 leading-tight">
              {t("hero_title_p1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                {t("hero_title_p2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t("hero_subtitle")}
            </p>

            {/* Credential items */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 text-xs">{t("iso_badge")}</h4>
                  <p className="text-[10px] text-slate-500">{t("iso_badge_desc")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                  <Truck className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 text-xs">{t("chain_badge")}</h4>
                  <p className="text-[10px] text-slate-500">{t("chain_badge_desc")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                  <Trophy className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-800 text-xs">{t("quality_badge")}</h4>
                  <p className="text-[10px] text-slate-500">{t("quality_badge_desc")}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => scrollToSection('products')}
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5 transition-all text-base flex items-center justify-center gap-2 group cursor-pointer animate-pulse"
                id="hero-cta-products"
              >
                <span>{t("view_products")}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:+998977040101"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-8 py-4 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-base flex items-center justify-center cursor-pointer"
                id="hero-cta-call"
              >
                {t("call")}
              </a>
            </div>
          </div>

          {/* Hero Image - 5 cols with visual borders */}
          <div className="lg:col-span-5 relative">
            {/* Fancy ambient elements behind image */}
            <div className="absolute inset-4 bg-orange-500 rounded-[3rem] rotate-3 -z-10 opacity-10 blur-xs" />
            <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-amber-500 rounded-[3rem] -z-15 opacity-20 blur-md" />

            <div className="relative bg-white rounded-[2.5rem] p-4 shadow-2xl border border-slate-100 overflow-hidden transform hover:-translate-y-1 transition-transform duration-500">
              <img
                src={heroChicken}
                alt="JABEEL Premium Chicken Meat Presentation"
                className="w-full h-auto object-cover rounded-[2rem] aspect-4/3 sm:aspect-16/11 lg:aspect-square"
                referrerPolicy="no-referrer"
                id="hero-chicken-img"
              />

              {/* Float badge inside image */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-lg flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{t("organic_badge")}</h4>
                  <p className="text-xs text-slate-500 mt-1">{t("organic_badge_desc")}</p>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1 border border-green-100">
                  {t("organic_tag")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
