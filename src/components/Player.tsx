"use client";

import { useState, type SubmitEvent } from "react";

export type Player = {
    code: string,
    name: string,
    color: string
};

type PlayerProps = {
  code: string,
  name: string,
  color: string;
  onChange: (name: string, color: string) => void;
};

export default function Player({ code, name, color, onChange }: PlayerProps) {
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
      <li>
        <form onSubmit={savePlayer}>
          <input
            value={editedName}
            onChange={(event) => setEditedName(event.target.value)}
          />
          <input
            value={editedColor}
            onChange={(event) => setEditedColor(event.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </li>
    );
  }

  return (
    <li>
      <span>{name} ({code})</span>
      <button
        type="button"
        onClick={() => {
          setEditedName(name);
          setEditedColor(color);
          setIsEditing(true);
        }}>Edit</button>
    </li>
  );
}
