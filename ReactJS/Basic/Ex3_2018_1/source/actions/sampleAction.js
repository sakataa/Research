import { ADD_SAMPLE, GET_SAMPLE } from "./types";


export const addSample = (data) => {
    return {
        type: ADD_SAMPLE,
        data
    }
}