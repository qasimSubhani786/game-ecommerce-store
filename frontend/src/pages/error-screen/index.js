import React from 'react';
import {useNavigate} from 'react-router';
import {images} from '../../common';
import {ALL_TEXT} from '../../common/constants';
import './styles.scss';
import {path} from '../../common/routesNames';
import {GenericButton} from '../../components';
import {getToken} from '../../utils/localstorage';

const ErrorPage = () => {
  let navigate = useNavigate();
  const isLoggedIn = getToken() !== '';
  return (
    <div className="error-page-500">
      <img src={images.errorIcon} />
      <span>{'Oooops....'}</span>
      <span>{ALL_TEXT.ERROR_PAGE_DESCRIPTION}</span>
      <div className="error-btn-container">
        <GenericButton
          id="error-page"
          onPress={() => {
            navigate({
              pathname: !isLoggedIn ? path.login : path.plans,
            });
          }}
          buttonText={'Go Back'}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
