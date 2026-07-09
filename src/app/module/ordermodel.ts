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
  orderId?: number;
  userId: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotalPrice: number;
  shippingCharge: number;
  totalPrice: number;
  status?: string;
  expectedDeliveryDate?: Date;
  createdAt?: Date;
}