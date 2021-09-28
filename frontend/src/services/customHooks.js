import { useEffect, useState } from 'react'

export const useForm = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
  }, [fields])

  return [
    fields,
    function (ev) {

      const field = ev.target.name
      const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields
  ]
}

export const useHandleModal = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
  }, [fields])

  return [
    fields,
    function (field, value) {

      console.log('(field,value)', field, value);
      // const field = ev.target.name
      // const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields
  ]
}

