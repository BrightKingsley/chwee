export type DropdownType = {
  show: boolean;
  text: string;
  actionCancel: Function;
  actionConfirm: Function;
  altConfirm?: React.ReactNode;
};
