export type OptionsMenuType = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  options: ({ label: string | React.ReactNode; onClick: Function } | null)[];
};
