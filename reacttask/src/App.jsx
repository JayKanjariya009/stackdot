import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchName.toLowerCase()) &&
    user.address.city.toLowerCase().includes(filterCity.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>User List</h2>

      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={e => setSearchName(e.target.value)}
        style={{ marginRight: 10, padding: 5 }}
      />

      <input
        type="text"
        placeholder="Filter by city"
        value={filterCity}
        onChange={e => setFilterCity(e.target.value)}
        style={{ padding: 5 }}
      />

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {currentUsers.map(user => (
          <li key={user.id} style={{ marginBottom: 15, border: '1px solid #ccc', padding: 10 }}>
            <strong>{user.name}</strong><br />
            Email: {user.email}<br />
            City: {user.address.city}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              marginRight: 5,
              padding: '5px 10px',
              backgroundColor: currentPage === i + 1 ? '#404346ff' : '#e0e0e0',
              color: currentPage === i + 1 ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
