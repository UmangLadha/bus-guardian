import type { MouseEventHandler } from "react";

//common type
// export interface ModalStateHandler<T> {
//   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
//   setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
//   setSelectedData: React.Dispatch<React.SetStateAction<T>>;
// }

export interface ApiResponse {
  message?: string;
  success?: boolean;
  [key: string]: unknown;
}

export interface ApiError {
  message?: string;
}

export interface SelectOption {
  id: string;
  name: string;
}

export interface ModalStateHandler<T> {
  setOpenModal: (value: boolean) => void;
  setSelectedData: (data: T) => void;
  setIsEditMode: (value: boolean) => void;
}

export interface FormProps<T> {
  setOpenModal: (value: boolean) => void;
  selectedData: T;
  isEditMode: boolean;
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

//Bus Component
export interface CreateBusDto {
  _id?: string;
  busNumber: string;
  assignedDriver?: { _id: string; driverName: string };
  assignedRoute?: { _id: string; busRoute: string };
  busCapacity: string;
}

export interface BusApiResponse {
  buses: CreateBusDto[];
}

// Route Component
export interface CreateRouteDto {
  _id?: string;
  routeName: string;
  routeList: { locationName: string }[];
}

export interface CreateRouteTypes {
  _id?: string;
  routeName: string;
  routeList: [];
}

// Driver Component
export interface CreateDriverDto {
  _id?: string;
  driverName: string;
  driverPhoneNo: string;
  assignedBus?: { _id: string; busNumber: string };
}

// page header types
export interface PageHeaderTypes {
  heading: string;
  description: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  btnText?: string;
}

// Modal types
export interface ModalPropsTypes {
  children: React.ReactNode;
}

export interface ModalFormButtonPropsTypes {
  setOpenModal: (value: boolean) => void;
  isEditMode: boolean;
  isLoading: boolean;
}

export interface ModalFormHeadingPropTypes {
  heading: string;
  subHeading: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// table prop types
export interface TablePropsTypes {
  tableHeadings?: string[];
  children: React.ReactNode;
}

// login/sigin toggle button prop types
export interface ToggleBtnType {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

// transition prop types
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
  min?:number;
  max?:number;
  onChange: (value: string) => void;
}

export interface SelectInputPropsTypes {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  options: { id: string | undefined; name: string | undefined }[];
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

export interface TableStateProps {
  isLoading: boolean;
  isError: boolean;
  colSpan: number;
  loadingMessage?: string;
  errorMessage?: string;
  children?: React.ReactNode;
}

