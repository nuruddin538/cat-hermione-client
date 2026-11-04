export type EventType =
  | "Cleanup"
  | "Plantation"
  | "Donation"
  | "Education"
  | "Community Service"
  | "Other";

export interface CommunityEvent {
  _id: string;
  title: string;
  description: string;
  eventType: EventType;
  imageUrl: string;
  location: string;
  eventDate: string;
  createdBy: string;
  createdAt: string;
  joinedAt?: string;
}

export interface JoinedEvent {
  _id: string;
  eventId: string;
  eventTitle: string;
  email: string;
  userId: string;
  joinedAt: string;

  title: string;
  description: string;
  eventType: EventType;
  imageUrl: string;
  location: string;
  eventDate: string;
}

export interface JoinedEventsResponse {
  success: boolean;
  message?: string;
  // events: CommunityEvent[];
  events: JoinedEvent[];
}
