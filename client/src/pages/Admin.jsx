import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user || user.role !== 'admin') {
      alert('Access denied. Admin privileges required.');
      navigate('/login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 403) {
        alert('Access denied. Admin privileges required.');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      setUpdating(prev => ({ ...prev, [userId]: true }));
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update role');
      }

      const result = await response.json();
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, role: newRole } : user
        )
      );

      alert(result.message);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setUpdating(prev => ({ ...prev, [userId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="admin-container">
          <h1 className="page-title">Admin Dashboard</h1>
          <div className="loading-state">Loading users...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="admin-container">
          <h1 className="page-title">Admin Dashboard</h1>
          <div className="error-state">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="admin-container">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="admin-description">
          Manage user roles and permissions. Only users with 'admin' role can access this page.
        </p>

        <div className="admin-content">
          <h2 className="section-title">User Management</h2>
          <div className="section-box">
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Current Role</th>
                    <th>Change Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <select 
                          defaultValue={user.role}
                          onChange={(e) => updateUserRole(user._id, e.target.value)}
                          disabled={updating[user._id]}
                          className="role-select"
                        >
                          <option value="nonmember">Non-Member</option>
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        {updating[user._id] ? (
                          <span className="updating-text">Updating...</span>
                        ) : (
                          <button 
                            onClick={() => {
                              const select = document.querySelector(`select[data-user-id="${user._id}"]`);
                              if (select && select.value !== user.role) {
                                updateUserRole(user._id, select.value);
                              }
                            }}
                            className="update-btn"
                            data-user-id={user._id}
                          >
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-stats">
            <div className="stat-card">
              <h3>Total Users</h3>
              <p className="stat-number">{users.length}</p>
            </div>
            <div className="stat-card">
              <h3>Admins</h3>
              <p className="stat-number">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            <div className="stat-card">
              <h3>Members</h3>
              <p className="stat-number">{users.filter(u => u.role === 'member').length}</p>
            </div>
            <div className="stat-card">
              <h3>Non-Members</h3>
              <p className="stat-number">{users.filter(u => u.role === 'nonmember').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}