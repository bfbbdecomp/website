export function prettyPercent(percent: number) {
  return percent.toFixed(2) + "%";
}

export function formatVirtualAddress(address: string | number | undefined): string {
  if (address === undefined || address === null) {
    return "?";
  }

  const num = typeof address === "string" ? parseInt(address, 10) : address;
  if (isNaN(num)) {
    return "?";
  }

  return "0x" + num.toString(16).toUpperCase();
}
