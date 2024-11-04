import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CityForm = () => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } = useAuth0();
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    stateId: '',
    cityName: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStates();
    }
  }, [isAuthenticated]);

  const fetchStates = async () => {
    console.log("Generando token...");
    const token = await getAccessTokenSilently();
    console.log("Token generado:", token);

    try {
      console.log("Realizando solicitud GET a http://localhost:8080/general/api/v1/states...");
      const response = await axios.get('http://localhost:8080/general/api/v1/states', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Respuesta recibida:", response.data);
      setStates(response.data);
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      toast.error('Error fetching states');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      await axios.post('http://localhost:8080/general/api/v1/crearciudad', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('City created successfully!');
      setFormData({ stateId: '', cityName: '' });
    } catch (error) {
      toast.error('Error creating city');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">State</label>
        <select
          name="stateId"
          value={formData.stateId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a state</option>
          {states.map((state) => (
            <option key={state.id} value={state.id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City Name</label>
        <input
          type="text"
          name="cityName"
          value={formData.cityName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create City'}
      </button>
    </form>
  );
};

export default CityForm;