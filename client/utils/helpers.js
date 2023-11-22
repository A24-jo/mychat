'use client'


export const setLocalStorageItems = (nameItem, valueItem) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(nameItem, valueItem);
    }
  };
  
  export const getLocalStorageItems = (nameItem) => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(nameItem);
    }
    return null; // Otra opción: devolver un valor predeterminado o lanzar un error según tus necesidades
  };
  