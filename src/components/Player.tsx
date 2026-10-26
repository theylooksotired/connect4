"use client";

import { useState, type SubmitEvent } from "react";

export type Player = {
  code: string,
  name: string,
  color: string,
  isCurrent: boolean
};

type PlayerProps = {
  code: string,
  name: string,
  color: string;
  isCurrent: boolean;
  onChange: (name: string, color: string) => void;
};

export default function Player({ code, name, color, isCurrent, onChange }: PlayerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedColor, setEditedColor] = useState(color);

  function savePlayer(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onChange(editedName, editedColor);
    setIsEditing(false);
  }

  function saveColor(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onChange(editedName, editedColor);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className={"player player-form" + (isCurrent ? " player-current" : "")}>
        <form onSubmit={savePlayer}>
          <input
            value={editedName}
            onChange={(event) => setEditedName(event.target.value)}
          />
          <select
            value={editedColor}
            onChange={(event) => setEditedColor(event.target.value)}
          >
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="orange">Orange</option>
          </select>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className={"player" + (isCurrent ? " player-current" : "")}>
      <div className={"player-icon player-icon-" + color}></div>
      <h2>{name} <span>({code})</span></h2>
      <button
        type="button"
        onClick={() => {
          setEditedName(name);
          setEditedColor(color);
          setIsEditing(true);
        }}>Edit</button>
    </div>
  );
}
