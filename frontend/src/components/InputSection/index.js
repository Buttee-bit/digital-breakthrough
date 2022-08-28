import React, { useState, useEffect } from 'react'
import { InputBtnWrapper, InputContainer, InputContent, InputP, Input, Button } from './InputElements'
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

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                'http://127.0.0.1:5000/predict',
            );

            console.log(JSON.stringify(data, null, 4));

            setData(data);
        } catch (err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    console.log(data);

    return (
        <InputContainer id='start'>
            <InputContent>
                <InputP>
                    Загрузите файл с расширением .doc, .docx
                </InputP>
                <InputBtnWrapper method="post" onSubmit={onSubmit}>
                    <Input type="file" onChange={onInputChange} />
                    {isLoading && <h2>Loading...</h2>}
                    <Button onClick={handleClick}>Загрузить файл</Button>
                </InputBtnWrapper>
            </InputContent>
        </InputContainer >
    )
}

export default InputSection
