export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
}

export interface ordermodel {
  userId: string;
  orderItems: OrderItem[];
  shoppingAddress: ShippingAddress;
  totalPrice: number;
}