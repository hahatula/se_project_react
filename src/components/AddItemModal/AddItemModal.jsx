import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({onCloseModal, onAddItem}) {
const [name, setName] = useState("");
const handleNameChange = (e) => {
    setName(e.target.value);
}

const [imageUrl, setImageUrl] = useState("");
const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
}

const [weather, setWeather] = useState("");
const handleWeather = (e) => {
    setWeather(e.target.value);
}

const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({name, imageUrl, weather});
    onCloseModal();
}

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="form__label">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          className="form__input"
        />
      </label>
      <label htmlFor="image" className="form__label">
        Image{" "}
        <input
          type="url"
          id="image"
          name="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrl}
          className="form__input"
        />
      </label>
      <fieldset className="form__fieldset">
        <legend className="form__legend">Select the weather type:</legend>
        <div className="form__radio-wrapper">
          <input
            name="weather"
            type="radio"
            id="hot"
            value="hot"
            onChange={handleWeather}
            className="form__radio-input"
          />
          <label htmlFor="hot" className="form__radio-label">
            Hot
          </label>
        </div>
        <div className="form__radio-wrapper">
          <input
            name="weather"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleWeather}
            className="form__radio-input"
          />
          <label htmlFor="warm" className="form__radio-label">
            Warm
          </label>
        </div>
        <div className="form__radio-wrapper">
          <input
            name="weather"
            type="radio"
            id="cold"
            value="cold"
            onChange={handleWeather}
            className="form__radio-input"
          />
          <label htmlFor="cold" className="form__radio-label">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
