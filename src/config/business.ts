/**
 * Central Business & Policy Configuration
 * 
 * IMPORTANT RULE: Do NOT invent company-specific legal values.
 * Replace placeholders below with actual business entity values prior to legal publication.
 */

export const businessConfig = {
  legalName: "[COMPANY LEGAL NAME]",
  brandName: "LUXE Commerce",
  businessAddress: "[BUSINESS ADDRESS]",
  gstNumber: "[GST NUMBER / TAX ID]",
  registrationNumber: "[BUSINESS REGISTRATION NUMBER]",

  support: {
    email: "[SUPPORT EMAIL]",
    phone: "[SUPPORT PHONE]",
    whatsapp: "[WHATSAPP SUPPORT NUMBER]",
    hours: "[SUPPORT HOURS: e.g. Mon-Sat 10:00 AM - 7:00 PM IST]",
  },

  returns: {
    enabled: true,
    returnWindowDays: "[RETURN WINDOW DAYS: e.g. 7 Days]",
    returnShippingFee: "[RETURN SHIPPING RULE]",
  },

  refunds: {
    processingTime: "[REFUND PROCESSING TIME: e.g. 5-7 Business Days]",
    method: "Original Payment Method or Store Credit",
  },

  cancellations: {
    cancellationWindow: "[CANCELLATION WINDOW: e.g. Before Order Dispatch]",
  },

  shipping: {
    processingTime: "[ORDER PROCESSING TIME: e.g. 24-48 Hours]",
    deliveryEstimate: "[DELIVERY ESTIMATE: e.g. 2-5 Business Days]",
    freeShippingThreshold: "₹999",
  },
};
