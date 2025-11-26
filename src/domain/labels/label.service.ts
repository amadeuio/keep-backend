import { labelQueries } from "../../db/queries/labels";
import { labelMappers } from "./label.mappers";
import {
  LabelAPI,
  LabelCreateRequest,
  LabelUpdateRequest,
} from "./label.types";

export const labelService = {
  findAll: async (): Promise<Record<string, LabelAPI>> => {
    const labels = await labelQueries.findAll();
    const labelsById = labels.reduce(
      (acc, label) => {
        acc[label.id] = labelMappers.dbToAPI(label);
        return acc;
      },
      {} as Record<string, LabelAPI>
    );
    return labelsById;
  },

  create: async (data: LabelCreateRequest): Promise<string> => {
    const label = await labelQueries.create(data.id, data.name);
    return label.id;
  },

  update: async (id: string, data: LabelUpdateRequest): Promise<string> => {
    const label = await labelQueries.update(id, data.name);
    return label.id;
  },

  delete: async (id: string): Promise<boolean> => {
    return await labelQueries.delete(id);
  },
};
