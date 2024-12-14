type StatusStyle = {
  variant: "default" | "outline"
  className: string
  label: string
}

export function statusOrder(status: string): StatusStyle {
  switch (status) {
    case "pay_success":
      return {
        variant: "default",
        className: "bg-green-500 capitalize p-2",
        label: "Pay Success",
      }
    case "processing":
      return {
        variant: "outline",
        className: "bg-blue-500 capitalize p-2 text-white",
        label: "Processing",
      }
    case "pending":
      return {
        variant: "outline",
        className: "bg-yellow-500 capitalize p-2 text-white",
        label: "Pending",
      }
    default:
      return {
        variant: "outline",
        className: "bg-gray-500 capitalize p-2 text-white",
        label: status.replace("_", " "),
      }
  }
}
