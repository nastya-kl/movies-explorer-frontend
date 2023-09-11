import React from "react";
import useValidateForm from "../../hooks/useValidateForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { profileUpdateErrors } from "../../utils/constants";
import "./Profile.css";

function Profile({ onLogout, onUpdateUserInfo, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const inputElements = document.querySelectorAll("input");
  const [isEdition, setIsEdition] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [isSameData, setIsSameData] = React.useState(true);

  const { values, handleChange, errors, setValues, isFormValid } =
    useValidateForm({});
  const { name, email } = values;
  
  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.email, currentUser.name, setValues]);

  React.useEffect(() => {
    if (isSameData) {
      setErrorText(profileUpdateErrors.sameData);
    } else if (!isFormValid && !isSameData) {
      setErrorText(profileUpdateErrors.notValidData);
    } else {
      setErrorText("");
    }
  }, [setErrorText, isFormValid, isSameData]);


  React.useEffect(() => {
    if (currentUser.name === name && currentUser.email === email) {
      setIsSameData(true);
    } else {
      setIsSameData(false);
    }
  }, [name, email, currentUser.name, currentUser.email, setIsSameData]);

  function handleInputChanging() {
    if (isEdition) {
      inputElements.forEach((input) => {
        input.setAttribute("disabled", "");
      });
    } else {
      inputElements.forEach((input) => {
        input.removeAttribute("disabled");
      });
    }
  }

  function toggleEditButton() {
    setIsEdition(true);
    handleInputChanging();
    setErrorText("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsEdition(false);
    handleInputChanging();
    onUpdateUserInfo({
      name: values.name,
      email: values.email,
    });
  }

  function handleCancelClick() {
    setIsEdition(false);
    handleInputChanging();
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }

  return (
    <main className='profile'>
      <div className='profile__container'>
        <h1 className='profile__heading'>Привет, {name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__form-container'>
            <label className='profile__label'>Имя</label>
            <input
              type='text'
              name='name'
              id='name'
              className='profile__input'
              placeholder='Введите имя'
              value={name || ""}
              onChange={handleChange}
              disabled
              required
              errors={errors}
              minLength={2}
            />
            <label className='profile__label'>E-mail</label>
            <input
              type='email'
              name='email'
              id='email'
              className='profile__input'
              placeholder='Введите E-mail'
              value={email || ""}
              onChange={handleChange}
              disabled
              required
              errors={errors}
              minLength={3}
            />
          </div>

          <div className='profile__form-buttons'>
            {!isEdition && (
              <>
                <button
                  className='profile__edit-button'
                  onClick={toggleEditButton}
                >
                  Редактировать
                </button>
                <button className='profile__logout-button' onClick={onLogout}>
                  Выйти из аккаунта
                </button>
              </>
            )}
            {isEdition && (
              <>
                <p className='profile__error-text'>{errorText}</p>
                <button
                  className={`${
                    !isFormValid || isSameData
                      ? "button__disabled"
                      : "profile__save-button"
                  }`}
                  type='submit'
                  disabled={!isFormValid || isSameData || isLoading}
                >
                  {isLoading ? "Сохранение..." : "Сохранить"}
                </button>
                <button
                  className='profile__cancel-button'
                  onClick={handleCancelClick}
                >
                  Отмена
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;
