import { useState, useContext } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { getCoordinates } from '../../utils/geocodingApi';
import { openCageGeocodingAPIKey } from '../../utils/constants';

function EditProfileModal({ onCloseModal, onEdit, isLoading }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [data, setData] = useState({
    name: `${currentUser.name}`,
    avatarUrl: `${currentUser.avatar}`,
    city: `${currentUser.city}`,
    coordinates: `${currentUser.coordinates}`,
  });
  const [multyChoice, setMultyChoice] = useState(false);
  const [isSpecified, setIsSpecified] = useState(false);
  const [options, setOptions] = useState([]);
console.log(isSpecified);
  
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
      onEdit(data);
    } else {
      handleCoordinatesChange(data.city).then((coordinates) => {
        if (coordinates) {
          onEdit({ ...data, coordinates });
        } else {
          console.log('Failed to get coordinates');
        }
      });
    }
    setIsSpecified(false);
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
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
          {isLoading ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </ModalWithForm>
  );
}

export default EditProfileModal;
