import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Sidebar({ products, onCategoryChange, onPriceChange }) {
  const allProducts = useSelector(state => state.products) || [];
  const categories = useMemo(() => {
    const set = new Set((products || allProducts).map(p => p.category || 'Uncategorized'));
    return Array.from(set);
  }, [products, allProducts]);

  // Local state for slider value
  const [sliderValue, setSliderValue] = useState(75000);
  const maxPrice = 75000;

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setSliderValue(value);
    onPriceChange([0, value]);
  };

  return (
    <aside style={sidebarStyle}>
      <h2 style={headerStyle}>Filter</h2>
      <div style={{ margin: '24px 0' }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8, textAlign: 'center' }}>
          Price: {sliderValue}
        </div>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={sliderValue}
          style={sliderStyle}
          onChange={handleSliderChange}
        />
      </div>
      <h3 style={categoryHeaderStyle}>Category</h3>
      <div>
        {categories.map(c => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <input
              type="checkbox"
              id={`cat-${c}`}
              onChange={e => onCategoryChange(c, e.target.checked)}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            <label htmlFor={`cat-${c}`} style={{ fontSize: 18 }}>{c}</label>
          </div>
        ))}
      </div>
    </aside>
  );
}

const sidebarStyle = {
  width: 280,
  padding: 24,
  borderRadius: 18,
  background: '#f3f4fd',
  minHeight: '100vh',
  boxShadow: '0 2px 16px 0 rgba(99,102,241,0.08)',
  fontFamily: 'Inter, sans-serif',
  color: '#223',
  margin: 16
};

const headerStyle = {
  fontSize: 32,
  fontWeight: 800,
  textAlign: 'center',
  marginBottom: 12,
  color: '#234'
};

const categoryHeaderStyle = {
  fontSize: 24,
  fontWeight: 700,
  margin: '24px 0 16px 0',
  color: '#234',
  textAlign: 'center'
};

const sliderStyle = {
  width: '100%',
  accentColor: '#2563eb',
  marginTop: 8,
  marginBottom: 8
};
