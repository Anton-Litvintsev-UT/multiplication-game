import { Button, Progress } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../defaults/constants';
import FooterNavigation from '../components/FooterNavigation';
import { useTranslation } from 'react-i18next';

export default function GamePage() {
    const { t } = useTranslation()
    const navigate = useNavigate();

    const answers = [44, 55, 66, 77]
    const [playerAnswer, setPlayerAnswer] = useState<number | undefined>();
    const [progressPercent, setProgressPercent] = useState<number | undefined>(100);

    // Game loop
    useEffect(() => {
        // Start timer
        const startTime = Date.now();
        const totalTime = 60 * 1000;
        const fps = 8;
        const tickInterval = 1000 / fps;

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            setProgressPercent(100 - ((elapsedTime / totalTime) * 100)) // show progress in reverse
            if (elapsedTime >= totalTime) { // stop progress bar
                clearInterval(interval);
            }
        }, tickInterval);
        return () => clearInterval(interval); // if component is destroyed before game ends
    }, []);

    return (
        <div className="flex flex-col items-center p-8 gap-6">
            <div className="flex flex-col items-center p-8 gap-6 bg-gray-400 w-min">
                <Button className="text-center" onClick={() => navigate(paths.INDEX)}>
                    {t("gamepage.end_game")}
                </Button>
                <Progress
                    className="justify-center"
                    percent={progressPercent}
                    size={[400, 20]}
                    showInfo={false}
                    success={{
                        percent: 0
                    }}
                />
                <div className="flex w-full flex-row justify-between">
                    <div>
                        <h3>{t("gamepage.score")}</h3>
                        <h1>2x2</h1>
                    </div>
                    <div>
                        <h3>{t("gamepage.save_result")}</h3>
                        <h1>100</h1>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    {answers.map((answer, index) => (
                        <Button
                            key={index}
                            className="w-full"
                            style={{ height: 'auto', aspectRatio: '1 / 1', fontSize: '4rem' }}
                            onClick={() => setPlayerAnswer(answer)}
                        >
                            {answer}
                        </Button>
                    ))}
                </div>
            </div>
            <FooterNavigation />
        </div>
    )
}