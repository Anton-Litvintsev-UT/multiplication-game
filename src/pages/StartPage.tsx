import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { paths } from "../defaults/constants";


export default function StartPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center p-8 gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-sky-900">Multiplication Game</h1>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <Button type="primary" size="large" onClick={() => navigate(paths.GAME)}>
                    Игра
                </Button >
                <Button size="large" onClick={() => navigate(paths.RECORDS)}>
                    Рекорды
                </Button >
                <Button size="large" onClick={() => navigate(paths.SETTINGS)}>
                    Настройки
                </Button >
            </div>
        </div>
    )
}