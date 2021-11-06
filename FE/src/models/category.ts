export interface Category {
  id?: string;
  name?: string;
  cateted_at?: string;
  updated_at?: string;
  brands: Brands[];
}
export interface Brands {
  id?: string;
  name?: string;
}

export interface MenuItem {
  label?: string;
  icon?: string;
  items?: Item[];
}
export interface Item {
  label?: string;
  icon?: string;
}
