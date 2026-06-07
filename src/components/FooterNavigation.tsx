import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { Home, Gamepad2, Settings } from "lucide-react";
import { paths } from "../defaults/constants";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useTranslation } from "react-i18next";

export default function FooterNavigation() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { pathname } = useLocation();

	const items: ItemType<MenuItemType>[] = [
		{ key: paths.INDEX, label: t("general.home"), icon: <Home size={18} /> },

		...(pathname !== paths.GAME
			? [
					{
						key: paths.GAME,
						label: t("general.play"),
						icon: <Gamepad2 size={18} />,
					},
				]
			: []),
		...(pathname !== paths.SETTINGS
			? [
					{
						key: paths.SETTINGS,
						label: t("general.settings"),
						icon: <Settings size={18} />,
					},
				]
			: []),
	];

	return (
		<div
			className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
			style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
		>
			<Menu
				mode="horizontal"
				selectedKeys={[pathname]}
				onClick={({ key }) => navigate(key)}
				items={items}
				className="flex justify-center border-none w-full bg-transparent"
				style={{ width: "100%" }}
			/>
		</div>
	);
}
