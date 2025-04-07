import React, { useState, useRef, useEffect } from "react";
import { FunnelSimple, CaretDown } from "@phosphor-icons/react";
import "../App.css";
import "./RentalPage.css";

export default function RentalPage(props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const containerRef = useRef(null);
  const [carsPerRow, setCarsPerRow] = useState(1);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const toggleDropdown = (category) =>
    setOpenDropdown(openDropdown === category ? null : category);

  // (Dummy filter render functions remain unchanged)
  const renderCheckboxes = (category, options) => (
    <div className="checkbox-group">
      {options.map(({ value, label }) => (
        <label key={value} className="checkbox-label">
          <input type="checkbox" />
          <span>{label}</span>
        </label>
      ))}
    </div>
  );

  const renderRadioButtons = (category, options) => (
    <div className="checkbox-group">
      {options.map(({ value, label }) => (
        <label key={value} className="checkbox-label">
          <input type="radio" name={category} />
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
            : renderCheckboxes(category, options)}
        </div>
      )}
    </div>
  );

  const filterOptions = {
    sort: [
      { value: "newest", label: "Newest" },
      { value: "price", label: "Price" },
      { value: "alphabet", label: "Alphabet" },
    ],
    carType: [
      { value: "sedan", label: "Sedan" },
      { value: "suv", label: "SUV" },
      { value: "truck", label: "Truck" },
      { value: "coupe", label: "Coupe" },
      { value: "convertible", label: "Convertible" },
      { value: "electric", label: "Electric" },
      { value: "hybrid", label: "Hybrid" },
      { value: "diesel", label: "Diesel" },
      { value: "gas", label: "Gas" },
      { value: "luxury", label: "Luxury" },
    ],
    transmission: [
      { value: "automatic", label: "Automatic" },
      { value: "manual", label: "Manual" },
    ],
    passengers: [
      { value: "2", label: "2+" },
      { value: "4", label: "4+" },
      { value: "5", label: "5+" },
      { value: "7", label: "7+" },
    ],
  };

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
  }, []);

  // Reassemble children with inserted menu for the selected car.
  const renderWithInsertedMenu = () => {
    // Get an array of CarDisplay children.
    const displays = React.Children.toArray(props.children).filter(
      (child) => child.type.name === "CarDisplay"
    );
    // Get the CarSelected matching selectedCarId.
    const selectedMenu = React.Children.toArray(props.children).find(
      (child) =>
        child.type.name === "CarSelected" && child.props.id === selectedCarId
    );
    if (displays.length === 0) return null;
    // Find the index of the selected display.
    const selectedIndex = displays.findIndex(
      (child) => child.props.id === selectedCarId
    );
    let insertionIndex = -1;
    if (selectedIndex >= 0) {
      // Determine the end index of the row.
      insertionIndex =
        Math.ceil((selectedIndex + 1) / carsPerRow) * carsPerRow - 1;
      insertionIndex = Math.min(insertionIndex, displays.length - 1);
    }
    // Build final array.
    const combined = [];
    displays.forEach((child, index) => {
      combined.push(
        React.cloneElement(child, {
          onClick: () => handleCarClick(child.props.id),
          key: child.props.id,
        })
      );
      if (index === insertionIndex && selectedMenu) {
        combined.push(
          <div key={`menu-${selectedCarId}`} className="car-selected-menu">
            {selectedMenu}
          </div>
        );
      }
    });
    return combined;
  };

  return (
    <div className="rental-page">
      <section className="main-section">
        <div>
          <nav className="sort-bar">
            {renderDropdown("sort", "Sort", filterOptions.sort)}
            {renderDropdown("carType", "Car Type", filterOptions.carType)}
            {renderDropdown("transmission", "Transmission", filterOptions.transmission)}
            {renderDropdown("passengers", "Passengers", filterOptions.passengers)}
            <button className="filter-button" onClick={toggleFilter}>
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
              </div>
              <button className="close-button" onClick={toggleFilter}>
                Close
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