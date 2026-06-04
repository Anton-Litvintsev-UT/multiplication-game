import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { paths } from "../defaults/constants";
import { useTranslation } from "react-i18next";


export default function StartPage() {
    const { t } = useTranslation()
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center p-8 gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-sky-900">{t("general.game_name")}</h1>
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
    )
}