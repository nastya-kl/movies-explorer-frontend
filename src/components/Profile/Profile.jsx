import React from "react";
import { useNavigate } from "react-router-dom";
import ValidateForm from "../../hooks/ValidateForm";
import "./Profile.css";

function Profile({ setIsLoggedIn, isLoggedIn }) {
  const profileName = "Виталий";
  const profileEmail = "pochta@yandex.ru";
  const navigate = useNavigate();
  const inputElements = document.querySelectorAll("input");
  const [isEdition, setIsEdition] = React.useState(false);
  const { values, handleChange, errors, setValues, isFormValid } = ValidateForm(
    {}
  );
  const { name, email } = values;

  React.useEffect(() => {
    setValues({ name: profileName, email: profileEmail });
  }, [setValues]);

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
  }

  const handleSignout = () => {
    navigate("/", { replace: true });
    setIsLoggedIn(false);
    console.log(isLoggedIn);
  };

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
                <button
                  className='profile__logout-button'
                  onClick={handleSignout}
                >
                  Выйти из аккаунта
                </button>
              </>
            )}
            {isEdition && (
              <button
                className={`${
                  !isFormValid ? "button__disabled" : "profile__save-button"
                }`}
                type='submit'
                disabled={!isFormValid}
              >
                Сохранить
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;
