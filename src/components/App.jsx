import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import ConfirmationModal from "./ConfirmationModal";
import MenuModal from "./MenuModal";
import Footer from "./Footer";
import avatarPlaceholder from "../assets/avatar_placeholder.png";
import { apiCall } from "../utils/constants";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { getItems, postItem, deleteItem } from "../utils/api";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import "../blocks/app.css";

const App = () => {
  //// USE STATES ////
  const [activeModal, setActiveModal] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [weatherData, setWeatherData] = React.useState({
    type: "",
    temp: { F: "", C: "" },
    city: "",
    weather: "",
  }); // sets all form elements with a default validation message
  const [currentTempUnit, setCurrentTempUnit] = React.useState("F");
  const [clothingItems, setClothingItems] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);

  //// USE REFS ////

  const formRef = React.useRef(null);
  const addModalRef = React.useRef(null);
  const itemModalRef = React.useRef(null);
  const confirmationModalRef = React.useRef(null);
  const menuModalRef = React.useRef(null);

  //// HANDLE SWITCHES ////

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
    setIsSwitchOn(!isSwitchOn);
  };
  //// CARDS ////
  const handleFilter = (array) => {
    return array.filter((item) => {
      return item.weatherType === weatherData.type;
    });
  };

  const handleRandomize = () => {
    setFilteredItems(
      handleFilter(clothingItems).sort(() => Math.random() - 0.5)
    );
  };

  const handleAddItem = (newItem) => {
    return postItem(newItem).then(
      setClothingItems((prevItems) => [newItem, ...prevItems])
    );
  };

  const handleDelete = (itemToDelete) => {
    // deletes the item from the page on successful resonse from the server
    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item !== itemToDelete;
          })
        );
        closeModals();
      })
      .catch(console.error);
  };

  //// HANDLE MODALS ////

  // if the object clicked does not have a key "_id" then use the objects id.
  const openModals = (evt) => {
    if (evt._id) {
      setActiveModal("card-modal");
      setSelectedCard(evt);
    } else {
      setActiveModal(evt.target.id);
    }
  };
  const closeModals = () => {
    setActiveModal(null);
    // set timeout so card wont visually change before the modal fades away
    setTimeout(() => {
      setSelectedCard({});
    }, 400);
  };

  // MODAL //
  React.useEffect(() => {
    // sets/removes event listeners whenever a modal is opened/closed
    const handleOutsideClick = (evt) => {
      if (
        evt.target === itemModalRef.current ||
        evt.target === addModalRef.current ||
        evt.target === menuModalRef.current ||
        evt.target === confirmationModalRef.current
      ) {
        closeModals();
      }
    };
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModals();
      }
    };

    if (activeModal) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscClose);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscClose);
      };
    }
  }, [activeModal]);

  // WEATHER API //
  React.useEffect(() => {
    getWeather(apiCall)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    setFilteredItems(handleFilter(clothingItems));
  }, [weatherData.type, clothingItems]);

  // MOCK SERVER API //
  React.useEffect(() => {
    getItems()
      .then((res) => {
        setClothingItems(res);
      })
      .catch(console.error);
  }, []);

  //// RETURN ELEMENT ////

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleOpen={openModals}
              avatarPlaceholder={avatarPlaceholder}
              isOn={isSwitchOn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    filteredItems={filteredItems}
                    weatherData={weatherData}
                    handleRandomize={handleRandomize}
                    handleOpen={openModals}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    avatarPlaceholder={avatarPlaceholder}
                    clothingItems={clothingItems}
                    handleOpen={openModals}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            activeModal={activeModal}
            isOpen={activeModal === "add-modal"}
            handleAddItem={handleAddItem}
            addModalRef={addModalRef}
            formRef={formRef}
            handleCloseModal={closeModals}
          />
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "card-modal"}
            itemModalRef={itemModalRef}
            handleOpen={openModals}
            handleCloseModal={closeModals}
          />
          <ConfirmationModal
            card={selectedCard}
            isOpen={activeModal === "confirm-modal"}
            confirmationModalRef={confirmationModalRef}
            handleOpen={openModals}
            handleCloseModal={closeModals}
            handleDelete={handleDelete}
          />
          <MenuModal
            menuModalRef={menuModalRef}
            handleOpen={openModals}
            handleCloseModal={closeModals}
            isOpen={activeModal === "menu-modal"}
            avatarPlaceholder={avatarPlaceholder}
            isOn={isSwitchOn}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
