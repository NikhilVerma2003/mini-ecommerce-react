function Filters({
  search,
  category,
  sort,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClearFilters
}) {
  return (
    <div style={filterStyle}>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Sort by price</option>
        <option value="low-high">Low → High</option>
        <option value="high-low">High → Low</option>
      </select>

      <button onClick={onClearFilters}>Clear Filters</button>
    </div>
  );
}

const filterStyle = {
  display: "flex",
  gap: "12px",
  marginBottom: "20px"
};

export default Filters;
