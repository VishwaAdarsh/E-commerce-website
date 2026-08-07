import { AuditLog } from "@/types/erp";

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-1",
    adminId: "usr-admin-1",
    adminName: "Pradeep (Super Admin)",
    action: "Updated product SKU KB-OBS-01-L price to $189.00",
    module: "Products",
    timestamp: "2026-08-07 18:30:12",
    ipAddress: "192.168.1.1",
  },
  {
    id: "log-2",
    adminId: "usr-admin-1",
    adminName: "Pradeep (Super Admin)",
    action: "Fulfill Order #ORD-9932 via Shiprocket AWB982341",
    module: "Orders",
    timestamp: "2026-08-07 18:15:44",
    ipAddress: "192.168.1.1",
  },
];

export async function logAdminAction(action: string, module: string): Promise<AuditLog> {
  const newLog: AuditLog = {
    id: `log-${Date.now()}`,
    adminId: "usr-admin-1",
    adminName: "Pradeep (Super Admin)",
    action,
    module,
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    ipAddress: "127.0.0.1",
  };
  MOCK_AUDIT_LOGS.unshift(newLog);
  return newLog;
}
