import {useContext} from 'react';
import {FilterContext} from '../contexts/FilterContext';

const useFilter = () => {
  const {filters, setFilters} = useContext(FilterContext);

  return {
    filters,
    setFilters
  }
}

export default useFilter;
