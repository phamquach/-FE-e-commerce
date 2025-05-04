
export function convertSlugToText(slug = "") {
  const slugDeCode: string = decodeURIComponent(slug);

  return slugDeCode
    .split('-')
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
