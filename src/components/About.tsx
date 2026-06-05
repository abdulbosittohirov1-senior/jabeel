import { useLanguage } from '../LanguageContext.tsx';
import { Target, Leaf, Heart } from 'lucide-react';

export default function About() {
  const { t, stats } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Layout - Grid splitting into Header & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 lg:mb-20">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-sm font-extrabold text-orange-500 uppercase tracking-widest block">
              {t("about_partner")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              {t("about_title")}
            </h2>
            <div className="w-16 h-1 rounded-full bg-orange-500" />
          </div>

          <div className="lg:col-span-7 text-slate-600 leading-relaxed space-y-6 text-base font-normal">
            <p>
              {t("about_p1")}
            </p>
            <p>
              {t("about_p2")}
            </p>
            <p>
              {t("about_p3")}
            </p>
          </div>
        </div>

        {/* Dynamic Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16 lg:mb-24">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-300 group overflow-hidden"
              id={`stat-card-${idx}`}
            >
              {/* Corner decorative item */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full group-hover:scale-110 transition-transform" />

              <span className="block text-3xl sm:text-4xl font-black font-display text-slate-900 group-hover:text-orange-500 transition-colors">
                {stat.value}
              </span>
              <span className="block text-base font-bold text-slate-800 mt-2">
                {stat.label}
              </span>
              <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mission and Vision Bento Column */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission Core Card */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between space-y-6">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-655 shrink-0">
              <Target className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t("mission")}</h3>
              <p className="text-sm text-slate-650 font-normal leading-relaxed">
                {t("mission_desc")}
              </p>
            </div>
          </div>

          {/* Vision Core Card */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between space-y-6">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-655 shrink-0">
              <Leaf className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t("vision")}</h3>
              <p className="text-sm text-slate-650 font-normal leading-relaxed">
                {t("vision_desc")}
              </p>
            </div>
          </div>

          {/* Values Core Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl flex flex-col justify-between space-y-6 shadow-xl">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-orange-505 shrink-0">
              <Heart className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">{t("promise")}</h3>
              <ul className="text-slate-300 text-sm space-y-2 list-none p-0 font-normal">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  {t("promise_p1")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  {t("promise_p2")}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  {t("promise_p3")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

