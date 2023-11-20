import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  error: null,
  loading: false,
  deleteLoading: false,
};

export const addTodos = createAsyncThunk(
  "todos/create",
  async ({ text, title }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos`, {
        method: "POST",
        body: JSON.stringify({ text, title }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos`, {
        method: "GET",
      });
      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update",

  async ({ id, completed }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completed, // Устанавливаем completed в true
        }),
      });

      const data = await res.json();

      if (data.error) {
        return thunkAPI.rejectWithValue(data.error);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.deleteLoading = false;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload;
        state.deleteLoading = false;
      })

      .addCase(addTodos.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodoIndex = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        state.todos[updatedTodoIndex].completed = action.payload.completed;
      });
  },

  //end
});

export default todosSlice.reducer;
