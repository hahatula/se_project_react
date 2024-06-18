import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { getCoordinates } from '../../utils/geocodingApi';
import { openCageGeocodingAPIKey } from '../../utils/constants';

function RegisterModal({
  onCloseModal,
  onRegister,
  handleLogInButton,
  isLoading,
}) {
  const [multyChoice, setMultyChoice] = useState(false);
  const [isSpecified, setIsSpecified] = useState(false);
  const [options, setOptions] = useState([]);
  const [data, setData] = useState({
    name: '',
    avatarUrl: '',
    email: '',
    password: '',
    city: '',
    coordinates: {},
  });

  const handleCoordinatesChange = (city) => {
    console.log(city);
    return getCoordinates(city, openCageGeocodingAPIKey)
      .then((data) => {
        console.log(data);
        if (data.results.length === 1) {
          console.log(data.results);
          console.log(data.results[0].geometry);
          console.log('single option');
          return data.results[0].geometry;
        } else if (data.results.length > 1) {
          console.log('multy');
          console.log(data);
          
          const uniqueOptions = [
            ...new Set(data.results.map((option) => option.formatted)),
          ];
          console.log(uniqueOptions);

          setOptions(uniqueOptions);
          console.log(options);
          if (uniqueOptions.length > 1) {
            setMultyChoice(true);
            return null;
          } else {
            setMultyChoice(false);
            setIsSpecified(true);
            return data.results[0].geometry;
          }
        } else {
          console.log('No options found');
          setOptions([
            'No options found, please check the spelling of your city name.',
          ]);
          setMultyChoice(true);
          return null;
        }
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  const handleChoice = (e) => {
    const city = e.target.textContent;
    getCoordinates(city, openCageGeocodingAPIKey)
      .then((data) => {
        const coordinates = data.results[0].geometry;
        setData((prevData) => ({
          ...prevData,
          city: city,
          coordinates: coordinates,
        }));
      })
      .then(() => {
        setMultyChoice(false);
        setIsSpecified(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //update coordinates
    if (isSpecified) {
      console.log(data);
      onRegister(data);
    } else {
      handleCoordinatesChange(data.city).then((coordinates) => {
        if (coordinates) {
          onRegister({ ...data, coordinates });
        } else {
          console.log('Failed to get coordinates');
        }
      });
    }
    setIsSpecified(false);
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="form__label">
        Email*
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="form__input"
        />
      </label>
      <label htmlFor="password" className="form__label">
        Password*
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="form__input"
          pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
          title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
        />
      </label>
      <label htmlFor="name" className="form__label">
        Name*
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          className="form__input"
          minLength={2}
          maxLength={30}
        />
      </label>
      <label htmlFor="avatar" className="form__label">
        Avatar URL*
        <input
          type="url"
          id="avatar"
          name="avatarUrl"
          placeholder="Avatar URL"
          value={data.avatarUrl}
          onChange={handleChange}
          className="form__input"
        />
      </label>
      <label htmlFor="city" className="form__label">
        City*
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={handleChange}
          className="form__input"
          minLength={2}
        />
      </label>
      {multyChoice && (
        <ul className="form__city-options">
          <h3 className="form__title">Specify your city:</h3>
          {options[0].includes('No options found') ? (
            <p className="form__city-option-warning">{options[0]}</p>
          ) : (
            options.map((option, index) => (
              <p
                key={index}
                onClick={handleChoice}
                className="form__city-option-item"
              >
                {option}
              </p>
            ))
          )}
        </ul>
      )}
      <div className="form__buttons">
        <button className="form__submit" type="submit">
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <button
          className="form__alt-option"
          onClick={handleLogInButton}
          type="button"
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
