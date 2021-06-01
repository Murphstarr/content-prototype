import React from 'react';
import { useTranslation } from 'react-i18next';

// constructs a dropdown menu
const Dropdown = () => {
  // initializes state, defines changeLanguage function
  const { t, i18n } = useTranslation(['translation', 'welcome']);
  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  const updateLanguage = (language) => {
    changeLanguage(language);
    window.localStorage.setItem('Language', language);
  };

  return (
    <div className="dropdown show">
      <a className="btn btn-secondary dropdown-toggle" href="/" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {t('Dropdown.Title')}
      </a>
      <div className="dropdown-menu" href="!#" aria-labelledby="dropdownMenuLink">
        <a className="dropdown-item" href="!#" onClick={() => { updateLanguage('sp'); }}>
          Espanol
        </a>
        <a className="dropdown-item" href="!#" onClick={() => { updateLanguage('en'); }}>
          English
        </a>
        <a className="dropdown-item" href="!#" onClick={() => { updateLanguage('fr'); }}>
          Français
        </a>
      </div>
    </div>
  );
};

export default Dropdown;
