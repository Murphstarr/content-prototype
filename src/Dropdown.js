import React from 'react';
import { useTranslation } from 'react-i18next';
 
const Dropdown = () => {
  const { t, i18n } = useTranslation(['translation', 'welcome']);
 
  const changeLanguage = code => {
    i18n.changeLanguage(code);
  };
 
  return (
    <div class="dropdown show">
    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select Language
    </a>

    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" onClick={() => changeLanguage('sp')}>
        Espanol
      </a>
        <a class="dropdown-item" onClick={() => changeLanguage('en')}>
        English
        </a>
    </div>
    </div>
  );
};
 
export default Dropdown;