import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/API";


export const fetchRecommendationDetailsByException = createAsyncThunk(
    "appMenu/fetchRecommendationDetailsByException",
    async (payload) => {
        const response = await api.get('/exception-recommendations', { params: payload });
        return response.data;
    }
);

export const fetchRecommendationUploadedDocuments = createAsyncThunk(
    "recommendation/fetchRecommendationUploadedDocuments",
    async (recommendationId) => {
        const response = await api.get(`/document`,{
            params: {
                id: recommendationId,
                document_type: "recommendation"
            }
        });
        return response.data;
    }
)

export const fetchRecommendationComments = createAsyncThunk(
    "recommendation/fetchRecommendationComments",
    async (recommendationId) => {
      const response = await api.get("/comments", {
        params: {
          id: recommendationId,
          module_type: "recommendation",
        },
      });
      return response.data;
    }
  );