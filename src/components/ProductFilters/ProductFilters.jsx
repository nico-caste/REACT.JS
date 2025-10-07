import './ProductFilters.scss';

const ProductFilters = ({
  categories,
  brands,
  onCategoryChange,
  onBrandChange
}) => {
  return (
    <div className="product-filters">
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">Todas las Categorías</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <select onChange={(e) => onBrandChange(e.target.value)}>
        <option value="">Todas las Marcas</option>
        {brands.map(brand => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilters;