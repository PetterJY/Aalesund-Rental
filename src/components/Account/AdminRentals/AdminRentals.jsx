import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole } from '../../utils/JwtUtility';
import MyRentalsCarDisplay from '../MyRentals/MyRentalsCarDisplay/MyRentalsCarDisplay';
import './AdminRentals.css';

const AdminRentals = () => {
  const navigate = useNavigate();
  const role = getRole();

  const [providers, setProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [cars, setCars] = useState([]);
  const [isLoadingProviders, setIsLoadingProviders] = useState(true);
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProviders = providers.filter(provider =>
    provider.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Fetch all providers
  useEffect(() => {
    if (role !== 'ROLE_ADMIN') {
      navigate('/home');
      return;
    }
    async function fetchProviders() {
      setIsLoadingProviders(true);
      try {
        const response = await fetch('https://norwegian-rental.online/providers', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch providers');
        const data = await response.json();
        setProviders(data);
        if (data.length > 0) setSelectedProviderId(data[0].id);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoadingProviders(false);
      }
    }
    fetchProviders();
  }, [role, navigate]);

  // Fetch cars for selected provider
  useEffect(() => {
    if (!selectedProviderId) return;
    setIsLoadingCars(true);
    async function fetchCars() {
      try {
        const response = await fetch(`https://norwegian-rental.online/cars/my-cars/${selectedProviderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch cars');
        const data = await response.json();
        setCars(data);
      } catch (e) {
        console.error(e);
        setCars([]);
      } finally {
        setIsLoadingCars(false);
      }
    }
    fetchCars();
  }, [selectedProviderId]);

  return (
    <div className="admin-rentals-layout">
      <aside className="providers-list">
        <h3>Providers</h3>
        <input
          type="text"
          placeholder="Search providers..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {isLoadingProviders ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {filteredProviders.map(provider => (
              <li
                key={provider.id}
                className={provider.id === selectedProviderId ? 'selected' : ''}
                onClick={() => setSelectedProviderId(provider.id)}
                style={{ cursor: 'pointer', fontWeight: provider.id === selectedProviderId ? 'bold' : 'normal' }}
              >
                {provider.companyName || provider.email}
              </li>
            ))}
          </ul>
        )}
      </aside>
      <main className="provider-cars-list">
        <h2>Cars for Provider</h2>
        {isLoadingCars ? (
          <p>Loading cars...</p>
        ) : cars.length === 0 ? (
          <p>This provider has no cars.</p>
        ) : (
          <div className="my-rentals-list">
            {cars.map(car => (
              <MyRentalsCarDisplay key={car.id} car={car} providerId={selectedProviderId}/>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminRentals;