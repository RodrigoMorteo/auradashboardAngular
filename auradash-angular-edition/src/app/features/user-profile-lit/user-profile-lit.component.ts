import { Component, CUSTOM_ELEMENTS_SCHEMA, afterNextRender } from '@angular/core';
import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('user-profile-lit')
export class UserProfileLit extends LitElement {
  @property() name = '';
  @property() email = '';

  override render() {
    return html`
      <div style="padding: 1rem; border: 2px solid #0f172a; border-radius: 0.5rem; background: #f8fafc;">
        <h4 style="margin: 0; color: #0f172a;">Shadow DOM Profile (Lit)</h4>
        <p style="margin: 0.5rem 0 0 0; color: #64748b;">Name: ${this.name}</p>
        <p style="margin: 0.25rem 0 0 0; color: #64748b;">Email: ${this.email}</p>
      </div>
    `;
  }
}

@Component({
  selector: 'app-user-profile-lit-wrapper',
  standalone: true,
  template: `
    @if (isBrowser) {
      <user-profile-lit [attr.name]="name" [attr.email]="email"></user-profile-lit>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserProfileLitComponent {
  name = 'Admin User';
  email = 'admin&#64;example.com';
  isBrowser = false;

  constructor() {
    afterNextRender(() => {
      this.isBrowser = true;
    });
  }
}