import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import fetch from 'node-fetch'
import {createApi} from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch,
})

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  const {originalResponse, ...response} = await unsplash.search.getPhotos(event.queryStringParameters);

  // @ts-ignore
  const allowedHeaders = [
      'link',
      'etag',
      'x-cache',
      'x-cache-hits',
      'x-per-page',
      'x-ratelimit-limit',
      'x-ratelimit-remaining',
      'x-request-id',
      'x-runtime',
      'x-served-by',
      'x-timer',
      'x-total',
      'x-unsplash-version'
  ];
  const headers = [...originalResponse.headers.entries()].reduce((deets:object,[key, val]:[string, any] )=>{
    if(allowedHeaders.includes(key)){
      return {...deets, [key]:val}
    }
    return deets
  },{})
  return {
    statusCode: originalResponse.status,
    headers,
    body: JSON.stringify(response),
  }
}
