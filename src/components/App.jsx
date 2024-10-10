import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import ConfirmationModal from "./ConfirmationModal";
import MenuModal from "./MenuModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import { apiCall } from "../utils/constants";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import {
  getItems,
  postItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  patchUser,
} from "../utils/api";
import { signup, signin, authorizeToken } from "../utils/auth";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { ModalContext } from "../contexts/ModalContext";
import { UseRefContext } from "../contexts/UseRefContext";
import "../blocks/app.css";

const App = () => {
  //// USE STATES ////
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userToken, setUserToken] = React.useState("");
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
  const addItemModalRef = React.useRef(null);
  const itemModalRef = React.useRef(null);
  const confirmationModalRef = React.useRef(null);
  const menuModalRef = React.useRef(null);
  const registerModalRef = React.useRef(null);
  const loginModalRef = React.useRef(null);
  const editModalRef = React.useRef(null);

  //// REGISTRATION AND LOGIN ////

  const handleRegistration = ({ email, password, name, avatar }) => {
    signup({ email, password, name, avatar })
      .then(handleLogin({ email, password }))
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserToken(res.token);
        return res.token;
      })
      .then((token) => {
        return authorizeToken(token);
      })
      .then((user) => {
        setCurrentUser(user.data);
        setIsLoggedIn(true);
        closeModals();
      })
      .catch(console.error);
  };

  const handleEdit = ({ name, avatar }) => {
    patchUser({ name, avatar }, userToken).then((user) => {
      setCurrentUser(user.data);
      closeModals();
    });
  };

  //// AUTHORIZATION ////

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      authorizeToken(token)
        .then((res) => {
          setCurrentUser(res.data);
          setUserToken(token);
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, []);

  //// HANDLE SWITCHES ////

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
    setIsSwitchOn(!isSwitchOn);
  };

  //// CARDS ////

  const handleFilter = (array) => {
    return array.filter((item) => {
      return item.weather === weatherData.type;
    });
  };

  const handleRandomize = () => {
    setFilteredItems(
      handleFilter(clothingItems).sort(() => Math.random() - 0.5)
    );
  };

  const handleAddItem = (newItem) => {
    postItem(newItem, userToken)
      .then(() => {
        setClothingItems((prevItems) => {
          newItem.owner = currentUser._id;
          return [newItem, ...prevItems];
        });
        closeModals();
      })
      .catch(console.error);
  };

  const handleDelete = (itemToDelete) => {
    deleteItem(itemToDelete._id, userToken)
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

  const handleCardLike = (card) => {
    const token = localStorage.getItem("jwt");
    const isLiked = card.likes.includes(currentUser._id);

    !isLiked
      ? addCardLike(card._id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) =>
                item._id === card._id ? updatedCard.data : item
              )
            );
          })
          .catch(console.error)
      : removeCardLike(card._id, token)
          .then((updatedCard) => {
            setClothingItems((items) =>
              items.map((item) =>
                item._id === card._id ? updatedCard.data : item
              )
            );
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
        evt.target === addItemModalRef.current ||
        evt.target === menuModalRef.current ||
        evt.target === confirmationModalRef.current ||
        evt.target === registerModalRef.current ||
        evt.target === loginModalRef.current ||
        evt.target === editModalRef.current
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
        setClothingItems(res.data);
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
          <CurrentUserContext.Provider value={currentUser}>
            <ModalContext.Provider
              value={{ activeModal, openModals, closeModals }}
            >
              <UseRefContext.Provider
                value={{
                  formRef,
                  itemModalRef,
                  addItemModalRef,
                  menuModalRef,
                  confirmationModalRef,
                  registerModalRef,
                  loginModalRef,
                  editModalRef,
                }}
              >
                <div className="page__content">
                  <Header
                    weatherData={weatherData}
                    isOn={isSwitchOn}
                    isLoggedIn={isLoggedIn}
                  />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Main
                          filteredItems={filteredItems}
                          weatherData={weatherData}
                          handleRandomize={handleRandomize}
                          onCardLike={handleCardLike}
                        />
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                          <Profile
                            clothingItems={clothingItems}
                            onCardLike={handleCardLike}
                          />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                  <Footer />
                </div>

                <AddItemModal
                  isOpen={activeModal === "add-modal"}
                  handleAddItem={handleAddItem}
                />
                <ItemModal
                  isOpen={activeModal === "card-modal"}
                  card={selectedCard}
                />
                <ConfirmationModal
                  isOpen={activeModal === "confirm-modal"}
                  card={selectedCard}
                  handleDelete={handleDelete}
                />
                <MenuModal
                  isOpen={activeModal === "menu-modal"}
                  isOn={isSwitchOn}
                  isLoggedIn={isLoggedIn}
                />
                <RegisterModal
                  isOpen={activeModal === "register-modal"}
                  handleRegistration={handleRegistration}
                />
                <LoginModal
                  isOpen={activeModal === "login-modal"}
                  handleLogin={handleLogin}
                />
                <EditProfileModal
                  isOpen={activeModal === "edit-modal"}
                  handleEdit={handleEdit}
                />
              </UseRefContext.Provider>
            </ModalContext.Provider>
          </CurrentUserContext.Provider>
        </CurrentTempUnitContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
