import arrowBack from "../assets/icons/arrow-back.png";
import arrowDown from "@/assets/icons/arrow-down.png";
import arrowRight from "@/assets/icons/arrow-right.png";
import bag from "@/assets/icons/bag.png";
import check from "@/assets/icons/check.png";
import clock from "@/assets/icons/clock.png";
import dollar from "@/assets/icons/dollar.png";
import envelope from "@/assets/icons/envelope.png";
import home from "@/assets/icons/home.png";
import location from "@/assets/icons/location.png";
import logout from "@/assets/icons/logout.png";
import minus from "@/assets/icons/minus.png";
import pencil from "@/assets/icons/pencil.png";
import person from "@/assets/icons/person.png";
import phone from "@/assets/icons/phone.png";
import plus from "@/assets/icons/plus.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import trash from "@/assets/icons/trash.png";
import user from "@/assets/icons/user.png";

import avatar from "@/assets/images/avatar.png";
import avocado from "@/assets/images/avocado.png";
import bacon from "@/assets/images/bacon.png";
import burgerOne from "@/assets/images/burger-one.png";
import burgerTwo from "@/assets/images/burger-two.png";
import buritto from "@/assets/images/buritto.png";
import cheese from "@/assets/images/cheese.png";
import coleslaw from "@/assets/images/coleslaw.png";
import cucumber from "@/assets/images/cucumber.png";
import emptyState from "@/assets/images/empty-state.png";
import fries from "@/assets/images/fries.png";
import loginGraphic from "@/assets/images/login-graphic.png";
import logo from "@/assets/images/Logo-2026.png";
import logoVertical from "@/assets/images/Logo-vertical.png";
import maddyHero from "@/assets/images/Maddy-Top.png";
import mozarellaSticks from "@/assets/images/mozarella-sticks.png";
import mushrooms from "@/assets/images/mushrooms.png";
import onionRings from "@/assets/images/onion-rings.png";
import onions from "@/assets/images/onions.png";
import pizzaOne from "@/assets/images/pizza-one.png";
import salad from "@/assets/images/salad.png";
import success from "@/assets/images/success.png";
import tomatoes from "@/assets/images/tomatoes.png";

// El Employee Journey real que cubre MADS (mads.land → "Qué proyectos podemos hacer")
export const offers = [
    {
        id: "1",
        title: "Talent Acquisition",
        icon: "🎯",
        color: "#E91E8C",
    },
    {
        id: "2",
        title: "Onboarding",
        icon: "👋",
        color: "#4C5FD9",
    },
    {
        id: "3",
        title: "Capacitación y Desarrollo",
        icon: "📚",
        color: "#14B8A6",
    },
    {
        id: "4",
        title: "Recompensa y Reconocimiento",
        icon: "🏆",
        color: "#7C3AED",
    },
    {
        id: "5",
        title: "Gestión de Performance",
        icon: "📈",
        color: "#0A0A0F",
    },
    {
        id: "6",
        title: "Offboarding",
        icon: "🚪",
        color: "#E91E8C",
    },
];

// Ícono + degradado por especialidad, para no depender de fotos de stock que puedan
// no corresponder al contenido (evita el problema de imágenes desalineadas).
type SpecialtyVisual = { icon: string; colors: [string, string] };

const SPECIALTY_VISUALS: Record<string, SpecialtyVisual> = {
    "Diagnóstico y Transformación Cultural": { icon: "🌱", colors: ["#14B8A6", "#0EA5A0"] },
    "Programas de Bienestar Integral": { icon: "🧘", colors: ["#4C5FD9", "#6B7FE8"] },
    "Transformación Ágil de Equipos": { icon: "⚡", colors: ["#E91E8C", "#F0479E"] },
    "Comunicación Interna y Employer Branding": { icon: "💬", colors: ["#7C3AED", "#9B5CF6"] },
    "Team Buildings & Dinámicas Grupales": { icon: "🤝", colors: ["#14B8A6", "#4C5FD9"] },
    "IA Aplicada a Personas": { icon: "🤖", colors: ["#4C5FD9", "#7C3AED"] },
    "Diversidad, Equidad e Inclusión": { icon: "🌈", colors: ["#E91E8C", "#7C3AED"] },
    "Sustentabilidad y RSE": { icon: "♻️", colors: ["#14B8A6", "#0A0A0F"] },
    "Speakers & Charlas Inspiracionales": { icon: "🎤", colors: ["#7C3AED", "#E91E8C"] },
    "Producción de Eventos Corporativos": { icon: "🎉", colors: ["#E91E8C", "#4C5FD9"] },
};

const DEFAULT_SPECIALTY_VISUAL: SpecialtyVisual = { icon: "💼", colors: ["#4C5FD9", "#14B8A6"] };

export const getSpecialtyVisual = (name: string): SpecialtyVisual =>
    SPECIALTY_VISUALS[name] || DEFAULT_SPECIALTY_VISUAL;

export const sides = [
    {
        name: "Fries",
        image: fries,
        price: 3.5,
    },
    {
        name: "Onion Rings",
        image: onionRings,
        price: 4.0,
    },
    {
        name: "Mozarella Sticks",
        image: mozarellaSticks,
        price: 5.0,
    },
    {
        name: "Coleslaw",
        image: coleslaw,
        price: 2.5,
    },
    {
        name: "Salad",
        image: salad,
        price: 4.5,
    },
];

export const toppings = [
    {
        name: "Avocado",
        image: avocado,
        price: 1.5,
    },
    {
        name: "Bacon",
        image: bacon,
        price: 2.0,
    },
    {
        name: "Cheese",
        image: cheese,
        price: 1.0,
    },
    {
        name: "Cucumber",
        image: cucumber,
        price: 0.5,
    },
    {
        name: "Mushrooms",
        image: mushrooms,
        price: 1.2,
    },
    {
        name: "Onions",
        image: onions,
        price: 0.5,
    },
    {
        name: "Tomatoes",
        image: tomatoes,
        price: 0.7,
    },
];

export const images = {
    avatar,
    avocado,
    bacon,
    burgerOne,
    burgerTwo,
    buritto,
    cheese,
    coleslaw,
    cucumber,
    emptyState,
    fries,
    loginGraphic,
    logo,
    logoVertical,
    maddyHero,
    mozarellaSticks,
    mushrooms,
    onionRings,
    onions,
    pizzaOne,
    salad,
    success,
    tomatoes,
    arrowBack,
    arrowDown,
    arrowRight,
    bag,
    check,
    clock,
    dollar,
    envelope,
    home,
    location,
    logout,
    minus,
    pencil,
    person,
    phone,
    plus,
    search,
    star,
    trash,
    user,
};
