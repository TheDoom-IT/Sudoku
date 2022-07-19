import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from './constants';

export function NotFound() {
    return <Navigate to={ROUTES.HOME} />
}