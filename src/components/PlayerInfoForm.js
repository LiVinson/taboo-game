import React from "react"

export default function PlayerInfoForm({ name, onChange, onSubmit }) {
  return (
    <form>
      <label>Enter your display name</label>
      <input
        type="text"
        placeholder="Name"
        name="currentPlayerName"
        value={name}
        onChange={(e) => onChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => {
          onSubmit(e)
        }}
        disabled={!name.length}
      >
        Save Name
      </button>
    </form>
  )
}
