export const locales = ["en", "pt", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  pt: "Português",
  es: "Español",
};

export const translations = {
  en: {
    "docs.title": "Documentation",
    "docs.search": "Search docs...",
    "docs.searchPlaceholder": "Search docs... (⌘K)",
    "docs.noResults": "No results found",
    "docs.results": "{count} result(s) found",
    "docs.version": "Version",
    "docs.previous": "Previous",
    "docs.next": "Next",
    "docs.breadcrumb": "Docs",
  },
  pt: {
    "docs.title": "Documentação",
    "docs.search": "Buscar docs...",
    "docs.searchPlaceholder": "Buscar docs... (⌘K)",
    "docs.noResults": "Nenhum resultado encontrado",
    "docs.results": "{count} resultado(s) encontrado(s)",
    "docs.version": "Versão",
    "docs.previous": "Anterior",
    "docs.next": "Próximo",
    "docs.breadcrumb": "Docs",
  },
  es: {
    "docs.title": "Documentación",
    "docs.search": "Buscar docs...",
    "docs.searchPlaceholder": "Buscar docs... (⌘K)",
    "docs.noResults": "No se encontraron resultados",
    "docs.results": "{count} resultado(s) encontrado(s)",
    "docs.version": "Versión",
    "docs.previous": "Anterior",
    "docs.next": "Siguiente",
    "docs.breadcrumb": "Docs",
  },
} as const;

export function getTranslation(locale: Locale, key: keyof typeof translations.en): string {
  return translations[locale][key] || translations[defaultLocale][key];
}
