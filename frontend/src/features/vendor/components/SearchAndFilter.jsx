import { createContext, useState, useContext } from 'react';

const searchFilterContext = createContext();

const SearchAndFilter = ({ products, children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menu, setMenu] = useState('active');

  const filteredProducts = products?.filter((product) => {
    return (
      (searchTerm === '' ||
        product.productName
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase())) &&
      (menu === '' || product.status === menu)
    );
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
