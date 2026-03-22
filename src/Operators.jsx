import { useState, useEffect } from 'react';
import OperatorModal from './OperatorModal';

export default function Operators() {
  // ✅ Static Dummy Data
  const dummyOperators = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      role: "Admin",
      games: 5,
      revenue: "₹25,000",
    },
    {
      id: 2,
      name: "Amit Verma",
      email: "amit@gmail.com",
      phone: "9123456780",
      role: "Operator",
      games: 3,
      revenue: "₹12,500",
    },
    {
      id: 3,
      name: "Neha Singh",
      email: "neha@gmail.com",
      phone: "9988776655",
      role: "Operator",
      games: 2,
      revenue: "₹8,000",
    },
  ];

  const [operators, setOperators] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // ❌ API CALL DISABLED
    // fetchOperators();

    // ✅ Static Data Load
    setOperators(dummyOperators);
    setLoading(false);
  }, []);

  // ❌ API function (commented)
  /*
  const fetchOperators = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/operators', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      setOperators(data.operators || []);
    } catch (err) {
      setError('Failed to load operators');
    } finally {
      setLoading(false);
    }
  };
  */

  const handleAddOperator = (newOperator) => {
    setOperators([...operators, { ...newOperator, id: Date.now() }]);
    setShowModal(false);
  };

  const handleDeleteOperator = async (id) => {
    if (!confirm('Delete this operator?')) return;

    // ❌ API DELETE DISABLED
    /*
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/operators/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (err) {
      alert('Failed to delete operator');
    }
    */

    // ✅ Local delete
    setOperators(operators.filter(op => op.id !== id));
  };

  const filteredOperators = operators.filter(op =>
    op.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading operators...</div>;

  return (
    <div className="operators-container">
      <div className="operators-header">
        <h2>Operators Management</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Operator
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by operator name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <table className="operators-table">
        <thead>
          <tr>
            <th>Operator Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Games</th>
            <th>Revenue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOperators.map(operator => (
            <tr key={operator.id}>
              <td><strong>{operator.name}</strong></td>
              <td>{operator.email}</td>
              <td>{operator.phone}</td>
              <td>{operator.role}</td>
              <td>{operator.games || '0'}</td>
              <td>{operator.revenue || '₹0'}</td>
              <td><span className="status-badge active">Active</span></td>
              <td>
                <button className="edit-btn">Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteOperator(operator.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <OperatorModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddOperator}
        />
      )}
    </div>
  );
}