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
    name: "Onyx Ceramic Mug",
    sku: "CM-ONX-01",
    category: "KITCHENWARE",
    price: 34.00,
    stock: 85,
    status: "ACTIVE",
    rating: 4.8,
    isNew: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop",
    description: "Handcrafted matte onyx ceramic mug designed with ergonomic balance and subtle tactile glaze."
  },
  {
    id: "prod-2",
    name: "Aluminum Type K2",
    sku: "KB-OBS-01-L",
    category: "TECHNOLOGY",
    price: 189.00,
    stock: 142,
    status: "ACTIVE",
    rating: 4.6,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
    description: "Precision CNC milled aluminum mechanical keyboard featuring hot-swappable switches and warm backlit lighting."
  },
  {
    id: "prod-3",
    name: "Alpaca Wool Throw",
    sku: "TX-ALP-04",
    category: "TEXTILES",
    price: 115.00,
    originalPrice: 140.00,
    stock: 45,
    status: "ACTIVE",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
    description: "100% sustainable Peruvian alpaca wool blanket with naturally insulating weave and raw fringed edge."
  },
  {
    id: "prod-4",
    name: "Brass Hourglass",
    sku: "DC-HRS-02",
    category: "DECOR",
    price: 65.00,
    stock: 28,
    status: "ACTIVE",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    description: "Solid brushed brass frame supporting hand-blown glass containing fine neutral quartz sand for a 30-minute timer."
  },
  {
    id: "prod-5",
    name: "Obsidian Pour-Over Setup",
    sku: "KT-PO-09",
    category: "KITCHENWARE",
    price: 145.00,
    stock: 19,
    status: "ACTIVE",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop",
    description: "Minimalist ceramic drip coffee maker with heat-resistant borosilicate glass server and bamboo base."
  },
  {
    id: "prod-6",
    name: "Titanium Field Watch",
    sku: "AC-WTCH-01",
    category: "ACCESSORIES",
    price: 450.00,
    stock: 8,
    status: "LOW STOCK",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    description: "Grade 5 titanium military spec field watch with sapphire crystal glass and vegetable-tanned Italian leather band."
  },
  {
    id: "prod-7",
    name: "Alloy Hub 7-in-1",
    sku: "AC-HUB-07-S",
    category: "ACCESSORIES",
    price: 59.99,
    stock: 12,
    status: "LOW STOCK",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=800&auto=format&fit=crop",
    description: "Anodized aluminum multiport USB-C hub supporting 4K HDMI, 100W Power Delivery, and dual high-speed SD card slots."
  },
  {
    id: "prod-8",
    name: "Ergo Desk Mat",
    sku: "AC-MAT-LG-C",
    category: "ACCESSORIES",
    price: 29.00,
    stock: 0,
    status: "DRAFT",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    description: "Charcoal wool felt desk mat with non-slip organic rubber backing for quiet mouse operation and warmth."
  },
  {
    id: "prod-9",
    name: "Glide Wireless Mouse",
    sku: "MS-GLD-01-W",
    category: "PERIPHERALS",
    price: 85.00,
    stock: 215,
    status: "ACTIVE",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
    description: "Sleek ergonomic wireless mouse crafted in matte white shell with whisper-quiet tactile switches."
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
        productName: "Luxe Mechanical Keyboard",
        quantity: 1,
        price: 240.00,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=200&auto=format&fit=crop"
      },
      {
        productName: "Ergo-X Executive Chair",
        quantity: 1,
        price: 1000.00,
        image: "https://images.unsplash.com/photo-1580481072645-022f9a6d1209?q=80&w=200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "#ORD-9931",
    customerName: "Marcus Johnson",
    customerEmail: "marcus.j@example.com",
    avatarInitials: "MJ",
    date: "Oct 24, 2023 at 11:15 AM",
    amount: 850.50,
    status: "Processing",
    items: [
      {
        productName: "Titanium Field Watch",
        quantity: 1,
        price: 450.00,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "#ORD-9930",
    customerName: "Sarah Chen",
    customerEmail: "sarah.chen@example.com",
    avatarInitials: "SC",
    date: "Oct 23, 2023 at 4:45 PM",
    amount: 3100.00,
    status: "Shipped",
    items: [
      {
        productName: "The Minimalist Sofa",
        quantity: 1,
        price: 3100.00,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "#ORD-9929",
    customerName: "Thomas Wright",
    customerEmail: "twright@example.com",
    avatarInitials: "TR",
    date: "Oct 23, 2023 at 9:20 AM",
    amount: 125.00,
    status: "Delivered",
    items: [
      {
        productName: "Alpaca Wool Throw",
        quantity: 1,
        price: 115.00,
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=200&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "#ORD-7352",
    customerName: "Jane Doe",
    customerEmail: "jane.doe@example.com",
    avatarInitials: "JD",
    date: "Oct 24, 2023",
    amount: 1299.00,
    status: "Shipped",
    items: []
  },
  {
    id: "#ORD-7351",
    customerName: "Michael Smith",
    customerEmail: "msmith@example.com",
    avatarInitials: "MS",
    date: "Oct 24, 2023",
    amount: 45.50,
    status: "Pending",
    items: []
  },
  {
    id: "#ORD-7350",
    customerName: "Alice Lee",
    customerEmail: "alice.l@example.com",
    avatarInitials: "AL",
    date: "Oct 23, 2023",
    amount: 349.99,
    status: "Delivered",
    items: []
  },
  {
    id: "#ORD-7349",
    customerName: "Bruce Wayne",
    customerEmail: "bruce@wayne-ent.com",
    avatarInitials: "BW",
    date: "Oct 23, 2023",
    amount: 8450.00,
    status: "Delivered",
    items: []
  }
];

export const MOCK_INVENTORY_ALERTS = [
  {
    id: "alert-1",
    title: "Pro Mechanical Keyboard",
    status: "Only 4 left in stock",
    type: "danger",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "alert-2",
    title: "Noise Cancelling Headphones",
    status: "Out of stock",
    type: "danger",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "alert-3",
    title: "Ergonomic Desk Chair",
    status: "Low stock (12 remaining)",
    type: "warning",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6d1209?q=80&w=120&auto=format&fit=crop"
  }
];

export const MOCK_CART: CartItem[] = [
  {
    id: "cart-1",
    product: MOCK_PRODUCTS[4], // Obsidian Pour-Over Setup
    variant: "MATTE BLACK / STANDARD",
    quantity: 1
  },
  {
    id: "cart-2",
    product: MOCK_PRODUCTS[5], // Titanium Field Watch
    variant: "NAVY DIAL / LEATHER STRAP",
    quantity: 1
  }
];
