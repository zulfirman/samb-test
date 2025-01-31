"use client";

import Label from "./Label";

type SummarySelectInputProps = {
	className?: HTMLDivElement["className"];
	title: string;
	data: string[] | number[];
	name: string;
	onClickLabel: (
		val: string | number,
		type: "category" | "department" | "subCategory"
	) => void;
};

const SummarySelectInput = ({
	data,
	title,
	className,
	name,
	onClickLabel,
}: SummarySelectInputProps) => {
	return (
		<div className={`flex flex-1 ${className}`}>
			<div className="mr-2 min-w-[136px] flex justify-between">
				<span>{title}</span>
				<span>:</span>
			</div>
			<div className="flex">
				{data.length ? (
					<div className="flex flex-1 flex-wrap gap-y-2">
						{data.map((val, i) => {
							return (
								<Label
									key={i}
									title={String(val)}
									className="mr-2"
									onClick={() =>
										onClickLabel(val, name as any)
									}
								/>
							);
						})}
					</div>
				) : (
					<div className="flex flex-1 items-center">
						<div className="font-bold text-[14px]">
							Not Selected
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SummarySelectInput;
