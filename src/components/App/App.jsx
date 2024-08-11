import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemCard from "../ItemCard/ItemCard";
import Profile from "../Profile/Profile";
import AddItemModal from "../Modals/AddItemModal/AddItemModal";
import ItemModal from "../Modals/ItemModal/ItemModal";
import ConfirmationModal from "../Modals/ConfirmationModal/ConfirmationModal";
import MenuModal from "../Modals/MenuModal/MenuModal";
import Footer from "../Footer/Footer";
import avatarPlaceholder from "../../assets/avatar_placeholder.png";
import { apiCall } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, postItem, deleteItem } from "../../utils/api";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { ApiCallContext } from "../../contexts/ApiCallContext";
import "./app.css";

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
    setClothingItems((prevItems) => [newItem, ...prevItems]);
  };

  const renderAllCards = (array) => {
    return array.map((item) => {
      return <ItemCard key={item._id} item={item} onCardClick={openModals} />;
    });
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
      })
      .catch(`Error: ${console.error}`);
    closeModals();
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
          <ApiCallContext.Provider value={{ getItems, postItem, deleteItem }}>
            <div className="page__content">
              <Header
                weatherData={weatherData}
                handleOpen={openModals}
                avatarPlaceholder={avatarPlaceholder}
                isOn={isSwitchOn}
              />
              <Routes>
                <Route
                  path="/se_project_react/"
                  element={
                    <Main
                      filteredItems={filteredItems}
                      weatherData={weatherData}
                      renderCards={renderAllCards}
                      handleRandomize={handleRandomize}
                    />
                  }
                />
                <Route
                  path="/se_project_react/profile"
                  element={
                    <Profile
                      avatarPlaceholder={avatarPlaceholder}
                      clothingItems={clothingItems}
                      renderCards={renderAllCards}
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
          </ApiCallContext.Provider>
        </CurrentTempUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
