import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, weatherAPIKey } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getClothes, addClothes, deleteClothes } from "../../utils/api";

function App() {
  // Managing weather information_________
  const [weatherData, setWeatherData] = useState({
    type: " ",
    temperature: { F: 999, C: 999 },
    city: " ",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  //get weather on load (once)
  useEffect(() => {
    getWeather(coordinates, weatherAPIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []); // dependencies array is an empty array to turn on this useEffect only once on mount

  //Managing the list of clothes
  const [clothingItems, setClothingItems] = useState([]);
  useEffect(() => {
    getClothes()
      .then((clothes) => {
        setClothingItems(clothes);
      })
      .catch(console.error);
  }, []);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({});
  useEffect(() => {
    if (isAdding) {
      addClothes(newItem)
        .then((newItem) => {
          setClothingItems([newItem, ...clothingItems]);
          setIsAdding(!isAdding);
        })
        .catch(console.error);
    }
  }, [isAdding]);

  const handleAddItemSubmit = (formData) => {
    setNewItem(formData);
    setIsAdding(!isAdding);
  };

  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    if (isDeleting) {
      console.log(`ok, let's delete:`);
      console.log(selectedItem);
      handleActiveModalClose();
      deleteClothes(selectedItem._id)
        .then((res) => {
          setClothingItems(
            clothingItems.filter((item) => {
              return item !== selectedItem;
            })
          );
          //delete from the list
          setIsDeleting(!isDeleting);
        })
        .catch(console.error);
    }
  }, [isDeleting]);

  const handleDeleteButton = () => {
    console.log(`will delete:`);
    console.log(selectedItem);
    setIsDeleting(!isDeleting);
  };

  // Managing modal windows_____________
  const [modalIsActive, setModalIsActive] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const handleActiveModalClose = () => {
    setModalIsActive(null);
  };
  const handleAddButton = () => {
    setModalIsActive("add-garment");
  };
  const handleItemClick = (item) => {
    setModalIsActive("preview");
    setSelectedItem(item);
  };

  // Managing global listeners_________
  useEffect(() => {
    if (!modalIsActive) return; // stop the effect not to add the listener if there is no active modal

    // define the handle functions inside useEffect (not to lose the reference on rerendering) and attach listeners to the doc
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleActiveModalClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    const handleOverlayClick = (event) => {
      if (event.target.classList.contains("modal")) {
        handleActiveModalClose();
      }
    };
    document.addEventListener("click", handleOverlayClick);

    // clean up functions for removing the listeners
    // Explanation: React will store this function (which is in "return") and call it right before it removes the component from the UI or before re-running the effect due to changes in its dependencies.
    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [modalIsActive]); // fill dependencies array to watch modalIsActive state

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app__container">
          <Header weatherData={weatherData} handleAddButton={handleAddButton} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleItemClick={handleItemClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleItemClick={handleItemClick}
                  clothingItems={clothingItems}
                  handleAddButton={handleAddButton}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        {modalIsActive === "add-garment" && (
          <AddItemModal
            onCloseModal={handleActiveModalClose}
            onAddItem={handleAddItemSubmit}
          />
        )}
        {modalIsActive === "preview" && (
          <ItemModal
            name="preview"
            card={selectedItem}
            onClose={handleActiveModalClose}
            onDelete={handleDeleteButton}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
