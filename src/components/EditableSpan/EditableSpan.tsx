import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
  title: string,
  callback: (title: string) => void
}

export const EditableSpan = React.memo ((props: EditableSpanPropsType) => {
  console.log("EditableSpan")
  const [title, setTitle] = useState(props.title)
  const [edit, setEdit] = useState<boolean>(false)

  const onDoubleClickHandler = () => setEdit(true)
  const onBlurHandler = () => {
    setEdit(false)
    props.callback(title)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return (
      <>
        {edit
        ? <TextField onBlur={onBlurHandler} value = {title} onChange={onChangeHandler} autoFocus style={{fontWeight: "bold"}}/>
        : <span onDoubleClick={onDoubleClickHandler} style={{fontWeight: "bold"}}>{props.title}</span>}

      </>

  )
})