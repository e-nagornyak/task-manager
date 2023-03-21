import Button from "@mui/material/Button"
import { FilterValueType } from "features/todolistsList"
import React, { FC, memo } from "react"

type ButtonMemoPropsType = {
  title: string
  size?: "small" | "medium" | "large"
  selectedFilter: FilterValueType
  buttonFilter: FilterValueType
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  onClick: (filter: FilterValueType) => void
}

export const ButtonMemo: FC<ButtonMemoPropsType> = memo((
  {
    title,
    color,
    size = "small",
    selectedFilter,
    buttonFilter,
    onClick
  }) => {

  const changeFilter = () => onClick(buttonFilter)

  return <Button
    size={size}
    variant={selectedFilter === buttonFilter ? "outlined" : "contained"}
    color={color}
    onClick={changeFilter}>
    {title}
  </Button>
})
