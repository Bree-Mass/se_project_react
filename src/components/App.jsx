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
  const [isLoading, setIsLoading] = React.useState(false);
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

  //// SUBMISSIONS ////

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeModals)
      .catch(console.error)
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      });
  }

  //// REGISTRATION AND LOGIN ////

  const handleRegistration = ({ email, password, name, avatar }) => {
    const makeRequest = () => {
      return signup({ email, password, name, avatar }).then(() =>
        handleLogin({ email, password })
      );
    };
    handleSubmit(makeRequest);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () => {
      return signin({ email, password })
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
        });
    };
    handleSubmit(makeRequest);
  };

  const handleEdit = ({ name, avatar }) => {
    const makeRequest = () => {
      return patchUser({ name, avatar }, userToken).then((user) => {
        setCurrentUser(user.data);
      });
    };
    handleSubmit(makeRequest);
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

  const handleFilter = React.useCallback(
    (array) => {
      return array.filter(({ weather }) => weather === weatherData.type);
    },
    [weatherData.type]
  );

  const handleRandomize = () => {
    setFilteredItems(
      handleFilter(clothingItems).sort(() => Math.random() - 0.5)
    );
  };

  const handleAddItem = (newItem) => {
    const makeRequest = () => {
      return postItem(newItem, userToken).then((res) => {
        setClothingItems((prevItems) => {
          newItem.owner = currentUser._id;
          newItem._id = res.data._id;
          return [newItem, ...prevItems];
        });
      });
    };
    handleSubmit(makeRequest);
  };

  const handleDelete = (itemToDelete) => {
    const makeRequest = () => {
      return deleteItem(itemToDelete._id, userToken).then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item !== itemToDelete;
          })
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = (card) => {
    const token = localStorage.getItem("jwt");
    const isLiked = card.likes?.includes(currentUser._id);
    const requestLike = () => {
      return addCardLike(card._id, token).then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === card._id ? updatedCard.data : item))
        );
      });
    };
    const requestUnlike = () => {
      return removeCardLike(card._id, token).then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === card._id ? updatedCard.data : item))
        );
      });
    };

    !isLiked ? handleSubmit(requestLike) : handleSubmit(requestUnlike);
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
  }, [weatherData.type, clothingItems, handleFilter]);

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
                          isLoggedIn={isLoggedIn}
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
                            isLoggedIn={isLoggedIn}
                            setIsLoggedIn={setIsLoggedIn}
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
                  isLoading={isLoading}
                />
                <ItemModal
                  isOpen={activeModal === "card-modal"}
                  card={selectedCard}
                />
                <ConfirmationModal
                  isOpen={activeModal === "confirm-modal"}
                  card={selectedCard}
                  handleDelete={handleDelete}
                  isLoading={isLoading}
                />
                <MenuModal
                  isOpen={activeModal === "menu-modal"}
                  isOn={isSwitchOn}
                  isLoggedIn={isLoggedIn}
                />
                <RegisterModal
                  isOpen={activeModal === "register-modal"}
                  handleRegistration={handleRegistration}
                  isLoading={isLoading}
                />
                <LoginModal
                  isOpen={activeModal === "login-modal"}
                  handleLogin={handleLogin}
                  isLoading={isLoading}
                />
                <EditProfileModal
                  isOpen={activeModal === "edit-modal"}
                  handleEdit={handleEdit}
                  isLoading={isLoading}
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
