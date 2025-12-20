-- Seed Data for Page Headers
-- Run this after 013_page_headers_table.sql
-- This inserts initial page header data for all pages

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Insert Page Headers Data for different pages
INSERT INTO mire_farm_website.page_headers (
  page_route, badge_text_en, badge_text_so, badge_text_ar,
  title_en, title_so, title_ar,
  description_en, description_so, description_ar,
  active
) VALUES
  (
    '/our-farm',
    'Sustainable Agriculture Excellence',
    'Waxqabadka Beeraha Waarta',
    'التميز في الزراعة المستدامة',
    'Our Farm 🌾',
    'Beerahayaga 🌾',
    'مزرعتنا 🌾',
    'Learn about our sustainable farming practices and commitment to excellence',
    'Wax ka baro hababkayaga beeraha waarta iyo sida aan u go''anayno tayada',
    'تعرف على ممارساتنا الزراعية المستدامة والتزامنا بالتميز',
    TRUE
  ),
  (
    '/news',
    'Latest Stories & Updates',
    'Warka iyo Cusbooneysiinta Ugu Dambeeyay',
    'أحدث القصص والتحديثات',
    'News & Updates 📰',
    'Warka iyo Cusbooneysiinta 📰',
    'الأخبار والتحديثات 📰',
    'Stay informed about the latest happenings at Mire Farms',
    'Naga soco waxyaabaha ugu dambeeyay ee Mire Farms',
    'ابق على اطلاع بأحدث الأحداث في مزارع مير',
    TRUE
  ),
  (
    '/gallery',
    'Visual Journey Through Mire Farms',
    'Safarka Muuqaalka ah ee Mire Farms',
    'رحلة بصرية عبر مزارع مير',
    'Gallery 📸',
    'Galeeriga 📸',
    'المعرض 📸',
    'Explore our farm through beautiful images and moments captured',
    'Soo booqo beerahayaga iyadoo la adeegsanayo sawiro wanaagsan iyo goobo la qabtay',
    'استكشف مزرعتنا من خلال الصور الجميلة واللحظات المصورة',
    TRUE
  ),
  (
    '/products',
    'Our Fresh Produce',
    'Khudaarta iyo Mirooyinkayaga Cusub',
    'منتجاتنا الطازجة',
    'Our Products 🥬',
    'Alaabtayada 🥬',
    'منتجاتنا 🥬',
    'Discover our wide range of organic fruits and vegetables',
    'Baro kala duwanshaha khudaarta iyo mirooyinka dabiiciga ah',
    'اكتشف مجموعة متنوعة من الفواكه والخضروات العضوية',
    TRUE
  ),
  (
    '/about',
    'About Mire Farms',
    'Ku Saabsan Mire Farms',
    'حول مزارع مير',
    'About Us 🌱',
    'Ku Saabsan 🌱',
    'من نحن 🌱',
    'Learn about our farm''s history, mission, and values',
    'Wax ka baro taariikhda, ujeedka, iyo qiimaha beerahayaga',
    'تعرف على تاريخ مزرعتنا ومهمتنا وقيمنا',
    TRUE
  ),
  (
    '/contact',
    'Get in Touch',
    'Nala Soo Xidhiidh',
    'تواصل معنا',
    'Contact Us 📞',
    'Nala Soo Xidhiidh 📞',
    'اتصل بنا 📞',
    'We''d love to hear from you. Reach out to us for inquiries, orders, or partnerships',
    'Waxaan jeclaan lahayn inaan kaga maqalno. Nala soo xidhiidh su''aalo, dalabyo, ama iskaashiga',
    'نود أن نسمع منك. تواصل معنا للاستفسارات أو الطلبات أو الشراكات',
    TRUE
  )
ON CONFLICT (page_route) DO NOTHING;
