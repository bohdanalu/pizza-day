import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL_ORDER } from "../../helpers/constants";

const initialState = {
  orderId: null,
  orderData: null,
  status: "",
  error: null,
  isLoading: false,
};

export const submitOrder = createAsyncThunk(
  "order/submitOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePriority = createAsyncThunk(
  "order/changePriority",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_ORDER}/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: true }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.orderId = action.payload.data.id;
        state.orderData = action.payload.data;
      })

      .addCase(submitOrder.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
      })

      .addCase(changePriority.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(changePriority.fulfilled, (state, action) => {
        const { priority, estimatedDelivery, orderPrice, priorityPrice } =
          action.payload.data;
        state.orderData.priority = priority;
        state.orderData.estimatedDelivery = estimatedDelivery;
        state.orderData.orderPrice = orderPrice;
        state.orderData.priorityPrice = priorityPrice;
      })

      .addCase(changePriority.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default orderSlice.reducer;
