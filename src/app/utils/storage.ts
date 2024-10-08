"use client";
export const setUserDataStorage = (user : any) => {
 if (typeof window !== 'undefined') localStorage.setItem("user", JSON.stringify(user));
}

export const getUserDataStorage = () => {
 let user : any = JSON.stringify({});
 if (typeof window !== 'undefined') user = localStorage.getItem("user") ?? JSON.stringify({});

  return JSON.parse(user);
};

export const getStoredCartItems = () => {
  let cart : any = JSON.stringify([]);
  if (typeof window  !== 'undefined') cart = localStorage.getItem("cartItems") ?? JSON.stringify([]);

  return JSON.parse(cart);
};
