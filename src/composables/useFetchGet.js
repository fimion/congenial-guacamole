import {reactive, computed} from "vue"

const FETCH_STATE = {
  READY:"READY",
  PENDING:"PENDING",
  RESOLVED:"RESOLVED",
  REJECTED:"REJECTED",
}

export default function useFetchGet(url){

  const fetchBlob = reactive({
    status: FETCH_STATE.READY,
    response: null,
    promise: null,
    isReady: computed(()=>fetchBlob.status===FETCH_STATE.READY),
    isPending: computed(()=>fetchBlob.status===FETCH_STATE.PENDING),
    isResolved: computed(()=>fetchBlob.status===FETCH_STATE.RESOLVED),
    isRejected: computed(()=>fetchBlob.status===FETCH_STATE.REJECTED),
    async fetch(queryParams){
      fetchBlob.status = FETCH_STATE.PENDING;

      const searchParams = new URLSearchParams(queryParams);
      const fullUrl = new URL(`${url}?${searchParams.toString()}`, window.location)

      try{
        fetchBlob.promise = fetch(fullUrl);
        const response = await fetchBlob.promise;
        fetchBlob.response = await response.json();
        fetchBlob.status = FETCH_STATE.RESOLVED;
      }catch (err){
        fetchBlob.status = FETCH_STATE.REJECTED;
        fetchBlob.response = err;
      }
      return fetch.response;
    },
  })
  return fetchBlob
}
