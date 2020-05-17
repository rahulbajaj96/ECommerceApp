import { SPINNER_ON, SPINNER_OFF, CUSTOMER_LIST_SUCCESS, CUSTOMER_LIST_FAILURE } from "../constants/ReduxConstants"
import { ApiCallGet } from "../Services/ApiServices"
import { BASE_URL, API_URL } from "../config"

export const addCustomer = (formdata) => {
    return async function (dispatch) {
        dispatch({ type: SPINNER_ON })
        console.log('formdata of Add zcustomer Api ', formdata)
        // dispatch({ type: ADD_CUSTOMER_SUCESS, payload: { message: 'CustomerAddedSucessfully' } })
        dispatch({ type: SPINNER_OFF })


    }
}
export const getCustomerList = () => {
    return async function (dispatch) {
        dispatch({ type: SPINNER_ON })
        let responseGetCustomers = await ApiCallGet(`${BASE_URL}${API_URL.Customer_list}`, '');
        // console.log('response of get Customer', JSON.stringify(responseGetCustomers))
        if (responseGetCustomers != false) {
            if (responseGetCustomers.status == 1)
                dispatch(Success_CustomerList(responseGetCustomers))
            else
                dispatch(Failure_CustomerList(responseGetCustomers))

        }
        dispatch({ type: SPINNER_OFF })

    }

}
const Success_CustomerList = (response) => {
    return {
        type: CUSTOMER_LIST_SUCCESS,
        payload: response
    }
}
const Failure_CustomerList = (response) => {
    return {
        type: CUSTOMER_LIST_FAILURE,
        payload: response
    }
}