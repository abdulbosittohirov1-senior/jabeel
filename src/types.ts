export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  protein: string;
  fat: string;
  calories: string;
  packagingTypes: string[];
  temperatureRange: string;
  cookingSuggestions: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  text: string;
  rating: number;
  date: string;
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
  longDescription: string;
  duration: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  minOrder: string;
  deliveryTime: string;
  coverage: string;
  color: string;
}
