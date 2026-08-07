export type ErpRole = "Super Admin" | "Admin" | "Manager" | "Support Staff";

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  module: string;
  timestamp: string;
  ipAddress: string;
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  assignedTo?: string;
  createdAt: string;
  messages: {
    sender: "customer" | "staff";
    text: string;
    timestamp: string;
  }[];
}
