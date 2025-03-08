class NoteItem extends HTMLElement {
  _note = {
    id: null,
    title: null,
    body: null,
    createdAt: null,
    archived: null,
  }
  _days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  static observedAttributes = ['bgcolor']; 

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._bgColor = this.getAttribute('bgcolor');
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
      }

      .note-item {
        background-color: var(--yellownote);
        border-radius: 1rem;
        padding: 2.5rem 2rem 1rem;
        transition: all 150ms linear;
      }

      .note-item:hover {
        scale: 1.015;
      }

      .note-item__title {
        font-weight: 700;
        font-size: 1.35rem;
        border-bottom: 1px solid var(--fontcolor);
        padding-bottom: 1rem;
        margin-top: .2rem;
        margin-bottom: 1rem;
      }

      .note-item__body {
        font-size: 1rem;
      }

      .note-item__date-created, .note-item__time-created {
        font-size: .9rem;
      }

      .note-item__time-created {
        display: flex;
        align-items: center;
        margin-top: 2.5rem;
      }

      .note-item__time-created > img {
        margin-right: .25rem;
      }

      .yellow {
        background-color: var(--yellownote);
      }

      .red {
        background-color: var(--rednote);
      }

      .blue {
        background-color: var(--bluenote);
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set note(value) {
    this._note = value;

    this.render();
  }

  get note() {
    return this._note;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'bgcolor') {
      this._bgColor = newValue;
    }
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    const { id, title, body, createdAt } = this._note;
    const dateCreated = new Date(createdAt);
    
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div data-noteid="${id}" class="note-item ${this._bgColor || 'yellow'}">
        <p class="note-item__date-created">${dateCreated.getDate()}/${(dateCreated.getMonth() + 1).toString().padStart(2, '0')}/${dateCreated.getFullYear()}</p>
        <h3 class="note-item__title">${title}</h3>
        <p class="note-item__body">${body}</p>
        <p class="note-item__time-created">
          <img src="./src/images/timer.svg" alt="Jam catatan dibuat"/>
          ${dateCreated.getHours().toString().padStart(2, '0')}:${dateCreated.getMinutes().toString().padStart(2, '0')}, ${this._days[dateCreated.getDay()]}
        </p>
      </div>
    `;
  }
}

customElements.define('note-item', NoteItem);