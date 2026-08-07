import { SupportTicket } from "@/types/erp";

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "TCK-1092",
    customerName: "Elena Hayes",
    customerEmail: "elena.hayes@example.com",
    subject: "Inquiry regarding custom leather strap sizing for Titanium Field Watch",
    priority: "High",
    status: "Open",
    assignedTo: "Support Staff",
    createdAt: "2026-08-07 14:20",
    messages: [
      {
        sender: "customer",
        text: "Hi, I ordered the Titanium Field Watch. Can I get an extra leather strap in dark tan?",
        timestamp: "2026-08-07 14:20",
      },
    ],
  },
  {
    id: "TCK-1091",
    customerName: "Marcus Johnson",
    customerEmail: "marcus.j@example.com",
    subject: "Shipping delay query for Order #ORD-9931",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Pradeep (Super Admin)",
    createdAt: "2026-08-06 10:15",
    messages: [
      {
        sender: "customer",
        text: "Could you please confirm the tracking status of my order?",
        timestamp: "2026-08-06 10:15",
      },
    ],
  },
];

export async function getSupportTickets(): Promise<SupportTicket[]> {
  return MOCK_TICKETS;
}
