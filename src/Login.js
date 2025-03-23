import React, { useState, useEffect } from "react"
import {Button, Input} from '@mui/material'
import {checkUsername} from './validation'

function Login() {
    const [username, setUsername] = useState('')
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
    }, [username])

    function handleSubmit(e) {
        e.preventDefault()
        setUsername(e.target.querySelector('input[type="text"]').value)
    }

    const inputForm = (
        <div>
            <form action="#" onSubmit={handleSubmit}>
                <label>username: </label>
                <Input type='text' name='username'></Input>
                <Button type='submit' variant='contained'>Login</Button>
            </form>
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