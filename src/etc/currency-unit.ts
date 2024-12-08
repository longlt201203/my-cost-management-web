const CurrencyUnit = {
  kVND: {
    code: "kVND",
    label: "VND",
  },
  usd: {
    code: "usd",
    label: "USD",
  },
} as const;

export function getCurrencyUnit(key: string) {
  return Object.values(CurrencyUnit).find((item) => item.code === key);
}

export default CurrencyUnit;
