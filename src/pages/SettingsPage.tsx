

import { useState } from 'react';
import type { ItemType } from 'antd/es/menu/interface';
import NumberInputWithLabel from '../components/NumberInputWithLabel';
import { DropdownWithLabel } from '../components/DropdownWithLabel';
import { languages, themes } from '../defaults/constants';
import FooterNavigation from '../components/FooterNavigation';

const getItemLabel = (items: ItemType[] | undefined, key: string) => {
    const selectedItem = items?.find((item: any) => item?.key === key) as any;
    return selectedItem?.label || key;
}

export default function SettingsPage() {
    const defaultDifficulty = 3;
    const [difficultyLvl, setDifficultyLvl] = useState<number | null>(defaultDifficulty);
    const [currentLang, setCurrentLang] = useState('ru');
    const [currentTheme, setCurrentTheme] = useState('light');

    const onDifficultyChange = (val: number | null) => {
        setDifficultyLvl(val)
        localStorage.setItem("lvl", JSON.stringify(val))
    }

    const onLangChange = (val: string) => {
        setCurrentLang(val)
        localStorage.setItem("lang", val)
    }

    const onThemeChange = (val: string) => {
        setCurrentTheme(val)
        localStorage.setItem("theme", val)
    }

    const currentLangLabel = getItemLabel(languages, currentLang);
    const currentThemeLabel = getItemLabel(themes, currentTheme);
    return (
        <div className="flex flex-col items-center p-8 gap-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-sky-900">Multiplication Game</h1>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <NumberInputWithLabel
                    mode='spinner'
                    label="Сложность:"
                    value={difficultyLvl}
                    min={2}
                    max={20}
                    defaultValue={defaultDifficulty}
                    onChange={(val) => onDifficultyChange(val as number | null)}
                    onBlur={() => difficultyLvl === null && onDifficultyChange(defaultDifficulty)}
                    placeholder="-"
                />
                <DropdownWithLabel
                    label="Язык:"
                    selected={currentLangLabel as string}
                    menuProps={{
                        items: languages,
                        onClick: (e) => onLangChange(e.key)
                    }}
                />
                <DropdownWithLabel
                    label="Тема:"
                    selected={currentThemeLabel as string}
                    menuProps={{
                        items: themes,
                        onClick: (e) => onThemeChange(e.key)
                    }}
                />
            </div>
            <FooterNavigation />
        </div>
    )
}