import React, {useState,useEffect} from "react";
import axiosInstance from '../axios_instance';
import toast from 'react-hot-toast';
import {QUIZ_API_URL} from '../constants.js'

const Quiz = () => {
    const [countryName, setCountryName] = useState('');
    const [capital, setCapital] = useState('');

    useEffect(() => {fetchRandomCountry()},[])

    const handleSubmit = (e) => {
        e.preventDefault();
        guessCheck(()  => {
            setCapital('')
            fetchRandomCountry()
            
        })
        
    }
    const guessCheck = (callback) => {
        let payload = {
            "country_name": countryName,
            "guess": capital
        }
        axiosInstance.post(QUIZ_API_URL,payload)
        .then((response) => {
            if(response.status === 200){
                toast.success(response.data.data.message)
                callback()
            }
        })
        .catch((error) => {toast.error(error?.response?.data?.data)})
    }
    const fetchRandomCountry = () => {
        axiosInstance.get(QUIZ_API_URL)
        .then((response) => {
            if(response.status === 200){
                setCountryName(response.data.data.country_name)
            }
        })
        .catch((error) => {toast.error(error?.response?.data?.data)})
    }
  
   
    return (
    <div className="h-screen">
        <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-28 mx-auto">
        <div>
        <h1 className="mb-2 mt-8 text-4xl text-center font-bold leading-none tracking-tight text-gray-900 ">What is the capital of</h1>
        <h1 className="text-cyan-600 text-4xl font-bold text-center mb-4">{countryName} ?</h1>

        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
        <div className="">
            
        <input type="text" value={capital} onChange={(e) => setCapital(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 " placeholder="Capital" required/>
           
        </div>
        <div className="flex justify-center mb-8 mt-6">
        <button type="submit" className="flex w-full justify-center rounded-md  border-transparent bg-cyan-500 py-2 px-4 text-sm  text-white shadow-sm hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 font-semibold">Check</button>
        </div>
        </form>
        </div>
      
    </div>
    )
}
export default Quiz;