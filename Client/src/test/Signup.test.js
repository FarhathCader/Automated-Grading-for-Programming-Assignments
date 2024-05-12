import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../Components/Register';

describe('Signup component', () => {
  it('renders without crashing', () => {
    render(<Signup />);
  });

  it('submits the form with valid inputs', async () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register Now');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    fireEvent.click(registerButton);

    await waitFor(() => expect(getByText('OTP Verified')).toBeInTheDocument());
  });

  it('shows error message for empty inputs', async () => {
    const { getByText } = render(<Signup />);
    const registerButton = getByText('Register Now');

    fireEvent.click(registerButton);

    await waitFor(() => expect(getByText('All fields are required')).toBeInTheDocument());
  });

  it('shows error message for passwords not matching', async () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register Now');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password456' } });

    fireEvent.click(registerButton);

    await waitFor(() => expect(getByText('Passwords do not match')).toBeInTheDocument());
  });
});
