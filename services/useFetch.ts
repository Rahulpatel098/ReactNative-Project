//fetchMovies
//fecthMovies
//useFetch(fetchMovies)
import { useEffect, useState } from "react";
const useFetch=<T>(fetchfunction:()=> Promise<T> ,autoFetch =true)=>{
    const [data,setData]=useState<T | null>(null);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState<string | null>(null);
    const fetchData=async()=>{
        try{
            setLoading(true);
            setError(null);
            const result=await fetchfunction();
            setData(result);
        }catch(error){
            // @ts-ignore
            setError(err instanceof Error ? err : new Error('Something went wrong'))
        }finally{
            setLoading(false)
        }
    }
    const reset=()=>{
        setData(null);
        setLoading(false);
        setError(null);
    }
    useEffect(()=>{
        if(autoFetch){
            fetchData();
        }
    },[])
    return {data,loading,error,refetch:fetchData,reset}
}
export default useFetch;


// import { useState, useEffect } from "react";

// const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const result = await fetchFunction();
//       setData(result);
//     } catch (err) {
//       setError(
//         err instanceof Error ? err : new Error("An unknown error occurred")
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const reset = () => {
//     setData(null);
//     setError(null);
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (autoFetch) {
//       fetchData();
//     }
//   }, []);

//   return { data, loading, error, refetch: fetchData, reset };
// };

// export default useFetch;