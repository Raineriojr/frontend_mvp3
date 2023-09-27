export interface listProps {
  id: number;
  name: {
    first: string;
    last: string;
  }
  email: string;
  location: {
    country: string;
  }
}