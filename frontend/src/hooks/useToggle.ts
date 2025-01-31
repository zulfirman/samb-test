import { useCallback, useState } from "react";

export function useToggle() {
	const [open, setOpen] = useState(false);

	const toggle = useCallback(() => setOpen((prev => !prev)), []);

	return [open, setOpen, toggle] as const;
}
