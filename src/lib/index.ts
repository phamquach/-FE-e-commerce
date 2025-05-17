
export function convertSlugToText(slug = "") {
  const slugDeCode: string = decodeURIComponent(slug);

  return slugDeCode
    .split('-')
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

export function convertSpaceToDash(val: string) {
  return val.replace(/\s+/g, "-")
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export function isAllFieldsNotNull<T extends object>(obj: T): boolean {
  return Object.values(obj).every((value) => value !== null && value !== undefined && value !== "");
}