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
  async ({ orderId, priority }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_ORDER}/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority }),
      });

      if (response.ok) {
        const updatedOrderResponse = await fetch(`${API_URL_ORDER}/${orderId}`);
        const updatedOrderData = await updatedOrderResponse.json();

        return updatedOrderData;
      } else {
        return rejectWithValue({ error: "Failed to change priority" });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const searchOrder = createAsyncThunk(
  "order/searchOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL_ORDER}/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue({ error: "Failed to change priority" });
      }
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderId = null;
      state.orderData = null;
      state.status = "";
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // submitOrder
      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.orderId = action.payload.data.id;
        state.orderData = action.payload.data;
        state.isLoading = false;
      })

      .addCase(submitOrder.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.isLoading = false;
      })
      // changePriority
      .addCase(changePriority.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(changePriority.fulfilled, (state, action) => {
        const { priority, priorityPrice, estimatedDelivery } =
          action.payload.data;

        return {
          ...state,
          orderData: {
            ...state.orderData,
            priority,
            priorityPrice,
            estimatedDelivery,
          },
          isLoading: false,
        };
      })

      .addCase(changePriority.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
        state.isLoading = false;
      })

      // searchOrder
      .addCase(searchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(searchOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.orderId = action.payload.data.id;
        state.orderData = action.payload.data;
        state.isLoading = false;
      })

      .addCase(searchOrder.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong";
        state.isLoading = false;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
