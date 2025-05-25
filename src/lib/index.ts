
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

export function isObjectShallowEqual<T extends object>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;
  if (keys1.length !== keys2.length) return false;
  return keys1.every(key => obj1[key] === obj2[key]);
}