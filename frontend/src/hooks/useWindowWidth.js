import { useEffect, useState } from "react";

export default function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth
      setWidth(width)
    }
    // actualizaremos el width al montar el componente
    updateWidth()
    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth)

    // devolvemos una función para anular la suscripción al evento
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, []) // este efecto se ejecuta sólo al montarse el componente

  return {
    width
  }
}