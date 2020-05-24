import { useDispatch, useSelector } from "react-redux";
import React from 'react'


export function getColorParamsFromName(colors_array, color_selected) {
    console.log('color selected', color_selected);


    console.log('colors Available func', colors_array);
    let color_selected_params = '';
    for (let i = 0; i < colors_array.length; i++) {
        if (colors_array[i].color == color_selected) {
            color_selected_params = colors_array[i]
            break;
        }
    }
    return color_selected_params;
}
export function getSizeParamsFromName(sizes_array, size_selected) {
    console.log('size_selected', size_selected);


    console.log('sizes_array Available func', sizes_array);
    let size_selected_params = '';
    for (let i = 0; i < sizes_array.length; i++) {
        if (sizes_array[i].size == size_selected) {
            size_selected_params = sizes_array[i]
            break;
        }
    }
    return size_selected_params;
}