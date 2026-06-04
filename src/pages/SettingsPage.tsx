

import { useState, useEffect } from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import NumberInputWithLabel from '../components/NumberInputWithLabel';
import { DropdownWithLabel } from '../components/DropdownWithLabel';
import { languagesDropdown, themesDropdown } from '../defaults/constants';
import FooterNavigation from '../components/FooterNavigation';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
    const { i18n, t } = useTranslation()

    const dropdownKeyTranslator = (items: ItemType[] | undefined): ItemType[] | undefined => {
        return items?.map((item: any) => ({ ...item, label: t(item.label) }));
    };

    const getItemLabel = (items: ItemType[] | undefined, key: string) => {
        const selectedItem = items?.find((item: any) => item?.key === key) as any;
        return selectedItem?.label || key;
    }

    const defaultDifficulty = 3;
    const [difficultyLvl, setDifficultyLvl] = useState<number | null>(defaultDifficulty);
    const [currentLang, setCurrentLang] = useState(i18n.language || 'ru');
    const [currentTheme, setCurrentTheme] = useState(() => localStorage.getItem("theme") || 'light');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', currentTheme === 'dark');
        document.documentElement.style.colorScheme = currentTheme;
    }, [currentTheme]);

    const onDifficultyChange = (val: number | null) => {
        setDifficultyLvl(val)
        localStorage.setItem("lvl", JSON.stringify(val))
    }

    const onLangChange = (val: string) => {
        setCurrentLang(val)
        i18n.changeLanguage(val)
    }

    const onThemeChange = (val: string) => {
        setCurrentTheme(val)
        localStorage.setItem("theme", val)
    }

    const languagesDropdownTranslated = dropdownKeyTranslator(languagesDropdown)
    const themesDropdownTranslated = dropdownKeyTranslator(themesDropdown)
    const currentLangLabel = getItemLabel(languagesDropdownTranslated, currentLang);
    const currentThemeLabel = getItemLabel(themesDropdownTranslated, currentTheme);
    return (
        <ConfigProvider theme={{ algorithm: currentTheme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm }}>
            <div className="flex flex-col items-center p-8 gap-6 min-h-screen bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 transition-colors">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-sky-900 dark:text-sky-400">{t("general.game_name")}</h1>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <NumberInputWithLabel
                        mode='spinner'
                        label={t("settings.difficulty")}
                        value={difficultyLvl}
                        min={2}
                        max={20}
                        defaultValue={defaultDifficulty}
                        onChange={(val) => onDifficultyChange(val as number | null)}
                        onBlur={() => difficultyLvl === null && onDifficultyChange(defaultDifficulty)}
                        placeholder="-"
                    />
                    <DropdownWithLabel
                        label={t("settings.language")}
                        selected={currentLangLabel as string}
                        menuProps={{
                            items: languagesDropdownTranslated,
                            onClick: (e) => onLangChange(e.key)
                        }}
                    />
                    <DropdownWithLabel
                        label={t("settings.theme")}
                        selected={currentThemeLabel as string}
                        menuProps={{
                            items: themesDropdownTranslated,
                            onClick: (e) => onThemeChange(e.key)
                        }}
                    />
                </div>
                <FooterNavigation />
            </div>
        </ConfigProvider>
    )
}