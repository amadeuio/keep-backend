import { labelRepository } from "./labels.repository";
import { labelMappers } from "./label.mappers";
import {
  LabelAPI,
  LabelCreateRequest,
  LabelUpdateRequest,
} from "./label.types";

export const labelService = {
  findAll: async (userId: string): Promise<Record<string, LabelAPI>> => {
    const labels = await labelRepository.findAll(userId);
    const labelsById = labels.reduce(
      (acc, label) => {
        acc[label.id] = labelMappers.dbToAPI(label);
        return acc;
      },
      {} as Record<string, LabelAPI>
    );
    return labelsById;
  },

  create: async (
    userId: string,
    data: LabelCreateRequest
  ): Promise<string> => {
    const label = await labelRepository.create(userId, data.id, data.name);
    return label.id;
  },

  update: async (
    userId: string,
    id: string,
    data: LabelUpdateRequest
  ): Promise<string> => {
    const label = await labelRepository.update(userId, id, data.name);
    return label.id;
  },

  delete: async (userId: string, id: string): Promise<boolean> => {
    return await labelRepository.delete(userId, id);
  },
};
