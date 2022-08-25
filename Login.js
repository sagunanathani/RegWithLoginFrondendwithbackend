import React, {useState} from 'react'
import {Grid, Paper, Avatar, TextField, Button, Typography, Link} from '@material-ui/core'
import LoginIcon from '@mui/icons-material/Login';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux'
import {LoginDispatch} from "../Action/action";

const Login = () => {
    const dispatch = useDispatch();

    const onFetchClicked = () => {
        // Calls the thunk action creator, and passes the thunk function to dispatch
        dispatch(LoginDispatch())
    };

    const [userLogin, setUserLogin] = useState({
        Email: "",
        Password: "",
    });
    const [formErrors, setFormErrors] = useState({
        Email: false,
        Password: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // setSubmitted(false);
        console.log("login---------------->", userLogin);
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

        if (userLogin.Email === "") {
            setFormErrors((formErrors) => ({...formErrors, Email: true}))
        } else if (emailRegex.test(userLogin.Email)) {
            setFormErrors((formErrors) => ({...formErrors, Email: false}))
        } else {
            setFormErrors((formErrors) => ({...formErrors, Email: true}))
        }

        if (userLogin.Password === "") {
            setFormErrors((formErrors) => ({...formErrors, Password: true}))
        } else if (passwordRegex.test(userLogin.Password)) {
            setFormErrors((formErrors) => ({...formErrors, Password: false}))
        } else {
            setFormErrors((formErrors) => ({...formErrors, Password: true}))
        }


        fetch('http://localhost:8000/post_data/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userLogin)
        }).then(response =>{
            console.log("response------------------->",response);
            return  response.json()
        })
            .then(
                (res) => {
                    // console.log("res?.User?.Token",res,res?.User,res?.User?.Token);
                    localStorage.setItem("access_token", JSON.stringify(res?.User?.Token));
                    setUserLogin({
                        Email: "",
                        Password: ""
                    })
                },
                (error) => {
                    console.log(error);
                }
            ).catch(e =>{
            console.log("error",e);
        })
        // dispatch(login(userLogin);
    };

    const dataChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({
            ...userLogin,
            [name]: value
        });
    };
    const paperStyle = {padding: 20, height: '37vh', width: 280, margin: "20px auto"};
    const avatarStyle = {backgroundColor: '#1bbd7e'};
    const btnStyle = {margin: '8px 0'};

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LoginIcon/></Avatar>
                    <h2>Login</h2>
                </Grid>
                <TextField label='Email' placeholder='Enter username' name='Email' value={userLogin.Email}
                           onChange={dataChange} fullWidth required/>
                {formErrors.Email == true &&
                <span className="errorMessage text-danger">"Enter the Valid Email"</span>}

                <TextField label='Password' placeholder='Enter Password' name='Password' type='Password'
                           value={userLogin.Password} onChange={dataChange} fullWidth required/>
                {formErrors.Password == true &&
                <span className="errorMessage text-danger">"Enter the Valid Password"</span>}

                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' color='primary' variant="contained" style={btnStyle} onClick={handleSubmit}
                        fullWidth>Login</Button>
                {/*<Typography >*/}
                {/*    <Link href="#" >*/}
                {/*        Forgot password ?*/}
                {/*    </Link>*/}
                {/*</Typography>*/}
                <Typography> Do you have an account ?
                    <Link href="Registration" to="/Registration">
                        Registration
                        {/*<Button component={Link} to="/Registration" variant="contained" color="primary"*/}
                        {/*        style={btnStyle}>*/}
                        {/*</Button>*/}
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
};

export default Login