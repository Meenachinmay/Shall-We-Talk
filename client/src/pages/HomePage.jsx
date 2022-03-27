import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../actions/userProfile';

const HomePage = () => {
    const dispatch = useDispatch()
    const userID = '61f19ec9624d6e7a0fdb141f'
    useEffect(() => {
        dispatch(fetchUserProfile(userID))
    }, [dispatch])

    return (
        <div className='h-screen bg-indigo-600'>
            <div className='flex flex-col justify-center items-center text-center p-4'>
                <div className='text-lg sm:text-3xl mt-12 text-white text-clip text-center font-Poppins'>
                shall we talk は、ためらうことなく人々とビジネス話をかけたい場合は、非常に役立つオンラインアプリケーションです。
                </div>
                <div className='text-xs sm:text-xl text-white w-3/4 sm:w-2/4 mt-4 font-Poppins'>
                私はチャットアプリなくても、オフィスでもカフェでも、書店でも、周りの人と話を掛けるのを手伝いますよ。
                </div>
                <svg className='w-36 h-36 mt-8 sm:w-80 sm:h-80' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>b</title><path class="cls-1" d="M38.25061,95.66874l-.538-.08382-8.325-1.29719c.00978-.36373.01154-.7294-.01084-1.09945l-1.853-19.651A12.47555,12.47555,0,0,0,2.618,75.04135l1.853,19.65105a12.47248,12.47248,0,0,0,8.1381,10.9492,7.03976,7.03976,0,0,0,3.67135.77713l16.40576.67457v14.92746a4.79821,4.79821,0,0,0,9.59642,0v-21.643A4.76586,4.76586,0,0,0,38.25061,95.66874Z"/><circle class="cls-1" cx="15.99739" cy="45.83091" r="11.82984"/>
                    <path class="cls-1" d="M113.6807,61.83649a12.47552,12.47552,0,0,0-13.20445,11.70079l-1.853,19.651c-.02237.37006-.02062.73572-.01084,1.09945l-8.325,1.29719-.538.08382a4.76586,4.76586,0,0,0-4.03209,4.70906v21.643a4.79821,4.79821,0,0,0,9.59642,0V107.09331l16.40576-.67457a7.03976,7.03976,0,0,0,3.67135-.77713,12.47248,12.47248,0,0,0,8.1381-10.9492l1.853-19.65105A12.47552,12.47552,0,0,0,113.6807,61.83649Z"/>
                    <circle class="cls-1" cx="112.00261" cy="45.83091" r="11.82984"/>
                    <path class="cls-1" d="M90.77047,86.14992A4.80045,4.80045,0,0,0,85.97,81.34949H42.03a4.80044,4.80044,0,0,0,0,9.60087h5.20652V126.819h33.527V90.95036H85.97A4.80045,4.80045,0,0,0,90.77047,86.14992Z"/>
                    <path class="cls-2" d="M61.18251,15.619A17.03949,17.03949,0,0,0,41.26577,26.44019c-.24817.69367-6.04011,15.53427-7.94944,20.425a.851.851,0,0,0,1.00533,1.13331l11.7415-3.02325A17.016,17.016,0,1,0,61.18251,15.619Z"/>
                    <path class="cls-2" d="M94.659,42.57863l-6.50693-13.666A19.10043,19.10043,0,1,0,53.83115,12.14735a20.25369,20.25369,0,0,1,4.92883-.244,14.92781,14.92781,0,0,1,25.2517,15.89507l-.55573.95244L88.105,38.51707c-3.044-.55444-7.25073-1.31646-10.95939-1.98852A20.1844,20.1844,0,0,1,75.82619,40.53c3.76465.68037,13.92887,2.52785,17.91334,3.25226A.85068.85068,0,0,0,94.659,42.57863Z"/>
                </svg>
                <a href='/login-register' className='sm:w-2/5 text-sm sm:text-md mt-8 text-indigo-600 bg-white rounded py-2 px-2 cursor-pointer hover:bg-gray-100'>ご使用いただくように、ログイン又は新規アカウントでサインアップしてください。</a>
            </div>
         </div>
    )
}

export default HomePage;