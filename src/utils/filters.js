export function applyFilters(products = [], { search = "", category = "all", priceRange = [0, Infinity] }) {
  const [min, max] = priceRange;
  const s = (search || "").trim().toLowerCase();
  return products.filter(p => {
    const matchesSearch = s === "" || (p.title && p.title.toLowerCase().includes(s));
    const matchesCategory = category === "all" || (p.category === category);
    const price = Number(p.price) || 0;
    const matchesPrice = price >= min && price <= max;
    return matchesSearch && matchesCategory && matchesPrice;
  });
}
