import { createClient } from "@/lib/supabase/client";

export interface PincodeCheckResult {
  eligible: boolean;
  estimatedDelivery: string;
  codAvailable: boolean;
  message: string;
}

export interface ProductSpecification {
  material: string;
  finish: string;
  dimensions: string;
  weight: string;
  countryOfOrigin: string;
  careInstructions: string;
  brandStory: string;
}

export interface ProductQuestion {
  id: string;
  productId: string;
  customerName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  createdAt: string;
}

export const MOCK_SPECS: Record<string, ProductSpecification> = {
  "prod-1": {
    material: "Sustainable Terracotta Clay",
    finish: "Hand-finished Matte Satin",
    dimensions: "28 cm (H) x 18 cm (W)",
    weight: "1.4 kg",
    countryOfOrigin: "India",
    careInstructions: "Wipe with soft damp cloth. Avoid harsh chemical abrasive cleaners.",
    brandStory: "LUXE Craftsmanship Studios partners with regional ceramic artisans across Rajasthan to preserve ancient coil and wheel pottery techniques.",
  },
};

export const MOCK_QUESTIONS: ProductQuestion[] = [
  {
    id: "q-101",
    productId: "prod-1",
    customerName: "Arjun Mehta",
    question: "Is this vessel waterproof and suitable for fresh flowers with water?",
    answer: "Yes! The internal chamber features a non-toxic food-safe waterproof glaze suitable for fresh floral arrangements.",
    answeredBy: "LUXE Care Specialist",
    createdAt: "2026-08-04",
  },
  {
    id: "q-102",
    productId: "prod-1",
    customerName: "Priya Sharma",
    question: "What is the exact height of the vase opening?",
    answer: "The neck opening measures approximately 8.5 cm in diameter.",
    answeredBy: "LUXE Design Studio",
    createdAt: "2026-08-06",
  },
];

export async function checkPincodeEligibility(pincode: string): Promise<PincodeCheckResult> {
  const cleanPin = pincode.trim();
  if (cleanPin.length !== 6 || isNaN(Number(cleanPin))) {
    return {
      eligible: false,
      estimatedDelivery: "",
      codAvailable: false,
      message: "Please enter a valid 6-digit Indian PIN code.",
    };
  }

  // Calculate delivery date range (2 to 4 days from today)
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 2);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 4);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startStr = `${deliveryStart.getDate()} ${months[deliveryStart.getMonth()]}`;
  const endStr = `${deliveryEnd.getDate()} ${months[deliveryEnd.getMonth()]}`;

  return {
    eligible: true,
    estimatedDelivery: `Express Delivery by ${startStr} – ${endStr}`,
    codAvailable: true,
    message: "Delivery & Cash on Delivery (COD) available for your area!",
  };
}

export async function getProductSpecifications(productId: string): Promise<ProductSpecification> {
  return MOCK_SPECS[productId] || MOCK_SPECS["prod-1"];
}

export async function getProductQuestions(productId: string): Promise<ProductQuestion[]> {
  return MOCK_QUESTIONS.filter((q) => q.productId === productId || q.productId === "prod-1");
}

export async function submitProductQuestion(productId: string, customerName: string, question: string): Promise<ProductQuestion> {
  const newQ: ProductQuestion = {
    id: `q-${Date.now()}`,
    productId,
    customerName,
    question,
    createdAt: new Date().toISOString().split("T")[0],
  };
  MOCK_QUESTIONS.unshift(newQ);
  return newQ;
}
