// Importa la función localFont desde el paquete next/font/local
import localFont from "next/font/local";
// Importa el componente Navbar desde la ruta especificada
import Navbar from "@/components/Navbar";
// Importa el archivo de estilos globales
import "./globals.css";
// Importa la fuente Roboto desde el paquete next/font/google
import { Roboto } from "next/font/google";

// Define la configuración para la fuente Roboto
const roboto = Roboto({
  weight: ["300", "400", "500", "700"], // Define los pesos de la fuente
  styles: ["italic", "normal"], // Define los estilos de la fuente
  subsets: ["latin"], // Define los subconjuntos de caracteres
});

// Define la configuración para la fuente local Geist Sans
const geistSans = localFont({
  src: "./fonts/GeistVF.woff", // Ruta al archivo de la fuente
  variable: "--font-geist-sans", // Variable CSS para la fuente
  weight: "100 900", // Rango de pesos de la fuente
});

// Define la configuración para la fuente local Geist Mono
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // Ruta al archivo de la fuente
  variable: "--font-geist-mono", // Variable CSS para la fuente
  weight: "100 900", // Rango de pesos de la fuente
});

// Define los metadatos para la aplicación
export const metadata = {
  title: "Create Next App", // Título de la aplicación
  description: "Generated by create next app", // Descripción de la aplicación
};

// Define el componente RootLayout que envuelve la aplicación
export default function RootLayout({ children }) {
  return (
    // Define el elemento HTML principal con el idioma inglés
    <html lang="en">
      {/* Define el cuerpo del documento con la clase de la fuente Roboto */}
      <body className={roboto.className}>
        {/* Renderiza el componente Navbar */}
        <Navbar />
        {/* Renderiza los hijos del componente */}
        {children}
      </body>
    </html>
  );
}