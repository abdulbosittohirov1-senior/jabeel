import heroChicken from './assets/images/hero_chicken_1780578786535.png';
import chickenFillet from './assets/images/chicken_fillet_1780578811815.png';
import chickenWings from './assets/images/chicken_wings_1780578831353.png';
import chickenLegs from './assets/images/chicken_legs_1780578850167.png';
import chickenThighs from './assets/images/chicken_thighs_1780580663429.png';
import chickenQuarters from './assets/images/chicken_quarters_1780580684866.png';
import wholeChicken from './assets/images/whole_chicken_1780578878080.png';

import { Product, Testimonial, ProcessStep, DeliveryZone } from './types.ts';

export { heroChicken };

export const STATS = [
  { value: '30 000+', label: 'Kunlik Tovuq', desc: 'Zamonaviy texnologiyalar bilan qayta ishlanadigan kunlik tovuq hajmi' },
  { value: '500+', label: 'Mamnun Mijozlar', desc: 'Sifatimizga ishonch bildirgan va doimiy hamkorlik qilayotgan mijozlarimiz' },
  { value: '100+', label: 'Do\'kon Hamkorlari', desc: 'Bizning yangi tovuq go\'shtlarimiz tarqatiladigan nuqtalar va supermarketlar' },
  { value: '100+', label: 'Ishchi Xodimlar', desc: 'Har kuni siz uchun halol va sifatli tovuq go\'shtini tayyorlaydigan professionallar' },
  { value: '24/7', label: 'Ish Vaqtimiz', desc: 'Uzluksiz ishlab chiqarish va istalgan vaqtda buyurtmalarni qabul qilish xizmati' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'fillet',
    name: 'Tovuq Filesi',
    description: 'Tovuqning ko\'krak qismi go\'shti, suyak va terisiz. Dietik va yuqori oqsil tarkibiga ega. Judayam nozik va lazzatli.',
    image: chickenFillet,
    protein: '23.1g / 100g',
    fat: '1.2g / 100g',
    calories: '110 kkal / 100g',
    packagingTypes: ['Yengil — yog\'i kam', 'Nozik — mayda va tez pishadi', 'Dietik — sog\'lom ovqatlanish uchun'],
    temperatureRange: '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
    cookingSuggestions: 'Grilda pishirish, salatlar va sog\'lom parhez taomlari uchun eng yaxshi tanlov.',
  },
  {
    id: 'wings',
    name: 'Tovuq Qanotlari',
    description: 'Juda mashhur va mazali taom. Go\'shti mayda, lekin yog\'liroq bo\'lgani uchun juda shirali va hushbo\'y.',
    image: chickenWings,
    protein: '19.2g / 100g',
    fat: '8.1g / 100g',
    calories: '158 kkal / 100g',
    packagingTypes: ['Shirali — mayda, lekin yog\'li', 'Nozik — yumshoq va yengil', 'Hushboy — yoqimli hid'],
    temperatureRange: '0°C dan -1.5°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
    cookingSuggestions: 'Grilda, duxovkada va har xil souslar bilan pishirishga juda mos.',
  },
  {
    id: 'legs',
    name: 'Tovuq Boldiri',
    description: 'Tovuqning eng mazali qismlaridan biri. Go\'shti shirali, boy ta\'mli va yumshoq. Suyakdan oson ajraladi.',
    image: chickenLegs,
    protein: '18.4g / 100g',
    fat: '5.9g / 100g',
    calories: '135 kkal / 100g',
    packagingTypes: ['Shirali — ko\'proq yog\'li', 'Boy ta\'mli — to\'q rangli', 'Yumshoq — suyakdan oson ajraladi'],
    temperatureRange: '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
    cookingSuggestions: 'Pishirish, qovurish va dimlash usullari uchun juda mos keladi.',
  },
  {
    id: 'thigh',
    name: 'Tovuq Bedrosi',
    description: 'Tovuqning oyoq qismidagi yuqori go\'shtli qismi. Juda shirin, muloyim va o\'ta shirali go\'sht.',
    image: chickenThighs,
    protein: '18.1g / 100g',
    fat: '6.2g / 100g',
    calories: '128 kkal / 100g',
    packagingTypes: ['Juda shirin va shirali', 'Nordon-shirin ta\'mli — maza zo\'r', 'Yumshoq go\'sht'],
    temperatureRange: '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
    cookingSuggestions: 'Sanchqi va pishiriqlar uchun juda mos hamda suvli go\'sht.',
  },
  {
    id: 'quarters',
    name: 'Tovuq Okorochkasi',
    description: 'Tovuqning son va boldir qismi. Go\'shti yumshoq, shirin va turli usullarda tayyorlash mumkin bo\'lgan universallik.',
    image: chickenQuarters,
    protein: '18.5g / 100g',
    fat: '5.8g / 100g',
    calories: '140 kkal / 100g',
    packagingTypes: ['Yumshoq va shirin go\'sht', 'Teri qismi qovurilganda qarsillaydigan', 'Ko\'p xil usulda tayyorlanadi'],
    temperatureRange: '0°C dan -2°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
    cookingSuggestions: 'Duxovkada qizartirib pishirish yoki qozonda qovurish uchun tavsiya etiladi.',
  },
  {
    id: 'whole',
    name: 'Butun Tovuq',
    description: 'To\'liq (kesilmagan) tovuq. Bayramlar, oilaviy tushliklar yoki mehmonlar uchun eng yaxshi va barakali variant.',
    image: wholeChicken,
    protein: '18.6g / 100g',
    fat: '7.8g / 100g',
    calories: '144 kkal / 100g',
    packagingTypes: ['Duxovkada pishirish uchun qulay', 'Tandirda mazali hid bilan', 'Qozonda damlab yoki grilda'],
    temperatureRange: '0°C dan -1°C gacha (Sovutilgan) / -18°C (Muzlatilgan)',
    cookingSuggestions: 'Duxovkada butunligicha marinadlab pishirish yoki tandir tovuq qilish tavsiya etiladi.',
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
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

export const TESTIMONIALS: Testimonial[] = [
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
    name: 'Elena Petrova',
    role: 'Xaridlar bo\'limi mudiri',
    company: 'Korzinka supermarketlar tarmog\'i',
    text: 'Supermarketlarimiz uchun go\'shtning yangi turishi va mustahkam qadoqlanishi eng muhim omildir. Jabeel kompaniyasining maxsus gaz va vakuumli qadoqlari go\'shtni uzoq vaqt haroratini saqlab, yangidek yetkazadi.',
    rating: 5,
    date: 'Aprel 2026',
  },
  {
    id: 't3',
    name: 'Sardor Rahimov',
    role: 'Ulgurji yetkazib beruvchi',
    company: 'ExpressFood LLC',
    text: 'Biz har kuni tonnalab butun tovuqlarni ulgurji buyurtma qilamiz. Mahsulotlarning kalibrlanishi aniq, eng asosiysi Halol sertifikati va gigiyena talablari 100% bajariladi. Barcha korxonalarga tavsiya etaman.',
    rating: 5,
    date: 'May 2026',
  }
];

export const DELIVERY_ZONES: DeliveryZone[] = [
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
