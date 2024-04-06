import { React} from 'react';
import { Box, Button, Typography } from '@mui/material';
import AxiosInstance from './Axios';
import { useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

const Delete = () => {
    const MyParam = useParams()
    const MyId = MyParam.id

    const [myData,setMydata] = useState();
    const [loading,setLoading] = useState(true)

    const GetData = async() =>{
      try {
        await AxiosInstance.get(`project/${MyId}/`).then((res)=>{
          setMydata(res.data);
          setLoading(false);
      })
      } catch (error) {
        console.error(error.message);
      }
        
    }
    useEffect(() => {
        GetData();
    })

    const navigate = useNavigate()
    
    const submission = () => {
        AxiosInstance.delete(`project/${MyId}/`)
        .then(()=>{
            navigate(`/`)
        })
    }

    return (
    <div>
        { loading ? <p>Loading data....</p>:
    <div>
        <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
            <Typography sx={{marginLeft:'20px', color:'#fff'}}>
                Delete Project : {myData.name}
            </Typography>
        </Box>
        <Box sx={{display:'flex', width:'100%', boxShadow:10, padding:4, flexDirection:'column'}}>
            <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'20px'}}>
                Are you sure that you want to delete project: {myData.name}
            </Box>
            <Box sx={{width:'30%'}}>
                    <Button 
                    onClick={submission}
                    variant='contained'  
                    sx={{width:'100%'}}>
                        Delete Project
                    </Button>
                </Box>
        </Box>
    </div>
        }
</div>
    );
}

export default Delete;