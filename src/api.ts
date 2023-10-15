import { client } from "./index";
import type {Conversation, Package, Subscription} from "./types";

export async function getConversations(): Promise<Conversation[]> {
  const resp = await client.get('/conversation/list');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get conversations');
  }

  return resp.data.data as Conversation[];
}

export async function getConversation(id: string): Promise<Conversation> {
  const resp = await client.get(`/conversation/load?id=${id}`);

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get conversation');
  }

  return resp.data.data as Conversation;
}

export async function deleteConversation(id: string): Promise<boolean> {
  const resp = await client.get(`/conversation/delete?id=${id}`);

  if (resp.status !== 200) {
    throw new Error('Failed to delete conversation');
  }

  return resp.data.status === true;
}

export async function getQuota(): Promise<number> {
  const resp = await client.get('/quota');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get quota');
  }

  return resp.data.quota;
}

export async function buyQuota(quota: number): Promise<boolean> {
  // quota must be integer between 1 and 99999
  if (quota <= 0 || quota > 99999) {
    throw new Error('Invalid quota');
  } else if (quota % 1 !== 0) {
    throw new Error('Quota must be an integer');
  }

  const resp = await client.post('/buy', { quota });

  if (resp.status !== 200) {
    throw new Error('Failed to buy quota');
  }

  return resp.data.status === true;
}

export async function getPackage(): Promise<Package> {
  const resp = await client.get('/package');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get package');
  }

  return resp.data.data as Package;
}

export async function getSubscription(): Promise<Subscription> {
  const resp = await client.get('/subscription');

  if (resp.status !== 200 || resp.data.status !== true) {
    throw new Error('Failed to get subscription');
  }

  return resp.data.data as Subscription;
}

export async function buySubscription(month: number): Promise<boolean> {
  // month must be integer between 1 and 999
  if (month <= 0 || month > 999) {
    throw new Error('Invalid month');
  } else if (month % 1 !== 0) {
    throw new Error('Month must be an integer');
  }

  const resp = await client.post('/subscribe', { month });

  if (resp.status !== 200) {
    throw new Error('Failed to subscribe');
  }

  return resp.data.status === true;
}
