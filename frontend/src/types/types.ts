import type { MouseEventHandler } from "react";

//common type
export interface ModalStateHandler {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

//login page types
export interface AdminCredTypes {
  email: string;
  password: string;
}

//sigup page types
export interface AdminCredentialsTypes {
  email: string;
  phoneNo: number;
  password: string;
}

export interface CreateBusDto {
  busNumber: string;
  assignedDriver?: { _id: string; driverName: string };
  assignedRoute?: { _id: string; busRoute: string };
  busCapacity: number;
}

export interface BusDataTypes extends CreateBusDto {
  _id: string;
}

export interface RouteDataTypes {
  _id: string;
  routeName: string;
  routeList: string[];
}

export interface CreateDriverDto {
  driverName: string;
  driverPhoneNo: string;
  assignedBus?: { _id: string; busNumber: string };
}

export interface DriverDataTypes extends CreateDriverDto {
  _id: string;
}

// page header types
export interface PageHeaderTypes {
  heading: string;
  description: string;
  setOpenModal?: ModalStateHandler["setOpenModal"];
}

// Modal types
export interface ModalPropsTypes {
  title?: string;
  subTitle?: string;
  setOpenModal: ModalStateHandler["setOpenModal"];
  children: React.ReactNode;
}

export interface TablePropsTypes {
  tableHeadings?: string[];
  children: React.ReactNode;
}

export interface ToggleBtnType {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TransitionTypes {
  show: boolean;
  children: React.ReactNode;
}

// common button, input and select option Types
export interface InputPropsTypes {
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  maxLength?: number;
  value: string | number;
  autoComplete?: string;
  title?: string;
  onChange: (value: string) => void;
}

export interface SelectInputPropsTypes {
  name: string;
  label: string;
  required: boolean;
  value: string;
  options: { id: string; name: string }[];
  onChange: (value: string) => void;
}

export interface ButtonTypes {
  isLoading?: boolean;
  loadingText?: string;
  btnText?: string;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  btnType: "submit" | "reset" | "button";
  className: string;
}
