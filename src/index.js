import "./styles.css"
import { initApp, loadJson } from "./weather"
import backgroundImg from './background.jpg'

window.addEventListener('load', () => {
    const body = document.querySelector('body');
    const loading = document.querySelector('.loading');
    if (body && loading) {
        loading.style.display = 'none'; // Hide the loading indicator
        body.style.visibility = 'visible'; // Show the body
    }
});

initApp();
