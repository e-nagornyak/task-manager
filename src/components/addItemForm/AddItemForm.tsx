import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import { Button, TextField } from "@mui/material"
import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

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
              color={"secondary"}
              id='outlined-basic'
              label={error ? "Title is required" : "type your text"}
              variant='standard'
              error={error}
              value={title}
              onChange={onChangeSetLocalTitle}
              onKeyDown={onKeyDownEnterAddTask}
            />
            <Button
              disabled={props.disabled}
              color={"secondary"}
              onClick={onClickAddTask}
              startIcon={<LibraryAddIcon color={"secondary"} />}>
                Add
            </Button>
        </div>
    )
})