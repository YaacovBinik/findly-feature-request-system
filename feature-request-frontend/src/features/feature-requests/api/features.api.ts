import axios from "axios";
import type { Feature, CreateFeatureInput } from "../types/feature.types";

const api = axios.create({
  baseURL: "http://localhost:3000",
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
