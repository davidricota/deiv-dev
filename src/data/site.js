import siteData from "./site.json";
import ME1vbM1gADIv from "@/assets/images/ME1vbM1gADIv.webp";
import qlq4K7e8e6MK from "@/assets/images/qlq4K7e8e6MK.webp";
import fb5kXWj157qL from "@/assets/images/fb5kXWj157qL.webp";
import PiURthOLcyQ6 from "@/assets/images/PiURthOLcyQ6.webp";

// Mapeo de imágenes para services
const serviceImages = {
  "ME1vbM1gADIv.webp": ME1vbM1gADIv,
  "qlq4K7e8e6MK.webp": qlq4K7e8e6MK,
  "fb5kXWj157qL.webp": fb5kXWj157qL,
  "PiURthOLcyQ6.webp": PiURthOLcyQ6,
};

// Función para obtener datos con imágenes procesadas
export function getSiteData() {
  const data = { ...siteData };

  // Procesar imágenes de services
  data.services = data.services.map((service) => ({
    ...service,
    image: serviceImages[service.image] || service.image,
  }));

  return data;
}

// Exportar secciones específicas
export const { about, resume, portfolio, social } = siteData;

// Exportar services con imágenes procesadas
export const services = getSiteData().services;

// Exportar todo el sitio
export default getSiteData();
