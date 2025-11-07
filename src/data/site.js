import siteData from "./site.json";

// Portfolio images imports
import plancito from "@/assets/images/plancito.png";
import gymstagram from "@/assets/images/gymstagram.png";
import turnogram from "@/assets/images/turnogram.png";
import plugins from "@/assets/images/plugins.png";

// Mapeo de imágenes para services
import apps from "@/assets/images/apps.png";
import ecommerce from "@/assets/images/ecommerce.png";
import landing from "@/assets/images/landing.png";
import saas from "@/assets/images/saas.png";

const serviceImages = {
  "apps.png": apps,
  "ecommerce.png": ecommerce,
  "landing.png": landing,
  "saas.png": saas,
};

// Mapeo de imágenes para portfolio
const portfolioImages = {
  "plancito.png": plancito,

  "gymstagram.png": gymstagram,

  "turnogram.png": turnogram,

  "plugins.png": plugins,
};

// Función para procesar imágenes de portfolio
function processPortfolioImages(portfolio) {
  return portfolio.map((project) => ({
    ...project,
    images: {
      portrait: portfolioImages[project.images.portrait] || project.images.portrait,
      landscape: portfolioImages[project.images.landscape] || project.images.landscape,
      fullwidth: project.images.fullwidth.map((img) => portfolioImages[img] || img),
      grid: project.images.grid.map((img) => portfolioImages[img] || img),
    },
    feedback: {
      ...project.feedback,
      avatar: portfolioImages[project.feedback.avatar] || project.feedback.avatar,
    },
  }));
}

// Función para obtener datos con imágenes procesadas
export function getSiteData() {
  const data = { ...siteData };

  // Procesar imágenes de services
  data.services = data.services.map((service) => ({
    ...service,
    image: serviceImages[service.image] || service.image,
  }));

  // Procesar imágenes de portfolio
  data.portfolio = processPortfolioImages(data.portfolio);

  return data;
}

// Exportar secciones específicas
export const { about, resume, social, content } = siteData;

// Exportar services con imágenes procesadas
export const services = getSiteData().services;

// Exportar portfolio con imágenes procesadas
export const portfolio = getSiteData().portfolio;

// Exportar todo el sitio
export default getSiteData();
