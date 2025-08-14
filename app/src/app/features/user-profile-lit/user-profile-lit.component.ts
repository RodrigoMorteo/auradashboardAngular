import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UserProfile } from '../../core/models/user-profile.model';

@customElement('app-user-profile-lit')
export class UserProfileLitComponent extends LitElement {
  // Use a private backing field for userProfile
  private _userProfile: UserProfile | null = null;

  @property({ type: Object })
  set userProfile(value: UserProfile | null) {
    const oldValue = this._userProfile;
    this._userProfile = value;
    this.requestUpdate('userProfile', oldValue);
  }

  get userProfile(): UserProfile | null {
    return this._userProfile;
  }

  // Use private backing fields for _displayName and _theme
  private __displayName: string = '';
  private __theme: 'Light' | 'Dark' = 'Light';

  @state()
  set _displayName(value: string) {
    const oldValue = this.__displayName;
    this.__displayName = value;
    this.requestUpdate('_displayName', oldValue);
  }

  get _displayName(): string {
    return this.__displayName;
  }

  @state()
  set _theme(value: 'Light' | 'Dark') {
    const oldValue = this.__theme;
    this.__theme = value;
    this.requestUpdate('_theme', oldValue);
  }

  get _theme(): 'Light' | 'Dark' {
    return this.__theme;
  }

  static override styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }
    div {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      max-width: 400px;
      margin: 20px auto;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #333;
      text-align: center;
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 15px;
      font-weight: bold;
      color: #555;
    }
    input[type="text"],
    select {
      width: calc(100% - 22px); /* Account for padding and border */
      padding: 10px;
      margin-top: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box; /* Include padding and border in the element's total width and height */
    }
    button {
      background-color: #007bff;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      display: block;
      width: 100%;
      margin-top: 20px;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
    // Additional setup if needed
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('userProfile') && this.userProfile) {
      this._displayName = this.userProfile.name;
      this._theme = (this.userProfile.theme === 'Light' || this.userProfile.theme === 'Dark') ? this.userProfile.theme : 'Light';
    }
  }

  private _handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this._displayName = input.value;
  }

  private _handleSelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    this._theme = select.value as 'Light' | 'Dark';
  }

  private _handleSave() {
    const saveEvent = new CustomEvent('profile-save', {
      detail: {
        name: this._displayName,
        theme: this._theme,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(saveEvent);
  }

  override render() {
    console.log('Lit component render() invoked. userProfile:', this.userProfile);
    if (!this.userProfile) {
      return html`<p>Loading profile...</p>`;
    }
    return html`
      <div class="p-4 bg-white rounded-lg shadow-xs">
        <h4 class="mb-4 font-semibold text-gray-800">User Profile (Lit)</h4>
        <div class="mb-4">
          <label for="displayName" class="block text-sm font-medium text-gray-700">Display Name</label>
          <input id="displayName" type="text" .value=${this._displayName} @input=${this._handleInput}
            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div>
        <div class="mb-4">
          <label for="themePreference" class="block text-sm font-medium text-gray-700">Theme Preference</label>
          <select id="themePreference" @change=${this._handleSelect} .value=${this._theme}
            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
        <button @click=${this._handleSave}
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
          Save
        </button>
      </div>
    `;
  }
}