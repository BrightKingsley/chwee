interface NavLinkProps {
  href: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  children: ({ isActive }: { isActive: boolean }) => React.ReactNode;
}

interface ButtonProps {
  children: React.ReactNode | string;
  className?: string;
  color?: "purple" | "lemon" | "black" | "transparent";
  onClick: Function;
}

type HeaderType = {
  imgShown?: boolean;
  location?: string;
  title: string;
  leading?: React.ReactNode[];
  trailing?: React.ReactNode[];
};
