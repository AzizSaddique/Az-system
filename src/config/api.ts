const fallback = import.meta.env.PROD ? "https://az-system.onrender.com" : "";
const rawUrl = import.meta.env.VITE_API_URL;

export const API_URL = ((rawUrl && rawUrl.trim() !== "") ? rawUrl : fallback).replace(/\/$/, "");
