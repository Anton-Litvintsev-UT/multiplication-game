import { InputNumber, Typography, type InputNumberProps } from "antd";

interface NumberInputWithLabelProps extends InputNumberProps {
	label: string;
}

export default function NumberInputWithLabel({
	label,
	...props
}: NumberInputWithLabelProps) {
	return (
		<div className="flex flex-col gap-1">
			<Typography.Text className="text-sky-800 dark:text-sky-300 font-medium text-left">
				{label}
			</Typography.Text>
			<InputNumber className="w-full" {...props} />
		</div>
	);
}
