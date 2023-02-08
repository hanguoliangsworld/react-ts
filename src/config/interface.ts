
export interface HomeMainState {
  collapsed?: boolean;
  setCollapsed?: () => void;
}
export interface RouterProps {
  path: string;
  element: React.ReactNode | null;
  children?: RouterProps[];
  title?: string;
  icon?:any,
  isMenu?: boolean
}