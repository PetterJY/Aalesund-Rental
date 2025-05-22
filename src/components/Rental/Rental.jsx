import React, { useState, useRef, useEffect, useContext } from "react";
import { FunnelSimple, CaretDown, MagnifyingGlass, XCircle } from "@phosphor-icons/react";
import { getRole, makeApiRequest } from "../utils/JwtUtility";
import { BookingContext } from "../utils/BookingContext";
import logo from "../../resources/images/logo.png";
import CarDisplay from "./CarDisplay/CarDisplay";
import CarSelected from './CarSelected/CarSelected';
import IntervalSlider from "./IntervalSlider/IntervalSlider";
import "./Rental.css";

export default function Rental() {
  const [cars, setCars] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const containerRef = useRef(null);
  const [carsPerRow, setCarsPerRow] = useState(3);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const maxCarRentalPrice = 1000; // the max price of renting a car (per day)
  // TODO: retrieve this value by querying the rentals?

  const searchFieldRef = useRef(null);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [isSearchFieldSelected, setIsSearchFieldSelected] = useState(false);
  const [isSearchFieldHovered, setIsSearchFieldHovered] = useState(false);

  const [selectedFilterComponent, setSelectedFilterComponent] = useState({
    sortBy: false,
    carType: false,
    transmission: false,
    passengers: false,
    energySource: false,
    priceRange: false,
  });

  const filterRefs = {
    sortBy: useRef(null),
    carType: useRef(null),
    transmission: useRef(null),
    passengers: useRef(null),
    energySource: useRef(null),
    priceRange: useRef(null),
  };

  const { bookingData } = useContext(BookingContext);


  const handleClearFilters = () => {
  setSelectedFilterOptions({
    sortBy: [],
    carType: [],
    transmission: [],
    passengers: [],
    energySource: [],
    search: "",
    minPrice: 0,
    maxPrice: 1000,
    pickupLocation: bookingData.pickupLocation,
    pickupDate: bookingData.pickupDate,
    dropoffDate: bookingData.dropoffDate,
  });
  setMinPrice(0);
  setMaxPrice(maxCarRentalPrice);
};

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const toggleDropdown = (category) =>
    setOpenDropdown(openDropdown === category ? null : category);

  const renderCheckboxes = (category, options) => (
    <div className="checkbox-group">
      {options.map(({ value, label }) => (
        <label key={value} className="checkbox-label">
          <input type="checkbox"
                 name={category}
                 value={value}
                 checked={selectedFilterOptions[category]?.includes(value)}
                 onChange={handleFilterChange}/>
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

  const renderRadioButtons = (category, options) => (
    <div className="checkbox-group">
      {options.map(({ value, label }) => (
        <label key={value} className="checkbox-label">
          <input
            type="radio"
            name={category}
            value={value}
            checked={selectedFilterOptions[category]?.[0] === value.toString()}
            onChange={handleFilterChange}
          />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );
const renderDropdown = (category, title, options, customContent = null) => {
  // Get count of selected items for this category
  let selectedCount = 0;
  
  if (category === 'priceRange') {
    // Special case for price range - only show count if different from default
    if (minPrice > 0 || maxPrice < maxCarRentalPrice) {
      selectedCount = 1;
    }
  } else if (Array.isArray(selectedFilterOptions[category])) {
    selectedCount = selectedFilterOptions[category].length;
  }
  
  // Format title with count if items are selected
  const displayTitle = selectedCount > 0 ? `${title} (${selectedCount})` : title;
  
  return (
    <div className="dropdown-group" id={`${category}-checkbox`}>
      <button
        className="dropdown-button"
        onClick={() => {
          toggleDropdown(category);
          setSelectedFilterComponent({...selectedFilterComponent, [category] : true})
        }}
      >
        {displayTitle} <CaretDown size={16} />
      </button>
      {openDropdown === category && (
        <div 
          ref={filterRefs[category]}
          className={`dropdown-content ${customContent != null ? 'custom' : ''}`}
        >
          {customContent || (
            (category === "sortBy" || category === "passengers")
              ? renderRadioButtons(category, options)
              : renderCheckboxes(category, options)
          )}
        </div>
      )}
    </div>
  );
};

  const filterOptions = {
    sortBy: [
      { value: "newest", label: "Newest" },
      { value: "price-low-to-high", label: "Price - Low to High" },
      { value: "price-high-to-low", label: "Price - High to Low" },
      { value: "alphabet", label: "Alphabet" },
    ],
    carType: [
      { value: "sedan", label: "Sedan" },
      { value: "suv", label: "SUV" },
      { value: "truck", label: "Truck" },
      { value: "coupe", label: "Coupe" },
      { value: "convertible", label: "Convertible" },
      { value: "luxury", label: "Luxury" },
      { value: "hatchback", label: "Hatchback" },
      { value: "minivan", label: "Minivan" },
      { value: "sports", label: "Sports" },
      {value: "crossover", label: "Crossover"},
      {value: "station_wagon", label: "Station Wagon"},
    ],
    transmission: [
      { value: "automatic", label: "Automatic" },
      { value: "manual", label: "Manual" },
    ],
    passengers: [
      { value: 2, label: "2+" },
      { value: 4, label: "4+" },
      { value: 5, label: "5+" },
      { value: 7, label: "7+" },
    ],
    energySource: [
      { value: "electric", label: "Electric" },
      { value: "hybrid", label: "Hybrid" },
      { value: "diesel", label: "Diesel" },
      { value: "gas", label: "Gas" },
    ],
  };

const [selectedFilterOptions, setSelectedFilterOptions] = useState({
    sortBy: [],
    carType: [],
    transmission: [],
    passengers: [],
    energySource: [],
    search: "",
    minPrice: null,
    maxPrice: null,
    pickupLocation: bookingData.pickupLocation,
    pickupDate: bookingData.pickupDate,
    dropoffDate: bookingData.dropoffDate,
  });

  useEffect(() => {
    setSelectedFilterOptions((prev) => {
      return {
        ...prev,
        pickupLocation: bookingData.pickupLocation,
        pickupDate: bookingData.pickupDate,
        dropoffDate: bookingData.dropoffDate,
      }
    })
    fetchCarData();
  }, [bookingData]);

useEffect(() => {
  const handleClickOutsideFilterComponent = (event) => {
    const selectedFilterComponentCopy = { ...selectedFilterComponent };

    Object.keys(filterRefs).forEach((key) => {
      if (
        filterRefs[key].current &&
        !filterRefs[key].current.contains(event.target) &&
        !event.target.closest(`#${key}-checkbox`)
      ) {
        toggleDropdown(null); // Close the dropdown
        selectedFilterComponentCopy[key] = false; // Mark the filter as closed
      }
    });

    setSelectedFilterComponent(selectedFilterComponentCopy);
  };

  document.addEventListener("mousedown", handleClickOutsideFilterComponent);
  return () =>
    document.removeEventListener("mousedown", handleClickOutsideFilterComponent);
}, [selectedFilterComponent, minPrice, maxPrice]);

  useEffect(() => {
    setSelectedFilterOptions((prev) => {
      return {
        ...prev,
        [minPrice]: minPrice,
        [maxPrice]: maxPrice,
      }
    })
  }, [minPrice, maxPrice]);

  const handleCarClick = (carId) => {
    setSelectedCarId((prev) => (prev === carId ? null : carId));
  };

  // Compute number of cars per row based on measured widths
  const getCarsPerRow = () => {
    const container = containerRef.current;
    if (!container) return 1;
    const containerWidth = container.offsetWidth;
    const firstItem = container.querySelector(".car-display");
    if (!firstItem) return 1;
    const itemWidth = firstItem.offsetWidth;
    // Assuming a gap of 10px between items.
    return Math.floor((containerWidth + 10) / (itemWidth + 10));
  };

  // update carsPerRow on mount and resize
  useEffect(() => {
    const updateCarsPerRow = () => {
      setCarsPerRow(getCarsPerRow());
    };
    updateCarsPerRow();
    window.addEventListener("resize", updateCarsPerRow);
    return () => window.removeEventListener("resize", updateCarsPerRow);
  }, [cars]);


  useEffect(() => {
    const fetchData = async () => {
      await fetchCarData();
    };
    fetchData();
  }, [selectedFilterOptions]);

  const fetchCarData = async () => {
    try {
      const filterParams = new URLSearchParams();

      filterParams.append("carType", selectedFilterOptions.carType.join(",").toUpperCase());
      filterParams.append("transmission", selectedFilterOptions.transmission.join(",").toUpperCase());
      filterParams.append("minPassengers", selectedFilterOptions.passengers[0] || "");
      filterParams.append("sortOption", selectedFilterOptions.sortBy[0] || "");
      filterParams.append("energySource", selectedFilterOptions.energySource.join(",").toUpperCase());
      filterParams.append("searchWord", selectedFilterOptions.search || "");
      filterParams.append("minPricePerDay", minPrice || 0);
      filterParams.append("maxPricePerDay", maxPrice || Number.MAX_SAFE_INTEGER);
      filterParams.append("pickupLocation", selectedFilterOptions.pickupLocation || "OSLO");
      filterParams.append("pickupDate", selectedFilterOptions.pickupDate.toISOString().slice(0, -1));
      filterParams.append("dropoffDate", selectedFilterOptions.dropoffDate.toISOString().slice(0, -1));

      const data = await makeApiRequest(`http://localhost:8080/api/cars/search?${filterParams.toString()}`);
      setCars(data);
    } catch (error) {
      setCars([]); 
    }
  };

  // Reassemble children with inserted menu for the selected car.
const renderWithInsertedMenu = () => {
  // Only show available cars
  const availableCars = cars.filter(car => car.available);

  if (availableCars.length === 0) return null;

  // Find the index of the selected car
  const selectedIndex = availableCars.findIndex((car) => car.id === selectedCarId);

  let insertionIndex = -1;
  if (selectedIndex >= 0) {
    insertionIndex =
      Math.ceil((selectedIndex + 1) / carsPerRow) * carsPerRow - 1;
    insertionIndex = Math.min(insertionIndex, availableCars.length - 1);
  }

  // Build the final array of components
  const role = getRole();
  const combined = [];
  availableCars.forEach((car, index) => {
    combined.push(
      <CarDisplay
        key={car.id}
        displayCar={car}
        onClick={() => handleCarClick(car.id)}
        isSelected={car.id === selectedCarId}
        role={role}
      />
    );
    if (index === insertionIndex && selectedCarId) {
      const selectedCar = availableCars.find((car) => car.id === selectedCarId);
      combined.push(
        <div key={`menu-${selectedCarId}`} className="car-selected-menu">
          <CarSelected car={selectedCar}/>
        </div>
      );
    }
  });

  return combined;
};

  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;

    setSelectedFilterOptions((prev) => {
      if (type === "radio") {
        return {
          ...prev,
          [name]: [value],
        };
      } else if (type === "checkbox") {
        // For checkboxes, update the array
        const currentCategory = Array.isArray(prev[name]) ? prev[name] : [];
        const updatedCategory = checked
          ? [...currentCategory, value]
          : currentCategory.filter((v) => v !== value);

        return {
          ...prev,
          [name]: updatedCategory,
        };
      }
    });
  };

  const handleSaveFilters = () => {
    setSelectedFilterOptions({
      ...selectedFilterOptions,
      sortBy: Array.from(document.querySelectorAll('input[name="sortBy"]:checked')).map(input => input.value),
      carType: Array.from(document.querySelectorAll('input[name="carType"]:checked')).map(input => input.value),
      transmission: Array.from(document.querySelectorAll('input[name="transmission"]:checked')).map(input => input.value),
      passengers: Array.from(document.querySelectorAll('input[name="passengers"]:checked')).map(input => input.value),
      energySource: Array.from(document.querySelectorAll('input[name="energySource"]:checked')).map(input => input.value),
      search: document.getElementById("search-cars-input-field").value,
      minPrice: minPrice,
      maxPrice: maxPrice,
    });

    toggleFilter();
  };


  const handleSearchFieldXCircleClick = () => {
      const inputField = document.getElementById("search-cars-input-field");
      inputField.value = "";
      inputField.focus();
      setSearchFieldValue("");
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchFieldSelected &&
        searchFieldRef.current &&
        !searchFieldRef.current.contains(event.target)
      ) {
        setIsSearchFieldSelected(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return() => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchFieldSelected]);


  return (

        <div className ="rental-page">
          <nav className="sort-bar">
            <div className={`search-cars-field ${isSearchFieldSelected ? 'selected' : ''}`}
                 ref={searchFieldRef}
                 onMouseEnter={() => setIsSearchFieldHovered(true)}
                 onMouseLeave={() => setIsSearchFieldHovered(false)}
                 onClick={() => setIsSearchFieldSelected(true)}>
              <MagnifyingGlass size={24} weight="bold" className="search-icon" />
              <input type="text"
                     className="car-search-input-field"
                     id="search-cars-input-field"
                     required={false}
                     placeholder="Search for cars"
                     onChange={(e) => setSearchFieldValue(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === "Enter") {
                         setSelectedFilterOptions((prev) => ({
                           ...prev,
                           search: searchFieldValue,
                         }));
                       }
                     }}
                     onBlur={() => {
                       setSelectedFilterOptions((prev) => ({
                         ...prev,
                         search: searchFieldValue,
                       }));
                     }}
              value={searchFieldValue}>
              </input>
              <button className="xCircleButton"
                      onClick={handleSearchFieldXCircleClick}
                      aria-label="Clear search field">
                <XCircle className={`cross-icon ${isSearchFieldHovered && searchFieldValue !== "" ? 'visible' : ''}`}
                         size={24}
                         weight="bold"/>
              </button>
            </div>
            <section className="sorting-inputs">
            {renderDropdown("sortBy", "Sort by", filterOptions.sortBy)}
            {renderDropdown("priceRange", "Price Range", null, (
              <IntervalSlider
                minVal={minPrice}
                maxVal={maxPrice}
                setMinVal={setMinPrice}
                setMaxVal={setMaxPrice}
                maxCarRentalPrice={maxCarRentalPrice}/>))}
            {renderDropdown("carType", "Car Type", filterOptions.carType)}
            {renderDropdown("energySource", "Energy Source", filterOptions.energySource)}
            {renderDropdown("transmission", "Transmission", filterOptions.transmission)}
            {renderDropdown("passengers", "Passengers", filterOptions.passengers)}
            <button className="clear-button" onClick={handleClearFilters} type="button" aria-label="Clear all filters">
              Clear Filters
            </button>
            <button className="filter-button" onClick={toggleFilter} aria-label="Open sort and filter panel">
              <FunnelSimple size={20} color="#252322" /> Sort and filter
            </button>
            </section>
          </nav>

          {isFilterOpen && (
            <div className="filter-panel">
              <div className="filter-content">
                <h2>Sort and Filter</h2>
                <button className="clear-button-mobile" onClick={handleClearFilters} type="button" aria-label="Clear all filters (mobile)">
                  Clear Filters
                </button>
                <div className="filter-group">
                  <h3>Sort</h3>
                  {renderRadioButtons("sortBy", filterOptions.sortBy)}
                </div>
                <div className="filter-group">
                  <h3>Car Type</h3>
                  {renderCheckboxes("carType", filterOptions.carType)}
                </div>
                <div className="filter-group">
                  <h3>Transmission</h3>
                  {renderCheckboxes("transmission", filterOptions.transmission)}
                </div>
                <div className="filter-group">
                  <h3>Passengers</h3>
                  {renderRadioButtons("passengers", filterOptions.passengers)}
                </div>
                <div className="filter-group">
                  <h3>Energy Source</h3>
                  {renderCheckboxes("energySource", filterOptions.energySource)}
                </div>
                <div className="price-range">
                  <h3>Price Range</h3>
                  <IntervalSlider
                    minVal={minPrice}
                    maxVal={maxPrice}
                    setMinVal={setMinPrice}
                    setMaxVal={setMaxPrice}
                    maxCarRentalPrice={maxCarRentalPrice}
                    priceRangeRef={filterRefs.priceRange}/>
                </div>
              </div>
              <hr></hr>
              <button className="close-button" onClick={handleSaveFilters} aria-label="Save filter changes">
                Save Changes
              </button>
            </div>
          )}

          <main className="main-body" ref={containerRef}>
            {cars.length === 0 ? (
              <div className="no-cars-message">
                <img src={logo} alt="no-cars-image" className="no-cars-image" />
                <p className="no-cars-message-text">No cars available for the selected filters</p>
              </div>
            ) : (
              renderWithInsertedMenu()
            )}
          </main>
        </div>

  );
}