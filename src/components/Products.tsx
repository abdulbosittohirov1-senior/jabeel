import { useState, FormEvent } from 'react';
import { Product } from '../types.ts';
import { Sparkles, Info, Scale, ShoppingBag, Eye, X, Calculator, HelpCircle, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext.tsx';

export default function Products() {
  const { t, products, language } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Quote Builder State
  const [calcProduct, setCalcProduct] = useState<string>(products[0]?.id || 'fillet');
  const [calcQuantity, setCalcQuantity] = useState<number>(500); // weight in kg
  const [calcPackaging, setCalcPackaging] = useState<string>('MAP');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [quoteFeedback, setQuoteFeedback] = useState<boolean>(false);

  const activeCalcProdRec = products.find((p) => p.id === calcProduct);

  const calculateEstimate = () => {
    setIsCalculated(true);
    setQuoteFeedback(false);
  };

  const getPackingLabel = (val: string) => {
    switch (val) {
      case 'MAP': return t('calc_pack_map');
      case 'Vac': return t('calc_pack_vac');
      case 'Box': return t('calc_pack_box');
      case 'Plate': return t('calc_pack_plate');
      default: return val;
    }
  };

  const submitQuoteToContact = (e: FormEvent) => {
    e.preventDefault();
    setQuoteFeedback(true);
    // Auto populate the contact form or notify
    const contactNameInp = document.getElementById('cnt-name') as HTMLInputElement;
    const contactMsgInp = document.getElementById('cnt-message') as HTMLTextAreaElement;
    
    if (contactNameInp && contactMsgInp && activeCalcProdRec) {
      const packingLabel = getPackingLabel(calcPackaging);
      contactMsgInp.value = language === 'en'
        ? `I representation corporate wholesale require JABEEL ${activeCalcProdRec.name}. Estimated volume requested: ${calcQuantity} kg. Packing option: ${packingLabel}. Please call me back.`
        : language === 'ru'
        ? `Мне как корпоративному покупателю требуется коммерческое предложение на JABEEL ${activeCalcProdRec.name}. Ориентировочный объем: ${calcQuantity} кг. Предпочтительная упаковка: ${packingLabel}. Пожалуйста, перезвоните.`
        : language === 'oz'
        ? `Мен улгуржи харидор сифатида JABEEL ${activeCalcProdRec.name} учун тўғридан-тўғри таклиф сўрайман. Буюртма ҳажми: ${calcQuantity} кг. Қадоқлаш тури: ${packingLabel}. Илтимос, мен билан боғланинг.`
        : `Men ulgurji xaridor sifatida JABEEL ${activeCalcProdRec.name} uchun to'g'ridan-to'g'ri taklif so'rayman. Buyurtma hajmi: ${calcQuantity} kg. Qadoqlash turi: ${packingLabel}. Iltimos, men bilan bog'laning.`;
    }
    // Scroll to contact form smoothly
    const element = document.getElementById('contact');
    if (element) {
      setTimeout(() => {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }, 800);
    }
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-extrabold text-orange-500 uppercase tracking-widest block">
            {t("products_tag")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            {t("products_title")}
          </h2>
          <div className="w-16 h-1 rounded-full bg-orange-500 mx-auto" />
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            {t("products_subtitle")}
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fade-in">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              id={`prod-${prod.id}`}
            >
              {/* Image with overlay badge */}
              <div className="relative overflow-hidden aspect-4/3 bg-slate-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  {t("halal_card")}
                </div>
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="bg-white text-slate-800 p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                    title={t("more_info")}
                  >
                    <Eye className="w-5 h-5 text-orange-500" />
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-500 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest">
                    {t("fresh_frozen")}
                  </p>
                  <p className="text-sm text-slate-600 mt-3 line-clamp-3 font-normal leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* Spec tags quick readout */}
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3.5 h-3.5 text-orange-400" /> {t("protein_label")}: {prod.protein.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-orange-400" /> {t("kkal_label")}: {prod.calories.split(' ')[0]}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="mt-4 w-full bg-slate-50 hover:bg-orange-500 hover:text-white text-slate-800 font-bold py-3 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id={`btn-view-${prod.id}`}
                >
                  <Info className="w-4 h-4" /> {t("more_info")}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Partnership Quote Builder Widget */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Orange Graphic BG */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-bl-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Widget Left Text */}
            <div className="lg:col-span-15 lg:col-span-5 space-y-6">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-505">
                <Calculator className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t("calc_icon_title")}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t("calc_desc")}
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  <Check className="w-4 h-4 text-green-500" /> {t("calc_min")}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  <Check className="w-4 h-4 text-green-500" /> {t("calc_gps")}
                </div>
              </div>
            </div>

            {/* Widget Control Form */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-[2rem] border border-slate-100">
              <form onSubmit={submitQuoteToContact} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Select Product */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {t("calc_part_title")}
                    </label>
                    <select
                      value={calcProduct}
                      onChange={(e) => {
                        setCalcProduct(e.target.value);
                        setIsCalculated(false);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all"
                      id="quote-calc-product"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {t("calc_qty_title")}
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={100000}
                      value={calcQuantity}
                      onChange={(e) => {
                        setCalcQuantity(Number(e.target.value));
                        setIsCalculated(false);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all"
                      id="quote-calc-quantity"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Packaging Preference */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-widest block">
                      {t("calc_pack_title")}
                    </label>
                    <select
                      value={calcPackaging}
                      onChange={(e) => {
                        setCalcPackaging(e.target.value);
                        setIsCalculated(false);
                      }}
                      className="w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none transition-all"
                      id="quote-calc-packaging"
                    >
                      <option value="MAP">{t("calc_pack_map")}</option>
                      <option value="Vac">{t("calc_pack_vac")}</option>
                      <option value="Box">{t("calc_pack_box")}</option>
                      <option value="Plate">{t("calc_pack_plate")}</option>
                    </select>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={calculateEstimate}
                      className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {t("calc_btn")}
                    </button>
                  </div>
                </div>

                {/* Calculation Outputs */}
                {isCalculated && activeCalcProdRec && (
                  <div className="p-4 bg-white border border-orange-100 rounded-2xl space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-50 pb-2">
                      <span>{t("calc_route_label")}</span>
                      <span className="font-bold text-slate-800">
                        {calcQuantity >= 500 ? t("calc_route_big") : t("calc_route_small")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-50 pb-2">
                      <span>{t("calc_protein_label")}</span>
                      <span className="font-bold text-green-600">
                        ~{(parseFloat(activeCalcProdRec.protein) * calcQuantity / 10).toFixed(0)} {t("calc_protein_kg")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-50 pb-2">
                      <span>{t("calc_pack_proj")}</span>
                      <span className="font-bold text-slate-800">{getPackingLabel(calcPackaging)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{t("calc_temp_label")}</span>
                      <span className="font-bold text-orange-500">{activeCalcProdRec.temperatureRange}</span>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" /> {t("calc_submit")}
                      </button>
                    </div>
                  </div>
                )}

                {quoteFeedback && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-xl text-center">
                    {t("calc_feedback")}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Specification Details Dialog (Modal overlay) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          {/* Glass Overlay backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-3xl max-w-2xl w-full mx-auto overflow-hidden shadow-2xl border border-slate-100 z-10 flex flex-col max-h-[90vh]">
            {/* Modal Image Header */}
            <div className="relative h-64 bg-slate-100 shrink-0">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white text-slate-900 w-9 h-9 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                id="modal-close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <h3 className="text-2xl font-extrabold">{selectedProduct.name}</h3>
                <p className="text-xs text-orange-400 font-semibold uppercase tracking-widest mt-1">
                  {t("modal_sub")}
                </p>
              </div>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-left">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                  {t("modal_desc_label")}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Nutrition details - Grid of 3 */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                    {t("modal_protein")}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">
                    {selectedProduct.protein}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                    {t("modal_fat")}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">
                    {selectedProduct.fat}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">
                    {t("modal_calories")}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900">
                    {selectedProduct.calories}
                  </span>
                </div>
              </div>

              {/* Specific specifications lists */}
              <div className="space-y-4">
                <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <Scale className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{t("modal_features")}</h5>
                    <p className="text-xs text-slate-600 mt-1">
                      {selectedProduct.packagingTypes.join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <Sparkles className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{t("modal_logistics")}</h5>
                    <p className="text-xs text-slate-600 mt-1">
                      {language === 'en' ? 'Recommended temperature:' : 'Tavsiya etilgan harorat:'} {selectedProduct.temperatureRange}.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <HelpCircle className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{t("modal_guide")}</h5>
                    <p className="text-xs text-slate-600 mt-1">
                      {selectedProduct.cookingSuggestions}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Sticky Footer CTA */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100 text-xs cursor-pointer"
              >
                {t("modal_close")}
              </button>
              <button
                onClick={() => {
                  setCalcProduct(selectedProduct.id);
                  setSelectedProduct(null);
                  const element = document.getElementById('quote-calc-product');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 cursor-pointer"
              >
                {t("modal_calc")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
