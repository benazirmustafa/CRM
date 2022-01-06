import axios from "axios";
import {
    PRODUCTS_DATA,
    PRODUCT_DETAILS,
    CUSTOMERS_DATA,
    CUSTOMERS_DETAILS,
    SEARCH_CUSTOMER,
    SEARCH_PRODUCT,
    JOBCARD_DATA,
    SEARCH_DONE,
    SEARCHING,
    JOBCARD_NUMBER,
    JOBCARD_DETAILS,
    CUSTOMERS_JOBCARDS
} from "../actions/types";
import { createMessage } from "./alerts";
import { tokenConfig, tokenConfigUpload } from "./auth";

// Product
export const add_product = (body) => (dispatch, getState) => {
    axios
        .post(`/api/product/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage("Product Created Successfully", "success"));
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
};
export const manage_products = (offset, limit) => (dispatch, getState) => {
    axios
        .get(`/api/product/?limit=${limit}&offset=${offset}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCTS_DATA,
                payload: res.data,
            });
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const edit_product = (body, id, offset, limit) => (dispatch, getState) => {
    axios
        .put(`/api/product/${id}/?limit=${limit}&offset=${offset}`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(manage_products(offset, limit));
            dispatch(
                createMessage("Product Updated Successfully", "success")
            );
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const delete_product = (id, offset, limit) => (dispatch, getState) => {
    axios
        .delete(`/api/product/${id}/?limit=${limit}&offset=${offset}`, tokenConfig(getState))
        .then((res) => {
            dispatch(manage_products(offset, limit));
            dispatch(
                createMessage("Product Deleted Successfully", "success")
            );
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const get_jobcard_details=(id)=> (dispatch, getState) => {
    axios
        .get(`/api/get_jobcard_details/${id}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: JOBCARD_DETAILS,
                payload: res.data
            });

        })
        .catch((err) => {
            dispatch(
                createMessage("Network Error. Something went wrong!", "error")
            );
        });
}
export const get_jobcard_number=() => (dispatch, getState) => {
    axios
        .get(`/api/get_jobcard_number/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: JOBCARD_NUMBER,
                payload: res.data
            });

        })
        .catch((err) => {
            dispatch(
                createMessage("Network Error. Something went wrong!", "error")
            );
        });
}
export const get_product_details = (id) => (dispatch, getState) => {
    axios
        .get(`/api/product/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: PRODUCT_DETAILS,
                payload: res.data
            });

        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}

// Customer
export const add_customer = (body) => (dispatch, getState) => {
    axios
        .post(`/api/customer/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage("Customer Created Successfully", "success"));
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
};
export const manage_customers = (offset, limit) => (dispatch, getState) => {
    axios
        .get(`/api/customer/?limit=${limit}&offset=${offset}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CUSTOMERS_DATA,
                payload: res.data,
            });
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const edit_customer = (body, id, offset, limit) => (dispatch, getState) => {
    axios
        .put(`/api/customer/${id}/?limit=${limit}&offset=${offset}`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(manage_customers(offset, limit));
            dispatch(
                createMessage("Customer Updated Successfully", "success")
            );
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const delete_customer = (id, offset, limit) => (dispatch, getState) => {
    axios
        .delete(`/api/customer/${id}/?limit=${limit}&offset=${offset}`, tokenConfig(getState))
        .then((res) => {
            dispatch(manage_customers(offset, limit));
            dispatch(
                createMessage("Customer Deleted Successfully", "success")
            );
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
// Job Card
export const add_jobcard = (body) => (dispatch, getState) => {
    axios
        .post(`/api/jobcard/`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage("Job Card Created Successfully", "success"));
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
};
export const update_jobcard = (id,body) => (dispatch, getState) => {
    axios
        .put(`/api/jobcard/?id=${id}`, body, tokenConfig(getState))
        .then((res) => {
            dispatch(createMessage("Job Card Updated Successfully", "success"));
            dispatch(get_jobcard_details(id));
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
};
export const get_customer_details= (id) => (dispatch, getState) => {
    axios
        .get(`/api/get_customer_details/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CUSTOMERS_DETAILS,
                payload: res.data,
            });
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const get_customer_jobcards = (id,offset, limit) => (dispatch, getState) => {
    axios
        .get(`/api/get_customer_jobcards/?id=${id}&limit=${limit}&offset=${offset}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: CUSTOMERS_JOBCARDS,
                payload: res.data,
            });
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}

export const manage_jobcards = (offset, limit) => (dispatch, getState) => {
    axios
        .get(`/api/jobcard_all/?limit=${limit}&offset=${offset}`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: JOBCARD_DATA,
                payload: res.data,
            });
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}

export const create_number = (id,type) => (dispatch, getState) => {
    var body=null
    axios
        .put(`/api/create_number/?id=${id}&type=${type}`, body,tokenConfig(getState))
        .then((res) => {
            dispatch(
                createMessage("Created Successfully", "success")
            );
            dispatch(get_jobcard_details(id));
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
export const delete_jobcard = (id, offset, limit) => (dispatch, getState) => {
    axios
        .delete(`/api/jobcard/${id}/?limit=${limit}&offset=${offset}`, tokenConfig(getState))
        .then((res) => {
            dispatch(manage_jobcards(offset, limit));
            dispatch(
                createMessage("Job Card Deleted Successfully", "success")
            );
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(createMessage(Object.values(err.response.data)[0], "error"));
            }
        });
}
// Searc
export const search = (type, search) => (dispatch, getState) => {
    dispatch({ type: SEARCHING });
    if (type === "customer") {
        dispatch({
            type: SEARCH_CUSTOMER,
            payload: null,
        });
    }
    if (type === "product") {
        dispatch({
            type: SEARCH_PRODUCT,
            payload: null,
        });

    }
    axios
        .get(`/api/search/${type}/?search=${search}`, tokenConfig(getState))
        .then((res) => {
            dispatch({ type: SEARCH_DONE });
            if (type === "customer") {
                dispatch({
                    type: SEARCH_CUSTOMER,
                    payload: res.data,
                });
            }
            if (type === "product") {
                dispatch({
                    type: SEARCH_PRODUCT,
                    payload: res.data,
                });
            }
        })
        .catch((err) => {
            if (!err.response) {
                dispatch(
                    createMessage("Network Error. Something went wrong!", "error")
                );
            } else {
                dispatch(
                    createMessage(
                        `${Object.keys(err.response.data)[0]}: ${Object.values(err.response.data)[0]
                        }`,
                        "error"
                    )
                );
            }
        });
};