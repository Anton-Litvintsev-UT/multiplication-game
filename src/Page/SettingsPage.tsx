

import type { InputNumberProps, MenuProps } from 'antd';
import { Button, Dropdown, InputNumber, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { useState } from 'react';

interface NumberInputWithLabelProps extends InputNumberProps {
    label: string;
}

const NumberInputWithLabel = ({ label, ...props }: NumberInputWithLabelProps) => {
    return (
        <div className="flex flex-col gap-1">
            <Typography.Text className="text-sky-800 font-medium text-left">{label}</Typography.Text>
            <InputNumber {...props} />
        </div>
    )
}

const languages: MenuProps['items'] = [
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

const themes: MenuProps['items'] = [
    {
        key: 'light',
        label: 'Светлая',
    },
    {
        key: 'dark',
        label: 'Тёмная',
    },
]

interface DropdownWithTitleProps {
    label: string;
    selected: string;
    menuProps: MenuProps;
}

const DropdownWithLabel = ({ label, selected, menuProps }: DropdownWithTitleProps) => {
    return (
        <div className="flex flex-col gap-1">
            <Typography.Text className="text-sky-800 font-medium text-left">{label}</Typography.Text>
            <Dropdown menu={menuProps}>
                <Button iconPlacement="end" block>
                    {selected}
                </Button>
            </Dropdown>
        </div>
    )
}

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
        console.log(localStorage)
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
        </div>
    )
}