import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { API_URL } from '@env';

export const getUsers = async () => {
  const { token } = useContext(AuthContext);

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    return await response.json(); // Devuelve la lista de usuarios
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw error;
  }
};