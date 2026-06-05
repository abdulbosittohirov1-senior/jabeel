import { useState } from 'react';
import { Warehouse, ShieldCheck, PackageOpen, Truck } from 'lucide-react';
import { useLanguage } from '../LanguageContext.tsx';

export default function Process() {
  const { t, language } = useLanguage();
  const [activeStepId, setActiveStepId] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Warehouse':
        return Warehouse;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'PackageOpen':
        return PackageOpen;
      case 'Truck':
        return Truck;
      default:
        return ShieldCheck;
    }
  };

  const steps = (() => {
    switch (language) {
      case 'en':
        return [
          {
            id: 1,
            title: 'Controlled Breeding',
            description: 'Biosecure, modern poultry farms fed with premium natural grain and subject to strict continuous veterinary oversight.',
            longDescription: 'Our farming facilities strictly comply with international ISO 22000 and HACCP food standards. We utilize 100% natural feed formulas entirely free of synthetic growth stimulants.',
            duration: 'Continuous Oversight',
            iconName: 'Warehouse',
          },
          {
            id: 2,
            title: 'Rigorous Quality Checks',
            description: 'Multi-stage laboratory testing verifying pH balance, microflora values, moisture, and cutting standards.',
            longDescription: 'Every single batch undergoes automated optical sensor checks and manual professional temperature validation to secure uncompromised safety and premium cut precision.',
            duration: '< 15 mins off conveyor',
            iconName: 'ShieldCheck',
          },
          {
            id: 3,
            title: 'Modified Atmosphere (MAP)',
            description: 'Advanced MAP gas packaging keeping chicken fresh naturally up to 12 days without chemical food additives or preservatives.',
            longDescription: 'Air is vacuumed and replaced with food-grade protective nitrogen and CO2 mixture. This naturally halts bacteria progression and preserves texture, natural color, and juices.',
            duration: 'Immediately after cutting',
            iconName: 'PackageOpen',
          },
          {
            id: 4,
            title: 'Cold Chain Delivery',
            description: 'Modern refrigerated local fleets keeping precise continuous temperatures between -2°C and 0°C.',
            longDescription: 'Our logistics controllers track delivery trucks continuously using active GPS telemetry. This ensures the vital cold chain remains intact from the processing center to your warehouse.',
            duration: 'Same-day dispatch',
            iconName: 'Truck',
          }
        ];
      case 'ru':
        return [
          {
            id: 1,
            title: 'Контролируемое Выращивание',
            description: 'Современные птицеводческие фермы с усиленным биоконтролем, кормлением натуральным зерном и непрерывным надзором ветеринаров.',
            longDescription: 'Наши птицекомплексы полностью сертифицированы по системам ISO 22000 и HACCP. Рацион птицы основан на сбалансированных экологически чистых кормах без гормонов роста.',
            duration: 'Круглосуточный мониторинг',
            iconName: 'Warehouse',
          },
          {
            id: 2,
            title: 'Многоэтапный Контроль',
            description: 'Лабораторные анализы на уровень pH, влажность, чистоту микрофлоры и соответствие геометрии разделки птицы.',
            longDescription: 'Любая партия цыплят проверяется экспертами лаборатории и оптическими сенсорами, контролирующими внутреннюю температуру мяса и санитарное состояние цехов.',
            duration: '< 15 минут с конвейера',
            iconName: 'ShieldCheck',
          },
          {
            id: 3,
            title: 'Защитная Среда MAP',
            description: 'Упаковка по технологии газозамещения, продлевающая свежесть вплоть до 12 дней без каких-либо консервантов.',
            longDescription: 'Обычный воздух в лотке замещается пищевой смесью газов (азот и CO2). Это естественным путем предотвращает окисление и надолго сохраняет сочность и вкус мяса.',
            duration: 'Сразу после разделки',
            iconName: 'PackageOpen',
          },
          {
            id: 4,
            title: 'Холодовая Цепь Доставки',
            description: 'Собственный спецтранспорт с рефрижераторными установками для поддержания температуры от -2°C до 0°C.',
            longDescription: 'Датчики GPS контролируют местонахождение машин и температуру в кузове онлайн. Это исключает оттаивание продукции на протяжении всего коммерческого пути.',
            duration: 'День в день (в Ташкенте)',
            iconName: 'Truck',
          }
        ];
      case 'oz':
        return [
          {
            id: 1,
            title: 'Назорат Остидаги Етиштириш',
            description: 'Табиий дон билан озиқлантирилган ва қаттиқ ветеринария назорати остида бўлган замонавий, био-ҳимояланган паррандачилик хўжаликлари.',
            longDescription: 'Бизнинг хўжаликларимиз халқаро HACCP ва ISO 22000 стандартларига мос келади. Биз ҳали ҳеч қандай сунъий ўсиш гормонларисиз, фақат 100% табиий ва сифатли дон аралашмалари билан боқиш тизимини қўллаймиз.',
            duration: 'Доимий Назорат',
            iconName: 'Warehouse',
          },
          {
            id: 2,
            title: 'Юқори Сифат Назорати',
            description: 'pH даражаси, намлик, микрофлора ва нимталаш стандартларини текширувчи кўп босқичли лаборатория таҳлиллари.',
            longDescription: 'Ҳар бир ишлаб чиқарилаётган партия икки томонлама текширувдан ўтади: оптик датчиклар кесиш аниқлигини назорат қилса, сертификатланган мутахассислар гўшт ҳарорати ва гигиена талабларини синчиклаб текширади.',
            duration: '< 15 дақиқа конвейердан',
            iconName: 'ShieldCheck',
          },
          {
            id: 3,
            title: 'Газ Муҳитли Қадоқлаш (MAP)',
            description: 'Маҳсулотларни кимёвий консервантларсиз, табиий равишда 12 кунгача янги сақлайдиган илғор MAP технологияси.',
            longDescription: 'Қадоқ ичидаги ҳаво хавфсиз озиқ-овқат гази (азот ва CO2) билан алмаштирилади. Бу жараён гўштнинг ранги, ширалилиги ва таъмини табиий равишда сақлайди ҳамда маҳсулотнинг бузилишини секинлаштиради.',
            duration: 'Кесилгандан сўнг дарҳол',
            iconName: 'PackageOpen',
          },
          {
            id: 4,
            title: 'Тезкор Совуқ Занжирли Етказиш',
            description: 'Ҳарорат -2°C ва 0°C оралиғида барқарор сақланадиган махсус совутгичли автомобиллар флоти.',
            longDescription: 'Бизнинг логистика диспетчерларимиз транспорт ичидаги ҳароратни жонли GPS датчиклари орқали кузатиб боришади. Савдо нуқтаси ёки ресторанга етиб боришигача совуқлик занжири узилпислиги таъминланади.',
            duration: 'Буюртма куни (Тошкентда)',
            iconName: 'Truck',
          }
        ];
      default:
        return [
          {
            id: 1,
            title: 'Nazorat Ostidagi Yetishtirish',
            description: 'Tabiiy don bilan oziqlantirilgan va qattiq veterinariya nazorati ostida bo\'lgan zamonaviy, bio-himoyalangan parrandachilik xo\'jaliklari.',
            longDescription: 'Bizning xo\'jaliklarimiz xalqaro HACCP va ISO 22000 standartlariga mos keladi. Biz hech qanday sun\'iy o\'sish gormonlarisiz, faqat 100% tabiiy va sifatli don aralashmalari bilan boqish tizimini qo\'llaymiz.',
            duration: 'Doimiy Nazorat',
            iconName: 'Warehouse',
          },
          {
            id: 2,
            title: 'Yuqori Sifat Nazorati',
            description: 'pH darajasi, namlik, mikroflora va nimtalash standartlarini tekshiruvchi ko\'p bosqichli laboratoriya tahlillari.',
            longDescription: 'Har bir ishlab chiqarilayotgan partiya ikki tomonlama tekshiruvdan o\'tadi: optik datchiklar kesish aniqligini nazorat qilsa, sertifikatlangan mutaxassislar go\'sht harorati va gigiyena talablarini sinchiklab tekshiradi.',
            duration: '< 15 daqiqa konveyerdan',
            iconName: 'ShieldCheck',
          },
          {
            id: 3,
            title: 'Gaz Muhitli Qadoqlash (MAP)',
            description: 'Mahsulotlarni kimyoviy konservantlarsiz, tabiiy ravishda 12 kungacha yangi saqlaydigan ilg\'or MAP texnologiyasi.',
            longDescription: 'Qadoq ichidagi havo xavfsiz oziq-ovqat gazi (azot va CO2) bilan almashtiriladi. Bu jarayon go\'shtning rangi, shiraliligi va ta\'mini tabiiy ravishda saqlaydi hamda mahsulotning buzilishini sekinlashtiradi.',
            duration: 'Kesilgandan so\'ng darhol',
            iconName: 'PackageOpen',
          },
          {
            id: 4,
            title: 'Tezkor Sovuq Zanjirli Yetkazish',
            description: 'Harorat -2°C va 0°C oralig\'ida barqaror saqlanadigan maxsus sovutgichli avtomobillar floti.',
            longDescription: 'Bizning logistika dispetcherlarimiz transport ichidagi haroratni jonli GPS datchiklari orqali kuzatib borishadi. Savdo nuqtasi yoki restoranga yetib borishigacha sovuqlik zanjiri uzilmasligi ta\'minlanadi.',
            duration: 'Buyurtma kuni (Toshkentda)',
            iconName: 'Truck',
          }
        ];
    }
  })();

  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <section id="process" className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-extrabold text-orange-500 uppercase tracking-widest block">
            {t("process_tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            {t("process_title")}
          </h2>
          <div className="w-16 h-1 rounded-full bg-orange-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            {t("process_subtitle")}
          </p>
        </div>

        {/* Timeline Interaction Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Interactive Selector Column */}
          <div className="lg:col-span-4 space-y-4">
            {steps.map((step) => {
              const IconComp = getStepIcon(step.iconName);
              const isActive = step.id === activeStepId;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepId(step.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex gap-4 items-center cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20 translate-x-2'
                      : 'bg-white border-slate-100 hover:border-orange-200 text-slate-800'
                  }`}
                  id={`process-btn-${step.id}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-500'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold opacity-60 uppercase tracking-widest">
                      {language === 'en' ? `Step 0${step.id}` : language === 'ru' ? `Шаг 0${step.id}` : `0${step.id}-Bosqich`}
                    </span>
                    <span className="block font-bold text-sm tracking-wide">
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Content Display Frame with Progression Details */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 shadow-xl flex flex-col justify-between min-h-[400px] relative overflow-hidden">
            
            {/* Subtle giant step index watermark */}
            <div className="absolute top-4 right-10 text-[10rem] font-black text-slate-50 select-none -z-10 leading-none">
              0{activeStep.id}
            </div>

            <div className="space-y-6 z-10 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 uppercase tracking-widest">
                {t("process_duration")} {activeStep.duration}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {activeStep.title} {language === 'en' ? 'Phase' : language === 'ru' ? 'Этап' : 'Bosqichi'}
              </h3>

              <div className="w-12 h-1 rounded-full bg-orange-500" />

              <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                {activeStep.description}
              </p>

              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                  {language === 'en' ? 'Technical & hygiene specs:' : language === 'ru' ? 'Технические и санитарные нормы:' : 'Texnik va gigiyenik talablar:'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {activeStep.longDescription}
                </p>
              </div>
            </div>

            {/* Progression indicators along the root */}
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between mt-8 text-xs font-bold text-slate-400">
              <span>{language === 'en' ? `Step 0${activeStepId} / 04` : language === 'ru' ? `Шаг 0${activeStepId} / 04` : `0${activeStepId} / 04 Bosqich`}</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeStepId ? 'w-8 bg-orange-500' : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => {
                  setActiveStepId(((activeStepId) % 4) + 1);
                }}
                className="text-orange-500 hover:text-orange-600 font-bold hover:underline cursor-pointer"
              >
                {language === 'en' ? 'Next step →' : language === 'ru' ? 'Следующий шаг →' : 'Keyingi Bosqich →'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
