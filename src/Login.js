import React, { useState, useEffect } from "react"
import {Button, Input} from '@mui/material'
import {checkUsername} from './validation'

function Login() {
    const [username, setUsername] = useState('')
    const [isClicked, setIsClicked] = useState(false)
    const [checkedResponse, setCheckedResponse] = useState({})

    useEffect(() => {
        async function validate() {
            const response = await checkUsername(username)
            if(response.error)
                alert(`${response.error}: ${response.data}`)

            setCheckedResponse(response)
        }

        if (username !== '') {
            validate()
                .catch(console.error)
        }
        // TODO: eslint warning: React Hook useEffect has a missing dependency: 'username'. But then it will not work.
    }, [isClicked])

    function handleOnClick() {
        setIsClicked(!isClicked)
    }

    function handleOnChange({target}) {
        setUsername(target.value)
    }

    const inputForm = (
        <div>
            <label>username: </label>
            <Input type='text' name='username' onChange={handleOnChange}></Input>
            <Button type='button' variant='contained' onClick={handleOnClick}>Login</Button>
        </div>
    )

    const email = (
        <div>
            <h1>email: {checkedResponse.data}</h1>
        </div>
    )

    return (
        <div>
            {checkedResponse.error === null ? email : inputForm}
        </div>
    )
}

export default Login