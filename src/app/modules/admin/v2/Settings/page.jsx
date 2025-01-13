import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ShieldCheckIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Layout from '../layout/page';
import axios from 'axios';

const SettingsPage = () => {
  const [isAccessControlOpen, setIsAccessControlOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, fullName: 'John Doe', email: 'johndoe@example.com', role: 'account' },
    { id: 2, fullName: 'Jane Smith', email: 'janesmith@example.com', role: 'Support' },
  ]);
  const [newUser, setNewUser] = useState({ fullName: '', email: '', password: '', role: 'account' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [errors, setErrors] = useState({ fullName: '', email: '', password: '' });

  const toggleAccessControl = () => {
    setIsAccessControlOpen(!isAccessControlOpen);
  };

  const validateInputs = () => {
    const errors = {};
    // Full name validation
    if (!newUser.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    } else if (newUser.fullName.length < 3) {
      errors.fullName = 'Full name must be at least 3 characters long.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUser.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(newUser.email)) {
      errors.email = 'Invalid email format.';
    }

    // Password validation
    if (!newUser.password.trim()) {
      errors.password = 'Password is required.';
    } else if (newUser.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    } else if (!/[0-9]/.test(newUser.password) || !/[!@#$%^&*]/.test(newUser.password)) {
      errors.password = 'Password must include at least one number and one special character.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddUserClick = () => {
    setNewUser({ fullName: '', email: '', password: '', role: 'account' });
    setEditingUserId(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEditUserClick = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    if (userToEdit) {
      setNewUser({ fullName: userToEdit.fullName, email: userToEdit.email, password: '', role: userToEdit.role });
      setEditingUserId(userId);
      setErrors({});
      setIsModalOpen(true);
    }
  };

  const handleSaveUser = async () => {
    if (!validateInputs()) {
      return;
    }

    if (editingUserId) {
      // Update existing user
      setUsers(users.map(user => (user.id === editingUserId ? { ...user, ...newUser } : user)));
    } else {
      // Add new user
      setUsers([...users, { id: Date.now(), ...newUser }]);
      const response = await axios.post("http://localhost:5000/v3/api/admin/register", newUser)
      console.log(response);
      
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white text-gray-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Manage Access Control Section */}
        <div className="border border-gray-300 rounded-lg mb-4">
          <button
            onClick={toggleAccessControl}
            className="w-full flex justify-between items-center px-4 py-3 text-left text-lg font-semibold bg-gray-200 hover:bg-gray-300 rounded-t-lg transition-colors duration-200"
          >
            <div className="flex items-center">
              <ShieldCheckIcon className="w-6 h-6 mr-3 text-gray-700" />
              Manage Access Control
            </div>
            {isAccessControlOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-700" /> : <ChevronDownIcon className="w-5 h-5 text-gray-700" />}
          </button>

          {isAccessControlOpen && (
            <div className="px-4 py-3 bg-gray-100 border-t border-gray-300">
              <p className="text-sm text-gray-600 mb-4">Add and manage users with specific access levels: Accounts, Support, and Sales.</p>

              {/* Add New User Button */}
              <button
                onClick={handleAddUserClick}
                className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5 inline-block" /> Add New User
              </button>

              {/* Manage Existing Users */}
              <div>
                <h2 className="text-lg font-semibold mb-3">Manage Users</h2>
                <ul className="space-y-4">
                  {users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center p-3 bg-gray-200 rounded-lg shadow-sm">
                      <div>
                        <h3 className="font-semibold">{user.fullName}</h3>
                        <p className="text-sm text-gray-600">Email ID: {user.email}</p>
                        <p className="text-sm text-gray-600">Role: {user.role}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => handleEditUserClick(user.id)}
                          className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Dialog Box */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{editingUserId ? 'Edit User' : 'Add New User'}</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Full Name */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                />
                {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Email ID</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              </div>

              {/* Role */}
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-900"
                >
                  <option value="account">Accounts</option>
                  <option value="support">Support</option>
                  <option value="carrier">Carrier</option>
                  <option value="sale">Sales</option>
                </select>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors"
                >
                  {editingUserId ? 'Save Changes' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SettingsPage;
