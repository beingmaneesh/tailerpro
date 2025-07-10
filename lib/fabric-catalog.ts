export interface FabricOption {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  texture: string;
  weight: string;
}

export const fabricCatalog: FabricOption[] = [
  // Cotton Fabrics
  {
    id: 'cotton-white',
    name: 'Premium White Cotton',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'cotton',
    description: 'Classic white cotton fabric, breathable and comfortable',
    texture: 'Smooth',
    weight: 'Medium'
  },
  {
    id: 'cotton-blue',
    name: 'Light Blue Cotton',
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'cotton',
    description: 'Soft light blue cotton, perfect for school uniforms',
    texture: 'Smooth',
    weight: 'Medium'
  },
  {
    id: 'cotton-navy',
    name: 'Navy Cotton Twill',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'cotton',
    description: 'Durable navy cotton twill with excellent color retention',
    texture: 'Textured',
    weight: 'Heavy'
  },

  // Polyester Blends
  {
    id: 'poly-grey',
    name: 'Charcoal Poly-Cotton',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'polyester',
    description: 'Wrinkle-resistant charcoal blend, easy care',
    texture: 'Smooth',
    weight: 'Light'
  },
  {
    id: 'poly-black',
    name: 'Black Performance Blend',
    image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'polyester',
    description: 'High-performance black fabric with moisture-wicking',
    texture: 'Smooth',
    weight: 'Light'
  },
  {
    id: 'poly-maroon',
    name: 'Maroon Stretch Blend',
    image: 'https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'polyester',
    description: 'Comfortable maroon fabric with stretch properties',
    texture: 'Smooth',
    weight: 'Medium'
  },

  // Wool Blends
  {
    id: 'wool-navy',
    name: 'Navy Wool Blend',
    image: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'wool',
    description: 'Premium navy wool blend for blazers and formal wear',
    texture: 'Textured',
    weight: 'Heavy'
  },
  {
    id: 'wool-forest',
    name: 'Forest Green Wool',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'wool',
    description: 'Rich forest green wool blend with natural warmth',
    texture: 'Textured',
    weight: 'Heavy'
  },

  // Specialty Fabrics
  {
    id: 'specialty-plaid',
    name: 'Classic School Plaid',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'specialty',
    description: 'Traditional plaid pattern for skirts and ties',
    texture: 'Woven',
    weight: 'Medium'
  },
  {
    id: 'specialty-stripe',
    name: 'Pinstripe Formal',
    image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'specialty',
    description: 'Elegant pinstripe pattern for formal uniforms',
    texture: 'Smooth',
    weight: 'Medium'
  }
];

export const fabricCategories = {
  cotton: {
    name: 'Cotton',
    description: 'Natural, breathable fabrics perfect for everyday wear',
    icon: '🌱'
  },
  polyester: {
    name: 'Polyester Blends',
    description: 'Durable, wrinkle-resistant fabrics with easy care',
    icon: '⚡'
  },
  wool: {
    name: 'Wool Blends',
    description: 'Premium fabrics for formal wear and blazers',
    icon: '🐑'
  },
  specialty: {
    name: 'Specialty',
    description: 'Unique patterns and textures for distinctive uniforms',
    icon: '✨'
  }
};