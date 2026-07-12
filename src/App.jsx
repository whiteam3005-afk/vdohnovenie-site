import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ИКОНКИ ---
const TelegramIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.096l-6.405 4.042-2.76-.86c-.6-.188-.615-.6.128-.893l10.796-4.158c.495-.195.938.113.767.896z"/></svg>);
const WhatsAppIcon = () => (<svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>);
const CloseIcon = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

// --- БАЗА ДАННЫХ АССОРТИМЕНТА ---
const menuData = {
  catering: [
    { category: "Брускетты", items: [
      { name: "С бужениной, маринованным огурцом, зернистой горчицей, крем-бальзамик", price: "-" },
      { name: "С моцареллой, томатами и песто", price: "150 ₽/шт" },
      { name: "С печеным болгарским перцем, фетой, крем-бальзамик, оливковым маслом", price: "150 ₽/шт" },
      { name: "С салями, свежим огурцом и черри", price: "150 ₽/шт" },
      { name: "Жареным беконом, черри, крем-сыром", price: "150 ₽/шт" },
      { name: "С запеченной курицей, пармезаном, соусом «Цезарь», черри", price: "150 ₽/шт" },
      { name: "С красной рыбой слабой соли, крем-сыром и каперсом", price: "170 ₽/шт" }
    ]},
    { category: "Заварные булочки/эклеры", items: [
      { name: "Со снежным крабом, крем-сыром, сладким перцем и лимоном", price: "150 ₽/шт" },
      { name: "С паштетом из куриной печени и крем-сыром с зеленью", price: "150 ₽/шт" }
    ]},
    { category: "Валованы", items: [
      { name: "С грибным жульеном и сыром", price: "150 ₽/шт" }
    ]},
    { category: "Рулеты бисквитные", items: [
      { name: "Со шпинатом, крем-чизом, красной рыбой, лимоном", price: "200 ₽/шт" },
      { name: "С морковью, крем-чизом, соленым огурцом и мясным паштетом", price: "200 ₽/шт" }
    ]},
    { category: "Канапе на шпажках", items: [
      { name: "Маслины, моцарелла, томаты, сальчичон", price: "120 ₽/шт" },
      { name: "Сыр, оливки, редис, бекон, черри", price: "120 ₽/шт" },
      { name: "Салями, сладкий перец, свежий огурец, маринованный шампиньон", price: "120 ₽/шт" },
      { name: "Сыр, ветчина, свежий огурец, черри", price: "120 ₽/шт" }
    ]},
    { category: "Рулетики", items: [
      { name: "Из ветчины с сыром и чесноком, украшен черри", price: "65 ₽/шт" },
      { name: "Из баклажан с сырно-ореховым кремом с зеленью и чесноком", price: "65 ₽/шт" }
    ]}
  ],
  pastry: [
    { category: "Мини пирожки (50 гр)", items: [
      { name: "С яблоком / С яблоком и корицей / С яблоком и брусникой", price: "110 ₽/шт" },
      { name: "С капустой и яйцом / С зеленым луком и яйцом", price: "90 ₽/шт" },
      { name: "С мясом / С курицей и грибами", price: "110 ₽/шт" },
      { name: "С морковью, яйцом и сол.огурцом", price: "90 ₽/шт" },
      { name: "С красной рыбой, жареным луком и яйцом", price: "150 ₽/шт" },
      { name: "С рыбой тресковых пород, жареным луком, сыром и укропом", price: "150 ₽/шт" }
    ]},
    { category: "Мини булочки (50 гр)", items: [
      { name: "С изюмом", price: "90 ₽/шт" },
      { name: "С апельсиновой цедрой и корицей", price: "80 ₽/шт" },
      { name: "С изюмом, грецким орехом, корицей", price: "110 ₽/шт" }
    ]},
    { category: "Ватрушки (70 гр)", items: [
      { name: "С творогом и ванилью / С творогом с изюмом", price: "150 ₽/шт" },
      { name: "С клубникой / черникой и шапочкой из безе", price: "150 ₽/шт" },
      { name: "С брусникой/клюквой, грец. орехами, корицей и безе", price: "150 ₽/шт" },
      { name: "С картофельной начинкой с жареным луком и помидором", price: "150 ₽/шт" }
    ]},
    { category: "Крупная выпечка", items: [
      { name: "Свадебный Каравай с традиционными узорами", price: "2100 ₽/кг" },
      { name: "Пироги в ассортименте", price: "от 1800 ₽/кг" }
    ]}
  ],
  cakes: [
    { category: "Фирменные торты", items: [
      { name: "1. Молочная девочка (клубника-банан, крем маскарпоне)", price: "2500 ₽/кг" },
      { name: "2. Медовик со сливочно-смешанным кремом", price: "2300 ₽/кг" },
      { name: "3. Шоколадный бисквит с малиной и карамельным кремом", price: "3000 ₽/кг" },
      { name: "4. Бисквит ванильно-лимонный, клубника, пломбирный крем", price: "2500 ₽/кг" },
      { name: "5. Бисквит (дакуаз) миндально лимонный, киви-банан", price: "2500 ₽/кг" },
      { name: "6. Ореховый бисквит, карамельный крем и цитрусовая начинка", price: "2500 ₽/кг" },
      { name: "7. Наполеон с малиной и пломбирным, заварным кремом", price: "2500 ₽/кг" },
      { name: "8. Классический бисквит, пломбирный крем-чиз, клубника-банан", price: "2300 ₽/кг" },
      { name: "9. Шоколадный бисквит, карамельный крем-чиз, вишня в коньяке", price: "3000 ₽/кг" },
      { name: "10. Морковные коржи с грецкими орехами, апельсиновая начинка", price: "2500 ₽/кг" },
      { name: "14. Кофейный трюфель (шоколадные коржи, кофейная начинка)", price: "3500 ₽/кг" },
      { name: "16. Торт «Панчо» (шоколадный, персики/ананас)", price: "2500 ₽/кг" },
      { name: "17. Торт «Сказка» (ромовая пропитка, крем Шарлот)", price: "2300 ₽/кг" },
      { name: "18. Торт «Графские развалины» (безе, орехи, чернослив)", price: "2500 ₽/кг" },
      { name: "21. Фисташковый бисквит, фисташковый крем, малина", price: "3000 ₽/кг" },
      { name: "28. Муссовые торты с разными начинками и текстурами", price: "3500 ₽/кг" },
      { name: "29. Меренговый рулет с крем-маскарпоне и ягодами", price: "2000 ₽/кг" },
      { name: "30. Торт-мороженое", price: "от 2500 ₽/кг" },
      { name: "31. Фитнес-линейка (без глютена, без лактозы, low sugar)", price: "от 3500 ₽/кг" }
    ]}
  ],
  desserts: [
    { category: "Чизкейки и Пирожные", items: [
      { name: "Чизкейк - эскимо макси / мини", price: "350 / 250 ₽/шт" },
      { name: "Пирожные «Шу» (профитроли ванильные мини)", price: "90 ₽/шт" },
      { name: "Пирожные «Шу» (профитроли со сливками большие)", price: "200 ₽/шт" },
      { name: "«Шу» классика / Вулкан / Ёлочка / Венок", price: "300 - 350 ₽/шт" },
      { name: "Пирожное «Грецкий орех»", price: "280 ₽/шт" },
      { name: "Капкейки в ассортименте", price: "от 250 ₽/шт" },
      { name: "Эклеры с разными начинками", price: "300 ₽/шт" },
      { name: "Макарон с разными начинками", price: "150 ₽/шт" },
      { name: "Муссовые пирожные", price: "от 280 ₽/шт" },
      { name: "Десерты в стаканчиках", price: "от 280 ₽/шт" },
      { name: "Птичье молоко / Зефир", price: "от 150 / 100 ₽/шт" },
      { name: "Шоколадные трюфели", price: "от 150 ₽/шт" },
      { name: "Кейк-попсы (картошка) / Печенье", price: "от 150 ₽/шт" },
      { name: "Подарки для гостей (печеньки с глазурью)", price: "от 250 ₽/шт" }
    ]}
  ]
};

export default function VdokhnovenieApp() {
  const [activeTab, setActiveTab] = useState('catering');
  const [selectedReview, setSelectedReview] = useState(null);

  // Анимации
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const tabs = [
    { id: 'catering', label: 'Кейтеринг' },
    { id: 'pastry', label: 'Выпечка' },
    { id: 'cakes', label: 'Торты' },
    { id: 'desserts', label: 'Десерты' }
  ];

  // Массив пустых отзывов для генерации сетки
  const dummyReviews = Array(8).fill(null);

  return (
    <div className="min-h-screen bg-[#040C1A] text-zinc-300 font-sans selection:bg-[#38BDF8] selection:text-white overflow-x-hidden">
      
      {/* === ПРЕМИАЛЬНЫЙ АНИМИРОВАННЫЙ ГОЛУБОЙ ФОН + СЕТКА === */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px] z-0"></div>
      
      {/* Плавающие переливающиеся сферы (ОПТИМИЗИРОВАННЫЕ БЕЗ BLUR) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 40, 0], y: [0, -30, 0] }} 
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(56,189,248,0) 70%)' }}
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, 50, 0] }} 
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(2,132,199,0.12) 0%, rgba(2,132,199,0) 70%)' }}
      />

      {/* === ХЕДЕР (Верхняя панель) === */}
      <header className="fixed top-0 w-full z-40 bg-[#040C1A]/80 backdrop-blur-xl border-b border-[#1E3A5F]/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Логотип */}
          <div className="flex items-center gap-3">
            <div className="text-xl md:text-2xl font-black text-white tracking-widest uppercase">
              Вдохновение
              <div className="h-0.5 w-1/2 bg-[#38BDF8] mt-1 rounded-full"></div>
            </div>
          </div>

          {/* Навигация (Десктоп) */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
            <a href="#about" className="hover:text-[#38BDF8] transition-colors">О нас</a>
            <a href="#assortment" className="hover:text-[#38BDF8] transition-colors">Ассортимент</a>
            <a href="#reviews" className="hover:text-[#38BDF8] transition-colors">Отзывы</a>
            <a href="#contacts" className="hover:text-[#38BDF8] transition-colors">Контакты</a>
          </nav>

          {/* Соцсети (Только Telegram и WhatsApp) */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex gap-4 text-zinc-400">
              <a href="https://t.me/NataliyaParamonova" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><TelegramIcon /></a>
              <a href="#" className="hover:text-white hover:scale-110 transition-all"><WhatsAppIcon /></a>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 relative z-10">
        
        {/* === БЛОК 1: О НАС (HERO) === */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-xs text-[#BAE6FD] font-mono mb-8 uppercase tracking-widest rounded-full">
              Искусство вкуса
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[1.1] mb-8">
              Создаем атмосферу <br />
              <span className="text-[#38BDF8]">вашего праздника</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed font-light">
              Мы - компания «Вдохновение». Занимаемся организацией мероприятий под ключ, премиальным кейтерингом и созданием эксклюзивных десертов. От классических тортов до фитнес-линейки и брутальных мясных шедевров. Если вы не нашли свой идеальный вкус — мы разработаем рецепт специально для вас.
            </p>
          </motion.div>
        </section>


        {/* === БЛОК 2: АССОРТИМЕНТ (ИНЖЕНЕРНОЕ МЕНЮ) === */}
        <section id="assortment" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">Ассортимент</h2>
                <div className="h-1 w-20 bg-[#38BDF8]"></div>
              </div>
              
              {/* Табы */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-sm border ${
                      activeTab === tab.id 
                        ? 'bg-[#38BDF8] border-[#38BDF8] text-black' 
                        : 'bg-[#0A1526] border-[#1E3A5F] text-zinc-400 hover:border-[#38BDF8]/50 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Сетка меню */}
            <div className="bg-[#07101E] border border-[#1E3A5F] p-6 md:p-12 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8]/5 blur-[80px] pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 relative z-10">
                {menuData[activeTab].map((section, idx) => (
                  <div key={idx} className="flex flex-col">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b-2 border-[#1E3A5F]">
                      {section.category}
                    </h3>
                    <div className="flex flex-col gap-4">
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex justify-between items-center gap-4 group">
                          <div className="text-sm md:text-base text-zinc-300 font-light leading-snug flex-1 group-hover:text-white transition-colors py-1">
                            {item.name}
                          </div>
                          <div className="hidden sm:block flex-1 border-b border-dashed border-zinc-700/50 mx-2"></div>
                          <div className="text-sm md:text-base font-medium text-[#BAE6FD] whitespace-nowrap">
                            {item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Уведомление для дрожжевого теста и тортов */}
              {(activeTab === 'pastry' || activeTab === 'cakes') && (
                <div className="mt-12 p-4 bg-[#38BDF8]/10 border border-[#38BDF8]/30 rounded-lg text-sm text-zinc-400 text-center font-light">
                  {activeTab === 'pastry' 
                    ? "* Во всех изделиях, кроме каравая, дрожжевое тесто можно заменить на песочное или слоеное."
                    : "* Минимальный заказ для тортов от 1 кг, для пирожных от 6 шт. Заказ не менее чем за 5 дней."}
                </div>
              )}
            </div>

          </motion.div>
        </section>

        {/* === БЛОК 3: ОТЗЫВЫ (С АНИМАЦИЕЙ РАСКРЫТИЯ) === */}
        <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <div className="mb-12 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">Отзывы</h2>
              <div className="h-1 w-20 bg-[#38BDF8] mx-auto md:mx-0"></div>
            </div>

            {/* Сетка скелетонов */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {dummyReviews.map((_, idx) => (
                <motion.div 
                  key={idx}
                  layoutId={`review-${idx}`}
                  onClick={() => setSelectedReview(idx)}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-[#0A1526] border border-[#1E3A5F] hover:border-[#38BDF8]/50 p-6 rounded-xl cursor-pointer shadow-lg transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Заглушка: Шапка */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700"></div>
                    <div className="flex-1">
                      <div className="w-24 h-3 bg-zinc-700 rounded-full mb-2"></div>
                      <div className="w-16 h-2 bg-zinc-800 rounded-full"></div>
                    </div>
                  </div>
                  {/* Заглушка: Текст */}
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-zinc-800 rounded-full"></div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full"></div>
                    <div className="w-4/5 h-2 bg-zinc-800 rounded-full"></div>
                    <div className="w-2/3 h-2 bg-zinc-800 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* === БЛОК 4: КОНТАКТЫ === */}
        <section id="contacts" className="max-w-6xl mx-auto px-6 py-20 pb-32">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">Связь с нами</h2>
              <div className="h-1 w-20 bg-[#38BDF8] mx-auto"></div>
            </div>

            {/* Сетка контактов (3 колонки для десктопа) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* 1. Кликабельный Телефон (открывает набор номера) */}
              <a href="tel:+79213244708" className="bg-[#07101E] border border-[#1E3A5F] p-8 rounded-xl flex flex-col justify-center items-center text-center group hover:border-[#38BDF8] transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8] mb-4 group-hover:scale-110 group-hover:bg-[#38BDF8]/20 transition-all">
                  <WhatsAppIcon />
                </div>
                <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Телефон для заказов</h4>
                <div className="text-xl md:text-2xl font-black text-white group-hover:text-[#38BDF8] transition-colors whitespace-nowrap">+7 921 324 47 08</div>
              </a>

              {/* 2. Кликабельный Telegram (открывает приложение) */}
              <a href="https://t.me/NataliyaParamonova" target="_blank" rel="noopener noreferrer" className="bg-[#07101E] border border-[#1E3A5F] p-8 rounded-xl flex flex-col justify-center items-center text-center group hover:border-[#38BDF8] transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8] mb-4 group-hover:scale-110 group-hover:bg-[#38BDF8]/20 transition-all">
                  <TelegramIcon />
                </div>
                <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Написать в Telegram</h4>
                <div className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">@NataliyaParamonova</div>
              </a>

              {/* 3. Время работы */}
              <div className="bg-[#07101E] border border-[#1E3A5F] p-8 rounded-xl flex flex-col justify-center items-center text-center group hover:border-[#38BDF8]/50 transition-colors md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 rounded-full bg-[#38BDF8]/10 flex items-center justify-center text-[#38BDF8] mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-2">Время работы</h4>
                <div className="text-xl font-bold text-white">с 11:00 до 20:00</div>
                <div className="text-xs text-zinc-500 mt-2">Ежедневно</div>
              </div>

              {/* 4. Реквизиты (Растягиваем на всю ширину) */}
              <div className="bg-[#07101E] border border-[#1E3A5F] p-8 rounded-xl flex flex-col justify-center items-center text-center md:col-span-2 lg:col-span-3 group hover:border-[#38BDF8]/50 transition-colors">
                 <div className="text-lg font-bold text-white uppercase tracking-widest mb-4">ООО «ВДОХНОВЕНИЕ»</div>
                 <div className="text-sm text-zinc-400 font-light leading-relaxed max-w-2xl">
                    Россия, 192289, Санкт-Петербург, ул. Олеко Дундича, д.40, кв 41<br/>
                    ИНН 7816744857 | КПП 781601001 | ОГРН 1237800117499<br/>
                    р/с 40702810255710016092 | БИК 044030653 ПАО Сбербанк
                 </div>
              </div>

            </div>
          </motion.div>
        </section>

      </main>

      {/* === ФУТЕР (Точная копия стиля WhiTeam) === */}
      <footer className="border-t border-[#1E3A5F]/50 bg-[#02060F] py-8 text-center relative z-10">
         <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
           Created by <span className="text-white font-bold">WhiTeam</span>
         </p>
      </footer>

      {/* === МОДАЛЬНОЕ ОКНО ОТЗЫВА (Анимация на весь экран) === */}
      <AnimatePresence>
        {selectedReview !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedReview(null)}
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
              <motion.div 
                layoutId={`review-${selectedReview}`}
                className="w-full max-w-2xl bg-[#0A1526] border border-[#1E3A5F] p-8 md:p-12 rounded-2xl shadow-2xl pointer-events-auto relative"
              >
                {/* Крестик закрытия */}
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-500 hover:text-white transition-colors"
                >
                  <CloseIcon />
                </button>

                {/* Раскрытый контент отзыва (Заглушка) */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700"></div>
                  <div>
                    <div className="w-32 h-4 bg-zinc-700 rounded-full mb-3"></div>
                    <div className="w-20 h-3 bg-zinc-800 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-3 bg-zinc-800 rounded-full"></div>
                  <div className="w-full h-3 bg-zinc-800 rounded-full"></div>
                  <div className="w-11/12 h-3 bg-zinc-800 rounded-full"></div>
                  <div className="w-full h-3 bg-zinc-800 rounded-full"></div>
                  <div className="w-4/5 h-3 bg-zinc-800 rounded-full"></div>
                  <div className="w-1/2 h-3 bg-zinc-800 rounded-full"></div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-[#1E3A5F] text-center text-xs text-[#38BDF8] font-mono uppercase tracking-widest">
                  // Здесь будет реальный текст отзыва клиента
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        html { 
          scroll-behavior: smooth; 
          scrollbar-width: none; 
        }
        ::-webkit-scrollbar { display: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}