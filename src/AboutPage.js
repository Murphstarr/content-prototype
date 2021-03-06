import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Renders the about page
 */
function aboutPage () {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <h2>{t('About.AdditionalDetails')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('About.Paragraph1') }} />
      <p dangerouslySetInnerHTML={{ __html: t('About.Paragraph2') }} />
    </React.Fragment>
  );
}

export default aboutPage;
