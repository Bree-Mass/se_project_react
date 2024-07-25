import "./modalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <form action="" className="modal__form">
        <h2 className="modal__title">New garment</h2>
        <button type="button" className="modal__close">
          CLOSE
        </button>
        <label className="modal__label" htmlFor="name">
          <input
            className="modal__input modal__input_card-name"
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="modal__error"></span>
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          <input
            className="modal__input  modal__input_url"
            type="url"
            name="link"
            id="imageUrl"
            placeholder="Image URL"
            required
          />
          <span className="modal__error"></span>
        </label>
        <p>Select the weather type:</p>
        <div className="modal__input  modal__input_radio">
          <div>
            <input type="radio" id="choiceHot" name="weatherType" value="hot" />
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
      </form>
    </div>
  );
}

export default ModalWithForm;
