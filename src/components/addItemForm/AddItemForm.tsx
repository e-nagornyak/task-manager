import AddBoxIcon from "@mui/icons-material/AddBox"
import { IconButton, TextField } from "@mui/material"
import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react"

type PropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm: FC<PropsType> = memo(({ addItem, disabled }) => {
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyDownEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask()

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
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
            <IconButton
              disabled={disabled}
              color={"secondary"}
              onClick={onClickAddTask}
            ><AddBoxIcon fontSize={"medium"} color={"secondary"} />
            </IconButton>

        </div>
    )
})