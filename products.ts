// Product database with 50+ products
import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Food Items (5% GST)
  { id: 'rice', name: 'Rice', name_hi: 'चावल', category: 'food_items', unit: 'kg', price: 60, gst_rate: 5 },
  { id: 'wheat', name: 'Wheat', name_hi: 'गेहूं', category: 'food_items', unit: 'kg', price: 40, gst_rate: 5 },
  { id: 'sugar', name: 'Sugar', name_hi: 'चीनी', category: 'food_items', unit: 'kg', price: 42, gst_rate: 5 },
  { id: 'salt', name: 'Salt', name_hi: 'नमक', category: 'food_items', unit: 'kg', price: 20, gst_rate: 5 },
  { id: 'atta', name: 'Atta (Wheat Flour)', name_hi: 'आटा', category: 'food_items', unit: 'kg', price: 45, gst_rate: 5 },
  { id: 'dal', name: 'Dal (Lentils)', name_hi: 'दाल', category: 'food_items', unit: 'kg', price: 120, gst_rate: 5 },
  { id: 'toor_dal', name: 'Toor Dal', name_hi: 'तूर दाल', category: 'food_items', unit: 'kg', price: 140, gst_rate: 5 },
  { id: 'moong_dal', name: 'Moong Dal', name_hi: 'मूंग दाल', category: 'food_items', unit: 'kg', price: 130, gst_rate: 5 },
  { id: 'chana_dal', name: 'Chana Dal', name_hi: 'चना दाल', category: 'food_items', unit: 'kg', price: 110, gst_rate: 5 },
  { id: 'rajma', name: 'Rajma', name_hi: 'राजमा', category: 'food_items', unit: 'kg', price: 150, gst_rate: 5 },
  { id: 'oil', name: 'Cooking Oil', name_hi: 'तेल', category: 'food_items', unit: 'liter', price: 150, gst_rate: 5 },
  { id: 'mustard_oil', name: 'Mustard Oil', name_hi: 'सरसों तेल', category: 'food_items', unit: 'liter', price: 180, gst_rate: 5 },
  { id: 'ghee', name: 'Ghee', name_hi: 'घी', category: 'food_items', unit: 'kg', price: 500, gst_rate: 5 },
  { id: 'milk', name: 'Milk', name_hi: 'दूध', category: 'food_items', unit: 'liter', price: 60, gst_rate: 5 },
  { id: 'tea', name: 'Tea', name_hi: 'चाय', category: 'food_items', unit: 'pack', price: 250, gst_rate: 5 },
  { id: 'coffee', name: 'Coffee', name_hi: 'कॉफी', category: 'food_items', unit: 'pack', price: 300, gst_rate: 5 },
  { id: 'biscuit', name: 'Biscuits', name_hi: 'बिस्कुट', category: 'food_items', unit: 'pack', price: 30, gst_rate: 5 },
  { id: 'bread', name: 'Bread', name_hi: 'ब्रेड', category: 'food_items', unit: 'piece', price: 40, gst_rate: 5 },
  { id: 'eggs', name: 'Eggs', name_hi: 'अंडे', category: 'food_items', unit: 'piece', price: 6, gst_rate: 5 },
  { id: 'butter', name: 'Butter', name_hi: 'मक्खन', category: 'food_items', unit: 'pack', price: 250, gst_rate: 5 },
  { id: 'cheese', name: 'Cheese', name_hi: 'पनीर', category: 'food_items', unit: 'pack', price: 120, gst_rate: 5 },
  { id: 'yogurt', name: 'Yogurt', name_hi: 'दही', category: 'food_items', unit: 'pack', price: 40, gst_rate: 5 },
  { id: 'besan', name: 'Besan (Gram Flour)', name_hi: 'बेसन', category: 'food_items', unit: 'kg', price: 80, gst_rate: 5 },
  { id: 'maida', name: 'Maida (All Purpose Flour)', name_hi: 'मैदा', category: 'food_items', unit: 'kg', price: 40, gst_rate: 5 },
  { id: 'sooji', name: 'Sooji (Semolina)', name_hi: 'सूजी', category: 'food_items', unit: 'kg', price: 50, gst_rate: 5 },
  
  // General Goods (18% GST)
  { id: 'soap', name: 'Soap', name_hi: 'साबुन', category: 'general_goods', unit: 'piece', price: 40, gst_rate: 18 },
  { id: 'shampoo', name: 'Shampoo', name_hi: 'शैम्पू', category: 'general_goods', unit: 'bottle', price: 150, gst_rate: 18 },
  { id: 'toothpaste', name: 'Toothpaste', name_hi: 'टूथपेस्ट', category: 'general_goods', unit: 'piece', price: 80, gst_rate: 18 },
  { id: 'toothbrush', name: 'Toothbrush', name_hi: 'टूथब्रश', category: 'general_goods', unit: 'piece', price: 30, gst_rate: 18 },
  { id: 'detergent', name: 'Detergent', name_hi: 'डिटर्जेंट', category: 'general_goods', unit: 'kg', price: 120, gst_rate: 18 },
  { id: 'washing_powder', name: 'Washing Powder', name_hi: 'वाशिंग पाउडर', category: 'general_goods', unit: 'kg', price: 180, gst_rate: 18 },
  { id: 'dish_soap', name: 'Dish Soap', name_hi: 'बर्तन साबुन', category: 'general_goods', unit: 'bottle', price: 100, gst_rate: 18 },
  { id: 'hand_wash', name: 'Hand Wash', name_hi: 'हैंड वॉश', category: 'general_goods', unit: 'bottle', price: 80, gst_rate: 18 },
  { id: 'floor_cleaner', name: 'Floor Cleaner', name_hi: 'फ्लोर क्लीनर', category: 'general_goods', unit: 'bottle', price: 150, gst_rate: 18 },
  { id: 'toilet_cleaner', name: 'Toilet Cleaner', name_hi: 'टॉयलेट क्लीनर', category: 'general_goods', unit: 'bottle', price: 120, gst_rate: 18 },
  { id: 'matchbox', name: 'Matchbox', name_hi: 'माचिस', category: 'general_goods', unit: 'box', price: 10, gst_rate: 18 },
  { id: 'candle', name: 'Candles', name_hi: 'मोमबत्ती', category: 'general_goods', unit: 'pack', price: 40, gst_rate: 18 },
  { id: 'notebook', name: 'Notebook', name_hi: 'कॉपी', category: 'general_goods', unit: 'piece', price: 50, gst_rate: 18 },
  { id: 'pen', name: 'Pen', name_hi: 'पेन', category: 'general_goods', unit: 'piece', price: 10, gst_rate: 18 },
  { id: 'pencil', name: 'Pencil', name_hi: 'पेंसिल', category: 'general_goods', unit: 'piece', price: 5, gst_rate: 18 },
  { id: 'eraser', name: 'Eraser', name_hi: 'रबर', category: 'general_goods', unit: 'piece', price: 5, gst_rate: 18 },
  { id: 'batteries', name: 'Batteries', name_hi: 'बैटरी', category: 'general_goods', unit: 'pack', price: 60, gst_rate: 18 },
  { id: 'bulb', name: 'Light Bulb', name_hi: 'बल्ब', category: 'general_goods', unit: 'piece', price: 80, gst_rate: 18 },
  { id: 'mosquito_coil', name: 'Mosquito Coil', name_hi: 'मच्छर कॉइल', category: 'general_goods', unit: 'pack', price: 50, gst_rate: 18 },
  { id: 'agarbatti', name: 'Agarbatti (Incense)', name_hi: 'अगरबत्ती', category: 'general_goods', unit: 'pack', price: 40, gst_rate: 18 },
  { id: 'tissue_paper', name: 'Tissue Paper', name_hi: 'टिशू पेपर', category: 'general_goods', unit: 'pack', price: 30, gst_rate: 18 },
  { id: 'napkins', name: 'Napkins', name_hi: 'नैपकिन', category: 'general_goods', unit: 'pack', price: 80, gst_rate: 18 },
  
  // Luxury Items (28% GST)
  { id: 'cold_drink', name: 'Cold Drink', name_hi: 'कोल्ड ड्रिंक', category: 'luxury_items', unit: 'bottle', price: 40, gst_rate: 28 },
  { id: 'chocolate', name: 'Chocolate', name_hi: 'चॉकलेट', category: 'luxury_items', unit: 'piece', price: 50, gst_rate: 28 },
  { id: 'chips', name: 'Chips', name_hi: 'चिप्स', category: 'luxury_items', unit: 'pack', price: 20, gst_rate: 28 },
  { id: 'namkeen', name: 'Namkeen', name_hi: 'नमकीन', category: 'luxury_items', unit: 'pack', price: 30, gst_rate: 28 },
  { id: 'juice', name: 'Juice', name_hi: 'जूस', category: 'luxury_items', unit: 'bottle', price: 60, gst_rate: 28 },
  { id: 'ice_cream', name: 'Ice Cream', name_hi: 'आइसक्रीम', category: 'luxury_items', unit: 'piece', price: 80, gst_rate: 28 },
  { id: 'perfume', name: 'Perfume', name_hi: 'परफ्यूम', category: 'luxury_items', unit: 'bottle', price: 300, gst_rate: 28 },
  { id: 'cosmetics', name: 'Cosmetics', name_hi: 'सौंदर्य प्रसाधन', category: 'luxury_items', unit: 'piece', price: 250, gst_rate: 28 },
];

// Helper function to find product by name (supports Hindi and English)
export function findProduct(searchText: string): Product | undefined {
  const search = searchText.toLowerCase().trim();
  
  return PRODUCTS.find(p => 
    p.name.toLowerCase().includes(search) ||
    p.name_hi.includes(search) ||
    p.id === search
  );
}

// Extract items from natural language (Hindi + English mixed)
export function extractItemsFromText(text: string): Array<{
  productName: string;
  quantity: number;
  unit: string;
  price: number;
}> {
  const items: Array<{
    productName: string;
    quantity: number;
    unit: string;
    price: number;
  }> = [];
  
  // Common patterns: "2 kg rice 60", "1 liter oil 150", "500 gram salt 20"
  // Also: "2 kilo chawal 60 rupaye", "1 litre tel 150"
  
  // Split by commas or "aur" (and)
  const parts = text.toLowerCase().split(/,|और|aur/).map(s => s.trim());
  
  for (const part of parts) {
    // Extract numbers and words
    const numbers = part.match(/\d+(\.\d+)?/g);
    const words = part.split(/\s+/);
    
    if (!numbers || numbers.length < 2) continue;
    
    const quantity = parseFloat(numbers[0]);
    const price = parseFloat(numbers[numbers.length - 1]);
    
    // Find unit
    let unit = 'piece';
    const unitMap: { [key: string]: string } = {
      'kg': 'kg', 'kilo': 'kg', 'किलो': 'kg',
      'gram': 'gram', 'gm': 'gram', 'ग्राम': 'gram',
      'liter': 'liter', 'litre': 'liter', 'लीटर': 'liter',
      'piece': 'piece', 'pc': 'piece', 'पीस': 'piece',
      'pack': 'pack', 'packet': 'pack', 'पैकेट': 'pack',
      'bottle': 'bottle', 'बोतल': 'bottle',
      'box': 'box', 'डिब्बा': 'box',
    };
    
    for (const word of words) {
      if (unitMap[word]) {
        unit = unitMap[word];
        break;
      }
    }
    
    // Find product name (words between quantity and price)
    const productWords = words.filter(w => 
      !numbers.includes(w) && 
      !unitMap[w] && 
      !['rupaye', 'rupee', 'rs', 'रुपये'].includes(w)
    );
    
    const productName = productWords.join(' ');
    
    if (productName && quantity && price) {
      items.push({ productName, quantity, unit, price });
    }
  }
  
  return items;
}
