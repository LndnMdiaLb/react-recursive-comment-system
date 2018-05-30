import React from 'react';

// Proxy
export const Button = ({onClick, children, ...props}) =>
    <button
        type='button'
        onClick={onClick} {...props}>{children}</button>

// Named Fragment
export const ButtonSet = ({children}) =>
    <React.Fragment>{children}</React.Fragment>
