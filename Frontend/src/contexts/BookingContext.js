import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingState, setBookingState] = useState({
    selectedLocation: '',
    selectedServices: [],
    selectedDate: '',
    selectedTime: '',
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhone: '',
    totalPrice: 0,
    totalDuration: 0,
    notes: '',
    confirmation: null
  });

  const updateBookingState = (updates) => {
    setBookingState(prevState => ({
      ...prevState,
      ...updates
    }));
  };

  const resetBooking = () => {
    setBookingState({
      selectedLocation: '',
      selectedServices: [],
      selectedDate: '',
      selectedTime: '',
      customerFirstName: '',
      customerLastName: '',
      customerEmail: '',
      customerPhone: '',
      totalPrice: 0,
      totalDuration: 0,
      notes: '',
      confirmation: null
    });
  };

  const value = {
    bookingState,
    setBookingState: updateBookingState,
    resetBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};