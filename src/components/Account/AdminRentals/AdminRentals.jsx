import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole, makeApiRequest } from '../../utils/JwtUtility';
import MyRentalsCarDisplay from '../MyRentals/MyRentalsCarDisplay/MyRentalsCarDisplay';
import { List, X } from '@phosphor-icons/react';
import './AdminRentals.css';

const AdminRentals = () => {
  const navigate = useNavigate();
  const role = getRole();

  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 1150);
  const sidebarRef = useRef(null);

  const [providers, setProviders] = useState([]);
  const [selectedProviderId, setSelectedProviderId] = useState(null);
  const [cars, setCars] = useState([]);
  const [isLoadingProviders, setIsLoadingProviders] = useState(true);
  const [isLoadingCars, setIsLoadingCars] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
  const handleResize = () => {
    // When width changes, update sidebar visibility based on screen size
    if (window.innerWidth > 1150) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false); // Hide sidebar on mobile by default
    }
  };  
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 1150 && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) &&
          !event.target.classList.contains('toggle-sidebar-btn')) {
        setSidebarVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        const data = await makeApiRequest('http://localhost:8080/api/providers');
        setProviders(data);
        if (data.length > 0) setSelectedProviderId(data[0].id);
      } catch (error) {
        console.error('Failed to fetch providers:', error);
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
      setIsLoadingCars(true);
      try {
        const data = await makeApiRequest(
          `http://localhost:8080/api/cars/my-cars/${selectedProviderId}`
        );
        setCars(data);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
        setCars([]);
      } finally {
        setIsLoadingCars(false);
      }
    }
    fetchCars();
  }, [selectedProviderId]);

  return (
    <section className="admin-rentals-layout">
        <aside 
        ref={sidebarRef}
        className={`providers-list ${sidebarVisible ? 'visible' : 'hidden'}`}
      >
        <div className="providers-header">
          <h2>Providers</h2>
          {/* Close button - only visible on mobile */}
          <button 
            className="close-sidebar-btn mobile-only"
            onClick={toggleSidebar}
            aria-label="Close providers sidebar"
          >
            <X size={24} weight="bold" />
          </button>
        </div>
        
        <div className="search-container">
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
                  onClick={() => {
                    setSelectedProviderId(provider.id);
                    // On mobile, close sidebar after selection
                    if (window.innerWidth <= 1150) {
                      setSidebarVisible(false);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedProviderId(provider.id);
                      e.preventDefault();
                      // On mobile, close sidebar after selection
                      if (window.innerWidth <= 1150) {
                        setSidebarVisible(false);
                      }
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
      
      <main className={`provider-cars-list ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
        <div className="provider-cars-list-header">      
          <button 
            className="toggle-sidebar-btn mobile-only"
            onClick={toggleSidebar}
            aria-label={sidebarVisible ? "Hide providers sidebar" : "Show providers sidebar"}
            aria-expanded={sidebarVisible}
          >
            <List size={24} weight="bold" />
        </button>
          <h1>Cars for {selectedProviderId ? providers.find(p => p.id === selectedProviderId)?.companyName : 'Provider'}</h1>
        </div>
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