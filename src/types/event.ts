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
}
