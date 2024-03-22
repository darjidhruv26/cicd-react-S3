import instance from "../API/API";
import { loadProgressBar } from 'axios-progress-bar';

const loaderConfig = {
    easing: 'ease', 
    speed: 1000,
}

export const initLoader = () => {
    loadProgressBar(loaderConfig, instance);
}