import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button, TextField} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div style={{display: "flex",
            alignItems: 'flex-end'}}>
            <TextField
                id="outlined-basic"
                label={error ? 'Title is required' : 'type your text'}
                variant="standard"
                error={error}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onKeyDownEnterAddTask}
            />
            <Button onClick={onClickAddTask} variant="text" startIcon={<LibraryAddIcon/>}>
                Add
            </Button>
        </div>
    )
})