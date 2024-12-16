import { useSearchFilter } from './SearchAndFilter';
const SearchInput = () => {
  const { searchTerm, setSearchTerm } = useSearchFilter();

  return (
    <input
      type="text"
      placeholder="Search by product name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
    />
  );
};

export default SearchInput;
