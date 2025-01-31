// import { apiFunc } from "@/config/api";
import { APIResponse, Option } from "@/types/common";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAPI } from "./useAPI";
import { useCheckboxValueSelectInput } from "./useCheckboxValueSelectInput";
import { useProducts } from "./useProducts";

type ValueProps = { label: any; value: any; checked: boolean }

export function useFilterDepartment(router: ReturnType<typeof useRouter>) {
	const { getColumnByDepartment, getColumns } = useProducts(router);
	const { requestAPI } = useAPI(router);
	const [department, setDepartment, activeDepartment, setActiveDepartment] =
		useCheckboxValueSelectInput<
			ValueProps[],
			number[]
		>([], []);
	const [productGroup, setProductGroup, activeProductGroup, setActiveProductGroup] =
		useCheckboxValueSelectInput<
			ValueProps[],
			string[]
		>([], []);
	const [variation, setVariation, activeVariation, setActiveVariation] =
		useCheckboxValueSelectInput<
			ValueProps[],
			string[]
		>([], []);
	const [category, setCategory, activeCategory, setActiveCategory] =
		useCheckboxValueSelectInput<
			ValueProps[],
			string[]
		>([], []);

	const createCheckboxValue = (arr: any[], def: boolean | undefined = true) =>
		arr.map((val) => ({
			label: val,
			value: val,
			checked: def,
		}));

	const onChangeDepartment = async (newValue: Option) => {
		try {
			let value = newValue.value as number;
			let newActiveDepartment = [] as number[];

			if (Number(value) == -1 || department.length == 2) {
				if (activeDepartment.length + 1 == department.length) {
					setProductGroup([]);
					setActiveProductGroup([])
					setVariation([]);
					setActiveVariation([])
					setCategory([]);
					setActiveCategory([]);

					setDepartment(
						department.map((dep) => ({ ...dep, checked: false }))
					);
					setActiveDepartment([]);
				} else {
					const newActiveDepartment = department
						.map((dep) => dep.value)
						.filter((dep) => dep != -1);
					const newColumn = await getColumns({ departmentCode: newActiveDepartment, productGroup: [], category: [], variation: [] });

					const newProductGroup = createCheckboxValue(newColumn.productGroup, true);
					const newVariation = createCheckboxValue(newColumn.variation, true);
					const newCategory = createCheckboxValue(newColumn.category, true);

					newProductGroup.push({
						checked: true,
						label: "Select All",
						value: -1,
					});
					newVariation.push({
						checked: true,
						label: "Select All",
						value: -1,
					});
					newCategory.push({
						checked: true,
						label: "Select All",
						value: -1,
					});

					setProductGroup(newProductGroup as any);
					setActiveProductGroup(newColumn.productGroup as any);
					setVariation(newVariation as any);
					setActiveVariation(newColumn.variation as any);
					setCategory(newCategory as any);
					setActiveCategory(newColumn.category as any);

					setDepartment(department.map((dep) => ({ ...dep, checked: true })));
					setActiveDepartment(newActiveDepartment);
				}
			} else {
				let addNewDepartment = false;
				if (activeDepartment.includes(value)) {
					if (activeDepartment.length <= 1) {
						newActiveDepartment = [];
					} else {
						newActiveDepartment = activeDepartment.filter(
							(val) => val != value
						);
					}
				} else {
					if (!activeDepartment.length) {
						newActiveDepartment = [value];
					} else {
						newActiveDepartment = [...activeDepartment, value];
					}

					addNewDepartment = true;
				}

				const newColumn = await getColumnByDepartment(
					newActiveDepartment
				);

				const newDepartment = department.map((val) => ({
					...val,
					checked:
						val.value == -1
							? newActiveDepartment.length + 1 ==
							department.length
							: newActiveDepartment.includes((val as any).value),
				}));

				let newCategory;
				let newActiveCategory;

				if (addNewDepartment) {
					newCategory = createCheckboxValue(
						newColumn.category,
						false
					);
					newCategory = newCategory.map((cat) => ({
						...cat,
						checked: activeCategory.includes((cat as any).value),
					}));
					let filteredActiveNewCategory = newColumn.category.filter((cat) => !activeCategory.includes((cat as any).value));
					newCategory = newCategory.map((cat) => {
						return {
							...cat,
							checked: filteredActiveNewCategory.includes(cat.value) ? true : cat.checked
						}
					})

					newCategory.push({
						checked: filteredActiveNewCategory.length + (newColumn.category.length - filteredActiveNewCategory.length) == newCategory.length,
						label: "Select All",
						value: -1,
					});

				} else {
					newCategory = category.filter((cat) =>
						category.length == newColumn.category.length + 1
							? newColumn.category.includes(cat.value)
							: [...newColumn.category, -1].includes(cat.value)
					);
				}

				if (newActiveDepartment.length == 0) {
					setActiveCategory([])
					setCategory([])
				} else {
					setActiveCategory(
						newCategory.filter((cat) => cat.checked)
							.map((cat) => cat.value).filter(cat => cat != -1)

					);
					setCategory(newCategory);
				}

				setActiveDepartment(newActiveDepartment);
				setDepartment(newDepartment);
			}
		} catch (err) {
			console.log(err, "Department");
		}
	};

	const onChangeProductGroup = async (newValue: Option) => {
		try {
			let value = newValue.value as string;
			let newActiveProductGroup = [] as string[];

			if (Number(value) == -1 || productGroup.length == 2) {
				if (activeProductGroup.length + 1 == productGroup.length) {
					setActiveVariation([]);
					setVariation([]);
					setActiveCategory([]);
					setCategory([]);

					setProductGroup(
						productGroup.map((dep) => ({ ...dep, checked: false }))
					);
					setActiveProductGroup([]);
				} else {
					const currentActiveProductGroup = productGroup
						.map((dep) => dep.value)
						.filter((dep) => dep != -1);
					const newColumn = await getColumns({ category: [], departmentCode: activeDepartment, productGroup: currentActiveProductGroup, variation: [] });
					const newProductGroup = createCheckboxValue(newColumn.productGroup, true);
					const newVariation = createCheckboxValue(newColumn.variation, true);
					const newCategory = createCheckboxValue(newColumn.category, true);
					newProductGroup.push({
						checked: true,
						label: "Select All",
						value: -1,
					});
					newVariation.push({
						checked: true,
						label: "Select All",
						value: -1,
					});
					newCategory.push({
						checked: true,
						label: "Select All",
						value: -1,
					});

					setProductGroup(newProductGroup as any);
					setActiveProductGroup(newColumn.productGroup as any);
					setVariation(newVariation as any);
					setActiveVariation(newColumn.variation as any);
					setCategory(newCategory as any);
					setActiveCategory(newColumn.category as any);
				}
			} else {
				let addNewProductGroup = false;
				if (activeProductGroup.includes(value)) {
					if (activeProductGroup.length <= 1) {
						newActiveProductGroup = [];
					} else {
						newActiveProductGroup = activeProductGroup.filter(
							(val) => val != value
						);
					}
				} else {
					if (!activeProductGroup.length) {
						newActiveProductGroup = [value];
					} else {
						newActiveProductGroup = [...activeProductGroup, value];
					}

					addNewProductGroup = true;
				}

				const newColumn = await getColumnByDepartment(
					newActiveProductGroup
				);

				const newDepartment = productGroup.map((val) => ({
					...val,
					checked:
						val.value == -1
							? newActiveProductGroup.length + 1 ==
							productGroup.length
							: newActiveProductGroup.includes((val as any).value),
				}));

				let newCategory;
				let newActiveCategory;

				if (addNewProductGroup) {
					newCategory = createCheckboxValue(
						newColumn.category,
						false
					);
					newCategory = newCategory.map((cat) => ({
						...cat,
						checked: activeCategory.includes((cat as any).value),
					}));
					let filteredActiveNewCategory = newColumn.category.filter((cat) => !activeCategory.includes((cat as any).value));
					newCategory = newCategory.map((cat) => {
						return {
							...cat,
							checked: filteredActiveNewCategory.includes(cat.value) ? true : cat.checked
						}
					})

					newCategory.push({
						checked: filteredActiveNewCategory.length + (newColumn.category.length - filteredActiveNewCategory.length) == newCategory.length,
						label: "Select All",
						value: -1,
					});

				} else {
					newCategory = category.filter((cat) =>
						category.length == newColumn.category.length + 1
							? newColumn.category.includes(cat.value)
							: [...newColumn.category, -1].includes(cat.value)
					);
				}

				if (newActiveProductGroup.length == 0) {
					setActiveVariation([])
					setVariation([])
				} else {
					setActiveVariation(
						newCategory.filter((cat) => cat.checked)
							.map((cat) => cat.value).filter(cat => cat != -1)

					);
					setVariation(newCategory);
				}

				setActiveProductGroup(newActiveProductGroup);
				setProductGroup(newDepartment);
			}
		} catch (err) {
			console.log(err)
		}
	};

	const onChangeVariation = async (newValue: Option) => {
		try {
			let value = newValue.value as string;
			let newActiveVariation = [] as string[];

			if (Number(value) == -1 || variation.length == 2) {
				if (activeVariation.length + 1 == productGroup.length) {
					setActiveCategory([]);
					setCategory([]);

					setVariation(
						variation.map((dep) => ({ ...dep, checked: false }))
					);
					setActiveVariation([]);
				} else {
					const currentActiveVariation = productGroup
						.map((dep) => dep.value)
						.filter((dep) => dep != -1);
					const newColumn = await getColumns({ category: [], departmentCode: activeDepartment, productGroup: activeProductGroup, variation: currentActiveVariation });
					const newVariation = createCheckboxValue(newColumn.variation, true);
					const newCategory = createCheckboxValue(newColumn.category, true);
					newVariation.push({
						checked: true,
						label: "Select All",
						value: -1,
					});
					newCategory.push({
						checked: true,
						label: "Select All",
						value: -1,
					});

					setVariation(newVariation as any);
					setActiveVariation(newColumn.variation as any);
					setCategory(newCategory as any);
					setActiveCategory(newColumn.category as any);
				}
			} else {
				let addNewProductGroup = false;
				if (activeVariation.includes(value)) {
					if (activeVariation.length <= 1) {
						newActiveVariation = [];
					} else {
						newActiveVariation = activeVariation.filter(
							(val) => val != value
						);
					}
				} else {
					if (!activeVariation.length) {
						newActiveVariation = [value];
					} else {
						newActiveVariation = [...activeVariation, value];
					}

					addNewProductGroup = true;
				}

				const newColumn = await getColumnByDepartment(
					newActiveVariation
				);

				const newDepartment = productGroup.map((val) => ({
					...val,
					checked:
						val.value == -1
							? newActiveVariation.length + 1 ==
							productGroup.length
							: newActiveVariation.includes((val as any).value),
				}));

				let newCategory;
				let newActiveCategory;

				if (addNewProductGroup) {
					newCategory = createCheckboxValue(
						newColumn.category,
						false
					);
					newCategory = newCategory.map((cat) => ({
						...cat,
						checked: activeCategory.includes((cat as any).value),
					}));
					let filteredActiveNewCategory = newColumn.category.filter((cat) => !activeCategory.includes((cat as any).value));
					newCategory = newCategory.map((cat) => {
						return {
							...cat,
							checked: filteredActiveNewCategory.includes(cat.value) ? true : cat.checked
						}
					})

					newCategory.push({
						checked: filteredActiveNewCategory.length + (newColumn.category.length - filteredActiveNewCategory.length) == newCategory.length,
						label: "Select All",
						value: -1,
					});

				} else {
					newCategory = category.filter((cat) =>
						category.length == newColumn.category.length + 1
							? newColumn.category.includes(cat.value)
							: [...newColumn.category, -1].includes(cat.value)
					);
				}

				if (newActiveVariation.length == 0) {
					setActiveVariation([])
					setVariation([])
				} else {
					setActiveVariation(
						newCategory.filter((cat) => cat.checked)
							.map((cat) => cat.value).filter(cat => cat != -1)

					);
					setVariation(newCategory);
				}

				setActiveProductGroup(newActiveVariation);
				setProductGroup(newDepartment);
			}
		} catch (err) {
			console.log(err)
		}
	};

	// const onChangeCategory = async (newValue: Option) => {
	// 	try {
	// 		let value = newValue.value as string;
	// 		let newActiveProductGroup = [] as string[];

	// 		if (Number(value) == -1) {
	// 			if (activeProductGroup.length + 1 == productGroup.length) {
	// 				setActiveVariation([]);
	// 				setVariation([]);
	// 				setActiveCategory([]);
	// 				setCategory([]);

	// 				setProductGroup(
	// 					productGroup.map((dep) => ({ ...dep, checked: false }))
	// 				);
	// 				setActiveProductGroup([]);
	// 			} else {
	// 				const currentActiveProductGroup = productGroup
	// 					.map((dep) => dep.value)
	// 					.filter((dep) => dep != -1);
	// 				const newColumn = await getColumns({ category: [], departmentCode: activeDepartment, productGroup: currentActiveProductGroup, variation: [] });
	// 				const newProductGroup = createCheckboxValue(newColumn.productGroup, true);
	// 				const newVariation = createCheckboxValue(newColumn.variation, true);
	// 				const newCategory = createCheckboxValue(newColumn.category, true);
	// 				newProductGroup.push({
	// 					checked: true,
	// 					label: "Select All",
	// 					value: -1,
	// 				});
	// 				newVariation.push({
	// 					checked: true,
	// 					label: "Select All",
	// 					value: -1,
	// 				});
	// 				newCategory.push({
	// 					checked: true,
	// 					label: "Select All",
	// 					value: -1,
	// 				});

	// 				setProductGroup(newProductGroup as any);
	// 				setActiveProductGroup(newColumn.productGroup as any);
	// 				setVariation(newVariation as any);
	// 				setActiveVariation(newColumn.variation as any);
	// 				setCategory(newCategory as any);
	// 				setActiveCategory(newColumn.category as any);
	// 			}
	// 		} else {
	// 			let addNewProductGroup = false;
	// 			if (activeProductGroup.includes(value)) {
	// 				if (activeProductGroup.length <= 1) {
	// 					newActiveProductGroup = [];
	// 				} else {
	// 					newActiveProductGroup = activeProductGroup.filter(
	// 						(val) => val != value
	// 					);
	// 				}
	// 			} else {
	// 				if (!activeProductGroup.length) {
	// 					newActiveProductGroup = [value];
	// 				} else {
	// 					newActiveProductGroup = [...activeProductGroup, value];
	// 				}

	// 				addNewProductGroup = true;
	// 			}

	// 			const newColumn = await getColumnByDepartment(
	// 				newActiveProductGroup
	// 			);

	// 			const newDepartment = productGroup.map((val) => ({
	// 				...val,
	// 				checked:
	// 					val.value == -1
	// 						? newActiveProductGroup.length + 1 ==
	// 						productGroup.length
	// 						: newActiveProductGroup.includes((val as any).value),
	// 			}));

	// 			let newCategory;
	// 			let newActiveCategory;

	// 			if (addNewProductGroup) {
	// 				newCategory = createCheckboxValue(
	// 					newColumn.category,
	// 					false
	// 				);
	// 				newCategory = newCategory.map((cat) => ({
	// 					...cat,
	// 					checked: activeCategory.includes((cat as any).value),
	// 				}));
	// 				let filteredActiveNewCategory = newColumn.category.filter((cat) => !activeCategory.includes((cat as any).value));
	// 				newCategory = newCategory.map((cat) => {
	// 					return {
	// 						...cat,
	// 						checked: filteredActiveNewCategory.includes(cat.value) ? true : cat.checked
	// 					}
	// 				})

	// 				newCategory.push({
	// 					checked: filteredActiveNewCategory.length + (newColumn.category.length - filteredActiveNewCategory.length) == newCategory.length,
	// 					label: "Select All",
	// 					value: -1,
	// 				});

	// 			} else {
	// 				newCategory = category.filter((cat) =>
	// 					category.length == newColumn.category.length + 1
	// 						? newColumn.category.includes(cat.value)
	// 						: [...newColumn.category, -1].includes(cat.value)
	// 				);
	// 			}

	// 			if (newActiveProductGroup.length == 0) {
	// 				setActiveVariation([])
	// 				setVariation([])
	// 			} else {
	// 				setActiveVariation(
	// 					newCategory.filter((cat) => cat.checked)
	// 						.map((cat) => cat.value).filter(cat => cat != -1)

	// 				);
	// 				setVariation(newCategory);
	// 			}

	// 			setActiveProductGroup(newActiveProductGroup);
	// 			setProductGroup(newDepartment);
	// 		}
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// };

	const onChangeCategory = (newValue: Option) => {
		let value = newValue.value as string;
		let newActiveCategory = [] as string[];

		if (Number(value) == -1) {
			if (activeCategory.length + 1 == category.length) {
				setActiveCategory([]);
				setCategory(
					category.map((val) => ({ ...val, checked: false }))
				);
			} else {
				setActiveCategory(
					category.map((val) => val.value).filter((val) => val != -1)
				);
				setCategory(category.map((val) => ({ ...val, checked: true })));
			}
		} else {
			if (activeCategory.includes(value)) {
				if (activeCategory.length <= 1) {
					newActiveCategory = [];
				} else {
					newActiveCategory = activeCategory.filter(
						(val) => val != value
					);
				}
			} else {
				if (!activeCategory.length) {
					newActiveCategory = [value];
				} else {
					newActiveCategory = [...activeCategory, value];
				}
			}

			const newCategory = category.map((val) => ({
				...val,
				checked:
					val.value == -1
						? newActiveCategory.length + 1 == category.length
						: newActiveCategory.includes((val as any).value),
			}));

			setActiveCategory(newActiveCategory);
			setCategory(newCategory);
		}
	};

	const fecthFilterData = async () => {
		try {
			const data = {
				column: ["departmentCode", "productGroup", "variation", "category"],
				filter: {
					departmentCode: [],
					productGroup: [],
					variation: [],
					category: []
				},
			};

			const req = await requestAPI(
				"dashboard/product/select-product-column",
				"post",
				{
					data,
				}
			);
			const res: APIResponse<{
				departmentCode: number[];
				productGroup: string[],
				variation: string[],
				category: string[],
			}> = req.data;

			const newDepartment = createCheckboxValue(res.content.departmentCode);
			const newProductGroup = createCheckboxValue(res.content.productGroup);
			const newVariation = createCheckboxValue(res.content.variation);
			const newCategory = createCheckboxValue(res.content.category);
			newDepartment.push({
				checked: true,
				label: "Select All",
				value: -1,
			});
			newProductGroup.push({
				checked: true,
				label: "Select All",
				value: -1,
			});
			newVariation.push({
				checked: true,
				label: "Select All",
				value: -1,
			});
			newCategory.push({
				checked: true,
				label: "Select All",
				value: -1,
			});

			setDepartment(newDepartment as any);
			setActiveDepartment(res.content.departmentCode as any);
			setProductGroup(newProductGroup as any);
			setActiveProductGroup(res.content.productGroup as any);
			setVariation(newVariation as any);
			setActiveVariation(res.content.variation as any);
			setCategory(newCategory as any);
			setActiveCategory(res.content.category as any);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fecthFilterData();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return {
		department,
		activeDepartment,
		productGroup,
		activeProductGroup,
		variation,
		activeVariation,
		category,
		activeCategory,

		setDepartment,
		setActiveDepartment,
		setProductGroup,
		setActiveProductGroup,
		setVariation,
		setActiveVariation,
		setCategory,
		setActiveCategory,
		createCheckboxValue,
		onChangeDepartment,
		onChangeProductGroup,
		onChangeVariation,
		onChangeCategory,
		fecthFilterData
	}
}
