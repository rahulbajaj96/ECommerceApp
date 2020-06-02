import { SPINNER_ON, SPINNER_OFF,  EMPLOYEE_LIST_SUCCESS, EMPLOYEE_LIST_FAILURE } from "../constants/ReduxConstants"
import { ApiCallGet } from "../Services/ApiServices";
import { BASE_URL, API_URL } from "../config"


export const getEmployeeList = () => {
    return async function (dispatch) {
        dispatch({ type: SPINNER_ON })
        let responseGetEmployees = await ApiCallGet(`${BASE_URL}${API_URL.Employee_List}`, '');
        // console.log('response of get Customer', JSON.stringify(responseGetCustomers))
        if (responseGetEmployees != false) {
            if (responseGetEmployees.status == 1)
                dispatch(Success_EmployeeList(responseGetEmployees))
            else
                dispatch(Failure_EmployeeList(responseGetEmployees))

        }
        dispatch({ type: SPINNER_OFF })

    }

}
const Success_EmployeeList = (response) => {
    return {
        type: EMPLOYEE_LIST_SUCCESS,
        payload: response
    }
}
const Failure_EmployeeList = (response) => {
    return {
        type: EMPLOYEE_LIST_FAILURE,
        payload: response
    }
}