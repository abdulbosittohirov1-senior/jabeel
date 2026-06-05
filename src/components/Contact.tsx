import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, HelpCircle, Send, CheckCircle2, FileDown, MessageSquareCode } from 'lucide-react';
import { useLanguage } from '../LanguageContext.tsx';

export default function Contact() {
  const { t, language } = useLanguage();

  // Form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [priorityTicket, setPriorityTicket] = useState('');
  const [catalogDownloaded, setCatalogDownloaded] = useState(false);

  const getDeliveryZones = () => {
    switch (language) {
      case 'en':
        return [
          {
            id: 'zone-1',
            name: 'Tashkent city (All districts)',
            minOrder: '5 Kilograms',
            deliveryTime: 'Within 2 hours',
            coverage: 'Yunusobod, Chilonzor, Mirzo Ulugbek, Yakkasaroy, Sergeli, Shayxontohur, Olmazor and others.',
            color: 'border-orange-500 bg-orange-50/50',
          },
          {
            id: 'zone-2',
            name: 'Tashkent Region',
            minOrder: '15 Kilograms',
            deliveryTime: 'Same day (For orders placed before 12:00)',
            coverage: 'Qibray, Chirchiq, Yangiyul, Parkent, Angren, Toytepa and adjacent areas',
            color: 'border-slate-300 bg-slate-50/50',
          },
          {
            id: 'zone-3',
            name: 'Republic of Uzbekistan Wholesales',
            minOrder: '500 Kilograms (Wholesale batch)',
            deliveryTime: 'Scheduled custom time (Within 24-48 hours)',
            coverage: 'Samarkand, Bukhara, Andijan, Namangan, Fergana, Navoiy, Qarshi and all other cities',
            color: 'border-orange-200 bg-slate-50/50',
          }
        ];
      case 'ru':
        return [
          {
            id: 'zone-1',
            name: 'Город Ташкент (Все районы)',
            minOrder: '5 Килограмм',
            deliveryTime: 'В течение 2-х часов',
            coverage: 'Юнусабад, Чиланзар, Мирзо Улугбек, Яккасарай, Сергели, Шайхантахур, Алмазар и др.',
            color: 'border-orange-500 bg-orange-50/50',
          },
          {
            id: 'zone-2',
            name: 'Ташкентская область',
            minOrder: '15 Килограмм',
            deliveryTime: 'День в день (при заказе до 12:00)',
            coverage: 'Кибрай, Чирчик, Янгиюль, Паркент, Ангрен, Тойтепа и прилегающие районы',
            color: 'border-slate-300 bg-slate-50/50',
          },
          {
            id: 'zone-3',
            name: 'Регионы Узбекистана (Оптовые поставки)',
            minOrder: '500 Килограмм (Оптовая спецпартия)',
            deliveryTime: 'Согласованный график (в течение 24-48 часов)',
            coverage: 'Самарканд, Бухара, Андижан, Наманган, Фергана, Навои, Карши и другие крупные города',
            color: 'border-orange-200 bg-slate-50/50',
          }
        ];
      case 'oz':
        return [
          {
            id: 'zone-1',
            name: 'Тошкент шаҳри (Барча туманлар)',
            minOrder: '5 Килограмм',
            deliveryTime: '2 соат ичида',
            coverage: 'Юнусобод, Чилонзор, Мирзо Улуғбек, Яккасарой, Сергели, Шайхонтоҳур, Олмазор ва бошқалар.',
            color: 'border-orange-500 bg-orange-50/50',
          },
          {
            id: 'zone-2',
            name: 'Тошкент вилояти',
            minOrder: '15 Килограмм',
            deliveryTime: 'Ўша куннинг ўзида (12:00 гача буюртма қилинса)',
            coverage: 'Қибрай, Чирчиқ, Янгийўл, Паркент, Ангрен, Тўйтепа ва яқин туманлар',
            color: 'border-slate-300 bg-slate-50/50',
          },
          {
            id: 'zone-3',
            name: 'Республика бўйлаб улгуржи етказиб бериш',
            minOrder: '500 Килограмм (Улгуржи)',
            deliveryTime: 'Келишилган вақтда (24-48 соат ичида)',
            coverage: 'Самарқанд, Бухоро, Андижон, Наманган, Фарғона, Навоий, Қарши ва бошқа шаҳарлар',
            color: 'border-orange-200 bg-slate-50/50',
          }
        ];
      default:
        return [
          {
            id: 'zone-1',
            name: 'Toshkent shahri (Barcha tumanlar)',
            minOrder: '5 Kilogramm',
            deliveryTime: '2 soat ichida',
            coverage: 'Yunusobod, Chilonzor, Mirzo Ulug\'bek, Yakkasaroy, Sergeli, Shayxontohur, Olmazor va boshqalar.',
            color: 'border-orange-500 bg-orange-50/50',
          },
          {
            id: 'zone-2',
            name: 'Toshkent viloyati',
            minOrder: '15 Kilogramm',
            deliveryTime: 'O\'sha kunning o\'zida (12:00 gacha buyurtma qilinsa)',
            coverage: 'Qibray, Chirchiq, Yangiyo\'l, Parkent, Angren, To\'ytepa va yaqin tumanlar',
            color: 'border-slate-300 bg-slate-50/50',
          },
          {
            id: 'zone-3',
            name: 'Respublika bo\'ylab ulgurji yetkazib berish',
            minOrder: '500 Kilogramm (Ulgurji)',
            deliveryTime: 'Kelisilgan vaqtda (24-48 soat ichida)',
            coverage: 'Samarqand, Buxoro, Andijon, Namangan, Farg\'ona, Navoiy, Qarshi va boshqa shaharlar',
            color: 'border-orange-200 bg-slate-50/50',
          }
        ];
    }
  };

  const zones = getDeliveryZones();
  const [selectedZoneId, setSelectedZoneId] = useState('zone-1');
  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setPriorityTicket(`JB-26-${randomCode}`);
    setFormSubmitted(true);
    setCatalogDownloaded(false);
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setFormSubmitted(false);
    setCatalogDownloaded(false);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-extrabold text-orange-500 uppercase tracking-widest block">
            {language === 'en' ? 'CONTACT US' : language === 'ru' ? 'СВЯЗАТЬСЯ' : language === 'oz' ? 'БОҒЛАНИШ' : 'BOG\'LANISH'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            {language === 'en' ? 'Have Questions or Orders?' : language === 'ru' ? 'Есть вопросы или заказы?' : language === 'oz' ? 'Савол ва Буюртмаларингиз Борми?' : 'Savol va Buyurtmalaringiz Bormi?'}
          </h2>
          <div className="w-16 h-1 rounded-full bg-orange-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            {language === 'en'
              ? 'Get in touch with us. Our managers are ready to assist you regarding bulk partnership arrangements and order details.'
              : language === 'ru'
              ? 'Свяжитесь с нами. Наши специалисты готовы оперативно проконсультировать вас по условиям оптовых поставок мяса птицы.'
              : language === 'oz'
              ? 'Биз билан боғланинг. Мутахассисларимиз улгуржи ҳамкорлик ва буюртмаларни расмийлаштириш бўйича сизга батафсил маълумот беришга тайёр.'
              : 'Biz bilan bog\'laning. Mutaxassislarimiz ulgurji hamkorlik va buyurtmalarni rasmiylashtirish bo\'yicha sizga batafsil ma\'lumot berishga tayyor.'}
          </p>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Block: Communication Details & Interactive Delivery Zones Matrix */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 text-left">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-50 pb-4">
                {language === 'en' ? 'Office and Contacts' : language === 'ru' ? 'Контакты и Адрес Офиса' : 'Ofis va Bog\'lanish Ma\'lumotlari'}
              </h3>

              <div className="space-y-4">
                {/* Location */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {language === 'en' ? 'Headquarters Address' : language === 'ru' ? 'Адрес Главного Офиса' : 'Bosh Ofis Manzili'}
                    </h4>
                    <p className="text-sm text-slate-800 font-bold mt-1">
                      {language === 'en' ? 'Tashkent reg., Qibray dist.' : language === 'ru' ? 'Ташкентская обл., Кибрайский р-н.' : 'Toshkent vil., Qibray t.'}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'en' ? 'Choponota 23' : language === 'ru' ? 'улица Чопонота, 23' : 'Choponota 23'}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {language === 'en' ? 'Confidence Hotline' : language === 'ru' ? 'Телефон отдела продаж' : 'Ishonch Telefoni'}
                    </h4>
                    <a
                      href="tel:+998977040101"
                      className="text-sm text-slate-800 font-bold hover:text-orange-500 transition-colors block mt-1"
                    >
                      (+998) 97-704-01-01
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {language === 'en' ? 'Business Email Address' : language === 'ru' ? 'Электронная Почта' : 'Elektron Manzil'}
                    </h4>
                    <a
                      href="mailto:info@jabeel.uz"
                      className="text-sm text-slate-800 font-bold hover:text-orange-500 transition-colors block mt-1"
                    >
                      info@jabeel.uz
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {language === 'en' ? 'Response: within 2 hours' : language === 'ru' ? 'Время ответа: до 2-х часов' : 'Javob berish vaqti: 2 soat ichida'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant Social Chat Triggers */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://t.me/jabeel_premium_bot_link_placeholder"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
                  id="telegram-link"
                >
                  <MessageSquareCode className="w-4 h-4 shrink-0" />
                  <span>{language === 'en' ? 'Message Telegram' : language === 'ru' ? 'Написать в Telegram' : 'Telegram orqali yozish'}</span>
                </a>
                <a
                  href="https://wa.me/998977040101?text=Assalomu%20alaykum%20Jabeel%20Premium"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-emerald-600 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
                  id="whatsapp-link"
                >
                  <MessageSquareCode className="w-4 h-4 shrink-0" />
                  <span>{language === 'en' ? 'Message WhatsApp' : language === 'ru' ? 'Написать в WhatsApp' : 'WhatsApp orqali yozish'}</span>
                </a>
              </div>
            </div>

            {/* Simulated Interactive Uzbekistan Delivery Class Matrix */}
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-6 text-left">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === 'en' ? 'Regional Logistics Coverage' : language === 'ru' ? 'Доставка по Регионам' : 'Mintaqalar bo\'ylab yetkazib berish'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en' ? 'Select region to view logisitics terms:' : language === 'ru' ? 'Выберите регион для расчета логистики' : 'Logistika shartlarini bilish uchun kerakli hududni tanlang:'}
                </p>
              </div>

              {/* Selector buttons */}
              <div className="grid grid-cols-3 gap-2.5">
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`text-center py-2 px-1.5 rounded-xl border text-[10px] font-extrabold uppercase tracking-wide transition-all cursor-pointer truncate ${
                      selectedZoneId === zone.id
                        ? 'border-orange-500 bg-orange-50 text-orange-700 font-extrabold shadow-xs'
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                    }`}
                  >
                    {zone.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Selected Zone readout */}
              <div className={`p-5 rounded-2xl border transition-all ${activeZone.color}`}>
                <h4 className="font-bold text-slate-900 text-sm">{activeZone.name}</h4>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                      {language === 'en' ? 'Min. Order' : language === 'ru' ? 'Мин. заказ' : 'Min. Buyurtma'}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{activeZone.minOrder}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                      {language === 'en' ? 'Delivery Time' : language === 'ru' ? 'Срок доставки' : 'Yetkazib berish'}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{activeZone.deliveryTime}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    {language === 'en' ? 'Territorial Coverage' : language === 'ru' ? 'Зона Покрытия' : 'Qoplash doirasi'}
                  </span>
                  <span className="text-xs font-medium text-slate-600 block mt-1">{activeZone.coverage}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Block: Fully Interactive Web Contact Form / Submit Success */}
          <div className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-100 p-6 sm:p-10 shadow-lg relative min-h-[500px] text-left">
            {formSubmitted ? (
              // Premium Success Output Overlay
              <div className="h-full flex flex-col justify-center items-center text-center space-y-6 py-6 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {language === 'en' ? 'Application Received' : language === 'ru' ? 'Заявка Успешно Принята' : 'Murojaat muvaffaqiyatli qabul qilindi'}
                  </h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto">
                    {language === 'en'
                      ? `Dear ${name}, your inquiry has been successfully lodged. Our operators will dial you back shortly.`
                      : language === 'ru'
                      ? `Уважаемый партнер ${name}, ваша заявка зафиксирована. Наш ведущий менеджер свяжется с вами в течение 45 минут.`
                      : `Muhtaram ${name}, buyurtma so'rovingiz menejerlarimizga jo'natildi. Tezkunlarda siz bilan bog'lanamiz.`}
                  </p>
                </div>

                {/* Priority stamp block */}
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl max-w-xs w-full text-center space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
                    {language === 'en' ? 'Inquiry ID code' : language === 'ru' ? 'Код обращения (ID)' : 'Murojaat raqami (ID)'}
                  </span>
                  <span className="text-lg font-mono font-extrabold text-orange-500 tracking-wider">{priorityTicket}</span>
                  <p className="text-[9px] text-slate-400 italic">
                    {language === 'en' ? 'Assigned support will contact you within 45 min' : language === 'ru' ? 'Свяжемся с вами в течение 45 минут' : 'Menejer 45 daqiqa ichida bog\'lanadi'}
                  </p>
                </div>

                {/* Bonus catalog action */}
                <div className="space-y-4 pt-2">
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    {language === 'en'
                      ? 'While our team reviews your logistics data, feel free to download our official PDF wholesale catalog.'
                      : language === 'ru'
                      ? 'Пока мы обрабатываем данные, вы можете загрузить торговый каталог и полный прайс-лист оптовика.'
                      : 'Menejerlarimiz ma\'lumotlarni ko\'rib chiqqunga qadar, so\'nggi ulgurji narxlar ro\'yxatini yuklab olishingiz mumkin.'}
                  </p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCatalogDownloaded(true);
                    }}
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />{' '}
                    {language === 'en' ? 'Download Pricing Catalog (PDF)' : language === 'ru' ? 'Скачать оптовый прайс (PDF)' : 'Ulgurji narxlar ro\'yxatini yuklab olish (PDF)'}
                  </button>
                  {catalogDownloaded && (
                    <p className="text-xs text-green-600 font-bold animate-fade-in">
                      {language === 'en' ? '✓ Catalog downloaded successfully!' : language === 'ru' ? '✓ Прайс успешно экспортирован!' : '✓ PDF ma\'lumotlar muvaffaqiyatli yuklab olindi!'}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleResetForm}
                  className="text-xs font-semibold text-slate-400 hover:text-orange-500 hover:underline pt-4"
                >
                  {language === 'en' ? 'Submit another request' : language === 'ru' ? 'Отправить новую заявку' : 'Yangi murojaat yuborish'}
                </button>
              </div>
            ) : (
              // The Contact Form itself
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {language === 'en' ? 'Send an Inquiry' : language === 'ru' ? 'Мурoжаат юбoриш шакли' : 'Murojaat yuborish shakli'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'en' ? 'Fields marked with * are required.' : language === 'ru' ? 'Пожалуйста зафиксируйте данные. Поля с (*) обязательны.' : 'Iltimos, ma\'lumotlarni to\'ldiring. * belgisi bor maydonlar majburiy.'}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-650 uppercase tracking-widest block">
                      {language === 'en' ? 'Your Name *' : language === 'ru' ? 'Имя и фамилия *' : 'Ism-sharifingiz *'}
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'en' ? 'e.g. Elyor Rustamov' : language === 'ru' ? 'Например: Эльёр Рустамов' : 'Masalan: Elyor Rustamov'}
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all"
                      id="cnt-name"
                    />
                  </div>

                  {/* Twin blocks Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-655 uppercase tracking-widest block">
                        {language === 'en' ? 'Phone number *' : language === 'ru' ? 'Номер телефона *' : 'Telefon raqamingiz *'}
                      </label>
                      <input
                        required
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +998 (90) 123-45-67"
                        className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all"
                        id="cnt-phone"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-655 uppercase tracking-widest block">
                        {language === 'en' ? 'Email Address' : language === 'ru' ? 'Электронная почта' : 'Elektron pochta'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. manager@korzinka.uz"
                        className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all"
                        id="cnt-email"
                      />
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-655 uppercase tracking-widest block">
                      {language === 'en' ? 'Sizning xabar yoki hohishingiz *' : language === 'ru' ? 'Детали заказа или ваши критерии *' : 'Qo\'shimcha ma\'lumotlar / Buyurtma talablari *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        language === 'en'
                          ? 'Specify your target chicken segment, schedule plans, preferred quantity...'
                          : language === 'ru'
                          ? 'Напишите интересующий вас ассортимент, разовые или плановые объемы...'
                          : 'Sizni qiziqtirayotgan mahsulot turi, hajmi, kerakli logistika va saqlash sharoitlari haqida yozing...'
                      }
                      className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all resize-none"
                      id="cnt-message"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-550">
                    <HelpCircle className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>
                      {language === 'en' ? 'Official Halal and ISO standard certificates supplied' : language === 'ru' ? 'Предоставляются все сертификаты Халяль и ISO' : 'Halol va ISO sifat sertifikatlari taqdim etiladi'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-lg shadow-orange-500/15 hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="contact-submit"
                  >
                    <span>{language === 'en' ? 'Send Message' : language === 'ru' ? 'Отправить' : 'Murojaatni yuborish'}</span>
                    <Send className="w-4.5 h-4.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Yandex Maps Section */}
        <div id="yandex-map-container" className="mt-16 animate-fade-in text-left">
          <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-slate-100 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>
                    {language === 'en' ? 'Our Location on Map' : language === 'ru' ? 'Наше Расположение на Карте' : 'Bizning Manzilimiz Xaritada'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en'
                    ? 'Tashkent reg., Qibray district, Choponota str., 23. Please coordinate prior to visit!'
                    : language === 'ru'
                    ? 'Ташкентская обл., Кибрайский р-н, ул. Чопонота, 23. Обязательно наберите перед выездом!'
                    : 'Toshkent vil., Qibray t., Cho\'ponota 23. Kelishdan oldin qo\'ng\'iroq qiling!'}
                </p>
              </div>
              <a 
                href="https://yandex.com/maps/?ll=69.341202%2C41.435083&z=15&mode=search&text=41.435083%2C69.341202" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                {language === 'en' ? 'Open in Yandex.Maps' : language === 'ru' ? 'Открыть на Яндекс.Картах' : 'Yandex.Maps-da ochish'}
              </a>
            </div>
            
            <div className="relative w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50">
              <iframe 
                title="Jabeel Premium Manzili (Yandex Map)"
                src="https://yandex.com/map-widget/v1/?ll=69.341202%2C41.435083&z=15&pt=69.341202%2C41.435083%2Cpm2orl"
                width="100%" 
                height="100%" 
                frameBorder="0" 
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full filter saturate-[0.95]"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
