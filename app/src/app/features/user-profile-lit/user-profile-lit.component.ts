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

  // Removed static override styles as we are using Tailwind classes directly in HTML
  static override styles = css`
    :host {
      display: block;
      height: 100%; /* Ensure host takes full height */
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
      return html`<p class="flex-grow flex items-center justify-center text-gray-500 dark:text-gray-400">Loading profile...</p>`;
    }
    return html`
      <div class="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden h-full flex flex-col">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          User Profile (Lit)
        </h3>
        <div class="flex-grow p-4 overflow-y-auto">
          <div class="mb-4">
            <label for="displayName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
            <input id="displayName" type="text" .value=${this._displayName} @input=${this._handleInput}
              class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700">
          </div>
          <div class="mb-4">
            <label for="themePreference" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Theme Preference</label>
            <select id="themePreference" @change=${this._handleSelect} .value=${this._theme}
              class="block w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700">
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
          <button @click=${this._handleSave}
            class="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    `;
  }
}