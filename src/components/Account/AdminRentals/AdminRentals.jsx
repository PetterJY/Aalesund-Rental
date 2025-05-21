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
        const response = await fetch('http://localhost:8080/providers', {
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
        const response = await fetch(`http://localhost:8080/cars/my-cars/${selectedProviderId}`, {
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
    <section className="admin-rentals-layout">
      <aside className="providers-list">
        <h2>Providers</h2>
        
        <div className="search-container">
          <label htmlFor="provider-search" className="visually-hidden">
          </label>
          <input
            id="provider-search"
            type="search"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search providers by name or email"
          />
        </div>
        
        {isLoadingProviders ? (
          <p aria-live="polite">Loading providers...</p>
        ) : (
          <nav aria-label="Providers navigation">
            <ul role="listbox" aria-label="Provider list" className="provider-list">
              {filteredProviders.map(provider => (
                <li
                  key={provider.id}
                  role="option"
                  aria-selected={provider.id === selectedProviderId}
                  className={provider.id === selectedProviderId ? 'selected' : ''}
                  onClick={() => setSelectedProviderId(provider.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedProviderId(provider.id);
                      e.preventDefault();
                    }
                  }}
                  tabIndex={0}
                >
                  {provider.companyName || provider.email}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </aside>
      
      <main className="provider-cars-list">
        <h1>Cars for Provider</h1>
        
        <div aria-live="polite">
          {isLoadingCars ? (
            <p>Loading cars...</p>
          ) : cars.length === 0 ? (
            <p>This provider has no cars.</p>
          ) : (
            <section className="my-rentals-list" aria-label="Provider's cars">
              {cars.map(car => (
                <article key={car.id}>
                  <MyRentalsCarDisplay car={car} providerId={selectedProviderId}/>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    </section>
  );
};

export default AdminRentals;