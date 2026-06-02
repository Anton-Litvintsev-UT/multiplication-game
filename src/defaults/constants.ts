import type { MenuProps } from "antd";

export const paths = {
  INDEX: "/",
  GAME: "/game",
  RECORDS: "/records",
  SETTINGS: "/settings",
};

export const languages: MenuProps['items'] = [
    {
        key: 'en',
        label: 'English',
    },
    {
        key: 'ru',
        label: 'Русский',
    },
    {
        key: 'ee',
        label: 'Eesti',
    }]

export const themes: MenuProps['items'] = [
    {
        key: 'light',
        label: 'Светлая',
    },
    {
        key: 'dark',
        label: 'Тёмная',
    },
]