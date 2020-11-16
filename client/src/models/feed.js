/*
    feed model. raw data for the feed display
    Currently mocked at client side
*/
import { myfetch } from "./my-fetch";

export const getPosts = function() {
    return myfetch('posts');
}