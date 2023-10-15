declare module 'chatnio' {
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

  export type ChatProps = {
    message: string;
    model?: string;
    web?: boolean;
  }

  export type MessageSegment = {
    message: string;
    keyword: string;
    quota: number;
    end: boolean;
  }

  export type MessageResponse = {
    message: string;
    keyword: string;
    quota: number;
  }

  export function setKey(key: string): void;
  export function setEndpoint(url: string): void;

  export class Chat {
    protected connection?: WebSocket;
    public id: number;
    public state: boolean;
    protected callback?: (data: any) => void;

    public constructor(id: number);
    public ask(props: ChatProps): Promise<MessageResponse>;
    public askStream(props: ChatProps, callback: (data: MessageSegment) => void): void;
    public close(): void;
  }

  export function getConversations(): Promise<Conversation[]>;
  export function getConversation(id: string): Promise<Conversation>;
  export function deleteConversation(id: string): Promise<void>;
  export function getQuota(): Promise<number>;
  export function buyQuota(): Promise<void>;
  export function getSubscription(): Promise<Subscription>;
  export function buySubscription(): Promise<void>;
  export function getPackage(): Promise<Package>;
}
