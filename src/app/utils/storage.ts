"use client";
export const setUserDataStorage = (user : any) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const getUserDataStorage = () => {
  const user : any = localStorage.getItem("user");

  return JSON.parse(user) ?? {};
};