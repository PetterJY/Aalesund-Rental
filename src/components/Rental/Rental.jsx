import React, { useState, useRef, useEffect } from "react";
import { FunnelSimple, CaretDown } from "@phosphor-icons/react";
import CarDisplay from "./CarDisplay/CarDisplay";
import CarSelected from './CarSelected/CarSelected';
import "./Rental.css";
import "../App.css";
import IntervalSlider from "./IntervalSlider";

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
  // TODO: retrieve this value by querying the rentals

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const toggleDropdown = (category) =>
  setOpenDropdown(openDropdown === category ? null : category);

  const renderCheckboxes = (category, options) => (
    <div className="checkbox-group">
      {options.map(({ value, label }) => (
        <label key={value} className="checkbox-label">
          <input type="checkbox" name={category} value={value}/>
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

const renderRadioButtons = (category, options) => (
    <div className="checkbox-group">
      {options.map(({ value, label }) => (
        <label key={value} className="checkbox-label">
          <input type="radio" name={category} value={value}/>
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

  const renderDropdown = (category, title, options) => (
    <div className="dropdown-group">
      <button
        className="dropdown-button"
        onClick={() => toggleDropdown(category)}
      >
        {title} <CaretDown size={16} />
      </button>
      {openDropdown === category && (
        <div className="dropdown-content">
          {(category === "sort" || category === "passengers")
            ? renderRadioButtons(category, options)
            : renderCheckboxes(options, options)}
        </div>
      )}
    </div>
  );

  const filterOptions = {
    sort: [
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
    sort: [],
    carType: [],
    transmission: [],
    passengers: [],
    energySource: [],
  });


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
      if (selectedFilterOptions.carType.length > 0) {
        filterParams.append("carType", selectedFilterOptions.carType.join(",").toUpperCase());
      }
      if (selectedFilterOptions.transmission.length > 0) {
        filterParams.append("transmission", selectedFilterOptions.transmission.join(",").toUpperCase());
      }
      if (selectedFilterOptions.passengers.length > 0) {
        filterParams.append("minPassengers", selectedFilterOptions.passengers[0]); // Assuming single selection
      }
      if (selectedFilterOptions.sort.length > 0) {
        filterParams.append("sortOption", selectedFilterOptions.sort[0]); // Assuming single selection
      }
      if (selectedFilterOptions.energySource.length > 0) {
        filterParams.append("energySource", selectedFilterOptions.energySource.join(",").toUpperCase());
      }
      filterParams.append("minPricePerDay", minPrice);
      filterParams.append("maxPricePerDay", maxPrice);

      console.log("Filter params:", filterParams.toString());

      console.log("Request URL: ", `http://localhost:8080/cars/search?${filterParams.toString()}`)
      const response = await fetch(`http://localhost:8080/cars/search?${filterParams.toString()}`, {

        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) {
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

  const handleFilterChange = () => {
    setSelectedFilterOptions({
      sort: Array.from(document.querySelectorAll('input[name="sort"]:checked')).map(input => input.value),
      carType: Array.from(document.querySelectorAll('input[name="carType"]:checked')).map(input => input.value),
      transmission: Array.from(document.querySelectorAll('input[name="transmission"]:checked')).map(input => input.value),
      passengers: Array.from(document.querySelectorAll('input[name="passengers"]:checked')).map(input => input.value),
      energySource: Array.from(document.querySelectorAll('input[name="energySource"]:checked')).map(input => input.value),
    });

    console.log("Selected filter options:", selectedFilterOptions);
    toggleFilter();
  };
  return (
    <div className="rental-page">
      <section className="main-section">
        <div className ="rental-page">
          <nav className="sort-bar">
            {renderDropdown("sort", "Sort", filterOptions.sort)}
            {renderDropdown("carType", "Car Type", filterOptions.carType)}
            {renderDropdown("transmission", "Transmission", filterOptions.transmission)}
            {renderDropdown("passengers", "Passengers", filterOptions.passengers)}
            {renderDropdown("energySource", "Energy Source", filterOptions.energySource)}
            <button className="filter-button" onClick={handleFilterChange}>
              <FunnelSimple size={20} color="#252322" /> Sort and filter
            </button>
          </nav>

          {isFilterOpen && (
            <div className="filter-panel">
              <div className="filter-content">
                <h2>Sort and Filter</h2>
                <div className="filter-group">
                  <h3>Sort</h3>
                  {renderRadioButtons("sort", filterOptions.sort)}
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
                <IntervalSlider minVal={minPrice} maxVal={maxPrice} setMinVal={setMinPrice} setMaxVal={setMaxPrice} maxCarRentalPrice={maxCarRentalPrice}/>
              </div>
              <hr></hr>
              <button className="close-button" onClick={handleFilterChange}>
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