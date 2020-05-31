export async function getCustomerParamsFromName(customer_array, customer_selected) {
    console.log('customer_selected', customer_selected);


    console.log('customer_array func', customer_array);
    let customer_selected_params = '';
    for (let i = 0; i < customer_array.length; i++) {
        if (customer_array[i].get_customers.company_name == customer_selected) {
            customer_selected_params = customer_array[i]
            break;
        }
    }
    return customer_selected_params;
}