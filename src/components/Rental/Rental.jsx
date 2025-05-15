import React, {useState, useRef, useEffect, useContext} from "react";
import {FunnelSimple, CaretDown, MagnifyingGlass, XCircle} from "@phosphor-icons/react";
import CarDisplay from "./CarDisplay/CarDisplay";
import CarSelected from './CarSelected/CarSelected';
import IntervalSlider from "./IntervalSlider/IntervalSlider";
import "./Rental.css";
import "../App.css";
import {BookingContext} from "../utils/BookingContext";
// import '../Home/BookingForm/BookingForm.css';


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
    minPrice: null,
    maxPrice: null,
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
  const renderDropdown = (category, title, options, customContent = null) => (
    <div className="dropdown-group" id={`${category}-checkbox`}>
      <button
        className="dropdown-button"
        onClick={() => {
          toggleDropdown(category);
          setSelectedFilterComponent({...selectedFilterComponent, [category] : true})}}>
        {title} <CaretDown size={16} />
      </button>
      {openDropdown === category && (
        <div ref={filterRefs[category]}
             className={`dropdown-content ${customContent != null ? 'custom' : ''}`}>
          {customContent || (
            (category === "sortBy" || category === "passengers")
              ? renderRadioButtons(category, options)
              : renderCheckboxes(category, options))}
        </div>
      )}
    </div>
  );

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
    console.log("MinPrice or maxPrice changed: " + minPrice, " - " + maxPrice);
    setSelectedFilterOptions((prev) => {
      return {
        ...prev,
        [minPrice]: minPrice,
        [maxPrice]: maxPrice,
      }
    })
  }, [minPrice, maxPrice]);

  const handleCarClick = (carId) => {
    console.log("Selected car:", carId);
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
      filterParams.append("minPricePerDay", minPrice || 0);
      filterParams.append("maxPricePerDay", maxPrice || Number.MAX_SAFE_INTEGER);
      filterParams.append("pickupLocation", selectedFilterOptions.pickupLocation || "OSLO");
      filterParams.append("pickupDate", selectedFilterOptions.pickupDate.toISOString().slice(0, -1));
      filterParams.append("dropoffDate", selectedFilterOptions.dropoffDate.toISOString().slice(0, -1));

      console.log("Filter params:", filterParams.toString());

      console.log("Request URL: ", `http://localhost:8080/cars/search?${filterParams.toString()}`)
      const response = await fetch(`http://localhost:8080/cars/search?${filterParams.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        console.log("Response not ok: ", response);
        throw new Error("Failed to fetch car data.");
      }

      const data = await response.json();
      console.log("Filtered cars:", data);
      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Reassemble children with inserted menu for the selected car.
  const renderWithInsertedMenu = () => {
    if (cars.length === 0) return null;

    // Find the index of the selected car
    const selectedIndex = cars.findIndex((car) => car.id === selectedCarId);

    let insertionIndex = -1;
    if (selectedIndex >= 0) {
      // Determine the end index of the row.
      insertionIndex =
        Math.ceil((selectedIndex + 1) / carsPerRow) * carsPerRow - 1;
      insertionIndex = Math.min(insertionIndex, cars.length - 1);
    }

    // Build the final array of components
    const combined = [];
    cars.forEach((car, index) => {
      combined.push(
        <CarDisplay
          key={car.id}
          displayCar={car}
          onClick={() => handleCarClick(car.id)}
          isSelected={car.id === selectedCarId}
        />
      );
      if (index === insertionIndex && selectedCarId) {
        const selectedCar = cars.find((car) => car.id === selectedCarId); // Get the full car object
        combined.push(
          <div key={`menu-${selectedCarId}`} className="car-selected-menu">
            {/* Pass the full car object to CarSelected */}
            <CarSelected car={selectedCar}/>
          </div>
        );
      }
    });

    return combined;
  };


  const handleFilterChange = (event) => {
    const { name, value, checked, type } = event.target;

    console.log("name: " + name);
    console.log("value: " + value);
    console.log("checked: " + checked);
    console.log("type: " + type);

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
      sortBy: Array.from(document.querySelectorAll('input[name="sortBy"]:checked')).map(input => input.value),
      carType: Array.from(document.querySelectorAll('input[name="carType"]:checked')).map(input => input.value),
      transmission: Array.from(document.querySelectorAll('input[name="transmission"]:checked')).map(input => input.value),
      passengers: Array.from(document.querySelectorAll('input[name="passengers"]:checked')).map(input => input.value),
      energySource: Array.from(document.querySelectorAll('input[name="energySource"]:checked')).map(input => input.value),
    });

    console.log("Selected filter options:", selectedFilterOptions);
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
    <div className="rental-page">
      <section className="main-section">
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
                     placeholder="Search for the name of a car"
              onChange={(e) => setSearchFieldValue(e.target.value)}
              value={searchFieldValue}>
              </input>
              <button className="xCircleButton"
                      onClick={handleSearchFieldXCircleClick}>
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
            <button className="clear-button" onClick={handleClearFilters} type="button">
              Clear Filters
            </button>
            <button className="filter-button" onClick={toggleFilter}>
              <FunnelSimple size={20} color="#252322" /> Sort and filter
            </button>
            </section>
          </nav>

          {isFilterOpen && (
            <div className="filter-panel">
              <div className="filter-content">
                <h2>Sort and Filter</h2>
                <button className="clear-button-mobile" onClick={handleClearFilters} type="button">
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
              <button className="close-button" onClick={handleSaveFilters}>
                Save Changes
              </button>
            </div>
          )}

          <main className="main-body" ref={containerRef}>
            {renderWithInsertedMenu()}
          </main>
        </div>
      </section>
    </div>
  );
}