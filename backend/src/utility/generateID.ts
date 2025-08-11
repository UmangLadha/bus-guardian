export function generateIDFor(role: string) {
  const prefix = role === "Driver" ? "DRV" : "STD";
  const uniqueValue = Date.now().toString().slice(-5);
  const randomNo = Math.floor(100 + Math.random() * 900);
  return `${prefix}${uniqueValue}${randomNo}`;
}
