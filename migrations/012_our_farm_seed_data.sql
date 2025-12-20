-- Seed Data for Our Farm Page
-- Run this after 011_our_farm_schema.sql

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Note: Page header data for /our-farm is now in the generic page_headers table (see 014_page_headers_seed_data.sql)

-- Insert Business Model Data
INSERT INTO mire_farm_website.business_model (
  badge_text_en, badge_text_so, badge_text_ar,
  title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  image_url,
  active
) VALUES
  (
    '💼 Our Business Model',
    '💼 Habka Ganacsigayaga',
    '💼 نموذج أعمالنا',
    'Quality Over Quantity, Always',
    'Tayada Ka Horreysa Tirada, Had iyo Jeer',
    'الجودة قبل الكمية دائماً',
    'Mire Farms operates on a sustainable business model that combines traditional farming wisdom with modern organic practices. We focus on quality over quantity, ensuring every piece of produce meets our high standards.',
    'Mire Farms waxay u shaqeeyaan hab ganacsi waarta ah oo isku daraya xigmada beeraha dhaqanka ah iyo hababka dabiiciga ah ee casriga ah. Waxaynu diiradda saarnay tayada ka horreysa tirada, loo hubiyo in qayb kasta oo khudaarta ay buuxiso heerarkeena sare.',
    'تعمل مزارع مير على نموذج أعمال مستدام يجمع بين حكمة الزراعة التقليدية والممارسات العضوية الحديثة. نركز على الجودة قبل الكمية، مما يضمن أن كل منتج يلبي معاييرنا العالية.',
    '/images/our-farm-hero.jpg',
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Business Model Features
INSERT INTO mire_farm_website.business_model_features (
  icon_type, title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  bg_color_class, border_color_class, icon_bg_color,
  display_order, active
) VALUES
  (
    'map_pin',
    'Perfect Location',
    'Goobta Wanaagsan',
    'الموقع المثالي',
    'Strategically located in Arabsiyo Village, Gabiley Region, where the climate and soil conditions are ideal for growing a diverse range of fruits and vegetables.',
    'Goob u go''an oo ku yaal Magaalada Arabsiyo, Gobolka Gabiley, halka ay cimilada iyo dhulka ay u wanaagsan yihiin korinta noocyada kala duwan ee khudaar iyo mirooyin.',
    'تقع بشكل استراتيجي في قرية عربسيو، منطقة جابيلي، حيث المناخ وظروف التربة مثالية لزراعة مجموعة متنوعة من الفواكه والخضروات.',
    'from-green-50 to-blue-50',
    'border-green-100',
    'bg-[#6B9E3E]',
    1,
    TRUE
  ),
  (
    'trending_up',
    'Direct to Market',
    'Si Toos ah ugu Tagid Suuqa',
    'مباشرة إلى السوق',
    'By cutting out middlemen and establishing direct relationships with buyers, we ensure fair prices for our produce while keeping costs reasonable for consumers.',
    'Iyadoo aan ka baxayno dhexdhexaadiyayaasha iyo dhisidda xiriirka tooska ah ee macaamiisha, waxaan hubinaynaa qiimaha caddaalada ah ee alaabtayada iyadoo la ilaalinayo kharashyada macaamiisha.',
    'من خلال إزالة الوسطاء وإنشاء علاقات مباشرة مع المشترين، نضمن أسعاراً عادلة لمنتجاتنا مع الحفاظ على تكاليف معقولة للمستهلكين.',
    'from-purple-50 to-pink-50',
    'border-purple-100',
    'bg-purple-600',
    2,
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Produce Types Header
INSERT INTO mire_farm_website.produce_types_header (
  title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  footer_badge_text_en, footer_badge_text_so, footer_badge_text_ar,
  active
) VALUES
  (
    'What We Grow 🌱',
    'Waxa Aan Korinayno 🌱',
    'ما نزرعه 🌱',
    'We cultivate a wide variety of organic fruits and vegetables throughout the year, adapting our crops to seasonal conditions for optimal quality.',
    'Waxaynu korinaynaa noocyo badan oo khudaar iyo mirooyin dabiici ah sanadka oo dhan, iyadoo la isku habaynayo khudaartayada xaaladaha xilliga si loo hubiyo tayada ugu fiican.',
    'نزرع مجموعة متنوعة من الفواكه والخضروات العضوية على مدار السنة، مع تكييف محاصيلنا مع الظروف الموسمية لتحقيق أفضل جودة.',
    '✨ All produce is grown using natural, pesticide-free methods',
    '✨ Dhammaan khudaarta waxaa la koriyey iyadoo la adeegsanayo hababka dabiiciga ah, aan dhirta lahayn',
    '✨ جميع المنتجات تزرع باستخدام طرق طبيعية خالية من المبيدات',
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Produce Items
INSERT INTO mire_farm_website.produce_items (
  name_en, name_so, name_ar, emoji, display_order, active
) VALUES
  ('Tomatoes', 'Tamaandho', 'طماطم', '🍅', 1, TRUE),
  ('Peppers', 'Basbaas', 'فلفل', '🌶️', 2, TRUE),
  ('Cucumbers', 'Qajaar', 'خيار', '🥒', 3, TRUE),
  ('Lettuce', 'Salad', 'خس', '🥬', 4, TRUE),
  ('Spinach', 'Isbaanish', 'سبانخ', '🥬', 5, TRUE),
  ('Carrots', 'Karooto', 'جزر', '🥕', 6, TRUE),
  ('Pepper', 'Basbaas', 'فلفل رومي', '🫑', 7, TRUE),
  ('Oranges', 'Liin', 'برتقال', '🍊', 8, TRUE),
  ('Potatoes', 'Baradho', 'بطاطس', '🥔', 9, TRUE),
  ('Melons', 'Qare', 'بطيخ', '🍈', 10, TRUE),
  ('Herbs', 'Cudbi', 'أعشاب', '🌿', 11, TRUE),
  ('Onions', 'Basal', 'بصل', '🧅', 12, TRUE)
ON CONFLICT DO NOTHING;

-- Insert Social Impact Header
INSERT INTO mire_farm_website.social_impact_header (
  title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  active
) VALUES
  (
    'Our Impact 💚',
    'Saamayntayada 💚',
    'تأثيرنا 💚',
    'At Mire Farms, we believe in creating positive change for both people and planet.',
    'Mire Farms, waxaan rumaysanahay inaan abuurno isbeddel wanaagsan dadka iyo dhulka.',
    'في مزارع مير، نؤمن بخلق تغيير إيجابي للناس والكوكب.',
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Social Impact Cards
INSERT INTO mire_farm_website.social_impact_cards (
  icon_type, emoji, title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  color_class, display_order, active
) VALUES
  (
    'community',
    '🤝',
    'Community Empowerment',
    'Xoojinta Bulshada',
    'تمكين المجتمع',
    'We create employment opportunities and support local communities through fair wages and capacity building programs.',
    'Waxaynu abuurnaynaa fursado shaqo oo la taageerayo bulshooyinka dalka iyadoo la adeegsanayo mushaharooyin caddaalada ah iyo barnaamijyada horumarinta awoodda.',
    'نخلق فرص عمل وندعم المجتمعات المحلية من خلال الأجور العادلة وبرامج بناء القدرات.',
    'bg-blue-100 text-blue-600',
    1,
    TRUE
  ),
  (
    'leaf',
    '🌿',
    'Environmental Protection',
    'Ilaalinta Deegaanka',
    'حماية البيئة',
    'Our organic farming methods protect soil health, preserve biodiversity, and reduce carbon emissions.',
    'Hababkayaga beeraha dabiiciga ah waxay ilaaliyaan caafimaadka dhulka, keydinta noocyada kala duwan, iyo yareynta iska dhaca kaarboonka.',
    'طرق الزراعة العضوية لدينا تحمي صحة التربة وتحافظ على التنوع البيولوجي وتقلل من انبعاثات الكربون.',
    'bg-green-100 text-green-600',
    2,
    TRUE
  ),
  (
    'heart',
    '💚',
    'Health & Nutrition',
    'Caafimaadka iyo Nafta',
    'الصحة والتغذية',
    'We provide access to fresh, nutritious, and chemical-free produce that promotes better health outcomes.',
    'Waxaynu siinaynaa helitaanka khudaarta cusub, nafaqaysan, iyo aan kiimikada lahayn oo horumarinta natiijooyinka caafimaadka wanaagsan.',
    'نوفر الوصول إلى منتجات طازجة ومغذية وخالية من المواد الكيميائية التي تعزز نتائج صحية أفضل.',
    'bg-pink-100 text-pink-600',
    3,
    TRUE
  ),
  (
    'globe',
    '🌍',
    'Sustainable Future',
    'Mustaqbalka Waarta',
    'مستقبل مستدام',
    'By practicing sustainable agriculture, we contribute to food security and environmental conservation for future generations.',
    'Iyadoo aan ku dhaqannayno beeraha waarta, waxaan ka qayb qaadanaynaa amniga cuntada iyo ilaalinta deegaanka mustaqbalka.',
    'من خلال ممارسة الزراعة المستدامة، نساهم في الأمن الغذائي والحفاظ على البيئة للأجيال القادمة.',
    'bg-purple-100 text-purple-600',
    4,
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Environmental Commitment
INSERT INTO mire_farm_website.environmental_commitment (
  emoji, title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  active
) VALUES
  (
    '🌍',
    'Environmental Commitment',
    'Ballanqaadka Deegaanka',
    'الالتزام البيئي',
    'We are committed to reducing our environmental footprint through sustainable farming practices, water conservation, and natural pest management. Our goal is to leave the land better than we found it for future generations.',
    'Waxaan u go''anaynaa yareynta saamaynta deegaankeena iyadoo la adeegsanayo hababka beeraha waarta, keydinta biyaha, iyo maamulka cayayaanka dabiiciga ah. Ujeedkayagu waa inaan ka tagno dhulka ka wanaagsan sidii aan u helnay mustaqbalka.',
    'نحن ملتزمون بتقليل بصمتنا البيئية من خلال ممارسات الزراعة المستدامة، والحفاظ على المياه، والإدارة الطبيعية للآفات. هدفنا هو ترك الأرض أفضل مما وجدناها للأجيال القادمة.',
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Growth Expansion Header
INSERT INTO mire_farm_website.growth_expansion_header (
  title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  image_url,
  active
) VALUES
  (
    'Growth & Expansion Plans 🚀',
    'Qorshaha Koritaanka iyo Fidinta 🚀',
    'خطط النمو والتوسع 🚀',
    'Building a brighter future for farming in the Horn of Africa',
    'Dhisidda mustaqbalka iftiimaya beeraha Geeska Afrika',
    'بناء مستقبل أكثر إشراقاً للزراعة في القرن الأفريقي',
    '/images/our-farm-hero.jpg',
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Growth Expansion Plans
INSERT INTO mire_farm_website.growth_expansion_plans (
  emoji, title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  display_order, active
) VALUES
  (
    '🌍',
    'Regional Market Expansion',
    'Fidinta Suuqyada Gobolka',
    'توسع السوق الإقليمي',
    'We are actively expanding our distribution network to reach markets in Djibouti, Ethiopia, and Somalia, bringing quality organic produce to more communities across the Horn of Africa.',
    'Waxaynu si firfircoon u fidinaynaa shabakadayada qaybiska si aan u gaarno suuqyada Jabuuti, Itoobiya, iyo Soomaaliya, iyadoo la keeno khudaarta tayo sare u leh ee dabiiciga ah bulshooyin badan oo ka mid ah Geeska Afrika.',
    'نوسع بنشاط شبكة التوزيع لدينا للوصول إلى أسواق جيبوتي وإثيوبيا والصومال، مما يجلب منتجات عضوية عالية الجودة إلى المزيد من المجتمعات في جميع أنحاء القرن الأفريقي.',
    1,
    TRUE
  ),
  (
    '👨‍🌾',
    'Farmer Training Programs',
    'Barnaamijyada Tababarka Beeraha',
    'برامج تدريب المزارعين',
    'We''re developing comprehensive training programs to share our knowledge with other farmers in the community, helping them adopt sustainable organic farming practices and improve their livelihoods.',
    'Waxaynu horumarinaynaa barnaamijyada tababarka oo buuxa si aan u wadaagno aqoontayada beeraha kale ee bulshada, iyagoo ka caawinaya inay qaataan hababka beeraha dabiiciga ah ee waarta iyo horumarinta noloshooda.',
    'نطور برامج تدريبية شاملة لمشاركة معرفتنا مع المزارعين الآخرين في المجتمع، ومساعدتهم على اعتماد ممارسات الزراعة العضوية المستدامة وتحسين سبل عيشهم.',
    2,
    TRUE
  ),
  (
    '🏗️',
    'Infrastructure Development',
    'Horumarinta Qaababka',
    'تطوير البنية التحتية',
    'Investing in modern farming infrastructure, including irrigation systems, storage facilities, and processing equipment to increase efficiency and maintain product quality.',
    'Maalgashiga qaababka beeraha casriga ah, oo ay ku jiraan nidaamyada biyaha, goobaha keydinta, iyo qalabyada habaynta si loo kordhiyo waxqabadka iyo ilaalinta tayada alaabta.',
    'الاستثمار في البنية التحتية الزراعية الحديثة، بما في ذلك أنظمة الري، ومرافق التخزين، ومعدات المعالجة لزيادة الكفاءة والحفاظ على جودة المنتج.',
    3,
    TRUE
  ),
  (
    '🌿',
    'Product Diversification',
    'Kala Duwanshaha Alaabta',
    'تنويع المنتجات',
    'Continuously researching and testing new crop varieties to expand our product range and meet evolving market demands while maintaining our organic standards.',
    'Si joogto ah baadhista iyo tijaabada noocyada khudaarta cusub si aan u ballaarinno kala duwanshaha alaabtayada iyo buuxinta baahiyaha suuqa oo isbeddelaya iyadoo la ilaalinayo heerarkeena dabiiciga ah.',
    'البحث المستمر واختبار أصناف المحاصيل الجديدة لتوسيع نطاق منتجاتنا وتلبية متطلبات السوق المتطورة مع الحفاظ على معاييرنا العضوية.',
    4,
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Insert Growth Expansion Stats
INSERT INTO mire_farm_website.growth_expansion_stats (
  number, label_en, label_so, label_ar,
  display_order, active
) VALUES
  ('4+', 'Countries Reached', 'Wadamada La Gaaray', 'دول تم الوصول إليها', 1, TRUE),
  ('100+', 'Farmers Trained', 'Beeraha La Tababaray', 'مزارع تم تدريبه', 2, TRUE),
  ('50+', 'Hectares Farmed', 'Hektar La Beerey', 'هكتار تم زراعته', 3, TRUE),
  ('100%', 'Organic Certified', 'Dabiici Loogu Aqoonsaday', 'معتمد عضوي', 4, TRUE)
ON CONFLICT DO NOTHING;
