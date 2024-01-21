import { useMemo } from "react";

const removeAccentsAndSpecialChars = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, '');
};

const useFilter = (data, filterText, filters) => {
  return useMemo(() => {
    let result = data;

    const normalizedFilterText = removeAccentsAndSpecialChars(filterText.toLowerCase());

    if (filterText) {
      result = result.filter((item) => {
        const name = removeAccentsAndSpecialChars(item.name.toLowerCase());
        const phone = removeAccentsAndSpecialChars(item.phone.toLowerCase());
        const registrationDate = removeAccentsAndSpecialChars(item.registrationDate.toLowerCase());
        const status = removeAccentsAndSpecialChars(item.status.toLowerCase());

        return (
          name.includes(normalizedFilterText) ||
          phone.includes(normalizedFilterText) ||
          registrationDate.includes(normalizedFilterText) ||
          status.includes(normalizedFilterText)
        );
      });
    }

    if (filters.length > 0) {
      result = result.filter((item) => {
        return filters.every((filter) => {
          if (!filter.value) return true;
          const itemValue = removeAccentsAndSpecialChars(item[filter.columnId]?.toString().toLowerCase() || '');
          const filterValue = removeAccentsAndSpecialChars(filter.value.toLowerCase());

          switch (filter.operator) {
            case 'equals':
              return itemValue === filterValue;
            case 'contains':
              return itemValue.includes(filterValue);
            default:
              return true;
          }
        });
      });
    }

    return result;
  }, [data, filterText, filters]);
};

export default useFilter;
