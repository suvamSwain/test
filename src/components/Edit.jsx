import { React} from 'react';
import { Box, Button, Typography } from '@mui/material';
import MyTextField from './forms/MyTextField';
import MySelectField from './forms/MySelectField';
import MyDatePickerField from './forms/MyDatePickerField';
import MyMultilineField from './forms/MyMultilineField';
import {useForm} from 'react-hook-form';
import AxiosInstance from './Axios';
import { useNavigate, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';

var dayjs = require('dayjs');

const Edit = () => {
    const MyParam = useParams()
    const MyId = MyParam.id

    const [projectmanager,setProjectmanager] = useState();
    const [loading,setLoading] = useState(true)

    const hardcoded_options = [
        {id:'',name:'None'},
        {id:'Open',name:'Open'},
        {id:'In Progress',name:'In Progress'},
        {id:'Completed',name:'Completed'}
    ]

    const GetData = async() =>{
        await AxiosInstance.get('projectmanager/').then((res)=>{
            setProjectmanager(res.data);
        })
        await AxiosInstance.get(`project/${MyId}/`).then((res)=>{
            setValue('name',res.data.name);  //write to the field
            setValue('status',res.data.status);
            setValue('comments',res.data.comments);
            setValue('start_date',dayjs(res.data.start_date));
            setValue('end_date',dayjs(res.data.end_date));
            setValue('projectmanager',res.data.projectmanager);
        })
        setLoading(false);
        
    }

    useEffect(() => {
        GetData();
    },[]) 
     // this [] makes sure that it runs only once

    const navigate = useNavigate()
    const defaultValues = {
        name:'',
        comments:'',
        status:'',
        projectmanager: ''
    }
    const {handleSubmit,setValue, control} = useForm({defaultValues:defaultValues})
    const submission = (data) => {
        const startDate = dayjs(data.start_date).format("YYYY-MM-DD");
        const endDate = dayjs(data.end_date).format("YYYY-MM-DD");

        AxiosInstance.put(`project/${MyId}/`, {//as per api url it is project
            name : data.name,
            status:data.status,
            comments:data.comments,
            start_date:startDate,
            end_date:endDate,
            projectmanager : data.projectmanager
        }
        )
        .then(()=>{
            navigate(`/`)
        })
        .catch(err => {
            console.log(err)
          })
    }
    return (
    <div>
    {loading?<p>Loading data...</p> :
    <form onSubmit={handleSubmit(submission)}>
        <Box sx={{display:'flex', width:'100%', backgroundColor:'#00003f', marginBottom:'10px'}}>
            <Typography sx={{marginLeft:'20px', color:'#fff'}}>
                Edit Records
            </Typography>
        </Box>
        <Box sx={{display:'flex', width:'100%', boxShadow:10, padding:4, flexDirection:'column'}}>
            <Box sx={{display:'flex', justifyContent:'space-around', marginBottom:'20px'}}>
                <MyTextField
                    label = "Name"
                    name = "name"
                    control = {control}
                    placeholder = "Provide a project name"
                    width = {'30%'}
                />
                <MyDatePickerField
                    label = "Start_Date"
                    name = "start_date"
                    control = {control}
                    width = {'30%'}
                />
                <MyDatePickerField
                    label = "End_Date"
                    name = "end_date"
                    control = {control}
                    width = {'30%'}
                />

            </Box>
            <Box sx={{display:'flex', justifyContent:'space-around'}}>
                <MyMultilineField
                    label = "Comments"
                    name = "comments"
                    control = {control}
                    placeholder = "Provide a project comment"
                    width = {'30%'}
                />
                <MySelectField
                    label = "Status"
                    name = "status"
                    control = {control}
                    width = {'30%'}
                    options = {hardcoded_options}
                />

                <MySelectField
                    label = "Project Manager"
                    name = "projectmanager"
                    control = {control}
                    width = {'30%'}
                    options = {projectmanager}
                />

            </Box>
            <Box sx={{display:'flex', justifyContent:'start-around',marginTop:'40px'}}>
                <Button variant='contained' type='submit' sx={{width:'30%'}}>
                    Submit
                </Button>
            </Box>

        </Box>

    </form>
        }
    </div>
    );
}

export default Edit;