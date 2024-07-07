import { LitElement, html, css} from 'lit';
import { customElement, state, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '@qomponent/qui-icons';

declare const MODE: string;

interface ProgEvent { name: string }

@customElement('pierre-remote')
class PierreRemote extends LitElement {

    @state()
    private disabled: boolean = false;

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return html`
          <button class="btn btn-plus"  @click="${this.sendPlus}" .disabled="${this.disabled}">
            <fas-icon icon="thumbs-up" size="250px"></i>
          </button>
          <button class="btn btn-minus" @click="${this.sendMinus}" .disabled="${this.disabled}">
            <fas-icon icon="thumbs-down" size="250px"></i>
          </button>
        `;
    }

    private sendPlus() {
        this.send("+")
    }

    private sendMinus() {
        this.send("-")
    }

    private send(name: string) {
        this.disabled = true;
        let progEvent = {
            name,
        } as ProgEvent;
        fetch(`/pierre/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(progEvent),
        }).catch(e => {
            console.error(e);
        }).then(() => {
            setTimeout(() => {
                this.disabled = false;
            }, MODE === "dev" ? 0 : 5000);
        })
    }


    static styles = css`
        :host {
            display: flex;
            height: 100%;
            flex-direction: column;
            overflow: hidden;
            padding: 5px;
            background: black;
            justify-content: space-around;
            font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
        }
        
        button {
            color: orange;
            background: transparent;
            border: none;
            cursor: pointer;
        }
        
        button:hover {
            color: yellow;
        }
        
        button:disabled {
            color: #aaaaaa
        }
        
    `;

}