import React, {useState} from 'react'
import {Grid, Paper, Avatar, Typography, TextField, Button} from '@material-ui/core'
import LogoutIcon from '@mui/icons-material/Logout';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {useNavigate} from "react-router";

const Registration = () => {
    const navigate = useNavigate();
    const [userRegistration, setUserRegistration] = useState({
        Name: "",
        MobileNo: "",
        Email: "",
        Gender: "",
        Hobby: "",
        Password: ""
    });
    const [formErrors, setFormErrors] = useState({
        Name: false,
        MobileNo: false,
        Email: false,
        Gender: false,
        Hobby: false,
        Password: false
    });

    const ToRegistration = (e) => {
        e.preventDefault();
        console.log("Registration----------------->",userRegistration);
        let firstRegex = /^[a-zA-Z]*$/;
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        // let phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[456789]\d{9}|(\d[ -]?){10}/;

        if (userRegistration.Name === "") {
            setFormErrors((formErrors) => ({...formErrors, Name: true}))
        } else if (firstRegex.test(userRegistration.Name)) {
            setFormErrors((formErrors) => ({...formErrors, Name: false}))
        } else {
            setFormErrors((formErrors) => ({...formErrors, Name: true}))
        }

        // if (userRegistration.MobileNo === "") {
        //     setFormErrors((formErrors) => ({...formErrors, MobileNo: true}))
        // } else if (phoneRegex.test(userRegistration.email)) {
        //     setFormErrors((formErrors) => ({...formErrors, MobileNo: false}))
        // } else {
        //     setFormErrors((formErrors) => ({...formErrors, MobileNo: true}))
        // }

        if (userRegistration.Email === "") {
            setFormErrors((formErrors) => ({...formErrors, Email: true}))
        } else if (emailRegex.test(userRegistration.Email)) {
            setFormErrors((formErrors) => ({...formErrors, Email: false}))
        } else {
            setFormErrors((formErrors) => ({...formErrors, Email: true}))
        }

        if (userRegistration.Gender === "") {
            setFormErrors((formErrors) => ({...formErrors, Gender: true}))
        } else if (userRegistration.Gender) {
            setFormErrors((formErrors) => ({...formErrors, Gender: false}))
        } else {
            setFormErrors((formErrors) => ({...formErrors, Ghone: true}))
        }

        if (userRegistration.Hobby === "") {
            setFormErrors((formErrors) => ({...formErrors, Hobby: true}))
        } else if (userRegistration.Hobby) {
            setFormErrors((formErrors) => ({...formErrors, Hobby: false}))
        } else {
            setFormErrors((formErrors) => ({...formErrors, Hobby: true}))
        }

        if (userRegistration.Password === "") {
            setFormErrors((formErrors) => ({...formErrors, Password: true}))
        } else if (passwordRegex.test(userRegistration.Password)) {
            setFormErrors((formErrors) => ({...formErrors, Password: false}))
        } else {
            setFormErrors((formErrors) => ({...formErrors, Password: true}))
        }



        // API Calling
        fetch("http://localhost:8000/post_data/register",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:  JSON.stringify(userRegistration)})
            .then(data => console.log("data of Registration-------------->",data))
            .then(
                () => {
                    setUserRegistration({
                        Name:"",
                        MobileNo: "",
                        Email: "",
                        Gender: "",
                        Hobby: "",
                        Password: ""
                    })
                },
                (error) => {
                    console.log(error);
                }
            )
        navigate('/');
    };

    const dataChange = (e) => {
        console.log("----------------->",e);
        const name = e.target.name;
        const value = e.target.value;
        setUserRegistration({...userRegistration, [name]: value});
    };

    const paperStyle = {padding: 20, width: 300, margin: "0 auto"};
    const headerStyle = {margin: 0};
    const avatarStyle = {backgroundColor: '#1bbd7e'};
    const marginTop = {marginTop: 5};
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LogoutIcon/>
                    </Avatar>
                    <h2 style={headerStyle}>Registration</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your Name" value={userRegistration.Name} name='Name'
                               onChange={dataChange}/>
                    {formErrors.Name == true &&
                    <span className="errorMessage text-danger">"Enter the Valid Name"</span>}

                    <TextField fullWidth label='MobileNo' placeholder="Enter your MobileNo"
                               value={userRegistration.MobileNo} name='MobileNo' onChange={dataChange}/>
                    {/*{formErrors.MobileNo == true &&*/}
                    {/*<span className="errorMessage text-danger">"Enter the Valid Mobile No"</span>}*/}

                    <TextField fullWidth label='Email' placeholder="Enter your Email" value={userRegistration.Email}
                               onChange={dataChange} name='Email'/>
                    {formErrors.Email == true &&
                    <span className="errorMessage text-danger">"Enter the Valid Email"</span>}

                    <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="Gender" name="Gender" style={{display: 'initial'}}
                                    onChange={dataChange}>
                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                        </RadioGroup>
                        {formErrors.Gender == true &&
                        <span className="errorMessage text-danger">"Select the Valid Gender"</span>}
                    </FormControl>

                    <TextField fullWidth label='Hobby' placeholder="Enter your phone Hobby"
                               value={userRegistration.Hobby} name='Hobby' onChange={dataChange}/>
                    {formErrors.Hobby == true &&
                    <span className="errorMessage text-danger">"Select the Valid Hobby"</span>}

                    <TextField fullWidth label='Password' placeholder="Enter your Password"
                               value={userRegistration.Password} name='Password' onChange={dataChange}/>
                    {formErrors.Password == true &&
                    <span className="errorMessage text-danger">"Enter the Valid Password"</span>}
                               <br/> <br/>
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox name="checkbox" type="checkbox" required={true} onChange={dataChange}/>}*/}
                    {/*    label="I accept the terms and conditions."*/}
                    {/*/>*/}
                    <Button type='submit' onClick={ToRegistration} variant='contained' color='primary' >Registration</Button>
                </form>
            </Paper>
        </Grid>
    )
};

export default Registration;