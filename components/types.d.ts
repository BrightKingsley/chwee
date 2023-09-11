interface NavLinkProps {
  href: string;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  children: ({ isActive }: { isActive: boolean }) => React.ReactNode;
}

interface ButtonProps {
	children: React.ReactNode | string;
	className?: string;
	color?: "purple" | "lemon" | "black" | "transparent";
	onClick: Function;
}
