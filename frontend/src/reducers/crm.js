import {
    PRODUCTS_DATA,
    PRODUCT_DETAILS,
    CUSTOMERS_DATA,
    CUSTOMERS_DETAILS,
    CUSTOMERS_JOBCARDS,
    JOBCARD_DATA,
    JOBCARD_NUMBER,
    SEARCH_CUSTOMER,
    SEARCH_PRODUCT,
    JOBCARD_DETAILS
} from "../actions/types";

const initialState = {
    products: null,
    customers: null,
    searchdata: null,
    searchproduct: null,
    productdetails: null,
    jobcards: null,
    jobcard_number:null,
    jobcard_details:null,
    customer_details:null,
    customer_jobcards:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PRODUCTS_DATA:
            return {
                ...state,
                products: action.payload,
            };
        case PRODUCT_DETAILS:
            return {
                ...state,
                productdetails: action.payload,
            };
        case JOBCARD_DATA:
            return {
                ...state,
                jobcards: action.payload,
            };
        case JOBCARD_NUMBER:
            return {
                ...state,
                jobcard_number: action.payload,
            };
        case JOBCARD_DETAILS:
            return {
                ...state,
                jobcard_details: action.payload,
            };
        
        case CUSTOMERS_DATA:
            return {
                ...state,
                customers: action.payload,
            };
        case CUSTOMERS_DETAILS:
            return {
                ...state,
                customer_details: action.payload,
            }
        case CUSTOMERS_JOBCARDS:
            return {
                ...state,
                customer_jobcards: action.payload,
            }
        case SEARCH_CUSTOMER:
            return {
                ...state,
                searchdata: action.payload,
            };
        case SEARCH_PRODUCT:
            return {
                ...state,
                searchproduct: action.payload,
            };
        default:
            return state;
    }
}
