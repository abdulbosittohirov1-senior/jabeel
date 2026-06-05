import { useState, useEffect, FormEvent } from 'react';
import { Testimonial } from '../types.ts';
import { Star, MessageSquareQuote, CheckCircle, Plus, Send } from 'lucide-react';
import { useLanguage } from '../LanguageContext.tsx';

export default function Testimonials() {
  const { t, language } = useLanguage();
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // New review form states
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [formSuccess, setFormSuccess] = useState(false);

  const getSectionTag = () => {
    switch (language) {
      case 'en': return 'OUR PARTNERS OPINIONS';
      case 'ru': return 'ОТЗЫВЫ ПАРТНЕРОВ';
      case 'oz': return 'ҲАМКОРЛАРИМИЗ ФИКРЛАРИ';
      default: return 'HAMKORLARIMIZ FIKRLARI';
    }
  };

  const getSectionTitle = () => {
    switch (language) {
      case 'en': return 'What Clients Say About Jabeel';
      case 'ru': return 'Что Говорят Наши Клиенты';
      case 'oz': return 'Мижозларимиз Биз Ҳақимизда';
      default: return 'Mijozlarimiz Biz Haqimizda';
    }
  };

  const getSectionDesc = () => {
    switch (language) {
      case 'en': return 'Due to our uncompromising quality guarantee, seamless delivery, and reliable B2B cooperation, leading retail networks and premium restaurants place their utmost trust in us.';
      case 'ru': return 'Благодаря безупречной надежности поставок и золотому стандарту B2B-партнерства, ведущие ресторанные и торговые сети доверяют Jabeel каждый день.';
      case 'oz': return 'Сифат кафолати, доимий етказиб бериш ҳамда ишончли B2B ҳамкорлик туфайли кўплаб савдо тармоқлари ва ресторанлар бизга ишонишади.';
      default: return 'Sifat kafolati, doimiy yetkazib berish hamda ishonchli B2B hamkorlik tufayli ko\'plab savdo tarmoqlari va restoranlar bizga ishonishadi.';
    }
  };

  const getSeedReviews = (): Testimonial[] => {
    switch (language) {
      case 'en':
        return [
          {
            id: 't1',
            name: 'Jamshid Alimov',
            role: 'Head Chef',
            company: 'Anor Restaurant Group',
            text: 'Jabeel Premium poultry products have raised the quality bar for our dishes entirely. The fillets do not lose water upon frying, remaining incredibly tender. Our guests are absolutely delighted.',
            rating: 5,
            date: 'May 2026',
          },
          {
            id: 't2',
            name: 'Shahnoza Karimova',
            role: 'Head of Purchasing',
            company: 'Rahat Supermarkets',
            text: 'We have been ordering chilled chicken in bulk from Jabeel for more than half a year. The advanced MAP packaging preserves perfect freshness on shelves without bloating. Deliveries are exceptionally on time.',
            rating: 5,
            date: 'April 2026',
          },
          {
            id: 't3',
            name: 'Dilshod To\'rayev',
            role: 'Founder',
            company: 'Burger Time Chain',
            text: 'For fast food, chicken consistency is paramount. With Jabeel, cuts are always neat, and sizes are perfectly matched. The Halal seal gives us 100% peace of mind across our multi-facility brand.',
            rating: 5,
            date: 'March 2026',
          }
        ];
      case 'ru':
        return [
          {
            id: 't1',
            name: 'Джамшид Алимов',
            role: 'Шеф-повар',
            company: 'Anor Restaurant Group',
            text: 'Премиальная продукция Jabeel вывела качество наших куриных блюд на новый уровень. При жарке филе сохраняет весь сок и не выделяет лишней воды. Гости без ума от нежности мяса.',
            rating: 5,
            date: 'Май 2026',
          },
          {
            id: 't2',
            name: 'Шахноза Каримова',
            role: 'Руководитель закупок',
            company: 'Мягкий Маркет "Рахат"',
            text: 'Мы закупаем охлажденную птицу оптом уже больше полугода. Специальная упаковка MAP сохраняет свежесть на витрине до 12 дней без деформации лотка. Привозят вовремя, гигиена на высоте.',
            rating: 5,
            date: 'Апрель 2026',
          },
          {
            id: 't3',
            name: 'Дильшод Тураев',
            role: 'Основатель сети',
            company: 'Burger Time',
            text: 'Для фастфуда стабильность калибровки — ключевое условие. У Jabeel разделка безупречна, вес кусков стандартизирован. Соответствие нормам Халяль дает нам абсолютную уверенность.',
            rating: 5,
            date: 'Март 2026',
          }
        ];
      case 'oz':
        return [
          {
            id: 't1',
            name: 'Жамшид Алимов',
            role: 'Бош ошпаз',
            company: 'Anor Restaurant Group',
            text: 'Jabeel Premium товуқ маҳсулотлари бизнинг таомлар сифатини мутлақо янги даражага кўтарди. Филе қовурилганда сув ажратмайди, гўшти ниҳоятда майин. Меҳмонларимиз товуқли таомлардан жуда мамнун.',
            rating: 5,
            date: 'Май 2026',
          },
          {
            id: 't2',
            name: 'Шаҳноза Каримова',
            role: 'Харидлар бўлими бошлиғи',
            company: 'Rahat Market',
            text: 'Мана ярим йилдирки, Jabeel компаниясидан товуқ гўштини улгуржи сотиб оламиз. MAP илғор қадоқлаш технологияси туфайли маҳсулот витринада узоқ вақт янгидек туради. Етказиб бериш жуда тез.',
            rating: 5,
            date: 'Апрель 2026',
          },
          {
            id: 't3',
            name: 'Дилшод Тўраев',
            role: 'Асосчиси',
            company: 'Burger Time',
            text: 'Тезкор умумий овқатланиш тармоғи учун калибрланган товуқ жуда зарур. Jabeel компанияси ишни тўғри йўлга қўйган. Ҳалол сертификати борлиги барча мижозларимиз учун катта кафолатдир.',
            rating: 5,
            date: 'Март 2026',
          }
        ];
      default:
        return [
          {
            id: 't1',
            name: 'Jamshid Alimov',
            role: 'Bosh oshpaz',
            company: 'Anor Restaurant Group',
            text: 'Jabeel Premium tovuq mahsulotlari bizning taomlar sifatini mutlaqo yangi darajaga ko\'tardi. File qovurilganda suv ajratmaydi, go\'shti nihoyatda mayin. Mehmonlarimiz tovuqli taomlardan juda mamnun.',
            rating: 5,
            date: 'May 2026',
          },
          {
            id: 't2',
            name: 'Shahnoza Karimova',
            role: 'Xaridlar bo\'limi boshlig\'i',
            company: 'Rahat Market',
            text: 'Jabeel kompaniyasidan tovuq go\'shtlarini yarim yildan beri ulgurji xarid qilib kelamiz. MAP ilg\'or qadoqlash texnologiyasi sababli mahsulot peshtaxtada uzoq vaqt yangi saqlanadi. Yetkazish juda o\'z vaqtida.',
            rating: 5,
            date: 'April 2026',
          },
          {
            id: 't3',
            name: 'Dilshod To\'rayev',
            role: 'Asoschisi',
            company: 'Burger Time',
            text: 'Tezkor ovqatlanish tarmog\'imiz uchun kalibrlangan tovuq go\'shti juda muhim. Jabeel bu borada yetakchi. Halol sertifikati mavjudligi hamkorligimiz asosi hisoblanadi.',
            rating: 5,
            date: 'March 2026',
          }
        ];
    }
  };

  useEffect(() => {
    // Check if there are user reviews saved in localStorage. If not, seed with static list
    const saved = localStorage.getItem('jabeel_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(getSeedReviews());
    }
  }, [language]);

  const saveReviews = (updated: Testimonial[]) => {
    setReviews(updated);
    localStorage.setItem('jabeel_reviews', JSON.stringify(updated));
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim() || !newRole.trim()) return;

    const newRev: Testimonial = {
      id: `user-${Date.now()}`,
      name: newName,
      role: newRole,
      company: newCompany || undefined,
      text: newText,
      rating: newRating,
      date: 'Today',
    };

    const updated = [newRev, ...reviews];
    saveReviews(updated);

    // reset states
    setNewName('');
    setNewRole('');
    setNewCompany('');
    setNewText('');
    setNewRating(5);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsFormOpen(false);
    }, 2000);
  };

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Write Review Action button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-sm font-extrabold text-orange-500 uppercase tracking-widest block">
              {getSectionTag()}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              {getSectionTitle()}
            </h2>
            <div className="w-16 h-1 rounded-full bg-orange-500" />
            <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
              {getSectionDesc()}
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="self-start md:self-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-all flex items-center gap-2 shadow-lg shadow-orange-500/15 cursor-pointer shrink-0"
            id="testimonials-toggle-btn"
          >
            <Plus className="w-4.5 h-4.5" /> {language === 'en' ? 'Leave Feedback' : language === 'ru' ? 'Оставить отзыв' : language === 'oz' ? 'Фикр Қолдириш' : 'Fikr Qoldirish'}
          </button>
        </div>

        {/* Dynamic sliding Form drawer */}
        {isFormOpen && (
          <div className="mb-12 bg-slate-50 border border-slate-100 p-6 sm:p-8 rounded-[2rem] animate-fade-in text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-orange-500" />{' '}
              {language === 'en' ? 'Share your thoughts about Jabeel' : language === 'ru' ? 'Поделитесь мнением о фабрике Jabeel' : 'Jabeel haqidagi fikringizni baham ko\'ring'}
            </h3>

            {formSuccess ? (
               <div className="p-6 bg-green-50 border border-green-200 text-green-700 font-bold text-center rounded-2xl flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <span>
                  {language === 'en'
                    ? 'Thank you! Your verified feedback has been preserved and listed first.'
                    : language === 'ru'
                    ? 'Спасибо! Ваш отзыв успешно зафиксирован и будет показан сверху.'
                    : 'Rahmat! Sizning fikringiz saqlandi va birinchi qatorda ko\'rsatiladi.'}
                </span>
              </div>
            ) : (
               <form onSubmit={handleAddReview} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {language === 'en' ? 'Your Full Name *' : language === 'ru' ? 'Ваше Полное Имя *' : 'To\'liq ismingiz *'}
                    </label>
                    <input
                      required
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder={language === 'en' ? 'e.g. Alisher Ergashev' : language === 'ru' ? 'Например: Алишер Эргашев' : 'Masalan: Alisher Ergashev'}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-all"
                      id="rev-name"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {language === 'en' ? 'Position / Role *' : language === 'ru' ? 'Должность *' : 'Lavozimingiz *'}
                    </label>
                    <input
                      required
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder={language === 'en' ? 'e.g. Purchasing Manager' : language === 'ru' ? 'Например: Руководитель закупок' : 'Masalan: Xaridlar bo\'limi boshlig\'i'}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-all"
                      id="rev-role"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {language === 'en' ? 'Company Name' : language === 'ru' ? 'Название Компании' : 'Kompaniyangiz nomi'}
                    </label>
                    <input
                      type="text"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      placeholder={language === 'en' ? 'e.g. Premium Supermarket' : language === 'ru' ? 'Например: Премиум Маркет' : 'Masalan: Premium Supermarket'}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-all"
                      id="rev-company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 items-start">
                  {/* Rating selection */}
                  <div className="sm:col-span-1 space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {language === 'en' ? 'Rating' : language === 'ru' ? 'Ваша оценка' : 'Bahoingiz'}
                    </label>
                    <div className="flex gap-1.5 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="text-2xl cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="sm:col-span-3 space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {language === 'en' ? 'Your Review *' : language === 'ru' ? 'Текст Отзыва *' : 'Sizning fikringiz *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder={
                        language === 'en'
                          ? 'Write about chicken quality, logistics speed, or protective atmosphere...'
                          : language === 'ru'
                          ? 'Ваш отзыв о качестве мяса, скорости доставки и упаковке MAP...'
                          : 'Go\'sht sifati, yetkazib berish xizmati va qadoqlash haqida yozing...'
                      }
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all resize-none"
                      id="rev-text"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                  >
                    {language === 'en' ? 'Cancel' : language === 'ru' ? 'Отмена' : 'Bekor qilish'}
                  </button>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/10 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />{' '}
                    {language === 'en' ? 'Submit Review' : language === 'ru' ? 'Отправить' : 'Fikrni saqlash'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Dynamic testimonials layout list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl hover:border-orange-100 transition-all duration-300 flex flex-col justify-between relative group text-left"
              id={`rev-${rev.id}`}
            >
              <div className="space-y-6">
                {/* Score rating and stamp watermark */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  {rev.id.startsWith('user-') && (
                    <span className="text-[10px] bg-green-50 text-green-700 border border-green-150 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                      {language === 'en' ? 'Verified Client' : language === 'ru' ? 'Проверенный партнер' : 'Tasdiqlangan Foydalanuvchi'}
                    </span>
                  )}
                </div>

                {/* Main Quote text block */}
                <p className="text-slate-600 text-sm leading-relaxed font-normal italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author profile tag info */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-extrabold text-sm uppercase shrink-0">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{rev.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {rev.role}
                    {rev.company && <span className="text-orange-500 font-bold block">{rev.company}</span>}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
