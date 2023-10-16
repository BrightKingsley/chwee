export type OptionsMenuType = {
  show: boolean;
  options: ({ label: string; onClick: Function } | null)[];
};
