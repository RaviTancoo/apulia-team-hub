import { useMemo } from "react"

function useCertStatus(expiryDate) {
  return useMemo(() => {
    if (!expiryDate) {
      return { status: "Unknown", color: "gray", daysLeft: 0 }
    }

    const today = new Date().setHours(0, 0, 0, 0)
    const expiry = new Date(expiryDate).setHours(0, 0, 0, 0)

    const daysLeft = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    )

    if (daysLeft < 0) return { status: "Expired", color: "red", daysLeft }
    if (daysLeft <= 30) return { status: "Expiring", color: "orange", daysLeft }
    return { status: "Valid", color: "green", daysLeft }
  }, [expiryDate])
}

export { useCertStatus }