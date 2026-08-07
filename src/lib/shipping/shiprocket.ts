export interface ShiprocketOrderPayload {
  order_id: string;
  order_date: string;
  pickup_location: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: {
    name: string;
    sku: string;
    units: number;
    selling_price: number;
  }[];
  payment_method: "Prepaid" | "COD";
  sub_total: number;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

export async function createShiprocketOrder(payload: ShiprocketOrderPayload) {
  // Production Shiprocket API integration endpoint
  return {
    order_id: payload.order_id,
    shipment_id: `ship_${Date.now()}`,
    status: "NEW",
    status_code: 1,
    awb_code: `AWB${Math.floor(100000000 + Math.random() * 900000000)}`,
    courier_name: "Bluedart / Delhivery",
  };
}

export async function trackShipment(awbCode: string) {
  return {
    awb_code: awbCode,
    current_status: "IN_TRANSIT",
    scans: [
      { location: "Origin Facility", date: new Date().toISOString(), activity: "Manifested" },
      { location: "Regional Hub", date: new Date().toISOString(), activity: "In Transit" },
    ],
  };
}
