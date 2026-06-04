import { Button, ConfigProvider, theme as antTheme } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../defaults/constants";
import { useTranslation } from "react-i18next";

export default function StartPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [currentTheme] = useState(() => localStorage.getItem("theme") || 'light');

    useEffect(() => {
        const isDark = currentTheme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.style.colorScheme = currentTheme;
    }, [currentTheme]);

    return (
        <ConfigProvider theme={{ algorithm: currentTheme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm }}>
            <div className="flex flex-col items-center p-8 gap-6 min-h-screen bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 transition-colors">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-sky-900 dark:text-sky-400">{t("general.game_name")}</h1>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Button type="primary" size="large" onClick={() => navigate(paths.GAME)}>
                        {t("general.play")}
                    </Button >
                    <Button size="large" onClick={() => navigate(paths.RECORDS)}>
                        {t("general.records")}
                    </Button >
                    <Button size="large" onClick={() => navigate(paths.SETTINGS)}>
                        {t("general.settings")}
                    </Button >
                </div>
            </div>
        </ConfigProvider>
    )
}