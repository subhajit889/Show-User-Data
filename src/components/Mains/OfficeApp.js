import React, { useState, useEffect } from 'react';
import EditContact from './EditConract';
import AddUser from './Adduser';
import { fetchUsers } from '../api/Apihelper';
import "../styles/chatapp.css";
import { sortData, sortOptions } from './SortingUtils';

const OfficeApp = () => {
  const [users, setUsers] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = sortData(filteredData, sortColumn, sortDirection);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection((prevSortDirection) =>
        prevSortDirection === 'asc' ? 'desc' : 'asc'
      );
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowAddUser(false); // Close the add user functionality
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedContact.id ? updatedContact : user
      )
    );
    setEditingContact(null);
  };

  const handleCancel = () => {
    setEditingContact(null);
  };

  const handleSortOptionsToggle = () => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortOptionSelect = (option) => {
    handleSort(option);
    setShowSortOptions(false);
  };

  return (
    <div className="users-data-grid">
      <h1>Showing Your Employee's Data-base</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-input'
      />

      {!showAddUser ? (
        <button className="add-user-btn" onClick={() => setShowAddUser(true)}>
          Create User
        </button>
      ) : (
        <AddUser onAddUser={handleAddUser} onCancel={() => setShowAddUser(false)} />
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              Name{' '}
              {sortColumn === 'name' && sortDirection === 'asc' && '▲'}
              {sortColumn === 'name' && sortDirection === 'desc' && '▼'}
            </th>
            <th onClick={() => handleSort('username')}>
              Username{' '}
              {sortColumn === 'username' && sortDirection === 'asc' && '▲'}
              {sortColumn === 'username' && sortDirection === 'desc' && '▼'}
            </th>
            <th onClick={() => handleSort('email')}>
              Email{' '}
              {sortColumn === 'email' && sortDirection === 'asc' && '▲'}
              {sortColumn === 'email' && sortDirection === 'desc' && '▼'}
            </th>
            <th onClick={() => handleSort('phone')}>
              Phone{' '}
              {sortColumn === 'phone' && sortDirection === 'asc' && '▲'}
              {sortColumn === 'phone' && sortDirection === 'desc' && '▼'}
            </th>
            <th>
              <div className="sort-button-container">
                <button className="sort-button" onClick={handleSortOptionsToggle}>
                  Sort{' '}
                  {sortColumn && (
                    <>
                      ({sortColumn} {sortDirection === 'asc' ? 'A-Z' : 'Z-A'})
                    </>
                  )}
                </button>
                {showSortOptions && (
                  <div className="sort-options">
                    {sortOptions.map((option) => (
                      <button key={option.column} onClick={() => handleSortOptionSelect(option.column)}>
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEditContact(user)} className='edit-btn'>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`${currentPage} of ${totalPages}`}</span>
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
      {editingContact && (
        <EditContact contact={editingContact} onSaveContact={handleSaveContact} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default OfficeApp;
