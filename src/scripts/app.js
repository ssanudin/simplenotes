import { notesData } from "./data.js";
import Utils from "./Utils.js";
import "./components/index.js";

const displayNotes = (notes, bgColors) => {
  const notesListElement = document.querySelector("note-list");
  const noteItemsElements = notes.map((note) => {
    const noteItemElement = document.createElement("note-item");
    noteItemElement.setAttribute("bgcolor", bgColors[note.id] ?? "yellow");
    noteItemElement.note = note;

    return noteItemElement;
  });

  Utils.emptyElement(notesListElement);
  notesListElement.append(...noteItemsElements);
};

const createNewNote = (title, body) => {
  return {
    id: Utils.generateId(),
    title: title,
    body: body,
    createdAt: new Date().toISOString(),
    archived: false,
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const myNotes = [...notesData];
  const bgColors = {};

  displayNotes(myNotes, bgColors);

  document
    .querySelector("add-note-form")
    .addEventListener("addnote", (event) => {
      event.preventDefault();
      const { title, body, bgColor } = event.detail;

      const newNote = createNewNote(title, body);
      bgColors[newNote.id] = bgColor;
      myNotes.unshift(newNote);

      displayNotes(myNotes, bgColors);
    });
});
