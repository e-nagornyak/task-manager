import Button from "@mui/material/Button"
import React, { FC, memo } from "react"

type ButtonMemoPropsType = {
  title: string
  size?: "small" | "medium" | "large"
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
  variant: "text" | "outlined" | "contained"
  onClick: () => void
}

export const ButtonMemo: FC<ButtonMemoPropsType> = memo(({ title, color, size, variant, onClick }) => (
  <Button
    size={size}
    variant={variant}
    color={color}
    onClick={onClick}>
    {" "}
    {title}
  </Button>
))