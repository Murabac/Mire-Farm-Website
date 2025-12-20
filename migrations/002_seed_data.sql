-- Seed Data for Mire Farms Website
-- Run this after 001_initial_schema.sql
-- This file contains initial data inserts

-- Insert Hero Section Data with English, Somali, and Arabic translations
INSERT INTO hero_section (
  badge_text_en, badge_text_so, badge_text_ar,
  heading_prefix_en, heading_prefix_so, heading_prefix_ar,
  heading_highlight_en, heading_highlight_so, heading_highlight_ar,
  heading_suffix_en, heading_suffix_so, heading_suffix_ar,
  description_en, description_so, description_ar,
  primary_button_text_en, primary_button_text_so, primary_button_text_ar,
  secondary_button_text_en, secondary_button_text_so, secondary_button_text_ar,
  stat1_number, stat1_label_en, stat1_label_so, stat1_label_ar,
  stat2_number, stat2_label_en, stat2_label_so, stat2_label_ar,
  stat3_number, stat3_label_en, stat3_label_so, stat3_label_ar,
  hero_image_url,
  bottom_badge_title_en, bottom_badge_title_so, bottom_badge_title_ar,
  bottom_badge_subtitle_en, bottom_badge_subtitle_so, bottom_badge_subtitle_ar,
  active
) VALUES (
  -- Badge
  '100% Organic & Natural',
  '100% Dabiici & Tabaneed',
  '100% عضوي وطبيعي',
  
  -- Heading
  'Growing a',
  'Waxaynu korinaynaa',
  'نزرع',
  'Sustainable',
  'Waarta',
  'مستدام',
  'Future',
  'Mustaqbalka',
  'مستقبل',
  
  -- Description
  'Cultivating high-quality organic fruits and vegetables in Arabsiyo Village, Somaliland using natural and pesticide-free farming methods.',
  'Waxaynu korinaynaa khudaarta iyo mirooyinka tayo sare leh ee dabiiciga ah ee ku yaala Magaalada Arabsiyo, Somaliland iyadoo la adeegsanayo hababka beeraha dabiiciga ah ee aan dhirta lahayn.',
  'نزرع فواكه وخضروات عضوية عالية الجودة في قرية عربسيو، أرض الصومال باستخدام طرق الزراعة الطبيعية والخالية من المبيدات.',
  
  -- Buttons
  'Explore Our Farm',
  'Soo Booqo Beeraha',
  'استكشف مزرعتنا',
  'Get in Touch',
  'Nala Soo Xidhiidh',
  'تواصل معنا',
  
  -- Stats
  '100+', 'Crop Varieties', 'Noocyada Khudaarta', 'أصناف المحاصيل',
  '100%', 'Organic', 'Dabiici', 'عضوي',
  '4+', 'Countries', 'Wadamada', 'دول',
  
  -- Image
  '/images/hero-image.jpg',
  
  -- Bottom Badge
  'Est. 2024',
  'La Aasaasay 2024',
  'تأسست 2024',
  'Organic Farm',
  'Beeraha Dabiiciga',
  'مزرعة عضوية',
  
  -- Active
  TRUE
);

-- Insert sample news articles (optional - for testing)
-- Uncomment to insert sample data
-- INSERT INTO news_articles (title, date, author, image, excerpt, content, emoji, badge)
-- VALUES 
--   ('Sample Article 1', 'December 10, 2024', 'Farm Management', '/images/gellary-1.jpg', 'Sample excerpt', 'Sample content', '🏛️', 'Official Visit');
