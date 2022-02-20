import React, { useReducer } from "react";
import { validateUserName, validatPassword, validEmailRegex } from "../helpers/regex";

export const LoginContext = React.createContext()

const initialState = {
	userName : {
		userValue : '',
	    Isvalid : null,
		errorMassage : '',
	},
	email : {
	    emailValue: '',
		Isvalid :null,
		errorMassage : '',
	},
	password : {
		passwordValue : '',
	    Isvalid : null,
		errorMassage : '',
	},
    loginData : []
}
const loginReducer = (state,action) =>{
	switch (action.type) {
		case 'USERNAME':
			return{
				...state,
				userName : {
					userValue : action.value,
					Isvalid :  validateUserName.test(action.value) &&  true
				}
			}
		case 'INPUTUSERBLUR' :
			return{
				...state,
				userName : {
					...state.userName,
					userValue : state.userName.userValue,
					errorMassage :  validateUserName.test(state.userName.userValue) ? null : ( state.userName.userValue === "") ? 'Введите логин!' : 'некорректный логин!',
				},
			}
		case  'EMAIL' : 
		    return{
				...state,
				email : {
					emailValue : action.value,
					Isvalid : validEmailRegex.test(action.value) && true
				}
			}
		case 'INPUTEMAILBLUR' : 
			return{
				...state,
				email : {
					...state.email,
					emailValue : state.email.emailValue,
					errorMassage : validEmailRegex.test(state.email.emailValue) ? null : ( state.email.emailValue === "") ? 'Укажите адрес Email' : 'Email должно содержать от 6 до 30 символов'

				},

			}
		case 'PASSWORD' :
		const index12 =  action.value.split('', 2).join('')
		const valuePass = action.value.split('').reverse().join('')
		return {
			...state,
			password : {
				passwordValue : valuePass + index12,
				Isvalid : validatPassword.test(action.value) && true
			}
		}
		case 'PASSWORDBLUR' :
			return {
				...state,
				password : {
					...state.password,
					passwordValue : state.password.passwordValue,
					errorMassage : validatPassword.test(state.password.passwordValue) ? null : ( state.password.passwordValue === "") ? 'Введите пароль' : 'ненадёжный пароль'
				}
			}
        case 'LOGIN' :
            return {
                ...state,
                loginData : [...state.loginData,action.newData]
                
            }
	    case  'CLEAR' : 
		return initialState
		default: 
			return initialState;
	}
}



const LoginContextProvider = (props) => {
    const [state,dispatchLogin] = useReducer(loginReducer,initialState)
  return (
   <LoginContext.Provider value={{
       dispatchLogin,state
   }}>
      {props.children}
   </LoginContext.Provider>
  )
}

export default LoginContextProvider