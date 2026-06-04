import { Button, Dropdown, Typography, type MenuProps } from "antd";

interface DropdownWithTitleProps {
	label: string;
	selected: string;
	menuProps: MenuProps;
}

export const DropdownWithLabel = ({
	label,
	selected,
	menuProps,
}: DropdownWithTitleProps) => {
	return (
		<div className="flex flex-col gap-1">
			<Typography.Text className="text-sky-800 font-medium text-left">
				{label}
			</Typography.Text>
			<Dropdown menu={menuProps}>
				<Button iconPlacement="end" block>
					{selected}
				</Button>
			</Dropdown>
		</div>
	);
};
