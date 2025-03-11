import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl().replace(/\/$/, '')}/api/products`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery,
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        // ✅ Fetch All Products
        fetchAllProducts: builder.query({
            query: () => "/",
            providesTags: ["Products"],
        }),

        // ✅ Fetch a Single Product by ID
        fetchProductById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),

        // ✅ Add a New Product (Including Stock Quantity)
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["Products"],
        }),

        // ✅ Update Product (Including Stock)
        updateProduct: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ["Products"],
        }),

        // ✅ Delete a Product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useFetchAllProductsQuery,
    useFetchProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;

export default productsApi;
