import { createContext, useState, useContext } from 'react';

const searchFilterContext = createContext();

const SearchAndFilter = ({ products, children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menu, setMenu] = useState('active');

  const filteredProducts = products?.filter((product) => {
    if (!product) return false;

    const normalizedSearchTerm = searchTerm || '';
    const normalizedMenu = menu || '';

    const matchesSearchTerm =
      normalizedSearchTerm === '' ||
      product.productName
        ?.toLowerCase()
        .includes(normalizedSearchTerm.toLowerCase());

    const matchesMenu =
      normalizedMenu === '' || product.status === normalizedMenu;

    return matchesSearchTerm && matchesMenu;
  });

  const value = {
    searchTerm,
    setSearchTerm,
    menu,
    setMenu,
    filteredProducts,
  };
  return (
    <searchFilterContext.Provider value={value}>
      {children}
    </searchFilterContext.Provider>
  );
};

const useSearchFilter = () => useContext(searchFilterContext);

export { useSearchFilter, SearchAndFilter };
