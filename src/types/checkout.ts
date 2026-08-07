export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export type ShippingOptionId = "standard" | "express";

export interface ShippingOption {
  id: ShippingOptionId;
  name: string;
  price: number;
  estimatedDelivery: string;
}

export interface CheckoutState {
  step: 1 | 2 | 3;
  shippingAddress: Address;
  shippingOption: ShippingOption;
  paymentMethod: "razorpay" | "card";
  isProcessing: boolean;
}
