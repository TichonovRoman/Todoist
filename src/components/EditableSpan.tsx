import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
  title: string,
  callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
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
        ? <input onBlur={onBlurHandler} value = {title} onChange={onChangeHandler} autoFocus/>
        : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>}

      </>

  )
}