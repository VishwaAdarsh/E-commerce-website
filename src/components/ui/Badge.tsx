interface BadgeProps {
  status: string;
  className?: string;
}

export default function Badge({ status, className = "" }: BadgeProps) {
  const getStatusStyles = (statusStr: string) => {
    switch (statusStr.toUpperCase()) {
      case "SHIPPED":
        return "bg-[#ffdbc7] text-[#795f4f]"; // Warm soft peach badge
      case "PENDING":
        return "bg-[#ffdad6] text-[#93000a]"; // Warm soft red badge
      case "PROCESSING":
        return "bg-[#f8ebe6] text-[#845331]"; // Warm clay badge
      case "DELIVERED":
        return "bg-[#e2c0ac]/40 text-[#51443c]"; // Muted stone badge
      case "ACTIVE":
        return "bg-[#f8ebe6] text-[#735949]"; // Active pill badge
      case "LOW STOCK":
        return "bg-[#ffdad6] text-[#93000a]"; // Low stock red pill
      case "DRAFT":
        return "bg-[#ece0db] text-[#51443c]"; // Draft gray/brown pill
      default:
        return "bg-[#f8ebe6] text-[#51443c]";
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusStyles(status)} ${className}`}>
      {status}
    </span>
  );
}
