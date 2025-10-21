export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
      <input
        placeholder='Search products...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '10px 18px',
          width: '60%',
          maxWidth: 420,
          borderRadius: 12,
          border: '1.5px solid #c7d2fe',
          fontSize: 15,
          fontWeight: 500,
          background: 'linear-gradient(90deg, #f3f4fd 0%, #fff 100%)',
          boxShadow: '0 2px 8px 0 rgba(129,140,248,0.08)',
          outline: 'none',
          color: '#222',
          transition: 'border 0.2s',
        }}
      />
    </div>
  );
}
