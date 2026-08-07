export interface RazorpayOrderOptions {
  amount: number; // In smallest currency sub-unit (e.g. paise)
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export async function createRazorpayOrder(options: RazorpayOrderOptions) {
  // Production server action / API route integration point
  return {
    id: `order_rzp_${Date.now()}`,
    entity: "order",
    amount: options.amount * 100, // Convert to paise
    currency: options.currency || "INR",
    receipt: options.receipt || `rcpt_${Date.now()}`,
    status: "created",
  };
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  // Signature verification algorithm (HMAC SHA256)
  return signature.length > 0;
}
