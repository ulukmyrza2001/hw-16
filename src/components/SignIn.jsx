import React, { useContext, useEffect, useReducer, useState } from 'react'
import './Login.css'
import Input from './UI/Input'
import Button from './UI/Button'
import Card from './UI/Card'
import { LoginContext } from '../Store/context-login'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'

const Login = () => {
	const [validateForm, setValidateForm] = useState(false)
	const { dispatchLogin, state } = useContext(LoginContext)
	const navigate = useNavigate()

	useEffect(() => {
		console.log('valid')
		setValidateForm(
			state.userName.Isvalid &&
				state.email.Isvalid &&
				state.password.Isvalid,
		)
	}, [
		state.userName.Isvalid,
		state.email.Isvalid,
		state.password.Isvalid,
	])

	const userNameChangeHandler = (e) =>
		dispatchLogin({ type: 'USERNAME', value: e.target.value })

	const validateUserNameHandler = () => {
		dispatchLogin({ type: 'INPUTUSERBLUR' })
	}

	const emailChangeHnahdler = (e) => {
		dispatchLogin({ type: 'EMAIL', value: e.target.value })
	}

	const validateEmailHandler = () => dispatchLogin({ type: 'INPUTEMAILBLUR' })

	const passwordChangeHandler = (e) =>
		dispatchLogin({ type: 'PASSWORD', value: e.target.value })

	const validatePasswordHandler = () =>
		dispatchLogin({ type: 'PASSWORDBLUR' })

	const submitHandler = (e) => {
		e.preventDefault()
		const newData = {
			userName: state.userName.userValue,
			email: state.email.emailValue,
			password: state.password.passwordValue,
			id: Math.random().toString(),
		}
		async function postData(){
			await fetch('https://react-http-form-68713-default-rtdb.firebaseio.com/form.json',{
				method : 'POST',
				body : JSON.stringify(newData),
				headers : {
					'content-type' : 'application/json'
				}
			})
		}
		postData()
		dispatchLogin({ type: 'LOGIN', newData })
		return navigate('/home')
	}
	return (
		<Card>
			<div className='info'>
				<h2>Mission to Deep Space</h2>
				<i
					className='icon ion-ios-ionic-outline'
					aria-hidden='true'
				></i>
				<p>The Future Is Here</p>
			</div>
			<form className='signupForm'>
				<h2>Sign Up</h2>
				<ul className='noBullet'>
					<li className={`liUser ${state.userName.errorMassage ? 'invalid' : (state.userName.errorMassage === null) ? 'isvalid' : ''}`}>
						<label htmlFor='username'></label>
						<Input
							onChange={userNameChangeHandler}
							type='text'
							placeholder='Username'
							onBlur={validateUserNameHandler}
						/>
						{state.userName.errorMassage && <Alert className='p' severity="error">{state.userName.errorMassage}</Alert>}
					</li>
					<li	className={`liPassword ${state.password.errorMassage ? 'invalid' : (state.password.errorMassage === null) ? 'isvalid' : ''}`}>
						<label htmlFor='password'></label>
						<Input
							type='password'
							placeholder='Password'
							onChange={passwordChangeHandler}
							onBlur={validatePasswordHandler}
						/>
						{state.password.errorMassage && <Alert className='p' severity="error">{state.password.errorMassage}</Alert>}
					</li>
					<li
						className={`liEmail ${
							state.email.errorMassage ? 'invalid' : (state.email.errorMassage === null) ? 'isvalid' : ''
						}`}
					>
						<label htmlFor='email'></label>
						<Input
							type='email'
							placeholder='Email'
							onChange={emailChangeHnahdler}
							onBlur={validateEmailHandler}
						/>
						{state.email.errorMassage && <Alert className='p' severity="error">{state.email.errorMassage}</Alert>}
						{console.log(state)}
					</li>
					<li id='center-btn'>
						<Button
							onClick={submitHandler}
							type='submit'
							disabled={!validateForm}
						>
							login
						</Button>
					</li>
				</ul>
			</form>
		</Card>
	)
}

export default Login
