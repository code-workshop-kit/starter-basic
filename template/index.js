class <%= participantName %>Component extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <h1>Hello <%= participantName %></h1>
    `;
  }
}
customElements.define('<%= participantNameLower %>-component', <%= participantName %>Component);

export default `<<%= participantNameLower %>-component></<%= participantNameLower %>-component>`