-- Seed Data for News Articles with Multi-language Support
-- Run this after 017_update_news_articles_multilang.sql

-- Set search path to mire_farm_website schema
SET search_path TO mire_farm_website, public;

-- Insert News Articles Data with multi-language support
-- Also populate old columns (title, excerpt, etc.) with English values for backward compatibility
INSERT INTO mire_farm_website.news_articles (
  title, excerpt, content, badge, author,
  title_en, title_so, title_ar,
  excerpt_en, excerpt_so, excerpt_ar,
  content_en, content_so, content_ar,
  badge_en, badge_so, badge_ar,
  author_en, author_so, author_ar,
  image, emoji, date, active, display_order
) VALUES
  (
    'Regional Agriculture Officials Visit Mire Farms', -- title (old column, English for backward compatibility)
    'Officials from the Ministry of Agriculture toured our facilities to learn about our organic farming practices and discuss potential collaboration opportunities.', -- excerpt
    'Representatives from the Ministry of Agriculture, along with international agricultural experts, visited Mire Farms to observe our sustainable farming practices. The delegation was impressed by our pesticide-free methods and the quality of our produce.', -- content
    'Official Visit', -- badge
    'Farm Management', -- author
    'Regional Agriculture Officials Visit Mire Farms', -- title_en
    'Saraakiisha Beeraha Gobolka ayaa Booqday Beeraha Mire', -- title_so
    'زيارة مسؤولي الزراعة الإقليميين لمزرعة مير', -- title_ar
    'Officials from the Ministry of Agriculture toured our facilities to learn about our organic farming practices and discuss potential collaboration opportunities.', -- excerpt_en
    'Saraakiisha Wasaaradda Beeraha ayaa wareegay goobaha aanu ku leenahay si ay u bartaan hababkayaga beeraha nooca ah oo ay ka wada hadlaan fursadaha iskaashiga.', -- excerpt_so
    'قام مسؤولو وزارة الزراعة بجولة في مرافقنا للتعرف على ممارساتنا الزراعية العضوية ومناقشة فرص التعاون المحتملة.', -- excerpt_ar
    'Representatives from the Ministry of Agriculture, along with international agricultural experts, visited Mire Farms to observe our sustainable farming practices. The delegation was impressed by our pesticide-free methods and the quality of our produce.', -- content_en
    'Wakiilada ka socda Wasaaradda Beeraha, iyaga oo la socda khabiirrada beeraha caalamiga ah, ayaa booqday Beeraha Mire si ay u arkaan hababkayaga beeraha waarta. Wafdigii ayaa xiiseynay hababkayaga aan waxyeello lahayn iyo tayada alaabtayada.', -- content_so
    'زار ممثلون من وزارة الزراعة، إلى جانب خبراء زراعيين دوليين، مزرعة مير لمراقبة ممارساتنا الزراعية المستدامة. أعجب الوفد بأساليبنا الخالية من المبيدات وجودة منتجاتنا.', -- content_ar
    'Official Visit', -- badge_en
    'Booqashada Rasmi ah', -- badge_so
    'زيارة رسمية', -- badge_ar
    'Farm Management', -- author_en
    'Maamulka Beeraha', -- author_so
    'إدارة المزرعة', -- author_ar
    '/images/gellary-1.jpg',
    '🏛️',
    'December 10, 2024',
    TRUE,
    1
  ),
  (
    'Mire Farms Expands to New Regional Markets', -- title
    'We are excited to announce that our organic produce is now available in markets across Djibouti and Ethiopia, marking a significant milestone in our expansion plans.', -- excerpt
    'After months of preparation and meeting international quality standards, Mire Farms has successfully launched distribution channels in Djibouti and Ethiopia. This expansion represents our commitment to bringing quality organic produce to the wider Horn of Africa region.', -- content
    'Expansion', -- badge
    'Business Development', -- author
    'Mire Farms Expands to New Regional Markets', -- title_en
    'Beeraha Mire ayaa ku faafay Suuqyada Gobolka Cusub', -- title_so
    'توسع مزرعة مير إلى أسواق إقليمية جديدة', -- title_ar
    'We are excited to announce that our organic produce is now available in markets across Djibouti and Ethiopia, marking a significant milestone in our expansion plans.', -- excerpt_en
    'Waxaan ku faraxsanahay inaan ku dhawaaqno in alaabtayada nooca ah ay hadda heli karaan suuqyada ku yaala Jabuuti iyo Itoobiya, taasoo ah calaamad muhiim ah oo ah qorshaha faafinta.', -- excerpt_so
    'يسعدنا أن نعلن أن منتجاتنا العضوية متوفرة الآن في الأسواق عبر جيبوتي وإثيوبيا، مما يمثل علامة فارقة مهمة في خطط توسعنا.', -- excerpt_ar
    'After months of preparation and meeting international quality standards, Mire Farms has successfully launched distribution channels in Djibouti and Ethiopia. This expansion represents our commitment to bringing quality organic produce to the wider Horn of Africa region.', -- content_en
    'Kadib bilooyin tayaynta ah iyo buuxinta heerarka tayada caalamiga ah, Beeraha Mire ayaa si guul leh u bilaabay waddooyinka qaybinta ee Jabuuti iyo Itoobiya. Faafintan waxay mataysaa go''aankayaga inaan keeno alaabta nooca ah ee tayada leh gobolka weyn ee Geeska Afrika.', -- content_so
    'بعد أشهر من التحضير والوفاء بمعايير الجودة الدولية، أطلقت مزرعة مير بنجاح قنوات التوزيع في جيبوتي وإثيوبيا. يمثل هذا التوسع التزامنا بتقديم منتجات عضوية عالية الجودة إلى منطقة القرن الأفريقي الأوسع.', -- content_ar
    'Expansion', -- badge_en
    'Faafin', -- badge_so
    'توسع', -- badge_ar
    'Business Development', -- author_en
    'Horumarinta Ganacsiga', -- author_so
    'تطوير الأعمال', -- author_ar
    '/images/gellary-2.jpg',
    '🌍',
    'November 28, 2024',
    TRUE,
    2
  ),
  (
    'Community Farmer Training Program Launch', -- title
    'Mire Farms launches comprehensive training program to help local farmers transition to sustainable organic farming practices.', -- excerpt
    'Our new farmer training initiative aims to empower the local agricultural community with knowledge and skills in organic farming. The program covers sustainable practices, natural pest management, and efficient water usage.', -- content
    'Community', -- badge
    'Community Outreach', -- author
    'Community Farmer Training Program Launch', -- title_en
    'Barnaamijka Tababarka Beeraha Bulshada', -- title_so
    'إطلاق برنامج تدريب المزارعين المجتمعي', -- title_ar
    'Mire Farms launches comprehensive training program to help local farmers transition to sustainable organic farming practices.', -- excerpt_en
    'Beeraha Mire ayaa bilaabay barnaamij tababar oo buuxa si ay u caawiyaan beerayaasha dalka inay u gudbaan hababka beeraha waarta ee nooca ah.', -- excerpt_so
    'تطلق مزرعة مير برنامج تدريبي شامل لمساعدة المزارعين المحليين على الانتقال إلى ممارسات الزراعة العضوية المستدامة.', -- excerpt_ar
    'Our new farmer training initiative aims to empower the local agricultural community with knowledge and skills in organic farming. The program covers sustainable practices, natural pest management, and efficient water usage.', -- content_en
    'Hormuudkayaga cusub ee tababarka beeraha waxa uu ujeedaa inuu awood siiyo bulshada beeraha dalka aqoon iyo xirfado beeraha nooca ah. Barnaamijku wuxuu ka hadlaa hababka waarta, maamulka cayayaanka dabiiciga ah, iyo isticmaalka biyaha si fiican loo isticmaalo.', -- content_so
    'تهدف مبادرة تدريب المزارعين الجديدة إلى تمكين المجتمع الزراعي المحلي بالمعرفة والمهارات في الزراعة العضوية. يغطي البرنامج الممارسات المستدامة وإدارة الآفات الطبيعية والاستخدام الفعال للمياه.', -- content_ar
    'Community', -- badge_en
    'Bulshada', -- badge_so
    'المجتمع', -- badge_ar
    'Community Outreach', -- author_en
    'Gaadhista Bulshada', -- author_so
    'التواصل المجتمعي', -- author_ar
    '/images/gellary-3.jpg',
    '👨‍🌾',
    'November 15, 2024',
    TRUE,
    3
  ),
  (
    'Record Harvest Season at Mire Farms', -- title
    'This season''s harvest exceeded expectations, demonstrating the effectiveness of our sustainable farming methods and dedicated team.', -- excerpt
    'Thanks to favorable weather conditions and our improved organic farming techniques, this harvest season has been our most successful to date. We''ve seen significant increases in both yield and quality across all our crops.', -- content
    'Milestone', -- badge
    'Farm Operations', -- author
    'Record Harvest Season at Mire Farms', -- title_en
    'Muddo Go''aan oo Cusub ee Beeraha Mire', -- title_so
    'موسم حصاد قياسي في مزرعة مير', -- title_ar
    'This season''s harvest exceeded expectations, demonstrating the effectiveness of our sustainable farming methods and dedicated team.', -- excerpt_en
    'Go''aankii xilligan ayaa ka baxay filashada, taasoo muujinaysa waxtarka hababkayaga beeraha waarta iyo kooxdayada go''an u ah.', -- excerpt_so
    'تجاوز حصاد هذا الموسم التوقعات، مما يوضح فعالية أساليبنا الزراعية المستدامة وفريقنا المتفاني.', -- excerpt_ar
    'Thanks to favorable weather conditions and our improved organic farming techniques, this harvest season has been our most successful to date. We''ve seen significant increases in both yield and quality across all our crops.', -- content_en
    'Mahad celinta xaaladaha cimilada wanaagsan iyo farsamadayada beeraha nooca ah ee la horumariyay, xilligani go''aanka ayaa ah midkii ugu guulaystay ilaa hadda. Waxaanu aragnay kordhinta weyn ee soo saarka iyo tayada dhammaan beerahayaga.', -- content_so
    'بفضل الظروف الجوية المواتية وتقنياتنا الزراعية العضوية المحسنة، كان موسم الحصاد هذا الأكثر نجاحًا حتى الآن. لاحظنا زيادات كبيرة في كل من الإنتاجية والجودة عبر جميع محاصيلنا.', -- content_ar
    'Milestone', -- badge_en
    'Calaamad', -- badge_so
    'معلم بارز', -- badge_ar
    'Farm Operations', -- author_en
    'Hawlaha Beeraha', -- author_so
    'عمليات المزرعة', -- author_ar
    '/images/gellary-4.jpg',
    '🌾',
    'October 30, 2024',
    TRUE,
    4
  ),
  (
    'New Irrigation System Improves Water Efficiency', -- title
    'Installation of modern drip irrigation system reduces water usage by 40% while improving crop yields.', -- excerpt
    'Our investment in modern irrigation infrastructure is paying dividends. The new system ensures optimal water distribution to all crops while significantly reducing water waste, supporting our commitment to environmental sustainability.', -- content
    'Innovation', -- badge
    'Infrastructure Team', -- author
    'New Irrigation System Improves Water Efficiency', -- title_en
    'Nidaamka Biyaha Cusub ayaa Horumarinta Biyaha', -- title_so
    'نظام الري الجديد يحسن كفاءة المياه', -- title_ar
    'Installation of modern drip irrigation system reduces water usage by 40% while improving crop yields.', -- excerpt_en
    'Gelinta nidaamka biyaha casri ah ee dhagaxa ayaa yareeyay isticmaalka biyaha 40% halka ay horumariyaan soo saarka beeraha.', -- excerpt_so
    'تقليل استخدام المياه بنسبة 40٪ مع تحسين غلة المحاصيل من خلال تركيب نظام الري بالتنقيط الحديث.', -- excerpt_ar
    'Our investment in modern irrigation infrastructure is paying dividends. The new system ensures optimal water distribution to all crops while significantly reducing water waste, supporting our commitment to environmental sustainability.', -- content_en
    'Maalgashigayaga nidaamka biyaha casri ah ayaa faa''iidooyin bixinaya. Nidaamka cusub wuxuu hubinayaa qaybinta biyaha ugu fiican dhammaan beeraha halka ay si weyn u yareeyaan khasaaraha biyaha, taasoo taageeraysa go''aankayaga waarta deegaanka.', -- content_so
    'استثمارنا في البنية التحتية للري الحديث يؤتي ثماره. يضمن النظام الجديد التوزيع الأمثل للمياه لجميع المحاصيل مع تقليل هدر المياه بشكل كبير، مما يدعم التزامنا بالاستدامة البيئية.', -- content_ar
    'Innovation', -- badge_en
    'Abuuritaan', -- badge_so
    'الابتكار', -- badge_ar
    'Infrastructure Team', -- author_en
    'Kooxda Dhismaha', -- author_so
    'فريق البنية التحتية', -- author_ar
    '/images/gellary-5.jpg',
    '💧',
    'October 12, 2024',
    TRUE,
    5
  ),
  (
    'Mire Farms Celebrates First Year Anniversary', -- title
    'Reflecting on a successful first year of operation and looking forward to continued growth and community impact.', -- excerpt
    'Since establishing our farm in 2024, we''ve achieved remarkable milestones including successful harvests, market expansion, and positive community impact. We''re grateful for the support of our community and excited for what the future holds.', -- content
    'Anniversary', -- badge
    'Farm Management', -- author
    'Mire Farms Celebrates First Year Anniversary', -- title_en
    'Beeraha Mire ayaa Xusayay Sannadgii Ugu Horeeyay', -- title_so
    'تحتفل مزرعة مير بالذكرى السنوية الأولى', -- title_ar
    'Reflecting on a successful first year of operation and looking forward to continued growth and community impact.', -- excerpt_en
    'Wax ka fikirista sannadkii ugu horeeyay ee guul leh oo hawsha ah iyo eegista horumarka iyo saamaynta bulshada ee socon doonta.', -- excerpt_so
    'التفكير في السنة الأولى الناجحة من العمل والتطلع إلى النمو المستمر والتأثير المجتمعي.', -- excerpt_ar
    'Since establishing our farm in 2024, we''ve achieved remarkable milestones including successful harvests, market expansion, and positive community impact. We''re grateful for the support of our community and excited for what the future holds.', -- content_en
    'Laga bilaabo markii aanu beerahayaga aasaasnay 2024, waxaanu gaarnay calaamadooyin aad u wanaagsan oo ay ku jiraan go''aamyo guulaystay, faafinta suuqa, iyo saamaynta wanaagsan ee bulshada. Waxaanu ku mahadcelinahay taageerada bulshadayada waxaanan xiiseynahay waxa mustaqbalku leeyahay.', -- content_so
    'منذ إنشاء مزرعتنا في عام 2024، حققنا معالم رائعة بما في ذلك الحصاد الناجح وتوسع السوق والتأثير الإيجابي على المجتمع. نحن ممتنون لدعم مجتمعنا ومتحمسون لما يحمله المستقبل.', -- content_ar
    'Anniversary', -- badge_en
    'Sannadguurad', -- badge_so
    'ذكرى سنوية', -- badge_ar
    'Farm Management', -- author_en
    'Maamulka Beeraha', -- author_so
    'إدارة المزرعة', -- author_ar
    '/images/gellary-6.jpg',
    '🎉',
    'September 20, 2024',
    TRUE,
    6
  )
ON CONFLICT DO NOTHING;
