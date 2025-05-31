//IMPORT REACT e VITE
import { useState, useEffect } from "react";

//Import Type
import type { Product } from "../types/ProductTypes";

//URL CHIAMATA API
const url = import.meta.env.VITE_API_URL;

export default function useProduct() {
  //GESTIONE STATO PRODOTTI
  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const call = await fetch(`${url}/products`);
        const resCall: Product[] = await call.json();
        setProduct(resCall);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Errore sconosciuto", error);
        }
      }
    };
    fetchProduct();
  }, []);


  const dataProducts = { products };
  return dataProducts;
}


//FUNZIONI PER GESTIRE RICHIESTE HTTP

/*   const addTask = async (newTask) => {
    const call = await fetch(`${url}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const { success, message, task } = await call.json();
    // const resCall = await call.json();

    if (!success) {
      throw new Error(message);
      setTasks((prev) => [...prev, task.task]);
    }
  }; */
/* 
  const removeTask = async (idTask) => {
    try {
      const call = await fetch(`${url}/tasks/${idTask}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resCall = await call.json();
      if (resCall.success === true) {
        setTasks((prevTask) => prevTask.filter((t) => t.id !== idTask));
      } else {
        throw new Error(
          resCall.message ||
            "Oh, oh! L'eliminazione della Task ha causato un ERRORE!!!"
        );
      }
    } catch (error) {
      console.error("Errore durante l'eliminazione:", error);
      throw error;
    }
  }; */

/*   const updateTask = async (updateTask) => {
    try {
      const call = await fetch(`${url}/tasks/${updateTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTask),
      });
      const resCall = await call.json();
      if (resCall.success === true) {
        setTasks((prevTask) =>
          prevTask.map((oldTask) =>
            oldTask.id === resCall.task.id ? resCall.task : oldTask
          )
        );
      } else {
        throw new Error(
          resCall.message || "Oh, oh! Qualcosa ha causato un ERRORE!!!"
        );
      }
    } catch (error) {
      console.error("Errore nella chiamata API:", error);
      throw error;
    }
  }; */
/* 
  const dataTask = { tasks, addTask, removeTask, updateTask };

  return dataTask; */
