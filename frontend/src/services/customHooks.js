import { useEffect, useState } from 'react'

export function useForm(initialFValues, validateOnChange = false, validate) {

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = ev => {
    const { name } = ev.target
    let value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
    value = (ev.target.type === 'checkbox') ? ev.target.checked : value
    setValues({
      ...values,
      [name]: value
    })
    if (validateOnChange)
      validate({ [name]: value })
  }

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({})
  }


  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm

  }
}
export const useFormCreateSurvey = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)
  const [errors, setErrors] = useState({});

  useEffect(() => {
    cb(fields)
  }, [fields])

  return [

    fields,
    function (ev) {

      const field = ev.target.name
      let value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      value = (ev.target.type === 'checkbox') ? ev.target.checked : value
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields
  ]
}

export const useError = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
  }, [fields])

  return [
    fields,
    function (ev) {
      setFields(prevFields => ({ ...prevFields, [field]: '' }))
      const field = ev.target.name
      let value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      if (value > 5 || value < 0) {
        setFields(prevFields => ({ ...prevFields, [field]: value }))
      }
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

