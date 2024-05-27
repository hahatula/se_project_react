import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function AddItemModal({ onCloseModal, onAddItem }) {
  const [data, setData] = useState({
    name: '',
    imageUrl: '',
    weather: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(data);
  };

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
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
          value={data.name}
          onChange={handleChange}
          className="form__input"
          minLength={2}
        />
      </label>
      <label htmlFor="image" className="form__label">
        Image{' '}
        <input
          type="url"
          id="image"
          name="imageUrl"
          placeholder="Image URL"
          value={data.imageUrl}
          onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="form__radio-input"
          />
          <label htmlFor="cold" className="form__radio-label">
            Cold
          </label>
        </div>
      </fieldset>
      <div className="form__buttons">
        <button className="form__submit" type="submit">
          Add garment
        </button>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
