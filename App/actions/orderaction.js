import { ApiCallGet, ApiCallPost } from "../Services/ApiServices"
import { BASE_URL, API_URL } from "../config";
import { SPINNER_ON, SPINNER_OFF, ORDER_LIST_FAILURE, ORDER_LIST_SUCCESS,ORDER_DETAIL_SUCCESS,ORDER_DETAIL_FAILURE } from "../constants/ReduxConstants";

export const getOrderList = () => {
    return async function (dispatch) {
        dispatch({ type: SPINNER_ON });
        let order_list = await ApiCallGet(`${BASE_URL}${API_URL.OrderList}`, '');
        console.log('order list response', order_list);
        if (order_list != false) {
            if (order_list.status == 1)
                dispatch(OrderListSuccess(order_list));
            else
                dispatch(OrderListFailure(order_list));
        }
        dispatch({ type: SPINNER_OFF });
    }
}
const OrderListSuccess = (Orders) => {
    return {
        type: ORDER_LIST_SUCCESS,
        payload: Orders
    }
}
const OrderListFailure = (Orders) => {
    return {
        type: ORDER_LIST_FAILURE,
        payload: Orders
    }
}

export const getOrderDetail = (order_id) => {
    return async function (dispatch) {
        let formdata = new FormData();
        formdata.append('order_id', order_id);
        let order_detail = await ApiCallPost(`${BASE_URL}${API_URL.viewOrder}`,formdata);
        console.log('order list response', order_detail);
        if (order_detail != false) {
            if (order_detail.status == 1)
                dispatch(OrderDetailSuccess(order_detail));
            else
                dispatch(OrderDetailFailure(order_detail));
        }
        dispatch({ type: SPINNER_OFF });
    }
}
const OrderDetailSuccess = (Orders) => {
    return {
        type: ORDER_DETAIL_SUCCESS,
        payload: Orders
    }
}
const OrderDetailFailure = (Orders) => {
    return {
        type: ORDER_DETAIL_FAILURE,
        payload: Orders
    }
}