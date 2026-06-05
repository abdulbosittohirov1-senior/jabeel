import { Leaf, Clock, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext.tsx';

export default function WhyChooseUs() {
  const { language } = useLanguage();

  const getSectionTag = () => {
    switch (language) {
      case 'en': return 'OUR ADVANTAGES';
      case 'ru': return 'НАШИ ПРЕИМУЩЕСТВА';
      case 'oz': return 'БИЗНИНГ АФЗАЛЛИКЛАРИМИЗ';
      default: return 'BIZNING AFZALLIKLARIMIZ';
    }
  };

  const getSectionTitle = () => {
    switch (language) {
      case 'en': return 'Why Rely on Us?';
      case 'ru': return 'Почему Выбирают Нас?';
      case 'oz': return 'Нима учун бизни танлашади?';
      default: return 'Nima uchun bizni tanlashadi?';
    }
  };

  const getSectionDesc = () => {
    switch (language) {
      case 'en': return 'Jabeel is a symbol of quality and trust. We stand behind every product we produce. We possess state-of-the-art organic slaughtering and ultra-clean meat cutting lines.';
      case 'ru': return 'Jabeel — эталон качества и надежности. Мы несем полную ответственность за каждую партию. Фабрика оснащена передовыми линиями бережного убоя.';
      case 'oz': return 'Jabeel - сифат ва ишонч рамзи. Биз ҳар бир маҳсулотимизга жавоб берамиз. Биз замонавий сўйиш ва тоза қайта ишлаш линияларига эгамиз.';
      default: return 'Jabeel - sifat va ishonch ramzi. Biz har bir mahsulotimizga javob beramiz. Biz zamonaviy so\'yish va toza qayta ishlash liniyalariga egamiz.';
    }
  };

  const getCred1 = () => {
    switch (language) {
      case 'en': return 'ISO 22000 Food Safety Standard';
      case 'ru': return 'Стандарт Безопасности ISO 22000';
      case 'oz': return 'ISO 22000 Сифат Стандарти';
      default: return 'ISO 22000 Sifat Standarti';
    }
  };

  const getCred2 = () => {
    switch (language) {
      case 'en': return 'Daily Fresh Chicken Supplies';
      case 'ru': return 'Свежая продукция каждый день';
      case 'oz': return 'Ҳар Кунлик Янги Маҳсулот';
      default: return 'Har Kunlik Yangi Mahsulot';
    }
  };

  const getCred3 = () => {
    switch (language) {
      case 'en': return 'Competitive Wholesales & Discounts';
      case 'ru': return 'Разумные цены и гибкие скидки';
      case 'oz': return 'Рақобатбардош Нархлар ва Чегирмалар';
      default: return 'Raqobatbardosh Narxlar va Chegirmalar';
    }
  };

  const features = [
    {
      icon: Leaf,
      title: language === 'en' ? 'Natural Nutrition' : language === 'ru' ? 'Натуральное Питание' : language === 'oz' ? 'Табиий Озиқланиш' : 'Tabiiy Oziqlanish',
      description: language === 'en'
        ? 'Our poultry is fed with premium natural grain and organic feeds, entirely free of synthetic boosters or artificial growth hormones.'
        : language === 'ru'
        ? 'Наши цыплята питаются исключительно чистым натуральным зерном без каких-либо симуляторов роста или вредных ветеринарных добавок.'
        : language === 'oz'
        ? 'Товуқларимиз фақат табиий, тоза дон ва фойдали озуқалар билан озиқланади. Ҳеч қандай кимёвий стимуляторларсиз, ўсиш гормонларисиз етиштирилади.'
        : "Tovuqlarimiz faqat tabiiy, toza don va foydali ozuqalar bilan oziqlanadi. Hech qanday kimyoviy stimulyatorlarsiz, o'sish gormonlarisiz yetishtiriladi.",
      accent: 'text-green-500 bg-green-50 border-green-100',
    },
    {
      icon: Clock,
      title: language === 'en' ? 'Express Delivery' : language === 'ru' ? 'Оперативная Доставка' : language === 'oz' ? 'Тезкор Йетказиб Бериш' : 'Tez Yetkazib Berish',
      description: language === 'en'
        ? 'Prompt refrigerated logistics preserving original meat temperatures to your facilities without any delay.'
        : language === 'ru'
        ? 'Доставляем точно в срок специальными машинами-рефрижераторами с непрерывным контролем температурного режима.'
        : language === 'oz'
        ? "Тошкент шаҳри бўйлаб 2 соат ичида совуқ занжир ҳароратини сақлаб, янгидек етказиб берамиз. Маҳсулот гигиенаси кафолатланади."
        : "Toshkent shahri bo'ylab 2 soat ichida sovuq zanjir haroratini saqlab, yangidek yetkazib beramiz. Mahsulot gigiyenasi kafolatlanadi.",
      accent: 'text-orange-500 bg-orange-50 border-orange-100',
    },
    {
      icon: Award,
      title: language === 'en' ? 'Hygienic Standards' : language === 'ru' ? 'Стерильные Цеха' : language === 'oz' ? 'Гигиеник Шароит' : 'Gigiyenik Sharoit',
      description: language === 'en'
        ? 'State-of-the-art sterile processing facilities operating under rigorous automated controls and international hygiene standard specifications.'
        : language === 'ru'
        ? 'Высокотехнологичное производство в стерильных зонах с многоступенчатым санитарным контролем каждой рабочей смены.'
        : language === 'oz'
        ? "Замонавий стерил цехлар ва ишлаб чиқариш линиялари. Тўлиқ автоматлаштирилган гигиеник назорат ва ISO 22000 сифат стандарти."
        : "Zamonaviy steril sexlar va ishlab chiqarish liniyalari. To'liq avtomatlashtirilgan gigiyenik nazorat va ISO 22000 sifat standarti.",
      accent: 'text-blue-500 bg-blue-50 border-blue-100',
    },
    {
      icon: ShieldAlert,
      title: language === 'en' ? 'Halal Certificate' : language === 'ru' ? 'Стандарт Халяль' : language === 'oz' ? 'Ҳалол Сертификати' : 'Halol Sertifikati',
      description: language === 'en'
        ? '100% manual Islamic halal slaughter processes fully validated by official certificates and continuous monitoring.'
        : language === 'ru'
        ? 'Строжайший ручной забой птицы по каноническим мусульманским стандартам, подтвержденный всеми необходимыми документами.'
        : language === 'oz'
        ? "Барча маҳсулотларимиз исломий анъаналарга ва ҳалол стандартларига тўлиқ риоя қилинган ҳолда соъйилади ва қайта ишланади."
        : "Barcha mahsulotlarimiz islomiy an'analarga va halol standartlariga to'liq rioya qilingan holda so'yiladi va qayta ishlanadi.",
      accent: 'text-amber-500 bg-amber-50 border-amber-100',
    }
  ];

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Block - Highlights text and credentials */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-sm font-extrabold text-orange-500 uppercase tracking-widest block">
              {getSectionTag()}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              {getSectionTitle()}
            </h2>
            <div className="w-16 h-1 rounded-full bg-orange-500" />
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              {getSectionDesc()}
            </p>

            {/* Quick credentials checkpoint */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-slate-800 font-semibold">{getCred1()}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-slate-800 font-semibold">{getCred2()}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm text-slate-800 font-semibold">{getCred3()}</span>
              </div>
            </div>
          </div>

          {/* Right Block - Features Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl hover:border-slate-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                  id={`feature-card-${idx}`}
                >
                  <div className="space-y-6">
                    {/* Icon enclosure */}
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${feat.accent}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-950 group-hover:text-orange-500 transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
