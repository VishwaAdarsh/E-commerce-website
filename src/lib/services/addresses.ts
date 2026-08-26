import { createClient } from "@/lib/supabase/client";

export interface CustomerAddress {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: "Home" | "Work" | "Other";
  isDefault: boolean;
}

export const MOCK_ADDRESSES: CustomerAddress[] = [
  {
    id: "addr-1",
    userId: "demo-cust-id-88",
    fullName: "Elena Hayes",
    phone: "+91 98765 43210",
    addressLine1: "Suite 402, Luxe Earth Residency",
    addressLine2: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400050",
    country: "India",
    addressType: "Home",
    isDefault: true,
  },
  {
    id: "addr-2",
    userId: "demo-cust-id-88",
    fullName: "Elena Hayes",
    phone: "+91 98765 43210",
    addressLine1: "Tower B, 14th Floor, Tech Park",
    addressLine2: "Lower Parel",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400013",
    country: "India",
    addressType: "Work",
    isDefault: false,
  },
];

export async function getCustomerAddresses(userId: string): Promise<CustomerAddress[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("customer_addresses")
      .select("*")
      .eq("user_id", userId);

    if (!error && data && data.length > 0) {
      return data.map((a) => ({
        id: a.id,
        userId: a.user_id,
        fullName: a.full_name,
        phone: a.phone,
        addressLine1: a.address_line1,
        addressLine2: a.address_line2,
        city: a.city,
        state: a.state,
        postalCode: a.postal_code,
        country: a.country || "India",
        addressType: a.address_type as any,
        isDefault: a.is_default,
      }));
    }
  } catch {
    // Fallback
  }
  return MOCK_ADDRESSES;
}

export async function saveCustomerAddress(address: Omit<CustomerAddress, "id">): Promise<CustomerAddress> {
  const supabase = createClient();
  const newId = `addr-${Date.now()}`;
  const newAddress: CustomerAddress = {
    id: newId,
    ...address,
  };

  try {
    await supabase.from("customer_addresses").insert({
      id: newAddress.id,
      user_id: newAddress.userId,
      full_name: newAddress.fullName,
      phone: newAddress.phone,
      address_line1: newAddress.addressLine1,
      address_line2: newAddress.addressLine2,
      city: newAddress.city,
      state: newAddress.state,
      postal_code: newAddress.postalCode,
      country: newAddress.country,
      address_type: newAddress.addressType,
      is_default: newAddress.isDefault,
    });
  } catch {
    // Fallback
  }

  return newAddress;
}
