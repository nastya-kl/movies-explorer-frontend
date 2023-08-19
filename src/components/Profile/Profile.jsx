import React from "react";
import ValidateForm from "../../hooks/ValidateForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ onLogout, onUpdateUserInfo }) {
  const currentUser = React.useContext(CurrentUserContext);
  const inputElements = document.querySelectorAll("input");
  const [isEdition, setIsEdition] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const {
    values,
    handleChange,
    errors,
    setValues,
    isFormValid,
    setIsFormValid,
  } = ValidateForm({});
  const { name, email } = values;

  React.useEffect(() => {
    if (!isFormValid) {
      setErrorText('При обновлении профиля произошла ошибка');
    } else {
      setErrorText('')
    }
  }, [setErrorText, isFormValid])

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.email, currentUser.name, setValues]);

  React.useEffect(() => {
    if (currentUser.name === name && currentUser.email === email) {
      setIsFormValid(false);
    }
  }, [name, email, currentUser.name, currentUser.email, setIsFormValid]);

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
              className='profile__input'
              placeholder='Введите имя'
              value={name || ""}
              onChange={handleChange}
              disabled
              required
              errors={errors}
            />
            <label className='profile__label'>E-mail</label>
            <input
              type='email'
              name='email'
              className='profile__input'
              placeholder='Введите E-mail'
              value={email || ""}
              onChange={handleChange}
              disabled
              required
              errors={errors}
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
                    !isFormValid ? "button__disabled" : "profile__save-button"
                  }`}
                  type='submit'
                  disabled={!isFormValid}
                >
                  Сохранить
                </button>
                <button className="profile__cancel-button" onClick={handleCancelClick}>Отмена</button>
              </>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;
