/*
  # Seed Artworks Data

  1. Insert sample artworks data
    - Populate the artworks table with the existing artwork data
*/

INSERT INTO artworks (id, title, medium, size, year, price, category, image_url, description, available) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440001',
    'Desert Convergence',
    'Acrylic on Canvas',
    '120 x 90 cm',
    '2024',
    2500,
    'painting',
    'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'A powerful exploration of Egyptian heritage through contemporary abstraction.',
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440002',
    'Eternal Forms',
    'Clay & Resin',
    '45 x 30 x 25 cm',
    '2023',
    1800,
    'sculpture',
    'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'Modern interpretation of classical Egyptian sculptural traditions.',
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440003',
    'Pharaoh''s Dream',
    'Stage Design',
    'Full Stage Production',
    '2024',
    0,
    'scenography',
    'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'Immersive set design blending ancient motifs with contemporary staging.',
    false
  ),
  (
    '550e8400-e29b-41d4-a716-446655440004',
    'Urban Mythology',
    'Mixed Media',
    '100 x 80 cm',
    '2023',
    2200,
    'painting',
    'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'Contemporary narrative painting exploring modern Egyptian identity.',
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440005',
    'Royal Regalia',
    'Costume Design',
    'Full Costume Set',
    '2024',
    0,
    'costume',
    'https://images.pexels.com/photos/1068881/pexels-photo-1068881.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'Elaborate costume design for theatrical production.',
    false
  ),
  (
    '550e8400-e29b-41d4-a716-446655440006',
    'Metamorphosis',
    'Stone-like Finish',
    '60 x 40 x 35 cm',
    '2023',
    2800,
    'sculpture',
    'https://images.pexels.com/photos/1183986/pexels-photo-1183986.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'Sculptural exploration of transformation and renewal.',
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440007',
    'Nile Reflections',
    'Acrylic on Canvas',
    '150 x 100 cm',
    '2024',
    3200,
    'painting',
    'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'Large-scale painting capturing the essence of the Nile at sunset.',
    true
  ),
  (
    '550e8400-e29b-41d4-a716-446655440008',
    'Ancient Echoes',
    'Bronze & Marble',
    '80 x 50 x 40 cm',
    '2023',
    4500,
    'sculpture',
    'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    'Monumental sculpture inspired by ancient Egyptian architecture.',
    true
  );