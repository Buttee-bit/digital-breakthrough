import React, { useState } from 'react'
import { InputBtnWrapper, InputContainer, InputContent, InputH1, InputP, Button, Input } from './InputElements'
import axios from 'axios'

const InputSection = () => {
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
        <InputContainer id='start'>
            <InputContent>
                <InputH1>Юридический помощник для проверки НПА</InputH1>
                <InputP>
                    Загрузите файл с расширением .doc, .docx
                </InputP>
                <InputBtnWrapper method="post" action="" onSubmit={onSubmit}>
                    <Input type="file" onChange={onInputChange}/>
                    <Button>Загрузить файл</Button>
                </InputBtnWrapper>
            </InputContent>
        </InputContainer >
    )
}

export default InputSection
