// src/fx/lit/debug/error-panel-fx.js
import { LitElement, html, css } from 'lit';

export class ErrorPanelFx extends LitElement {
    static properties = {
        logs: { type: Array },
        visible: { type: Boolean },
        activeTab: { type: String },
        selectedError: { type: Object },
        filter: { type: String },
    };

    constructor() {
        super();
        this.logs = [];
        this.visible = false;
        this.activeTab = 'list'; // 'list' or 'details'
        this.selectedError = null;
        this.filter = 'all'; // Filter type: all, error, warn, info, success

        window.addEventListener('error-panel-update', this.updateLogs.bind(this));
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'e') this.togglePanel();
        });
    }

    static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 50px;
      left: 50px;
      width: 400px;
      height: 300px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 8px;
      z-index: 1000;
      display: none;
      flex-direction: column;
    }
    :host([visible]) {
      display: flex;
    }
    .header {
      background: #333;
      padding: 8px;
      cursor: grab;
      border-radius: 8px 8px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tabs {
      display: flex;
      gap: 8px;
    }
    .tab {
      cursor: pointer;
      padding: 4px 8px;
      background: #444;
      border-radius: 4px;
    }
    .tab.active {
      background: #666;
    }
    .logs,
    .details {
      flex: 1;
      overflow-y: auto;
      padding: 8px;
    }
    .log {
      margin-bottom: 8px;
      cursor: pointer;
    }
    .log.error {
      color: red;
    }
    .log.warn {
      color: orange;
    }
    .log.info {
      color: lightblue;
    }
    .log.success {
      color: green;
    }
    .footer {
      background: #222;
      padding: 8px;
      display: flex;
      justify-content: space-between;
    }
  `;

    updateLogs(event) {
        this.logs = event.detail;
        this.requestUpdate();
    }

    togglePanel() {
        this.visible = !this.visible;
    }

    setFilter(filter) {
        this.filter = filter;
    }

    copyLogs(all = true) {
        const logsToCopy = all ? this.logs : [this.logs[this.logs.length - 1]];
        const text = logsToCopy.map((log) => `[${log.timestamp}] ${log.type.toUpperCase()}: ${log.message}`).join('\n');
        navigator.clipboard.writeText(text);
    }

    openDetails(error) {
        this.selectedError = error;
        this.activeTab = 'details';
    }

    render() {
        const filteredLogs = this.filter === 'all' ? this.logs : this.logs.filter((log) => log.type === this.filter);

        return html`
      <div class="header">
        <span>Error Panel</span>
        <div class="tabs">
          <span class="tab ${this.activeTab === 'list' ? 'active' : ''}" @click=${() => (this.activeTab = 'list')}>
            Errors
          </span>
          <span class="tab ${this.activeTab === 'details' ? 'active' : ''}" @click=${() => (this.activeTab = 'details')}>
            Details
          </span>
        </div>
      </div>

      ${this.activeTab === 'list'
                ? html`
            <div class="logs">
              ${filteredLogs.map(
                    (log, index) =>
                        html`<div
                    class="log ${log.type}"
                    @click=${() => (this.selectedError = log)}
                    @dblclick=${() => this.openDetails(log)}
                  >
                    [${log.timestamp}] ${log.type.toUpperCase()}: ${log.message}
                  </div>`
                )}
            </div>
          `
                : html`
            <div class="details">
              ${this.selectedError
                        ? html`
                    <h3>${this.selectedError.type.toUpperCase()} Details</h3>
                    <p><strong>Timestamp:</strong> ${this.selectedError.timestamp}</p>
                    <p><strong>Message:</strong> ${this.selectedError.message}</p>
                  `
                        : html`<p>Select an error to view details.</p>`}
            </div>
          `}

      <div class="footer">
        <button @click=${() => this.copyLogs(true)}>Copy All</button>
        <button @click=${() => this.copyLogs(false)}>Copy Last</button>
        <button @click=${() => this.setFilter('error')}>Errors</button>
        <button @click=${() => this.setFilter('warn')}>Warnings</button>
        <button @click=${() => this.setFilter('info')}>Info</button>
        <button @click=${() => this.setFilter('all')}>All</button>
        <button @click=${() => (this.logs = [])}>Clear</button>
      </div>
    `;
    }
}

customElements.define('error-panel-fx', ErrorPanelFx);
