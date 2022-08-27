import React, { useState } from 'react'
import axios from 'axios'

export const FileUploader = () => {
    const [file, setFile] = useState(null)
    const onInputChange = (e) => {
        setFile(e.target.files[0])
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append('file', file)

        axios.post('//localhost:9000/upload', data)
            .then(() => {
                console.log('Success')
            })
            .catch((e) => {
                console.error('Error', e)
            })

    }
    return (
        <form method="post" action="" onSubmit={onSubmit}>
            <div className="">
                <input type="file" onChange={onInputChange}/>
            </div>
            <button>submit</button>

        </form>
    )
}
