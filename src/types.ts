export type Message = {
  role: string;
  message: string;
}

export type Conversation = {
  id: string;
  name: string;
  message?: Message[];
}

export type Package = {
  cert: boolean;
  teenager: boolean;
}

export type Subscription = {
  status: boolean;
  is_subscribed: boolean;
  expired: number;
}
