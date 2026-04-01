export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  stock: number;
  tags: string[];
  isNew?: boolean;
  ageGroup?: 'kids' | 'teenage' | 'women';
  jewelryType?: 'imitation' | 'real';
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export const categories: Category[] = [
  { id: 'necklaces', name: 'Necklaces', image: '/images/necklace-sober-1.jpg', count: 12 },
  { id: 'earrings', name: 'Earrings', image: '/images/imitation-4.jpg', count: 10 },
  { id: 'rings', name: 'Rings', image: '/images/ring-2.jpg', count: 8 },
  { id: 'bracelets', name: 'Bracelets & Bangles', image: '/images/bangle-set-1.jpg', count: 10 },
  { id: 'sets', name: 'Bridal Sets', image: '/images/bridal-complete-1.jpg', count: 6 },
  { id: 'kids', name: 'Kids Collection', image: '/images/kids-set-1.jpg', count: 4 },
];

// Imitation Jewelry: ₹1,000 - ₹40,000
// Real Jewelry: ₹60,000 - ₹1,50,000

export const products: Product[] = [
  // ========== IMITATION JEWELRY (₹1,000 - ₹40,000) ==========
  
  // Necklaces
  {
    id: '1',
    name: 'Kundan Pearl Necklace Set',
    category: 'necklaces',
    subcategory: 'traditional',
    price: 4500,
    description: 'Beautiful imitation kundan necklace set with green enamel stones and faux pearls. Traditional bridal look at an affordable price.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Stones': 'Artificial Kundan',
      'Pearls': 'Faux Pearls',
      'Weight': '85 grams'
    },
    images: ['/images/imitation-1.jpg'],
    stock: 25,
    tags: ['imitation', 'kundan', 'bridal', 'affordable'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '2',
    name: 'Antique Peacock Choker',
    category: 'necklaces',
    subcategory: 'traditional',
    price: 3200,
    description: 'Stunning antique gold-finish choker with peacock motifs, ruby-colored stones and pearl drops. Perfect for traditional occasions.',
    specifications: {
      'Material': 'Antique Gold-plated',
      'Stones': 'Artificial Ruby',
      'Pearls': 'Faux Pearls',
      'Weight': '95 grams'
    },
    images: ['/images/imitation-2.jpg'],
    stock: 18,
    tags: ['imitation', 'antique', 'peacock', 'traditional'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '3',
    name: 'CZ Diamond Choker',
    category: 'necklaces',
    subcategory: 'contemporary',
    price: 2800,
    description: 'Elegant cubic zirconia choker necklace in silver tone setting. Modern floral design that sparkles like real diamonds.',
    specifications: {
      'Material': 'Silver-plated Alloy',
      'Stones': 'Cubic Zirconia',
      'Weight': '45 grams'
    },
    images: ['/images/imitation-3.jpg'],
    stock: 30,
    tags: ['imitation', 'cz', 'contemporary', 'affordable'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '4',
    name: 'Simple Gold Pendant Necklace',
    category: 'necklaces',
    subcategory: 'dailywear',
    price: 1200,
    description: 'Simple elegant imitation gold necklace with small round pendant, perfect for daily wear.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Chain Length': '18 inches',
      'Weight': '15 grams'
    },
    images: ['/images/necklace-sober-1.jpg'],
    stock: 40,
    isNew: true,
    tags: ['imitation', 'dailywear', 'simple', 'affordable'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '5',
    name: 'Pearl Drop Necklace',
    category: 'necklaces',
    subcategory: 'elegant',
    price: 1800,
    description: 'Delicate imitation silver necklace with single pearl drop pendant, elegant and sophisticated.',
    specifications: {
      'Material': 'Silver-plated Alloy',
      'Pearl': 'Faux Pearl',
      'Chain Length': '16 inches',
      'Weight': '12 grams'
    },
    images: ['/images/necklace-sober-2.jpg'],
    stock: 35,
    tags: ['imitation', 'pearl', 'elegant', 'simple'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '6',
    name: 'Oxidized Tribal Necklace',
    category: 'necklaces',
    subcategory: 'traditional',
    price: 2200,
    description: 'Beautiful oxidized silver necklace with turquoise and coral beads. Rajasthani tribal design with elephant motifs.',
    specifications: {
      'Material': 'Oxidized Alloy',
      'Stones': 'Turquoise, Coral',
      'Weight': '110 grams'
    },
    images: ['/images/imitation-6.jpg'],
    stock: 22,
    tags: ['imitation', 'oxidized', 'tribal', 'bohemian'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },

  // Earrings
  {
    id: '7',
    name: 'Blue Jhumka Earrings',
    category: 'earrings',
    subcategory: 'traditional',
    price: 1200,
    description: 'Traditional blue kundan jhumka earrings with intricate gold-plated filigree work and pearl drops. Perfect for festive occasions.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Stones': 'Blue Kundan',
      'Pearls': 'Faux Pearls',
      'Weight': '25 grams'
    },
    images: ['/images/imitation-4.jpg'],
    stock: 40,
    tags: ['imitation', 'jhumka', 'traditional', 'earrings'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '8',
    name: 'CZ Halo Stud Earrings',
    category: 'earrings',
    subcategory: 'contemporary',
    price: 950,
    description: 'Classic cubic zirconia stud earrings with halo setting. Sparkling everyday elegance at an affordable price.',
    specifications: {
      'Material': 'White Gold-plated',
      'Stones': 'Cubic Zirconia',
      'Weight': '8 grams'
    },
    images: ['/images/imitation-8.jpg'],
    stock: 50,
    tags: ['imitation', 'cz', 'studs', 'everyday'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '9',
    name: 'Star Drop Earrings',
    category: 'earrings',
    subcategory: 'trendy',
    price: 1500,
    description: 'Trendy star-shaped drop earrings in rose gold tone with small crystals, perfect for teenage girls.',
    specifications: {
      'Material': 'Rose Gold-plated',
      'Stones': 'Crystals',
      'Weight': '12 grams'
    },
    images: ['/images/teen-set-1.jpg'],
    stock: 30,
    isNew: true,
    tags: ['imitation', 'trendy', 'teenage', 'earrings'],
    jewelryType: 'imitation',
    ageGroup: 'teenage'
  },

  // Rings
  {
    id: '10',
    name: 'Simple Ruby Ring',
    category: 'rings',
    subcategory: 'dailywear',
    price: 850,
    description: 'Simple elegant imitation gold ring with single small ruby stone, minimalist design for daily wear.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Stone': 'Artificial Ruby',
      'Size': 'Adjustable',
      'Weight': '5 grams'
    },
    images: ['/images/ring-2.jpg'],
    stock: 45,
    tags: ['imitation', 'ring', 'dailywear', 'simple'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '11',
    name: 'Blue Sapphire Cocktail Ring',
    category: 'rings',
    subcategory: 'statement',
    price: 1800,
    description: 'Beautiful imitation cocktail ring with large blue sapphire colored stone surrounded by small crystals, statement piece.',
    specifications: {
      'Material': 'Silver-plated Alloy',
      'Stone': 'Artificial Sapphire',
      'Size': 'Adjustable',
      'Weight': '15 grams'
    },
    images: ['/images/ring-3.jpg'],
    stock: 25,
    tags: ['imitation', 'ring', 'statement', 'cocktail'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '12',
    name: 'Heart Crystal Ring',
    category: 'rings',
    subcategory: 'cute',
    price: 650,
    description: 'Delicate imitation rose gold ring with small heart design and tiny crystals, perfect for teenage girls.',
    specifications: {
      'Material': 'Rose Gold-plated',
      'Stones': 'Crystals',
      'Size': 'Adjustable',
      'Weight': '4 grams'
    },
    images: ['/images/ring-4.jpg'],
    stock: 50,
    tags: ['imitation', 'ring', 'heart', 'teenage'],
    jewelryType: 'imitation',
    ageGroup: 'teenage'
  },

  // Bracelets & Bangles
  {
    id: '13',
    name: 'Gold Floral Bangles Set',
    category: 'bracelets',
    subcategory: 'traditional',
    price: 2800,
    description: 'Elegant set of 4 gold-plated imitation bangles with intricate floral engravings and small red stone accents.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Stones': 'Artificial Stones',
      'Set': '4 pieces',
      'Weight': '80 grams'
    },
    images: ['/images/bangle-set-1.jpg'],
    stock: 30,
    tags: ['imitation', 'bangles', 'traditional', 'set'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '14',
    name: 'Colorful Glass Bangles',
    category: 'bracelets',
    subcategory: 'traditional',
    price: 450,
    description: 'Beautiful set of 6 colorful glass bangles in pink, green, and gold tones, traditional Indian chura style.',
    specifications: {
      'Material': 'Glass',
      'Set': '6 pieces',
      'Weight': '50 grams'
    },
    images: ['/images/bangle-set-2.jpg'],
    stock: 60,
    tags: ['imitation', 'bangles', 'glass', 'colorful'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '15',
    name: 'Pearl Crystal Bangle Set',
    category: 'bracelets',
    subcategory: 'elegant',
    price: 2200,
    description: 'Elegant imitation pearl and crystal bangle set, white and silver tones, contemporary design for women.',
    specifications: {
      'Material': 'Silver-plated Alloy',
      'Pearls': 'Faux Pearls',
      'Set': '4 pieces',
      'Weight': '60 grams'
    },
    images: ['/images/bangle-set-3.jpg'],
    stock: 25,
    isNew: true,
    tags: ['imitation', 'bangles', 'pearl', 'elegant'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '16',
    name: 'Rose Gold Crystal Bracelet',
    category: 'bracelets',
    subcategory: 'contemporary',
    price: 1800,
    description: 'Delicate rose gold-plated bracelet with pink crystal stones and small pearls, modern and elegant design.',
    specifications: {
      'Material': 'Rose Gold-plated',
      'Stones': 'Pink Crystals',
      'Pearls': 'Faux Pearls',
      'Weight': '20 grams'
    },
    images: ['/images/imitation-5.jpg'],
    stock: 35,
    tags: ['imitation', 'bracelet', 'rose gold', 'contemporary'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '17',
    name: 'Gold Kada Bangle',
    category: 'bracelets',
    subcategory: 'traditional',
    price: 3500,
    description: 'Elegant imitation gold plated kada bangle with intricate floral design and small pearls.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Pearls': 'Faux Pearls',
      'Weight': '45 grams'
    },
    images: ['/images/bangle-kada-1.jpg'],
    stock: 20,
    tags: ['imitation', 'kada', 'bangle', 'traditional'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },

  // Bridal Sets
  {
    id: '18',
    name: 'Complete Bridal Set - Ruby',
    category: 'sets',
    subcategory: 'bridal',
    price: 15000,
    description: 'Beautiful imitation bridal complete set including necklace, earrings, maang tikka, and bangles in gold tone with red kundan stones.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Stones': 'Red Kundan',
      'Includes': 'Necklace, Earrings, Maang Tikka, Bangles',
      'Weight': '250 grams'
    },
    images: ['/images/bridal-complete-1.jpg'],
    stock: 15,
    tags: ['imitation', 'bridal', 'complete set', 'wedding'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },
  {
    id: '19',
    name: 'Bridal Maang Tikka',
    category: 'sets',
    subcategory: 'bridal',
    price: 1500,
    description: 'Elegant gold-plated maang tikka with red kundan stones and pearl drops. Perfect for completing your bridal look.',
    specifications: {
      'Material': 'Gold-plated Alloy',
      'Stones': 'Red Kundan',
      'Pearls': 'Faux Pearls',
      'Weight': '30 grams'
    },
    images: ['/images/imitation-7.jpg'],
    stock: 28,
    tags: ['imitation', 'maang tikka', 'bridal', 'forehead'],
    jewelryType: 'imitation',
    ageGroup: 'women'
  },

  // Kids Collection
  {
    id: '20',
    name: 'Kids Flower Jewelry Set',
    category: 'kids',
    subcategory: 'cute',
    price: 550,
    description: 'Cute colorful imitation jewelry set for kids, small flower shaped earrings and matching pendant necklace in pink and yellow colors.',
    specifications: {
      'Material': 'Child-safe Alloy',
      'Includes': 'Necklace, Earrings',
      'Weight': '15 grams'
    },
    images: ['/images/kids-set-1.jpg'],
    stock: 40,
    tags: ['kids', 'cute', 'flower', 'colorful'],
    jewelryType: 'imitation',
    ageGroup: 'kids'
  },

  // ========== REAL JEWELRY (₹60,000 - ₹1,50,000) ==========
  
  {
    id: '21',
    name: 'Royal Emerald Choker Set',
    category: 'necklaces',
    subcategory: 'bridal',
    price: 85000,
    description: 'Exquisite royal emerald choker featuring intricate diamond work in 22K gold. Perfect for weddings and special occasions.',
    specifications: {
      'Metal': '22K Gold',
      'Gemstone': 'Colombian Emerald',
      'Diamond Weight': '8.5 carats',
      'Weight': '85 grams',
      'Certification': 'IGI Certified'
    },
    images: ['/images/jewelry-1.jpg'],
    stock: 3,
    tags: ['real', 'gold', 'emerald', 'diamond', 'bridal'],
    jewelryType: 'real',
    ageGroup: 'women'
  },
  {
    id: '22',
    name: 'Peacock Emerald Necklace',
    category: 'necklaces',
    subcategory: 'traditional',
    price: 125000,
    description: 'Majestic peacock-inspired emerald necklace featuring elaborate filigree work in 22K gold.',
    specifications: {
      'Metal': '22K Gold',
      'Gemstone': 'Zambian Emerald',
      'Diamond Weight': '12 carats',
      'Weight': '120 grams',
      'Certification': 'GIA Certified'
    },
    images: ['/images/jewelry-2.jpg'],
    stock: 2,
    isNew: true,
    tags: ['real', 'gold', 'peacock', 'emerald', 'traditional'],
    jewelryType: 'real',
    ageGroup: 'women'
  },
  {
    id: '23',
    name: 'Solitaire Diamond Ring',
    category: 'rings',
    subcategory: 'engagement',
    price: 65000,
    description: 'Classic solitaire diamond engagement ring featuring a brilliant-cut diamond in a timeless six-prong setting.',
    specifications: {
      'Metal': '18K Gold',
      'Diamond Weight': '1.5 carats',
      'Diamond Grade': 'VS1, F Color',
      'Ring Size': 'Customizable',
      'Certification': 'GIA Certified'
    },
    images: ['/images/ring-1.jpg'],
    stock: 5,
    tags: ['real', 'gold', 'diamond', 'engagement', 'solitaire'],
    jewelryType: 'real',
    ageGroup: 'women'
  },
  {
    id: '24',
    name: 'Diamond Tennis Bracelet',
    category: 'bracelets',
    subcategory: 'elegant',
    price: 95000,
    description: 'Elegant diamond tennis bracelet featuring perfectly matched brilliant-cut diamonds set in 18K white gold.',
    specifications: {
      'Metal': '18K White Gold',
      'Diamond Weight': '5 carats',
      'Diamond Grade': 'VS, F-G Color',
      'Length': '7 inches',
      'Certification': 'IGI Certified'
    },
    images: ['/images/bracelet-2.jpg'],
    stock: 4,
    tags: ['real', 'white gold', 'diamond', 'tennis', 'elegant'],
    jewelryType: 'real',
    ageGroup: 'women'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};
