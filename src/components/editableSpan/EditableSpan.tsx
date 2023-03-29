import React, { ChangeEvent, FC, KeyboardEvent, memo, useState } from "react"
import s from "./EditanleSpan.module.scss"

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ title, onChange }) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState("")

    const activatedEditMode = () => {
        setEditMode(true)
        setValue(title)
    }

    const activatedViewMode = () => {
        if (value.length < 100) {
            setEditMode(false)
            onChange(value)
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onKeyDownEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.length < 100) {
            setEditMode(false)
            onChange(value)
        }
    }

    return editMode
      ? <input
        style={{ color: (value.length < 100 ? "" : "red") }}
        className={s.input}
        onKeyDown={onKeyDownEnterHandler}
        onBlur={activatedViewMode}
        value={value}
        autoFocus
        onChange={onChangeTitleHandler} />
      : <span className={s.span} onDoubleClick={activatedEditMode}>{title}</span>
})

