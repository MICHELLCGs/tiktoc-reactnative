import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://localhost:5000/api";

export const getUsers = async () => {
  const { token } = useContext(AuthContext);

  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Incluye el token JWT
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return response.json(); // Devuelve la lista de usuarios
};
