import {React, useEffect, useState} from 'react';
import AxiosInstance from './Axios';
import MatTable from './MatTable';

const Home = () =>{

    const [myData,setMydata] = useState();
    const [loading,setLoading] = useState(true)

    const GetData = () =>{
        AxiosInstance.get('project/').then((res)=>{
            setMydata(res.data);
            setLoading(false);
        })
    }

    useEffect(() => {
        GetData();
    })

    return (
        <div>
            {loading?<p>Loading data...</p> :
        <MatTable data={myData}/>
            }
        </div>  //The return all elements must be within a top level element div
    );
}

export default Home;