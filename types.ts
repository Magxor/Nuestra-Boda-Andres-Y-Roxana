
export type GuestType = 'adult' | 'child_free' | 'child_paid';

export type WishStyle = 'formal' | 'funny' | 'emotional' | 'inspirational';

export type TransportType = 'auto' | 'moto' | 'passenger' | 'none';

export type AccommodationType = 'camping' | 'hotel' | 'none';

export interface Guest {
  id: string;
  fullName: string;
  contact: string;
  type: GuestType;
  openBar: boolean;
  dietaryRestrictions: string;
  transport: TransportType;
  accommodationType?: AccommodationType;
  accommodationName?: string;
}

export interface RsvpFormData {
  guests: Guest[];
  paymentMethod: 'transfer' | 'cash' | null;
  message: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
}
