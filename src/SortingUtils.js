export const sortData = (data, sortColumn, sortDirection) => {
    return data.sort((a, b) => {
      if (sortColumn) {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (sortDirection === 'asc') {
          if (sortColumn === 'name' || sortColumn === 'username') {
            return aValue.localeCompare(bValue);
          } else if (sortColumn === 'email' || sortColumn === 'phone') {
            return aValue < bValue ? -1 : 1;
          }
        } else {
          if (sortColumn === 'name' || sortColumn === 'username') {
            return bValue.localeCompare(aValue);
          } else if (sortColumn === 'email' || sortColumn === 'phone') {
            return bValue < aValue ? -1 : 1;
          }
        }
      }
      return 0;
    });
  };
  
  export const sortOptions = [
    { column: 'name', label: 'Name (A-Z)' },
    { column: 'username', label: 'Username (A-Z)' },
    { column: 'email', label: 'Email (A-Z)' },
    { column: 'phone', label: 'Phone (A-Z)' },
  ];
  