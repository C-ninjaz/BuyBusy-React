import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import { fetchProducts, productsSelectors } from '../store/slices/productsSlice';
import { applyFilters } from '../utils/filters';

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(productsSelectors.selectAll);
  const status = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, Infinity]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filtered = useMemo(() => applyFilters(products, { search, category: selectedCategory, priceRange }), [products, search, selectedCategory, priceRange]);

  if (status === 'loading') return <div style={{textAlign:'center', marginTop:50}}><PuffLoader /></div>;
  if (error) return <div style={{color:'red', textAlign:'center', marginTop:50}}>Error: {error}</div>;

  return (
    <div style={{display:'flex', gap:20}}>
      <Sidebar products={products} onCategoryChange={setSelectedCategory} onPriceChange={setPriceRange} />
      <div style={{flex:1, padding:12}}>
        <SearchBar value={search} onChange={setSearch} />
        <div className='product-list' style={{display:'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap:20}}>
          {filtered.length ? filtered.map(p => <ProductCard key={p.id} product={p} />) : <div>No products found</div>}
        </div>
      </div>
    </div>
  );
}
