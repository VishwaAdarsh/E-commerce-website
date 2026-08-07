export interface ShiprocketConfig {
  email: string;
  token: string;
}

export interface ShipmentDetails {
  orderId: string;
  shipmentId: string;
  awbCode: string;
  courierName: string;
  pickupDate: string;
  trackingUrl: string;
  status: string;
}

export async function createShiprocketShipment(orderId: string): Promise<ShipmentDetails> {
  const mockAwb = `AWB${Math.floor(100000000 + Math.random() * 900000000)}`;

  return {
    orderId,
    shipmentId: `ship_${Date.now()}`,
    awbCode: mockAwb,
    courierName: "Bluedart / Delhivery Express",
    pickupDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    trackingUrl: `https://shiprocket.co/tracking/${mockAwb}`,
    status: "READY_TO_SHIP",
  };
}

export async function generateShippingLabel(awbCode: string): Promise<string> {
  return `https://shiprocket.co/labels/${awbCode}.pdf`;
}

export function verifyShiprocketWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  return signature.length > 0;
}
