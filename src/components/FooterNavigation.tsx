import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { Home, Gamepad2, Settings } from 'lucide-react';
import { paths } from "../defaults/constants";
import type { ItemType, MenuItemType } from 'antd/es/menu/interface';

export default function FooterNavigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    console.log(pathname, `/${paths.GAME}`)

    const items: ItemType<MenuItemType>[] = [
        { key: paths.INDEX, label: 'В начало', icon: <Home size={18} /> },

        ...(pathname !== paths.GAME
            ? [{ key: paths.GAME, label: 'В игру', icon: <Gamepad2 size={18} /> }]
            : []),
        ...(pathname !== paths.SETTINGS
            ? [{ key: paths.SETTINGS, label: 'Настройки', icon: <Settings size={18} /> }]
            : []),
    ];

    return (
        <div className="fixed bottom-0 w-full z-50 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
            <Menu
                mode="horizontal"
                selectedKeys={[pathname]}
                onClick={({ key }) => navigate(key)}
                items={items}
                className="flex justify-center border-none w-full"
                style={{ width: '100%' }}
            />
        </div>
    );
}