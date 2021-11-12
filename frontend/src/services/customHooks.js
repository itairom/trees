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
  // const [errors, setErrors] = useState({});

  useEffect(() => {
    cb(fields)

  }, [fields,cb])

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
  }, [fields,cb])

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
  }, [fields,cb])

  return [
    fields,
    function (field, value) {
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields
  ]
}


export const useGeolocation = () => {

  const [location, setLocation] = useState({
    isReady: false,
    coordinates: {
      lng: '', lat: ''
    }
  })

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(onSucsess, onError)
  }, [])

  const onSucsess = (position) => {
    setLocation({
      isReady: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
  }

  const onError = (err) => {
    setLocation({
      isReady: true,
      err
    })

  };

  return location
}

export default function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}