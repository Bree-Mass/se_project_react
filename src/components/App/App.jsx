import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { location, apiCall, defaultClothingItems } from "../../utils/constants";
import {
  getForecastWeather,
  filterDataFromWeatherAPI,
} from "../../utils/weatherApi";
import "./app.css";

const App = () => {
  //   const [weatherData, setWeatherData] = React.useState({});
  //   const [clothingItems, setClothingItems] = React.useState([]);
  //   const [activeModal, setActiveModal] = useState();
  //   const [selectedCard, setSelectedCard] = React.useState(null);

  //   const handleCardClick = (card) => {
  //     setSelectedCard(card);
  //     setActiveModal("preview");
  //   };

  //   const closeAllModals = () => {
  //     setActiveModal();
  //   };

  //   React.useEffect(() => {
  //     if (location.latitude && location.longitude) {
  //       getForecastWeather(location, apiCall)
  //         .then((data) => {
  //           setWeatherData(filterDataFromWeatherAPI(data));
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   }, []);

  //   React.useEffect(() => {
  //     setClothingItems(defaultClothingItems);
  //   }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header
        //   weatherData={weatherData}
        //   handleAddClick={() => setActiveModal("create")}
        />
        <Main
        //   weatherData={weatherData}
        //   cards={clothingItems}
        //   onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      {/* {activeModal === "create" && (
        <ModalWithForm
          title="new garment"
          name="new-card"
          onClose={closeAllModals}
        >
          <label className="modal__label">
            <input
              className="modal__input modal__input_type_card-name"
              type="text"
              name="name"
              id="place-name"
              placeholder="Title"
              minLength="1"
              maxLength="30"
              required
            />
            <span className="modal__error"></span>
          </label>
          <label className="modal__label">
            <input
              className="modal__input  modal__input_type_url"
              type="url"
              name="link"
              id="place-link"
              placeholder="Image URL"
              required
            />
            <span className="modal__error"></span>
          </label>
          <p>Select the weather type:</p>
          <div className="modal__input  modal__input_type_radio">
            <div>
              <input
                type="radio"
                id="choiceHot"
                name="weatherType"
                value="hot"
              />
              <label className="modal__label_radio" htmlFor="choiceHot">
                Hot
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="choiceWarm"
                name="weatherType"
                value="warm"
              />
              <label className="modal__label_radio" htmlFor="choiceWarm">
                Warm
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="choiceCold"
                name="weatherType"
                value="cold"
              />
              <label className="modal__label_radio" htmlFor="choiceCold">
                Cold
              </label>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={closeAllModals} />
      )} */}
    </div>
  );
};

export default App;
