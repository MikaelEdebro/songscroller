import React from 'react'

const InputField = ({ input, label, meta, multiline }) => {
  return (
    <div className="input-field">
      {multiline ? (
        <textarea {...input} className="materialize-textarea" />
      ) : (
        <input {...input} style={{ marginBottom: '5px' }} />
      )}
      <label>{label}</label>
      <div style={{ color: 'red', marginBottom: '20px' }}>{meta.touched && meta.error}</div>
    </div>
  )
}

export default InputField
