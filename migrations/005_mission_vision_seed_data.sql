-- Seed Data for Mission, Vision, and Values Section
-- Run this after 004_mission_vision_values.sql

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Insert Section Header Data
INSERT INTO mire_farm_website.mission_vision_section_header (title_en, title_so, title_ar, description_en, description_so, description_ar, active) VALUES
  (
    'Why Choose Mire Farms?',
    'Maxaa Nooga Dooran Mire Farms?',
    'لماذا تختار مزارع مير؟',
    'We''re more than just a farm - we''re a community dedicated to sustainable agriculture and healthy living',
    'Ma beer kaliya ma ahan - waa bulsho u go''an beeraha waarta iyo nolosha caafimaadka leh',
    'نحن أكثر من مجرد مزرعة - نحن مجتمع مكرس للزراعة المستدامة والعيش الصحي',
    TRUE
  );

-- Insert Mission, Vision, Values Data
INSERT INTO mire_farm_website.mission_vision_values (type, emoji, title_en, title_so, title_ar, description_en, description_so, description_ar, bg_color_class, border_color_class, display_order, active) VALUES
  (
    'mission',
    '🌱',
    'Our Mission',
    'Ujeedkayaga',
    'مهمتنا',
    'To provide the highest quality organic produce while supporting our local community and protecting the environment for future generations.',
    'In siinaynaa khudaarta tayo sare u leh ee dabiiciga ah iyadoo la taageerayo bulshada dalka iyo ilaalinta deegaanka mustaqbalka.',
    'توفير منتجات عضوية عالية الجودة مع دعم مجتمعنا المحلي وحماية البيئة للأجيال القادمة.',
    'from-green-50 to-white',
    'border-green-100',
    1,
    TRUE
  ),
  (
    'vision',
    '🎯',
    'Our Vision',
    'Aragtidayada',
    'رؤيتنا',
    'To become the leading organic farm in the Horn of Africa, setting standards for sustainable agriculture and community empowerment.',
    'Inaan noqonno beeraha ugu horreeya ee dabiiciga ah Geeska Afrika, aanu go''aamayno heerarka beeraha waarta iyo xoojinta bulshada.',
    'أن نصبح المزرعة العضوية الرائدة في القرن الأفريقي، ونضع معايير للزراعة المستدامة وتمكين المجتمع.',
    'from-blue-50 to-white',
    'border-blue-100',
    2,
    TRUE
  ),
  (
    'values',
    '💚',
    'Our Values',
    'Qiimahayagayaga',
    'قيمنا',
    'Sustainability, quality, community, innovation, and environmental stewardship guide everything we do at Mire Farms.',
    'Waarta, tayada, bulshada, horumarinta, iyo ilaalinta deegaanka waxay hageeyaan wax kasta oo aan qabanno Mire Farms.',
    'الاستدامة والجودة والمجتمع والابتكار والإشراف البيئي توجه كل ما نقوم به في مزارع مير.',
    'from-purple-50 to-white',
    'border-purple-100',
    3,
    TRUE
  );

-- Insert Core Values Data
INSERT INTO mire_farm_website.core_values (title_en, title_so, title_ar, description_en, description_so, description_ar, icon_type, color_class, display_order, active) VALUES
  (
    '100% Organic',
    '100% Dabiici',
    '100% عضوي',
    'Delivering the finest organic produce with uncompromising standards.',
    'Waxaynu siinaynaa khudaarta ugu fiican ee dabiiciga ah iyadoo la adeegsanayo heerar aan la dhaafin.',
    'تقديم أفضل المنتجات العضوية بمعايير لا هوادة فيها.',
    'organic',
    'bg-green-100 text-green-600',
    1,
    TRUE
  ),
  (
    'Community First',
    'Bulshada Ugu Horreysa',
    'المجتمع أولاً',
    'Supporting local communities and building lasting relationships.',
    'Taageerida bulshooyinka dalka iyo dhisidda xiriirka joogtada ah.',
    'دعم المجتمعات المحلية وبناء علاقات دائمة.',
    'community',
    'bg-blue-100 text-blue-600',
    2,
    TRUE
  ),
  (
    'Regional Leader',
    'Hoggaamiyaha Gobolka',
    'قائد إقليمي',
    'Setting standards for sustainable agriculture in the Horn of Africa.',
    'Go''aamaynta heerarka beeraha waarta ee Geeska Afrika.',
    'وضع معايير للزراعة المستدامة في القرن الأفريقي.',
    'leader',
    'bg-purple-100 text-purple-600',
    3,
    TRUE
  ),
  (
    'Sustainable Growth',
    'Koritaanka Waarta',
    'نمو مستدام',
    'Committed to eco-friendly practices that preserve our land for future generations.',
    'Waxaan u go''anaynaa hababka deegaanka ilaalinta ah ee ilaalinta dhulkeena mustaqbalka.',
    'ملتزمون بممارسات صديقة للبيئة تحافظ على أرضنا للأجيال القادمة.',
    'growth',
    'bg-orange-100 text-orange-600',
    4,
    TRUE
  );
