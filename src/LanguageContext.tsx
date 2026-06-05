import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Testimonial, ProcessStep, DeliveryZone } from './types.ts';

import heroChicken from './assets/images/hero_chicken_1780578786535.png';
import chickenFillet from './assets/images/chicken_fillet_1780578811815.png';
import chickenWings from './assets/images/chicken_wings_1780578831353.png';
import chickenLegs from './assets/images/chicken_legs_1780578850167.png';
import chickenThighs from './assets/images/chicken_thighs_1780580663429.png';
import chickenQuarters from './assets/images/chicken_quarters_1780580684866.png';
import wholeChicken from './assets/images/whole_chicken_1780578878080.png';

export type LanguageType = 'uz' | 'oz' | 'ru' | 'en';

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
  stats: any[];
  products: Product[];
  processSteps: ProcessStep[];
  testimonials: Testimonial[];
  deliveryZones: DeliveryZone[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('jabeel_lang');
    return (saved as LanguageType) || 'uz';
  });

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem('jabeel_lang', lang);
  };

  // Translations dictionary
  const dicts: Record<LanguageType, Record<string, string>> = {
    uz: {
      // Navbar & General
      brand: "JABEEL",
      premium: "PREMIUM",
      nav_home: "Bosh Sahifa",
      hero_title_p1: "Sifatli Tovuq Go'shti",
      hero_title_p2: "Mahsulotlari",
      hero_subtitle: "Jabeel - tirik tovuqlarni sotib olish, ularni halol usulda so'yish, professional ravishda qayta ishlash va turli qismlarga bo'lib, iste'molchilarga yetkazib beruvchi zamonaviy korxona.",
      nav_about: "Biz Haqimizda",
      nav_products: "Mahsulotlar",
      nav_why_us: "Afzalliklar",
      nav_contact: "Bog'lanish",
      call: "Qo'ng'iroq",
      halal_guaranteed: "100% Halol Sertifikatlangan Standart",
      iso_badge: "ISO 22000 Tizimi",
      iso_badge_desc: "Murosasiz xavfsizlik",
      chain_badge: "Tezkor Sovuq Zanjir",
      chain_badge_desc: "Doimiy -2°C dan 0°C gacha",
      quality_badge: "Sifat Kafolati",
      quality_badge_desc: "Sertifikatlangan mahsulot",
      view_products: "Mahsulotlar",
      organic_badge: "Tabiiy Oziqlanish",
      organic_badge_desc: "Sog'lom va tabiiy ozuqalar",
      organic_tag: "Ekologik",

      // About
      about_partner: "ISHONCHLI HAMKOR",
      about_title: "Biz Haqimizda — Jabeel",
      about_p1: "2010-yildan beri Jabeel O'zbekiston bozorida tirik tovuqlarni sotib olib, ularni halol usulda so'yish, qayta ishlash va turli qismlarga bo'lib sotish bilan shug'ullanib kelmoqda. Bizning maqsadimiz - har bir mijozga sifatli va halol tovuq go'shtini yetkazish.",
      about_p2: "Jabeel zamonaviy so'yish va qayta ishlash liniyalariga ega. Biz faqat sog'lom va sifatli tirik tovuqlarni yetishtiramiz va sotib olamiz, ularni halol usulda so'yamiz va zamonaviy uslubda qayta ishlab, iste'molchilar talabiga mos ravishda turli qismlarga bo'lamiz.",
      about_p3: "Har bir mahsulotimiz qat'iy sifat nazoratidan o'tadi va halol standartlariga mos keladi. Biz mijozlarimizga eng yaxshisini taklif qilishga intilamiz.",
      mission: "Bizning Missiyamiz",
      mission_desc: "Barcha mijozlarimizga ekologik toza, 100% Halol standartlariga mos va yuqori proteinli tovuq go'shtini ilg'or gigiyenik sharoitlarda yetkazib berish.",
      vision: "Bizning Maqsadimiz",
      vision_desc: "Zamonaviy texnologiyalardan foydalanib, O'zbekiston bozorida tovuq go'shti yetkazib berish sohasida ishonchlilik va sifat bo'yicha mutloq yetakchi bo'lish.",
      promise: "Bizning Va'damiz",
      promise_p1: "Mutloq tozalik va xavfsizlik",
      promise_p2: "Shaffof ulgurji va chakana narxlar",
      promise_p3: "Tez yetkazib berish va halollik",

      // Products
      products_tag: "MAHSULOTLAR",
      products_title: "Bizning Mahsulotlarimiz",
      products_subtitle: "Har bir mahsulotimiz tabiiy va sifatli. Siz va oilangiz uchun eng yaxshisini taklif qilamiz.",
      halal_card: "100% Halol",
      fresh_frozen: "Yangi va Muzlatilgan",
      protein_label: "Oqsil",
      kkal_label: "Kkal",
      more_info: "Batafsil ma'lumot",

      // Calculator
      calc_icon_title: "Ulgurji Buyurtma Kalkulyatori",
      calc_desc: "Siz restoran tarmog'i, savdo do'koni yoki yirik ulgurji distribyutormisiz? Kerakli mahsulot va miqdorni tanlang, buyurtma loyihasini yarating va uni to'g'ridan-to'g'ri menejerimizga yuboring.",
      calc_min: "Minimal buyurtma hajmi — 5 kg",
      calc_gps: "To'liq GPS sovuq zanjir nazorati",
      calc_part_title: "Tovuq Qismini Tanlang",
      calc_qty_title: "Buyurtma Hajmi (kg)",
      calc_pack_title: "Qadoqlash Turi",
      calc_pack_map: "Gazli himoya muhiti (MAP)",
      calc_pack_vac: "Standart go'sht vakuum paketi",
      calc_pack_box: "Yirik ulgurji quti (10kg+)",
      calc_pack_plate: "Yengil plastik pallet tovoqlar",
      calc_btn: "Hajm Profilini Hisoblash",
      calc_route_label: "Logistika marshruti klassi:",
      calc_route_big: "Yirik ulgurji sovuq zanjir yetkazib berish",
      calc_route_small: "Mijoz uchun tezkor avtopark",
      calc_protein_label: "Sof protein (oqsil) miqdori:",
      calc_protein_kg: "kg tabiiy oqsil",
      calc_pack_proj: "Tavsiya etilgan qadoqlash loyihasi:",
      calc_temp_label: "Tavsiya etilgan saqlash harorati:",
      calc_submit: "Buyurtmani Rasmiylashtirish & Menejer Bilan Bog'lanish",
      calc_feedback: "✓ Buyurtma loyihasi tayyorlandi. Ma'lumotlarni yakunlash uchun bog'lanish formasiga yo'naltirilmoqda...",

      // Modal
      modal_sub: "Sertifikatlangan Premium Parrandachilik Mahsuloti",
      modal_desc_label: "Mahsulot Ta'rifi",
      modal_protein: "Protein (Oqsil)",
      modal_fat: "Tabiiy Yog'",
      modal_calories: "Kaloriyasi",
      modal_features: "Xususiyatlari / Afzalliklari",
      modal_logistics: "Saqlash va Logistika Bo'yicha Ko'rsatma",
      modal_guide: "Oshpaz Tavsiyasi va Pishirish",
      modal_close: "Yopish",
      modal_calc: "Hajmini hisoblash",

      // Why choose us
      why_tag: "AFZALLIKLAR",
      why_title: "Nima Uchun Jabeel?",
      why_p1: "Tezkor",
      why_p1_desc: "Buyurtmalar o'z vaqtida yetkazib beriladi.",
      why_p2: "Sifatli",
      why_p2_desc: "Eng yuqori standartlarga javob beradigan sifat.",
      why_p3: "Halol",
      why_p3_desc: "100% halol usulda so'yilgan va tayyorlangan.",

      // Process
      process_tag: "ISHLASH USULIMIZ",
      process_title: "Ishlab Chiqarish Bosqichlari",
      process_subtitle: "Zamon talablariga mos, yuqori texnologiyalar yordamida sifatga erishish jarayoni.",
      process_duration: "Davomiyligi:",

      // Testimonials
      test_tag: "MIJOZLAR FIKRI",
      test_title: "Hamkorlarimiz Biz Haqimizda",
      test_subtitle: "Biz bilan ishlayotgan yirik do'konlar va oshpazlarning samimiy fikrlari.",

      // Contact & Delivery
      contact_tag: "BOG'LANISH",
      contact_title: "Biz Bilan Bog'laning",
      contact_subtitle: "Har qanday savol yoki yirik xaridlar yuzasidan murojaat qoldiring. Menejerlarimiz tezda bog'lanishadi.",
      zone_tag: "YETKAZIB BERISH BILAN TANISHING",
      zone_title: "O'zbekiston Bo'ylab Logistika",
      zone_desc: "Bizning maxsus refrijeratorli avtomobillarimiz harorat barqarorligini ta'minlaydi va go'shtni yangidek saqlaydi.",
      zone_min_ord: "Minimal Buyurtma:",
      zone_time: "Yetkazish Vaqti:",
      zone_coverage: "Qamrab Olingan Hududlar:",
      form_title: "Murojaat Yuborish Shakli",
      form_name: "To'liq ismingiz yoki kompaniya nomi",
      form_phone: "Telefon raqamingiz",
      form_msg: "Xabaringiz yoki buyurtmangiz tafsilotlari",
      form_submit: "Arizani Yuborish",
      form_feedback_success: "✓ Rahmat! Murojaatingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.",
      address_title: "Bosh Ofis Manzili",
      address_loc_1: "Toshkent vil., Qibray t.",
      address_loc_2: "Cho'ponota 23",
      contact_schedule: "Dushanba - Yakshanba, 24/7",
      map_title: "Bizning Manzilimiz Xaritada",
      map_p: "Toshkent vil., Qibray t., Cho'ponota 23. Kelishdan oldin qo'ng'iroq qiling!",
      map_btn: "Yandex.Maps-da ochish",

      // Footer
      footer_desc: "Jabeel - tirik tovuqlarni sotib olish, qayta ishlash va sotish bilan shug'ullanuvchi ishonchli korxona. Sifat va halollik bizning asosiy tamoyillarimiz.",
      footer_halal: "Sifat va Halollik Kafolati",
      footer_quick_links: "Tezkor Havolalar",
      footer_social: "Ijtimoiy Tarmoqlar",
      footer_social_p: "Bizni ijtimoiy tarmoqlarda kuzatib boring va so'nggi yangiliklardan xabardor bo'ling.",
      footer_rights: "МЧЖ JABEEL. Barcha huquqlar himoyalangan.",
      footer_dev: "tomonidan ishlab chiqarilgan",
      lang_select_title: "Tilni tanlang"
    },
    oz: {
      // Navbar & General
      brand: "ЖАБЕЕЛ",
      premium: "ПРЕМИУМ",
      nav_home: "Бош Саҳифа",
      hero_title_p1: "Сифатли Товуқ Гўшти",
      hero_title_p2: "Маҳсулотлари",
      hero_subtitle: "Jabeel - тирик товуқларни сотиб олиш, уларни ҳалол усулда сўйиш, профессионал равишда қайта ишлаш ва турли қисмларга бўлиб, истеъмолчиларга етказиб берувчи замонавий корхона.",
      nav_about: "Биз Ҳақимизда",
      nav_products: "Маҳсулотлар",
      nav_why_us: "Афзалликлар",
      nav_contact: "Боғланиш",
      call: "Қўнғироқ",
      halal_guaranteed: "100% Ҳалол Сертификатланган Стандарт",
      iso_badge: "ISO 22000 Тизими",
      iso_badge_desc: "Муросасиз хавфсизлик",
      chain_badge: "Тезкор Совуқ Занжир",
      chain_badge_desc: "Доимий -2°C дан 0°C гача",
      quality_badge: "Сифат Кафолати",
      quality_badge_desc: "Сертификатланган маҳсулот",
      view_products: "Маҳсулотлар",
      organic_badge: "Табиий Озиқланиш",
      organic_badge_desc: "Соғлом ва табиий озуқалар",
      organic_tag: "Экологик",

      // About
      about_partner: "ИШОНЧЛИ ҲАМКОР",
      about_title: "Биз Ҳақимизда — Jabeel",
      about_p1: "2010 йилдан бери Jabeel Ўзбекистон бозорида тирик товуқларни сотиб олиб, уларни ҳалол усулда сўйиш, қайта ишлаш ва турли қисмларга бўлиб сотиш билан шуғулланиб келмоқда. Бизнинг мақсадимиз - ҳар бир мижозга сифатли ва ҳалол товуқ гўштини етказиш.",
      about_p2: "Jabeel замонавий сўйиш ва қайта ишлаш линияларига эга. Биз фақат соғлом ва сифатли тирик товуқларни етиштирамиз ва сотиб оламиз, уларни ҳалол усулда сўямиз ва замонавий услубда қайта ишлаб, истеъмолчилар талабига мос равишда турли қисмларга бўламиз.",
      about_p3: "Ҳар бир маҳсулотимиз қатъий сифат назоратидан ўтади ва ҳалол стандартларига мос келади. Биз мижозларимизга энг яхшисини таклиф қилишга интиламиз.",
      mission: "Бизнинг Миссиямиз",
      mission_desc: "Барча мижозларимизга экологик тоза, 100% Ҳалол стандартларига мос ва юқори протеинли товуқ гўштини илғор гигиеник шароитларда етказиб бериш.",
      vision: "Бизнинг Мақсадимиз",
      vision_desc: "Замонавий технологиялардан фойдаланиб, Ўзбекистон бозорида товуқ гўшти етказиб бериш соҳасида ишончлилик ва сифат бўйича мутлоқ етакчи бўлиш.",
      promise: "Бизнинг Ваъдамиз",
      promise_p1: "Мутлоқ тозалик ва хавфсизлик",
      promise_p2: "Шаффоф улгуржи ва чакана нархлар",
      promise_p3: "Тез етказиб бериш ва ҳалоллик",

      // Products
      products_tag: "МАҲСУЛОТЛАР",
      products_title: "Бизнинг Маҳсулотларимиз",
      products_subtitle: "Ҳар бир маҳсулотимиз табиий ва сифатли. Сиз ва оилангиз учун энг яхшисини таклиф қиламиз.",
      halal_card: "100% Ҳалол",
      fresh_frozen: "Янги ва Музлатилган",
      protein_label: "Оқсил",
      kkal_label: "Ккал",
      more_info: "Батафсил маълумот",

      // Calculator
      calc_icon_title: "Улгуржи Буюртма Калкулятори",
      calc_desc: "Сиз ресторан тармоғи, савдо дўкони ёки йирик улгуржи дистрибютормисиз? Керакли маҳсулот ва миқдорни танланг, буюртма лойиҳасини яратинг ва уни тўғридан-тўғри менежеримизга юборинг.",
      calc_min: "Минимал буюртма ҳажми — 5 кг",
      calc_gps: "Тўлиқ GPS совуқ занжир назорати",
      calc_part_title: "Товуқ Қисмини Танланг",
      calc_qty_title: "Буюртма Ҳажми (кг)",
      calc_pack_title: "Қадоқлаш Тури",
      calc_pack_map: "Газли ҳимоя муҳити (MAP)",
      calc_pack_vac: "Стандарт гўшт вакуум пакети",
      calc_pack_box: "Йирик улгуржи қути (10кг+)",
      calc_pack_plate: "Енгил пластик паллет товоқлар",
      calc_btn: "Ҳажм Профилини Ҳисоблаш",
      calc_route_label: "Логистика маршрути класси:",
      calc_route_big: "Йирик улгуржи совуқ занжир етказиб бериш",
      calc_route_small: "Мижоз учун тезкор автопарк",
      calc_protein_label: "Соф протеин (оқсил) миқдори:",
      calc_protein_kg: "кг табиий оқсил",
      calc_pack_proj: "Тавсия этилган қадоқлаш лойиҳаси:",
      calc_temp_label: "Тавсия этилган сақлаш ҳарорати:",
      calc_submit: "Буюртмани Расмийлаштириш & Менежер Билан Боғланиш",
      calc_feedback: "✓ Буюртма лойиҳаси тайёрланди. Маълумотларни якунлаш учун боғланиш формасига йўналтирилмоқда...",

      // Modal
      modal_sub: "Сертификатланган Премиум Паррандачилик Маҳсулоти",
      modal_desc_label: "Маҳсулот Таърифи",
      modal_protein: "Протеин (Оқсил)",
      modal_fat: "Табиий Ёғ",
      modal_calories: "Калорияси",
      modal_features: "Хусусиятлари / Афзалликлари",
      modal_logistics: "Сақлаш ва Логистика Бўйича Кўрсатма",
      modal_guide: "Ошпаз Тавсияси ва Пишириш",
      modal_close: "Ёпиш",
      modal_calc: "Ҳажмини ҳисоблаш",

      // Why choose us
      why_tag: "АФЗАЛЛИКЛАР",
      why_title: "Нима Учун Jabeel?",
      why_p1: "Тезкор",
      why_p1_desc: "Буюртмалар ўз вақтида етказиб берилади.",
      why_p1_full: "Замонавий транспорт тизимимиз туфайли маҳсулотлар бутунлигича ва тез фурсатда етиб боради.",
      why_p2: "Сифатли",
      why_p2_desc: "Энг юқори стандартларга жавоб берадиган сифат.",
      why_p2_full: "Ҳар бир босқичда қатъий сифат назорати олиб борилади, бу эса юқори сифатни таъминлайди.",
      why_p3: "Ҳалол",
      why_p3_desc: "100% ҳалол усулда сўйилган ва тайёрланган.",
      why_p3_full: "Ишлаб чиқариш жараёнларимиз шариат талабларига ва халқаро ҳалол стандартларига тўлиқ мос келади.",

      // Process
      process_tag: "ИШЛАШ УСУЛИМИЗ",
      process_title: "Ишлаб Чиқариш Босқичлари",
      process_subtitle: "Замон талабларига мос, юқори технологиялар ёрдамида сифатга эришиш жараёни.",
      process_duration: "Давомийлиги:",

      // Testimonials
      test_tag: "МИЖОЗЛАР ФИКРИ",
      test_title: "Ҳамкорларимиз Биз Ҳақимизда",
      test_subtitle: "Биз билан ишлаётган йирик дўконлар ва ошпазларнинг самимий фикрлари.",

      // Contact & Delivery
      contact_tag: "БОҒЛАНИШ",
      contact_title: "Биз Билан Боғланинг",
      contact_subtitle: "Ҳар қандай савол ёки йирик харидлар юзасидан мурожаат қолдиринг. Менежерларимиз тезда боғланишади.",
      zone_tag: "ЙЕТКАЗИБ БЕРИШ БИЛАН ТАНИШИНГ",
      zone_title: "Ўзбекистон Бўйлаб Логистика",
      zone_desc: "Бизнинг махсус рефрижераторли автомобилларимиз ҳарорат барқарорлигини таъминлайди ва гўштни янгидек сақлайди.",
      zone_min_ord: "Минимал Буюртма:",
      zone_time: "Етказиш Вақти:",
      zone_coverage: "Қамраб Олинган Ҳудудлар:",
      form_title: "Мурожаат Юбориш Шакли",
      form_name: "Тўлиқ исмингиз ёки компания номи",
      form_phone: "Телефон рақамингиз",
      form_msg: "Хабарингиз ёки буюртмангиз тафсилотлари",
      form_submit: "Аризани Юбориш",
      form_feedback_success: "✓ Раҳмат! Мурожаатингиз қабул қилинди. Тез орада сиз билан боғланамиз.",
      address_title: "Бош Офис Манзили",
      address_loc_1: "Тошкент вил., Қибрай т.",
      address_loc_2: "Чўпонота 23",
      contact_schedule: "Душанба - Якшанба, 24/7",
      map_title: "Бизнинг Манзилимиз Харитада",
      map_p: "Тошкент вил., Қибрай т., Чўпонота 23. Келишдан олдин қўнғироқ қилинг!",
      map_btn: "Yandex.Maps-да очиш",

      // Footer
      footer_desc: "Jabeel - тирик товуқларни сотиб олиш, қайта ишлаш ва сотиш билан шуғулланувчи ишончли корхона. Сифат ва ҳалоллик бизнинг асосий тамойилларимиз.",
      footer_halal: "Сифат ва Ҳалоллик Кафолати",
      footer_quick_links: "Тезкор Ҳаволалар",
      footer_social: "Ижтимоий Тармоқлар",
      footer_social_p: "Бизни ижтимоий тармоқларда кузатиб боринг ва сўнгги янгиликлардан хабардор бўлинг.",
      footer_rights: "МЧЖ JABEEL. Барча ҳуқуқлар ҳимояланган.",
      footer_dev: "томонидан ишлаб чиқарилган",
      lang_select_title: "Тилни танланг"
    },
    ru: {
      // Navbar & General
      brand: "JABEEL",
      premium: "PREMIUM",
      nav_home: "Главная",
      hero_title_p1: "Качественное куриное мясо",
      hero_title_p2: "и Куриные Части",
      hero_subtitle: "Jabeel — это современное предприятие, осуществляющее закупку живой птицы, забой по стандартам Халяль, профессиональную разделку, переработку и поставку готовой свежей продукции.",
      nav_about: "О компании",
      nav_products: "Продукция",
      nav_why_us: "Преимущества",
      nav_contact: "Контакты",
      call: "Позвонить",
      halal_guaranteed: "100% Халяль Сертифицированный Стандарт",
      iso_badge: "Система ISO 22000",
      iso_badge_desc: "Бескомпромиссная безопасность",
      chain_badge: "Быстрая холодная цепь",
      chain_badge_desc: "Стабильно от -2°C до 0°C",
      quality_badge: "Гарантия качества",
      quality_badge_desc: "Сертифицированная продукция",
      view_products: "Продукция",
      organic_badge: "Натуральное питание",
      organic_badge_desc: "Здоровые и натуральные корма",
      organic_tag: "Эко",

      // About
      about_partner: "НАДЕЖНЫЙ ПАРТНЕР",
      about_title: "О нас — Jabeel",
      about_p1: "С 2010 года Jabeel работает на рынке Узбекистана, закупая живую птицу, осуществляя ее забой по стандартам Халяль, переработку, разделку на части и реализацию. Наша главная цель — предоставить каждому клиенту качественное и халяльное куриное мясо.",
      about_p2: "Jabeel владеет современными линиями убоя и переработки. Мы выращиваем и закупаем только здоровых цыплят высокого качества, забиваем их в строгом соответствии с канонами Халяль, профессионально разделываем и упаковываем согласно потребностям рынка.",
      about_p3: "Каждое наше изделие проходит строжайший контроль качества и полностью соответствует международным стандартам. Мы стремимся предлагать только лучшее.",
      mission: "Наша Миссия",
      mission_desc: "Обеспечение каждого покупателя экологически чистым, высокобелковым мясом птицы, на 100% соответствующим стандартам Халяль, в передовых гигиенических условиях.",
      vision: "Наша Цель",
      vision_desc: "Стать абсолютным лидером на рынке Узбекистана по качеству и надежности поставок куриного мяса за счет применения инновационных технологий.",
      promise: "Наше Обещание",
      promise_p1: "Абсолютная чистота и безопасность",
      promise_p2: "Прозрачные оптовые и розничные цены",
      promise_p3: "Честность и невероятно быстрая доставка",

      // Products
      products_tag: "ПРОДУКЦИЯ",
      products_title: "Наша Продукция",
      products_subtitle: "Каждый наш продукт натурален и безупречен. Мы предлагаем лучшее для Вас и Вашей семьи.",
      halal_card: "100% Халяль",
      fresh_frozen: "Охлажденное и Замороженное",
      protein_label: "Белок",
      kkal_label: "Ккал",
      more_info: "Подробнее",

      // Calculator
      calc_icon_title: "Калькулятор Оптового Заказа",
      calc_desc: "Вы являетесь сетью ресторанов, торговой точкой или крупным дистрибьютором? Выберите тип мяса и объем, создайте проект заказа и отправьте его нашему дежурному менеджеру.",
      calc_min: "Минимальный объем заказа — от 5 кг",
      calc_gps: "Контроль холодовой цепи по GPS передатчикам",
      calc_part_title: "Выберите Часть Курицы",
      calc_qty_title: "Объем заказа (кг)",
      calc_pack_title: "Тип упаковки",
      calc_pack_map: "Газовая защитная среда (MAP)",
      calc_pack_vac: "Стандартный вакуумный пакет",
      calc_pack_box: "Крупный оптовый ящик (10кг+)",
      calc_pack_plate: "Легкие пластиковые лотки",
      calc_btn: "Рассчитать Профиль Объема",
      calc_route_label: "Класс логистического маршрута:",
      calc_route_big: "Крупная оптовая холодовая доставка",
      calc_route_small: "Экспресс-доставка автопарком фабрики",
      calc_protein_label: "Чистое количество белка (протеина):",
      calc_protein_kg: "кг чистого белка",
      calc_pack_proj: "Рекомендуемый проект упаковки:",
      calc_temp_label: "Рекомендуемая температура хранения:",
      calc_submit: "Оформить Запрос и Связаться с Менеджером",
      calc_feedback: "✓ Проект заказа успешно сформирован. Перенаправляем вас на форму контактов для завершения...",

      // Modal
      modal_sub: "Сертифицированный Премиум Продукт Птицеводства",
      modal_desc_label: "Описание Продукта",
      modal_protein: "Белок (Протеин)",
      modal_fat: "Пищевой жир",
      modal_calories: "Энергетическая ценность",
      modal_features: "Характеристики / Преимущества",
      modal_logistics: "Рекомендации по логистике и хранению",
      modal_guide: "Рекомендации шеф-повара по готовке",
      modal_close: "Закрыть",
      modal_calc: "Рассчитать объем",

      // Why choose us
      why_tag: "ПРЕИМУЩЕСТВА",
      why_title: "Почему Jabeel?",
      why_p1: "Быстро",
      why_p1_desc: "Заказы доставляются точно в согласованный срок.",
      why_p1_full: "Благодаря отточенной системе внутренней логистики, ваша продукция поступает на кухню или витрину максимально оперативно.",
      why_p2: "Качественно",
      why_p2_desc: "Качество, соответствующее высочайшим мировым стандартам.",
      why_p2_full: "Внедрив систему контроля ISO 22000, мы тщательно проверяем сырье на соответствие всем санитарным требованиям.",
      why_p3: "Халяль",
      why_p3_desc: "100% ручной забой по строгим канонам Халяль.",
      why_p3_full: "Мы гордимся тем, что весь процесс убоя выполняется вручную сертифицированными забойщиками.",

      // Process
      process_tag: "КАК МЫ РАБОТАЕМ",
      process_title: "Этапы Производства",
      process_subtitle: "Достижение безупречного качества за счет высокотехнологичного производства и бережного отношения.",
      process_duration: "Длительность:",

      // Testimonials
      test_tag: "ОТЗЫВЫ ПАРТНЕРОВ",
      test_title: "Наши Клиенты о Нас",
      test_subtitle: "Искренние отзывы шеф-поваров ресторанных сетей и закупщиков супермаркетов.",

      // Contact & Delivery
      contact_tag: "КОНТАКТЫ",
      contact_title: "Связаться с Нами",
      contact_subtitle: "Оставьте заявку по любым вопросам поставок или цен. Наши менеджеры оперативно перезвонят вам.",
      zone_tag: "ЛОГИСТИКА И ЗОНЫ ДОСТАВКИ",
      zone_title: "Логистическая сеть по Узбекистану",
      zone_desc: "Наши специализированные рефрижераторы поддерживают постоянную температуру для идеальной свежести мяса.",
      zone_min_ord: "Минимальный заказ:",
      zone_time: "Срок доставки:",
      zone_coverage: "Зона покрытия:",
      form_title: "Форма Отправки Запроса",
      form_name: "Ваше полное имя или название организации",
      form_phone: "Номер телефона для связи",
      form_msg: "Полное описание вашего заказа или вопроса",
      form_submit: "Отправить запрос",
      form_feedback_success: "✓ Благодарим вас! Ваше обращение успешно получено. Мы свяжемся с вами в ближайшее время.",
      address_title: "Адрес Головного Офиса",
      address_loc_1: "Ташкентская обл., Кибрайский р-н",
      address_loc_2: "ул. Чопонота 23",
      contact_schedule: "Понедельник - Воскресенье, 24/7",
      map_title: "Наше Местоположение на Карте",
      map_p: "Ташкентская обл., Кибрайский р-н, ул. Чопонота 23. Пожалуйста, звоните перед визитом!",
      map_btn: "Открыть Яндекс.Карты",

      // Footer
      footer_desc: "Jabeel — надежное предприятие, специализирующееся на закупке, переработке и реализации живых цыплят. Нашими главными ориентирами выступают бескомпромиссное качество и халяльность.",
      footer_halal: "Гарантия Качества и Халяль",
      footer_quick_links: "Быстрые Ссылки",
      footer_social: "Социальные сети",
      footer_social_p: "Следите за нами в социальных сетях, чтобы первыми получать новости компании.",
      footer_rights: "ООО JABEEL. Все права защищены.",
      footer_dev: "разработано в",
      lang_select_title: "Выберите язык"
    },
    en: {
      // Navbar & General
      brand: "JABEEL",
      premium: "PREMIUM",
      nav_home: "Home",
      hero_title_p1: "Quality Chicken Meat",
      hero_title_p2: "Products Selection",
      hero_subtitle: "Jabeel is a modern compliant enterprise conducting live poultry procurement, manual Islamic slaughtering, professional meat cutting, clean processing, and swift delivery.",
      nav_about: "About Us",
      nav_products: "Products",
      nav_why_us: "Advantages",
      nav_contact: "Contact us",
      call: "Call Us",
      halal_guaranteed: "100% Certified Halal Quality",
      iso_badge: "ISO 22000 Standard",
      iso_badge_desc: "Rigorous food safety",
      chain_badge: "Cold Chain Transport",
      chain_badge_desc: "Stable -2°C to 0°C spectrum",
      quality_badge: "Quality Guarantee",
      quality_badge_desc: "Certified organic products",
      view_products: "Our Products",
      organic_badge: "100% Organic Feeding",
      organic_badge_desc: "Clean grain and veterinary health",
      organic_tag: "Organic",

      // About
      about_partner: "COMPLIANT PARTNER",
      about_title: "About Us — Jabeel",
      about_p1: "Since 2010, Jabeel has been operating on the market of Uzbekistan, purchasing live poultry, performing certified Halal slaughtering, clean sorting, meat cutting, and packaging. Our primary target is supplying top quality and authentic Halal poultry to our consumers.",
      about_p2: "Jabeel possesses highly automated, state-of-the-art slaughtering lines. We select only the healthiest live chickens, proceed with humane Islamic slaughter methods, partition into individual parts, and package according to modern industry guidelines.",
      about_p3: "Every shipment is subjected to laboratory tests and complies with international food standards. We are driven to supply only premium meats.",
      mission: "Our Mission",
      mission_desc: "Delivering ecologically clean, authentic 100% Halal, and high-protein chicken cuts under robust sanitary conditions to our client networks.",
      vision: "Our Ambition",
      vision_desc: "Utilizing modern tech to be the supreme benchmark of quality and reliability in the chicken wholesale market of Uzbekistan.",
      promise: "Our Commitment",
      promise_p1: "Uncompromised hygiene and laboratory testing",
      promise_p2: "Transparent wholesale and contract prices",
      promise_p3: "Honesty and supreme temperature-tracked delivery",

      // Products
      products_tag: "PRODUCTS",
      products_title: "Our Selection",
      products_subtitle: "Every product of ours is wholesome, healthy, and premium. Offering the best choices for you and your family.",
      halal_card: "100% Halal",
      fresh_frozen: "Fresh & Frozen Selection",
      protein_label: "Protein",
      kkal_label: "Calories",
      more_info: "View specifications",

      // Calculator
      calc_icon_title: "Wholesale Quote Builder",
      calc_desc: "Are you a restaurant branch, retailer chain, or bulk distributor? Choose your required poultry cut and aggregate weight, build your order profile, and submit instantly to our sales managers.",
      calc_min: "Minimum order threshold — 5 kg",
      calc_gps: "Full GPS-tracked cold chain dispatch",
      calc_part_title: "Select Chicken Cut",
      calc_qty_title: "Order Weight (kg)",
      calc_pack_title: "Preferred Packaging",
      calc_pack_map: "Modified Atmosphere pack (MAP)",
      calc_pack_vac: "Aseptic vacuum bag",
      calc_pack_box: "Wholesale container carton (10kg+)",
      calc_pack_plate: "Lightweight tray polymer packs",
      calc_btn: "Generate Volume Blueprint",
      calc_route_label: "Logistics routing grade:",
      calc_route_big: "Heavy bulk cold-chain dispatch",
      calc_route_small: "Active local fleet delivery",
      calc_protein_label: "Approximate absolute protein:",
      calc_protein_kg: "kg organic protein equivalent",
      calc_pack_proj: "Recommended packaging plan:",
      calc_temp_label: "Recommended storage temp:",
      calc_submit: "Generate Final Order & Connect with Office Representative",
      calc_feedback: "✓ Order snapshot compiled. Redirecting to our direct office contact wire for confirmation...",

      // Modal
      modal_sub: "Certified Premium Poultry Selection",
      modal_desc_label: "Product Overview",
      modal_protein: "Protein",
      modal_fat: "Natural Fat",
      modal_calories: "Caloric Value",
      modal_features: "Product Features & Attributes",
      modal_logistics: "Handling & Storage Regulations",
      modal_guide: "Chef Recommendations & Culinary Info",
      modal_close: "Close",
      modal_calc: "Calculate volume parameters",

      // Why choose us
      why_tag: "ADVANTAGES",
      why_title: "Why Rely on Jabeel?",
      why_p1: "Express delivery",
      why_p1_desc: "Shipments are dispatched instantly and tracked dynamically.",
      why_p1_full: "With our specialized local cold-chain fleets, your ordered poultry reaches your counters fresh and cold.",
      why_p2: "Standardized",
      why_p2_desc: "Premium quality backed by ISO and international regulations.",
      why_p2_full: "Operating under rigorous ISO 22000 workflows, we monitor all health checkpoints ensuring premium meats.",
      why_p3: "Authentic Halal",
      why_p3_desc: "100% manual slaughter conforming, strict Islamic laws.",
      why_p3_full: "We strictly observe certified manual Islamic slaughtering methods conducted by professionals.",

      // Process
      process_tag: "OUR SYSTEM",
      process_title: "Production Stage Execution",
      process_subtitle: "Securing absolute freshness using state-of-the-art tech and meticulous care at every station.",
      process_duration: "Duration:",

      // Testimonials
      test_tag: "PARTNER VOICES",
      test_title: "Trusted by Modern Chefs & Retailers",
      test_subtitle: "Candid statements from restaurant network executives and supermarket coordinators.",

      // Contact & Delivery
      contact_tag: "CONTACT US",
      contact_title: "Get in Touch With Us",
      contact_subtitle: "Submit any wholesale request, contract offer, or general query. Our corporate representatives will reply quickly.",
      zone_tag: "EXPLORE LOGISTICS MAP",
      zone_title: "Statewide Temperature-Controlled Network",
      zone_desc: "Our specialized cold-chain vehicles preserve fresh textures, ensuring that temperature never breaches 0°C.",
      zone_min_ord: "Minimum Order:",
      zone_time: "Transit Time:",
      zone_coverage: "Territorial coverage:",
      form_title: "Wholesale Contact Request",
      form_name: "Your full catalog name or company title",
      form_phone: "Active mobile contact number",
      form_msg: "Comprehensive details of your prompt query",
      form_submit: "Submit wholesale request",
      form_feedback_success: "✓ Success! Your request has been dispatched. Our team will contact you shortly.",
      address_title: "Headquarters Address",
      address_loc_1: "Tashkent Region, Qibray district",
      address_loc_2: "Choponota street 23",
      contact_schedule: "Monday - Sunday, 24/7 Service",
      map_title: "Our Location on the Map",
      map_p: "Tashkent region, Qibray district, Choponota street 23. Please call us before your visit!",
      map_btn: "Open on Yandex.Maps",

      // Footer
      footer_desc: "Jabeel is a highly trusted enterprise conducting live chicken procurement, Islamic hand-slaughtering, clean cutting, and fast distribution. Premium nutrition is our guiding philosophy.",
      footer_halal: "Quality & Organic Certificate",
      footer_quick_links: "Quick Navigation",
      footer_social: "Social Media Channels",
      footer_social_p: "Follow our social channels to receive prompt notifications, fresh bulletins, and corporate announcements.",
      footer_rights: "JABEEL LLC. All rights reserved.",
      footer_dev: "manufactured by",
      lang_select_title: "Select language"
    }
  };

  const t = (key: string): string => {
    return dicts[language]?.[key] || dicts['uz']?.[key] || key;
  };

  // Dynamic translated records list structures
  const stats = [
    { value: '30 000+', label: language === 'uz' ? 'Kunlik Tovuq' : language === 'oz' ? 'Кунлик Товуқ' : language === 'ru' ? 'Куриц в день' : 'Chickens Daily', desc: t('iso_badge_desc') },
    { value: '500+', label: language === 'uz' ? 'Mamnun Mijozlar' : language === 'oz' ? 'Мамнун Мижозлар' : language === 'ru' ? 'Довольных клиентов' : 'Satisfied Clients', desc: t('about_partner') },
    { value: '100+', label: language === 'uz' ? "Do'kon Hamkorlari" : language === 'oz' ? 'Дўкон Ҳамкорлари' : language === 'ru' ? 'Магазинов-партнеров' : 'Store Partners', desc: t('premium') },
    { value: '100+', label: language === 'uz' ? 'Ishchi Xodimlar' : language === 'oz' ? 'Ишчи Ходимлар' : language === 'ru' ? 'Сотрудников' : 'Active Employees', desc: t('halal_guaranteed') },
    { value: '24/7', label: language === 'uz' ? 'Ish Vaqtimiz' : language === 'oz' ? 'Иш Вақтимиз' : language === 'ru' ? 'Режим работы' : 'Operational Hours', desc: t('contact_schedule') },
  ];

  const products: Product[] = [
    {
      id: 'fillet',
      name: language === 'en' ? 'Chicken Fillet' : language === 'ru' ? 'Куриное Филе' : language === 'oz' ? 'Товуқ Филеси' : 'Tovuq Filesi',
      description: language === 'en' ? "Premium chicken breast meat without bones and skin. Low fat, high protein content, extremely tender and delicious." : language === 'ru' ? "Грудная часть курицы без костей и кожи. Диетический продукт с высоким содержанием белка, нежный и невероятно вкусный." : language === 'oz' ? "Товуқнинг кўкрак қисми гўшти, суяк ва терисиз. Диетик ва юқори оқсил таркибига эга. Жудаям нозик ва лаззатли." : "Tovuqning ko'krak qismi go'shti, suyak va terisiz. Dietik va yuqori oqsil tarkibiga ega. Judayam nozik va lazzatli.",
      image: chickenFillet,
      protein: '23.1g / 100g',
      fat: '1.2g / 100g',
      calories: language === 'en' ? '110 kcal / 100g' : '110 kkal / 100g',
      packagingTypes: language === 'en' ? ['Light — low fat', 'Tender — quick cooking', 'Dietary — healthy lifestyle'] : language === 'ru' ? ['Легкий — пониженная жирность', 'Нежный — быстро готовится', 'Диетический — здоровый выбор'] : language === 'oz' ? ['Енгил — ёғи кам', 'Нозик — тез пишади', 'Диетик — соғлом овқатланиш учун'] : ['Yengil — yog\'i kam', 'Nozik — mayda va tez pishadi', 'Dietik — sog\'lom ovqatlanish uchun'],
      temperatureRange: language === 'en' ? '0°C to -2°C (Chilled) / -18°C (Frozen)' : '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
      cookingSuggestions: language === 'en' ? "Perfect choice for grilling, fresh salads, and healthy diet meals." : language === 'ru' ? "Идеальный выбор для гриля, свежих салатов и диетического меню." : language === 'oz' ? "Грильда пишириш, салатлар ва соғлом парҳез таомлари учун энг яхши танлов." : "Grilda pishirish, salatlar va sog'lom parhez taomlari uchun eng yaxshi tanlov.",
    },
    {
      id: 'wings',
      name: language === 'en' ? 'Chicken Wings' : language === 'ru' ? 'Куриные Крылышки' : language === 'oz' ? 'Товуқ Қанотлари' : 'Tovuq Qanotlari',
      description: language === 'en' ? "Highly popular and appetizing selection. Though smaller in meat size, their higher fat content yields an incredibly juicy and aromatic taste." : language === 'ru' ? "Популярное аппетитное блюдо. Мясо хоть и небольшое по объему, но благодаря жирности получается очень сочным и нежным." : language === 'oz' ? "Жуда машҳур ва мазали таом. Гўшти майда, лекин ёғлироқ бўлгани учун жуда ширали ва ҳушбўй." : "Juda mashhur va mazali taom. Go'shti mayda, lekin yog'liroq bo'lgani uchun juda shirali va hushbo'y.",
      image: chickenWings,
      protein: '19.2g / 100g',
      fat: '8.1g / 100g',
      calories: language === 'en' ? '158 kcal / 100g' : '158 kkal / 100g',
      packagingTypes: language === 'en' ? ['Juicy — rich and compact', 'Tender — soft cuts', 'Aromatic — nice scent'] : language === 'ru' ? ['Сочные — мелкие, но питательные', 'Нежные — мягкие ребра', 'Ароматные — душистые специи'] : language === 'oz' ? ['Ширали — майда, лекин ёғли', 'Нозик — юмшоқ ва енгил', 'Ҳушбўй — ёқимли ҳид'] : ['Shirali — mayda, lekin yog\'i', 'Nozik — yumshoq va yengil', 'Hushboy — yoqimli hid'],
      temperatureRange: language === 'en' ? '0°C to -1.5°C (Chilled) / -18°C (Frozen)' : '0°C dan -1.5°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
      cookingSuggestions: language === 'en' ? "Superb for deep-frying, baking in ovens, and glazing with sauce." : language === 'ru' ? "Прекрасно подходят для духовки, гриля и острых соусов." : language === 'oz' ? "Грильда, духовкада ва ҳар хил соуслар билан пиширишга жуда мос." : "Grilda, duxovkada va har xil souslar bilan pishirishga juda mos.",
    },
    {
      id: 'legs',
      name: language === 'en' ? 'Chicken Drumsticks' : language === 'ru' ? 'Куриная Голень' : language === 'oz' ? 'Товуқ Болдири' : 'Tovuq Boldiri',
      description: language === 'en' ? "One of the most beloved and flavorful cuts. The drumstick meat is juicy, deeply rich, tender, and detaches easily from the bone." : language === 'ru' ? "Одна из самых любимых частей курицы. Мясо сочное, с глубоким насыщенным вкусом, легко отделяется от кости." : language === 'oz' ? "Товуқнинг энг мазали қисмларидан бири. Гўшти ширали, бой таъмли ва юмшоқ. Суякдан осон ажралади." : "Tovuqning eng mazali qismlaridan biri. Go'shti shirali, boy ta'mli va yumshoq. Suyakdan oson ajraladi.",
      image: chickenLegs,
      protein: '18.4g / 100g',
      fat: '5.9g / 100g',
      calories: language === 'en' ? '135 kcal / 100g' : '135 kkal / 100g',
      packagingTypes: language === 'en' ? ['Juicy — hearty fats', 'Flavorful — deeper meat', 'Soft — easy bone separation'] : language === 'ru' ? ['Сочные — классическое мясо', 'Душистые — насыщенный цвет', 'Нежные — легко отходят от костей'] : language === 'oz' ? ['Ширали — кўпроқ ёғли', 'Бой таъмли — тўқ рангли', 'Юмшоқ — суякдан осон ажралади'] : ['Shirali — ko\'proq yog\'li', 'Boy ta\'mli — to\'q rangli', 'Yumshoq — suyakdan oson ajraladi'],
      temperatureRange: language === 'en' ? '0°C to -2°C (Chilled) / -18°C (Frozen)' : '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
      cookingSuggestions: language === 'en' ? "Highly versatile for frying, oven-baking, roasting, and stews." : language === 'ru' ? "Отлично для жарки, запекания, варки бульонов и тушения." : language === 'oz' ? "Пишириш, қовуриш ва димлаш усуллари учун жуда мос келади." : "Pishirish, qovurish va dimlash usullari uchun juda mos keladi.",
    },
    {
      id: 'thigh',
      name: language === 'en' ? 'Chicken Thighs' : language === 'ru' ? 'Куриное Бедро' : language === 'oz' ? 'Товуқ Бедроси' : 'Tovuq Bedrosi',
      description: language === 'en' ? "The rich upper portion of the chicken leg. Well-marbled, highly tender, and exceptionally juicy meat." : language === 'ru' ? "Верхняя мясистая часть окорочка. Очень насыщенное, нежное и чрезвычайно сочное красное мясо." : language === 'oz' ? "Товуқнинг оёқ қисмидаги юқори гўштли қисми. Жуда ширин, мулойим ва ўта ширали гўшт." : "Tovuqning oyoq qismidagi yuqori go'shtli qismi. Juda shirin, muloyim va o'ta shirali go'sht.",
      image: chickenThighs,
      protein: '18.1g / 100g',
      fat: '6.2g / 100g',
      calories: language === 'en' ? '128 kcal / 100g' : '128 kkal / 100g',
      packagingTypes: language === 'en' ? ['Sweet & exceptionally juicy', 'Dynamic culinary partner', 'Soft structural cuts'] : language === 'ru' ? ['Нежное и сладковатое мясо', 'Идеально для пряных маринадов', 'Мягкое бескостное филе'] : language === 'oz' ? ['Жуда ширин ва ширали', 'Нордон-ширин таъмли', 'Юмшоқ гўшт'] : ['Juda shirin va shirali', 'Nordon-shirin ta\'mli — maza zo\'r', 'Yumshoq go\'sht'],
      temperatureRange: language === 'en' ? '0°C to -2°C (Chilled) / -18°C (Frozen)' : '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
      cookingSuggestions: language === 'en' ? "Best suited for slow-cooking, skewered kebabs, and stews." : language === 'ru' ? "Идеально подходит для запекания, сытного рагу и шашлыка." : language === 'oz' ? "Санчқи ва пишириқлар учун жуда мос ҳамда сувли гўшт." : "Sanchqi va pishiriqlar uchun juda mos hamda suvli go'sht.",
    },
    {
      id: 'quarters',
      name: language === 'en' ? 'Chicken Leg Quarters' : language === 'ru' ? 'Куриный Окорочок' : language === 'oz' ? 'Товуқ Окорочкаси' : 'Tovuq Okorochkasi',
      description: language === 'en' ? "The traditional cut combining thigh and drumstick. Juicy, versatile dark meat that makes a hearty, generous option." : language === 'ru' ? "Целая задняя четвертина, соединяющая бедро и голень. Мягкое мясо, подходящее для большинства домашних блюд." : language === 'oz' ? "Товуқнинг сон ва болдир қисми. Гўшти юмшоқ, ширин ва турли усулларда тайёрлаш мумкин бўлган универсаллик." : "Tovuqning son va boldir qismi. Go'shti yumshoq, shirin va turli usullarda tayyorlash mumkin bo'lgan universallik.",
      image: chickenQuarters,
      protein: '18.5g / 100g',
      fat: '5.8g / 100g',
      calories: language === 'en' ? '140 kcal / 100g' : '140 kkal / 100g',
      packagingTypes: language === 'en' ? ['Hearty and sweet cuts', 'Crispy skin when oven roasted', 'Universal domestic companion'] : language === 'ru' ? ['Сытное мягкое мясо', 'Хрустящая корочка при запекании', 'Универсальное применение'] : language === 'oz' ? ['Юмшоқ ва ширин гўшт', 'Тери қисми қовурилганда қарсиллайдиган', 'Кўп хил усулда тайёрланади'] : ['Yumshoq va shirin go\'sht', 'Teri qismi qovurilganda qarsillaydigan', 'Ko\'p xil usulda tayyorlanadi'],
      temperatureRange: language === 'en' ? '0°C to -2°C (Chilled) / -18°C (Frozen)' : '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
      cookingSuggestions: language === 'en' ? "Highly recommended for budget-friendly big roasts and oven baking." : language === 'ru' ? "Рекомендуется для запекания в духовке или быстрой обжарки на сковороде." : language === 'oz' ? "Духовкада қизартириб пишириш ёки қозонда қовуриш учун тавсия этилади." : "Duxovkada qizartirib pishirish yoki qozonda qovurish uchun tavsiya etiladi.",
    },
    {
      id: 'whole',
      name: language === 'en' ? 'Whole Chicken' : language === 'ru' ? 'Целая Курица' : language === 'oz' ? 'Бутун Товуқ' : 'Butun Tovuq',
      description: language === 'en' ? "Full cleaned broiler chicken. Ideal, traditional, and generous selection for festive dinners and family gatherings." : language === 'ru' ? "Цельная потрошеная тушка цыпленка. Лучший гостеприимный вариант для праздников и семейных обедов." : language === 'oz' ? "Тўлиқ (кесилмаган) товуқ. Байрамлар, оилавий тушликлар ёки меҳмонлар учун энг яхши ва баракали вариант." : "To'liq (kesilmagan) tovuq. Bayramlar, oilaviy tushliklar yoki mehmonlar uchun eng yaxshi va barakali variant.",
      image: wholeChicken,
      protein: '18.6g / 100g',
      fat: '7.8g / 100g',
      calories: language === 'en' ? '144 kcal / 100g' : '144 kkal / 100g',
      packagingTypes: language === 'en' ? ['Superb caliber for ovens', 'Aromatic clay-oven friendly', 'Simmered or grilled whole'] : language === 'ru' ? ['Удобный средний калибр', 'Идеально для цыпленка табака', 'Для запекания целиком'] : language === ' oz' ? ['Духовкада пишириш учун қулай', 'Тандирда мазали ҳид билан', 'Қозонда дамлаб ёки грильда'] : ['Duxovkada pishirish uchun qulay', 'Tandirda mazali hid bilan', 'Qozonda damlab yoki grilda'],
      temperatureRange: language === 'en' ? '0°C to -1°C (Chilled) / -18°C (Frozen)' : '0°C dan -1°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
      cookingSuggestions: language === 'en' ? "Excellent for whole marination, rotisserie clay ovens, or big family soups." : language === 'ru' ? "Прекрасно подходит для запекания целиком в маринаде или приготовления цыпленка табака." : language === 'oz' ? "Духовкада бутунлигича маринадлаб пишириш ёки тандир товуқ қилиш тавсия этилади." : "Duxovkada butunligicha marinadlab pishirish yoki tandir tovuq qilish tavsiya etiladi.",
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: language === 'en' ? 'Supervised Farming' : language === 'ru' ? 'Контролируемое выращивание' : language === 'oz' ? 'Назорат Остидаги Етиштириш' : 'Nazorat Ostidagi Yetishtirish',
      description: language === 'en' ? 'Eco-safe biosecure organic poultry farms under strict veterinary observation.' : language === 'ru' ? 'Современные биозащищенные птицехозяйства под строгим ветеринарным инспекционным контролем.' : language === 'oz' ? 'Табиий дон билан озиқлантирилган ва қаттиқ ветеринария назорати остида бўлган замонавий хўжаликлар.' : 'Tabiiy don bilan oziqlantirilgan va qattiq veterinariya nazorati ostida bo\'lgan zamonaviy, bio-himoyalangan parrandachilik xo\'jaliklari.',
      longDescription: language === 'en' ? 'Our farms are certified with ISO 22000 and HACCP. We do not use growth hormones, feeding our broilers with 100% natural, vegetarian grain feed formulas.' : language === 'ru' ? 'Наши фермы соответствуют стандартам HACCP и ISO 22000. В рационе птицы только экологические зерновые смеси без добавления искусственных стимуляторов роста.' : language === 'oz' ? 'Хўжаликларимиз HACCP ва ISO 22000 стандартларига мос келади. Биз гўшт сифатини ошириш учун ҳеч қандай сунъий моддаларсиз, 100% табиий донлардан фойдаланамиз.' : 'Bizning xo\'jaliklarimiz xalqaro HACCP va ISO 22000 standartlariga mos keladi. Biz hech qanday sun\'iy o\'sish gormonlarisiz, faqat 100% tabiiy va sifatli don aralashmalari bilan boqish tizimini qo\'llaymiz.',
      duration: language === 'en' ? 'Continuous lifecycle' : language === 'ru' ? 'Постоянный мониторинг' : language === 'oz' ? 'Доимий Назорат' : 'Doimiy Nazorat',
      iconName: 'Warehouse',
    },
    {
      id: 2,
      title: language === 'en' ? 'Supreme Quality Controls' : language === 'ru' ? 'Контроль высшего качества' : language === 'oz' ? 'Юқори Сифат Назорати' : 'Yuqori Sifat Nazorati',
      description: language === 'en' ? 'Multi-tiered lab monitoring checking pH status, moisture levels, microflora and layout norms.' : language === 'ru' ? 'Многоступенчатый лабораторный экспресс-анализ уровня pH, влажности, микрофлоры и стандартов разделки.' : language === 'oz' ? 'рН даражаси, намлик ва нимталаш стандартларини текширувчи кўп босқичли лаборатория таҳлиллари.' : 'pH darajasi, namlik, mikroflora va nimtalash standartlarini tekshiruvchi ko\'p bosqichli laboratoriya tahlillari.',
      longDescription: language === 'en' ? 'Every batch undergoes dual review setups: optoelectronic sensors supervise cut precision, while veterinary doctors double-check temperature safety metrics.' : language === 'ru' ? 'Каждая партия проходит двойной инспекционный барьер: электронные детекторы регулируют точность нарезки, а сертифицированные врачи верифицируют температурный режим.' : language === 'oz' ? 'Ҳар бир партия икки томонлама текширувдан ўтади: оптик датчиклар кесишни назорат қилса, шифокорлар гигиена ва ҳароратни кузатади.' : 'Har bir ishlab chiqarilayotgan partiya ikki tomonlama tekshiruvdan o\'tadi: optik datchiklar kesish aniqligini nazorat qilsa, sertifikatlangan mutaxassislar go\'sht harorati va gigiyena talablarini sinchiklab tekshiradi.',
      duration: language === 'en' ? '< 15 mins on conveyor' : language === 'ru' ? '< 15 мин на конвейере' : language === 'oz' ? '< 15 дақиқа конвейердан' : '< 15 daqiqa konveyerdan',
      iconName: 'ShieldCheck',
    },
    {
      id: 3,
      title: language === 'en' ? 'Modified Atmosphere (MAP)' : language === 'ru' ? 'Газовая среда (MAP)' : language === 'oz' ? 'Газ Муҳитли Қадоқлаш (MAP)' : 'Gaz Muhitli Qadoqlash (MAP)',
      description: language === 'en' ? 'Chemical-free natural food preservative packaging protecting meat textures for up to 12 days.' : language === 'ru' ? 'Передовая бесхимическая технология хранения, сохраняющая свежесть мяса без консервантов до 12 дней.' : language === 'oz' ? 'Маҳсулотларни кимёвий консервантларсиз, табиий равишда 12 кунгача янги сақлайдиган илғор MAP технологияси.' : 'Mahsulotlarni kimyoviy konservantlarsiz, tabiiy ravishda 12 kungacha yangi saqlaydigan ilg\'or MAP texnologiyasi.',
      longDescription: language === 'en' ? 'Ordinary air of the pack is substituted with non-harmful natural atmosphere elements (nitrogen/CO2), keeping natural pink colors and moisture levels intact.' : language === 'ru' ? 'Воздух внутри упаковки замещается смесью инертных пищевых газов (азот и углекислый газ), что останавливает размножение микроорганизмов и сохраняет сочность.' : language === 'oz' ? 'Қадоқ ичидаги ҳаво зарарсиз озиқ-овқат гази (азот ва СО2) билан алмаштирилади. Бу гўштнинг ранги ва таъмини узоқ сақлайди.' : 'Qadoq ichidagi havo xavfsiz oziq-ovqat gazi (azot va CO2) bilan almashtiriladi. Bu jarayon go\'shtning rangi, shiraliligi va ta\'mini tabiiy ravishda saqlaydi hamda mahsulotning buzilishini sekinlashtiradi.',
      duration: language === 'en' ? 'Instantly after cutting' : language === 'ru' ? 'Сразу после разделки' : language === 'oz' ? 'Кесилгандан сўнг дарҳол' : 'Kesilgandan so\'ng darhol',
      iconName: 'PackageOpen',
    },
    {
      id: 4,
      title: language === 'en' ? 'GPS-tracked Cold Logistics' : language === 'ru' ? 'GPS Холодная Логистика' : language === 'oz' ? 'Тезкор Совуқ Занжирли Йетказиш' : 'Tezkor Sovuq Zanjirli Yetkazish',
      description: language === 'en' ? 'Modern refrigerated vehicles maintaining strict temperature thresholds inside cargo holds.' : language === 'ru' ? 'Собственный парк современных рефрижераторов, поддерживающих температуру строго от -2°C до 0°C.' : language === 'oz' ? 'Ҳарорат -2°C ва 0°C оралиғида барқарор сақланадиган махсус совутгичли автомобиллар флоти.' : 'Harorat -2°C va 0°C oralig\'ida barqaror saqlanadigan maxsus sovutgichli avtomobillar floti.',
      longDescription: language === 'en' ? 'Continuous telemetry streams direct environmental tracking figures. This prevents the cold preservation chain from breaking until drop-off point.' : language === 'ru' ? 'Наши диспетчеры в реальном времени мониторят датчики температуры в фургонах. Холодовая цепь гарантированно не прерывается до передачи клиенту.' : language === 'oz' ? 'Логистика бўлимимиз транспорт ичидаги ҳароратни GPS орқали кузатади. Совуқ занжир бутун йўл давомида узилмайди.' : 'Bizning logistika dispetcherlarimiz transport ichidagi haroratni jonli GPS datchiklari orqali kuzatib borishadi. Savdo nuqtasi yoki restoranga yetib borishigacha sovuqlik zanjiri uzilmasi ta\'minlanadi.',
      duration: language === 'en' ? 'Same-day delivery (Tashkent)' : language === 'ru' ? 'В день заказа (по Ташкенту)' : language === 'oz' ? 'Буюртма куни (Тошкентда)' : 'Buyurtma kuni (Toshkentda)',
      iconName: 'Truck',
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 't1',
      name: 'Jamshid Alimov',
      role: language === 'en' ? 'Executive Chef' : language === 'ru' ? 'Шеф-повар' : language === 'oz' ? 'Бош ошпаз' : 'Bosh oshpaz',
      company: 'Anor Restaurant Group',
      text: language === 'en' ? "Jabeel's premium chicken lines elevated our dining quality. The fillets do not leak excess water upon grilling, and texture remains juicy. Highly appraised by our regular guests." : language === 'ru' ? "Куриная продукция Jabeel подняла качество наших блюд на новый уровень. При жарке филе не теряет сок, мясо нежнейшее. Наши гости в восторге от куриного меню." : language === 'oz' ? "Jabeel Премиум товуқ маҳсулотлари бизнинг таомлар сифатини янги даражага кўтарди. Филе қовурилганда сув йўқотмайди, гўшти жуда майин." : 'Jabeel Premium tovuq mahsulotlari bizning taomlar sifatini mutlaqo many yangi darajaga ko\'tardi. File qovurilganda suv ajratmaydi, go\'shti nihoyatda mayin. Mehmonlarimiz tovuqli taomlardan juda mamnun.',
      rating: 5,
      date: language === 'en' ? 'May 2026' : language === 'ru' ? 'Май 2026' : 'May 2026',
    },
    {
      id: 't2',
      name: 'Elena Petrova',
      role: language === 'en' ? 'Purchasing Manager' : language === 'ru' ? 'Руководитель отдела закупок' : language === 'oz' ? 'Харидлар бўлими мудири' : 'Xaridlar bo\'limi mudiri',
      company: 'Korzinka Supermarkets',
      text: language === 'en' ? "For retail markets, packaging durability and shelf life are vital. Jabeel's MAP-sealed vacuum options maintain gorgeous natural colors and stay perfectly fresh." : language === 'ru' ? "Для наших супермаркетов свежесть и защищенность упаковки — 핵심 приоритет. Технология MAP газирования от Jabeel надолго сохраняет товарный вид мяса." : language === 'oz' ? "Супермаркетларимиз учун гўштнинг янги туриши ва қадоқ сифати жуда муҳим. Jabeel компаниясининг махсус қадоқлари узоқ муддат сақланишни таъминлайди." : 'Supermarketlarimiz uchun go\'shtning yangi turishi va mustahkam qadoqlanishi eng muhim omildir. Jabeel kompaniyasining maxsus gaz va vakuumli qadoqlari go\'shtni uzoq vaqt haroratini saqlab, yangidek yetkazadi.',
      rating: 5,
      date: language === 'en' ? 'April 2026' : language === 'ru' ? 'Апрель 2026' : 'Aprel 2026',
    },
    {
      id: 't3',
      name: 'Sardor Rahimov',
      role: language === 'en' ? 'Wholesale Distributor' : language === 'ru' ? 'Оптовый дистрибьютор' : language === 'oz' ? 'Улгуржи етказиб берувчи' : 'Ulgurji yetkazib beruvchi',
      company: 'ExpressFood LLC',
      text: language === 'en' ? "We place multiton orders of whole chickens daily. Calibers are identical, and most importantly, both Halal status and health certificates are 100% compliant. Recommended to businesses." : language === 'ru' ? "Мы заказываем целые тушки тоннами ежедневно. Калибровка птицы идеальная, а главное — соблюдение стандартов Халяль и санитарных норм на 100%. Очень рекомендую." : language === 'oz' ? "Биз ҳар куни тонналаб бутун товуқларни буюртма қиламиз. Маҳсулотларни калибрланиши аниқ ва энг асосийси Ҳалол сертификати бор." : 'Biz har kuni tonnalab butun tovuqlarni ulgurji buyurtma qilamiz. Mahsulotlarning kalibrlanishi aniq, eng asosiysi Halol sertifikati va gigiyena talablari 100% bajariladi. Barcha korxonalarga tavsiya etaman.',
      rating: 5,
      date: language === 'en' ? 'May 2026' : language === 'ru' ? 'Май 2026' : 'May 2026',
    }
  ];

  const deliveryZones: DeliveryZone[] = [
    {
      id: 'zone-1',
      name: language === 'en' ? 'Tashkent City (All districts)' : language === 'ru' ? 'Город Ташкент (Все районы)' : language === 'oz' ? 'Тошкент шаҳри (Барча туманлар)' : 'Toshkent shahri (Barcha tumanlar)',
      minOrder: language === 'en' ? '5 Kilograms' : '5 Kilogramm',
      deliveryTime: language === 'en' ? 'Within 2 hours' : '2 soat ichida',
      coverage: language === 'en' ? 'Yunusabad, Chilanzar, Mirzo Ulugbek, Yakkasaray, Sergeli, Shaykhantahur, Almazar, and others.' : language === 'ru' ? 'Юнусабад, Чиланзар, Мирзо-Улугбек, Яккасарай, Сергели, Шайхантахур, Алмазар и др.' : language === 'oz' ? 'Юнусобод, Чилонзор, Мирзо Улуғбек, Яккасарой, Сергели, Шайхонтоҳур, Олмазор ва бошқалар.' : 'Yunusobod, Chilonzor, Mirzo Ulug\'bek, Yakkasaroy, Sergeli, Shayxontohur, Olmazor va boshqalar.',
      color: 'border-orange-500 bg-orange-50/50',
    },
    {
      id: 'zone-2',
      name: language === 'en' ? 'Tashkent Region' : language === 'ru' ? 'Ташкентская область' : language === 'oz' ? 'Тошкент вилояти' : 'Toshkent viloyati',
      minOrder: language === 'en' ? '15 Kilograms' : '15 Kilogramm',
      deliveryTime: language === 'en' ? 'Same day (If ordered before 12:00)' : language === 'ru' ? 'В тот же день (при заказе до 12:00)' : language === 'oz' ? 'Ўша куннинг ўзида (12:00 гача буюртма қилинса)' : 'O\'sha kunning o\'zida (12:00 gacha buyurtma qilinsa)',
      coverage: language === 'en' ? 'Qibray, Chirchiq, Yangiyul, Parkent, Angren, Toytepa, and nearby districts.' : language === 'ru' ? 'Кибрай, Чирчик, Янгиюль, Паркент, Ангрен, Тойтепа и ближайшие районы.' : language === 'oz' ? 'Қибрай, Чирчиқ, Янгийўл, Паркент, Ангрен, Тўйтепа ва яқин туманлар' : 'Qibray, Chirchiq, Yangiyo\'l, Parkent, Angren, To\'ytepa va yaqin tumanlar',
      color: 'border-slate-300 bg-slate-50/50',
    },
    {
      id: 'zone-3',
      name: language === 'en' ? 'Statewide Bulk Delivery' : language === 'ru' ? 'Оптовая доставка по Республике' : language === 'oz' ? 'Республика бўйлаб улгуржи етказиб бериш' : 'Respublika bo\'ylab ulgurji yetkazib berish',
      minOrder: language === 'en' ? '500 Kilograms (Bulk)' : '500 Kilogramm (Ulgurji)',
      deliveryTime: language === 'en' ? 'Scheduled (Within 24-48 hours)' : language === 'ru' ? 'В согласованное время (в течение 24-48 часов)' : language === 'oz' ? 'Келишилган вақтда (24-48 соат ичида)' : 'Kelisilgan vaqtda (24-48 soat ichida)',
      coverage: language === 'en' ? 'Samarkand, Bukhara, Andijan, Namangan, Fergana, Navoi, Qarshi, and other primary cities.' : language === 'ru' ? 'Самарканд, Бухара, Андижан, Наманган, Фергана, Навои, Карши и другие крупные города.' : language === 'oz' ? 'Самарқанд, Бухоро, Андижон, Наманган, Фарғона, Навоий, Қарши ва бошқа шаҳарлар' : 'Samarqand, Buxoro, Andijon, Namangan, Farg\'ona, Navoiy, Qarshi va boshqa shaharlar',
      color: 'border-orange-200 bg-slate-50/50',
    }
  ];

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      stats,
      products,
      processSteps,
      testimonials,
      deliveryZones
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
