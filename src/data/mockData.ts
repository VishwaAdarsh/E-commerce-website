export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  status: 'ACTIVE' | 'LOW STOCK' | 'DRAFT';
  rating: number;
  isNew?: boolean;
  isBestseller?: boolean;
  image: string;
  description: string;
  variants?: {
    colors?: string[];
    sizes?: string[];
  };
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  avatarInitials: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  items: {
    productName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

export interface CartItem {
  id: string;
  product: Product;
  variant: string;
  quantity: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Artisanal Terracotta Vessel",
    sku: "DC-VSS-01",
    category: "DECOR",
    price: 180.00,
    originalPrice: 220.00,
    stock: 85,
    status: "ACTIVE",
    rating: 4.9,
    isNew: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    description: "Handcrafted matte terracotta ceramic vessel designed with ergonomic balance and warm organic tone."
  },
  {
    id: "prod-2",
    name: "Aluminum Type K2 Keyboard",
    sku: "KB-OBS-01-L",
    category: "TECHNOLOGY",
    price: 189.00,
    originalPrice: 210.00,
    stock: 142,
    status: "ACTIVE",
    rating: 4.8,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
    description: "Precision CNC milled aluminum mechanical keyboard featuring hot-swappable switches and warm backlit illumination."
  },
  {
    id: "prod-3",
    name: "Peruvian Alpaca Wool Throw",
    sku: "TX-ALP-04",
    category: "TEXTILES",
    price: 115.00,
    originalPrice: 140.00,
    stock: 45,
    status: "ACTIVE",
    rating: 5.0,
    isNew: true,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
    description: "100% sustainable Peruvian alpaca wool blanket with naturally insulating weave and raw fringed edge."
  },
  {
    id: "prod-4",
    name: "Sculptural Brass Hourglass",
    sku: "DC-HRS-02",
    category: "DECOR",
    price: 65.00,
    stock: 28,
    status: "ACTIVE",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    description: "Solid brushed brass frame supporting hand-blown glass containing fine neutral quartz sand."
  },
  {
    id: "prod-5",
    name: "Obsidian Ceramic Pour-Over",
    sku: "KT-PO-09",
    category: "KITCHENWARE",
    price: 145.00,
    originalPrice: 165.00,
    stock: 19,
    status: "ACTIVE",
    rating: 4.9,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop",
    description: "Minimalist ceramic drip coffee maker with heat-resistant borosilicate glass server and bamboo base."
  },
  {
    id: "prod-6",
    name: "Titanium Field Watch No. 01",
    sku: "AC-WTCH-01",
    category: "ACCESSORIES",
    price: 450.00,
    stock: 8,
    status: "LOW STOCK",
    rating: 4.9,
    isNew: true,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    description: "Grade 5 titanium military spec field watch with sapphire crystal glass and vegetable-tanned Italian leather strap."
  },
  {
    id: "prod-7",
    name: "Minimalist Lounge Chair",
    sku: "FN-LNG-07",
    category: "FURNITURE",
    price: 890.00,
    originalPrice: 1050.00,
    stock: 14,
    status: "ACTIVE",
    rating: 4.9,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    description: "Solid ash wood armless lounge chair upholstered in tactile bouclé fabric with ergonomic inclination."
  },
  {
    id: "prod-8",
    name: "Acoustic Over-Ear Headphones",
    sku: "AU-HDP-02",
    category: "TECHNOLOGY",
    price: 320.00,
    originalPrice: 380.00,
    stock: 36,
    status: "ACTIVE",
    rating: 4.8,
    isNew: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    description: "Studio-grade wireless acoustic headphones featuring active noise cancellation and memory foam leather earcups."
  },
  {
    id: "prod-9",
    name: "Architectural Table Lamp",
    sku: "LT-TBL-09",
    category: "LIGHTING",
    price: 240.00,
    stock: 22,
    status: "ACTIVE",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    description: "Dimmable warm LED desk lamp with matte steel arm and weighted circular brass foundation."
  },
  {
    id: "prod-10",
    name: "Natural Linen Bedding Set",
    sku: "TX-LNN-12",
    category: "TEXTILES",
    price: 260.00,
    originalPrice: 310.00,
    stock: 30,
    status: "ACTIVE",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop",
    description: "Pre-washed French flax linen duvet cover and pillowcase pair with breathable soft organic texture."
  },
  {
    id: "prod-11",
    name: "Glide Wireless Ergonomic Mouse",
    sku: "MS-GLD-01-W",
    category: "PERIPHERALS",
    price: 85.00,
    stock: 215,
    status: "ACTIVE",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
    description: "Sleek ergonomic wireless mouse crafted in matte shell with whisper-quiet tactile optical switches."
  },
  {
    id: "prod-12",
    name: "Raw Terracotta Tableware Bowl",
    sku: "KT-BWL-03",
    category: "KITCHENWARE",
    price: 48.00,
    stock: 64,
    status: "ACTIVE",
    rating: 4.8,
    isNew: true,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
    description: "Hand-turned organic terracotta soup and grain bowl finished with food-safe satin glaze interior."
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "#ORD-9932",
    customerName: "Elena Hayes",
    customerEmail: "elena.hayes@example.com",
    avatarInitials: "EH",
    date: "Oct 24, 2023 at 2:30 PM",
    amount: 1240.00,
    status: "Pending",
    items: [
      {
        productName: "Aluminum Type K2 Keyboard",
        quantity: 1,
        price: 189.00,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=200&auto=format&fit=crop"
      },
      {
        productName: "Minimalist Lounge Chair",
        quantity: 1,
        price: 890.00,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "#ORD-9931",
    customerName: "Marcus Johnson",
    customerEmail: "marcus.j@example.com",
    avatarInitials: "MJ",
    date: "Oct 24, 2023 at 11:15 AM",
    amount: 450.00,
    status: "Processing",
    items: [
      {
        productName: "Titanium Field Watch No. 01",
        quantity: 1,
        price: 450.00,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop"
      }
    ]
  }
];

export const MOCK_INVENTORY_ALERTS = [
  {
    id: "alert-1",
    title: "Titanium Field Watch No. 01",
    status: "Only 8 left in stock",
    type: "danger",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "alert-2",
    title: "Obsidian Ceramic Pour-Over",
    status: "Low stock (19 remaining)",
    type: "warning",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=120&auto=format&fit=crop"
  }
];

export const MOCK_CART: CartItem[] = [
  {
    id: "cart-1",
    product: MOCK_PRODUCTS[0], // Artisanal Terracotta Vessel
    variant: "TERRACOTTA / STANDARD",
    quantity: 1
  },
  {
    id: "cart-2",
    product: MOCK_PRODUCTS[7], // Acoustic Over-Ear Headphones
    variant: "MATTE BLACK",
    quantity: 1
  }
];
