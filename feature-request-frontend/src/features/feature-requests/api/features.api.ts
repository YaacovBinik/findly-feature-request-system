import axios from "axios";
import type { Feature, CreateFeatureInput } from "../types/feature.types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getFeatures = async (
  userIdentifier?: string,
): Promise<Feature[]> => {
  const res = await api.get("/features", {
    params: { userIdentifier },
  });

  return res.data;
};

export const createFeature = async (data: CreateFeatureInput) => {
  const res = await api.post("/features", data);
  return res.data;
};

export const toggleVote = async (featureId: string, userIdentifier: string) => {
  const res = await api.post(`/features/${featureId}/vote`, {
    userIdentifier,
  });

  return res.data;
};

export const updateFeature = async (
  featureId: string,
  data: {
    title?: string;
    description?: string;
    creatorIdentifier: string;
  },
) => {
  const res = await api.patch(`/features/${featureId}`, data);
  return res.data;
};

export const deleteFeature = async (
  featureId: string,
  creatorIdentifier: string,
) => {
  const res = await api.delete(`/features/${featureId}`, {
    data: { creatorIdentifier },
  });

  return res.data;
};
