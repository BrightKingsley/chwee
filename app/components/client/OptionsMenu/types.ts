export type OptionsMenuType = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  options: ({ label: string; onClick: Function } | null)[];
};
