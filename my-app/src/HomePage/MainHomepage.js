import React, {useContext, useState} from 'react';
import AuthService from '../authService';
import LoggedHomePage from './LoggedHomePage';
import LogoutHomePage from './HomePage';

function Homepage(){
    
    const isAuthenticated = AuthService.isAuthenticated();
    return(
        <>
    {isAuthenticated ? (
        <LoggedHomePage/>
        ) : (
      <LogoutHomePage/>
    )}
    </>
);
}

export default Homepage;