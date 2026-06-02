import { Button } from "antd";


export default function StartPage() {
    return (
        <div className="min-h-screen bg-sky-50 flex flex-col items-center p-8 gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-sky-900">Multiplication Game</h1>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <Button type="primary" size="large" block>
                    Игра
                </Button >
                <Button size="large" block>
                    Рекорды
                </Button >
                <Button size="large" block>
                    Настройки
                </Button >
            </div>
        </div>
    )
}