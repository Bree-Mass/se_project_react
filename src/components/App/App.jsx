import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { defaultClothingItems } from "../../utils/constants";
import "./app.css";

function App() {
  const [weatherData, setWeatherData] = React.useState([]);
  const [clothingItems, setClothingItems] = React.useState([]);
  const [activeModal, setActiveModal] = useState();
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
