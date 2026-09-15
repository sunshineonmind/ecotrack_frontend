export type PracticeStatus =
  | "DRAFT"
  | "CLASSIFICATION"
  | "READY_FOR_PICKUP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "COMPLETED";

export type QuantityUnit = "kg" | "t";

export interface Practice {
  id: string;
  practiceCode: string;
  status: PracticeStatus;

  wasteDescription: string;
  eerCode: string;

  quantity: number;
  unit: QuantityUnit;

  producerName: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreatePracticeInput {
  wasteDescription: string;
  eerCode: string;
  quantity: number;
  unit: QuantityUnit;
  producerName: string;
}
