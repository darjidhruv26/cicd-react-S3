import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecommendationDetailsByException,
  fetchRecommendationUploadedDocuments,
  fetchRecommendationComments,
} from "./RecommendationThunks";

export const RecommendationSlice = createSlice({
  name: "recommendationSlice",
  initialState: {
    recommendationData: [],
    uploadedRecommendationDocuments: [],
    commentList: [],
  },
  reducers: {},
  extraReducers: {
    [fetchRecommendationDetailsByException.fulfilled]: (state, { payload }) => {
      return { ...state, recommendationData: payload };
    },
    [fetchRecommendationUploadedDocuments.fulfilled]: (state, { payload }) => {
      return { ...state, uploadedRecommendationDocuments: payload };
    },
    [fetchRecommendationComments.fulfilled]: (state, { payload }) => {
      return { ...state, commentList: payload };
    },
  },
});

// export const {  } = RecommendationSlice.actions;

export default RecommendationSlice.reducer;
