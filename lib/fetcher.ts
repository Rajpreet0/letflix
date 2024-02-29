import axios from "axios";

// Define a fetcher function that takes a URL as input and returns a Promise
const fetcher = (url: string) => axios.get(url).then((res) => res.data);


export default fetcher;