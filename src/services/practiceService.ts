import { mockPractices } from "../data/mockPractices";
import type {
  CreatePracticeInput,
  Practice,
} from "../types/practice";

let practices: Practice[] = [...mockPractices];

export const practiceService = {
  async getAll(): Promise<Practice[]> {
    return Promise.resolve([...practices]);
  },

  async getById(id: string): Promise<Practice | undefined> {
    return Promise.resolve(
      practices.find((practice) => practice.id === id)
    );
  },

  async create(input: CreatePracticeInput): Promise<Practice> {
    const now = new Date().toISOString();

    const nextNumber = practices.length + 1;

    const practice: Practice = {
      id: crypto.randomUUID(),
      practiceCode: `TW-2026-${String(nextNumber).padStart(6, "0")}`,
      status: "DRAFT",
      wasteDescription: input.wasteDescription,
      eerCode: input.eerCode,
      quantity: input.quantity,
      unit: input.unit,
      producerName: input.producerName,
      createdAt: now,
      updatedAt: now,
    };

    practices = [practice, ...practices];

    return Promise.resolve(practice);
  },
};