import type { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import type { MouseEventHandler } from "react";

//common components type
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

// Route Component
export interface CreateRouteDto {
  _id?: string;
  routeName: string;
  locationsList: { locationName: string }[];
}

export interface RouteFormData {
  _id?: string;
  routeName: string;
  locationName: string;
}

export interface CreateRouteTypes {
  _id?: string;
  routeName: string;
  locationsList: [];
}

export interface RouteApiResponse {
  Routes: CreateRouteDto[];
}

//Bus Component
export interface CreateBusDto {
  _id?: string;
  busNumber: string;
  assignedDriver?: { _id: string; driverName: string };
  assignedRoute?: { _id: string; routeName : string };
  busCapacity: string;
}

export interface BusFormData {
  _id?: string;
  busNumber: string;
  busCapacity: string;
  busDriverId: string;
  busRouteId: string;
}

export interface BusApiResponse {
  buses: CreateBusDto[];
}

// Driver Component
export interface CreateDriverDto {
  _id?: string;
  driverName: string;
  driverPhoneNo: string;
  assignedBus?: { _id: string; busNumber: string };
}

export interface DriverFormData {
  _id?: string;
  driverName: string;
  driverPhoneNo: string;
  busId: string;
}

export interface DriverApiResponse {
  drivers: CreateDriverDto[];
}

// student component types
export interface CreateStudentDto {
  _id?: string;
  studentId: string;
  studentName: string;
  parentPhoneNo: string;
  checkpoint: string
  assignedBus?: { _id: string; busNumber: string };
}

export interface StudentApiResponse {
  students: CreateStudentDto[];
}

export interface StudentFormData {
  _id?: string;
  studentId: string;
  studentName: string;
  parentPhoneNo: string;
  busId: string;
  checkpoint: string;
}

export interface Location {
  locationName: string;
  latitude: number;
  longitude: number;
}

// entityManager component types
interface FormComponentProps<T> {
  selectedData: T;
  isEditMode: boolean;
  setOpenModal: (value: boolean) => void;
}

interface DataTableComponentProps<T> {
  setIsEditMode: (value: boolean) => void;
  setSelectedData: (data: T) => void;
  setOpenModal: (value: boolean) => void;
}

export interface EntityManagerProps<T> {
  title: string;
  description: string;
  tableHeadings: string[];
  FormComponent: React.ComponentType<FormComponentProps<T>>;
  DataTableComponent: React.ComponentType<DataTableComponentProps<T>>;
  initialData: T;
  componentName: string;
}

////// Hooks types ////////

// useFetchData hook types //
export interface UseFetchDataProps<T> {
  endpoint: string;
  queryKey: string[];
  sliceAction?: ActionCreatorWithPayload<T>;
}

// useFrom hook types //
export interface UseFormProps<T> {
  endpoint: string;
  queryKey: string[];
  initialData: T;
  onSuccess?: () => void;
}
// useTable types //
export interface UseTableProps {
  endpoint: string;
  queryKey: string[];
}

// pageHeader component types
export interface PageHeaderTypes {
  heading: string;
  description: string;
  setOpenModal?: React.Dispatch<React.SetStateAction<boolean>>;
  btnText?: string;
}

// Modal component types
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

// table component types
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

// tableState component type
export interface TableStateProps {
  isLoading: boolean;
  isError: boolean;
  colSpan: number;
  loadingMessage?: string;
  errorMessage?: string;
  showSpinner?: boolean;
  children?: React.ReactNode;
}

// common button, input and select options Types
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
  min?: number;
  max?: number;
  onChange: (value: string) => void;
}

export interface SelectInputPropsTypes {
  name: string;
  label: string;
  required?: boolean;
  value: string;
  disabled?: boolean;
  options: { id?: string | undefined; name: string | undefined }[];
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
