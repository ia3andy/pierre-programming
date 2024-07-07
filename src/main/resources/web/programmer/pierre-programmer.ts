import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {subscribeToEvents} from "./events";
import {playFail, playWin} from "./sounds";

@customElement('pierre-programmer')
class PierreProgrammer extends LitElement {

    @state()
    private count = 0;

    private total = 0;

    private subscription: () => void = null;

    private timeout: number = null;

    connectedCallback() {
        super.connectedCallback();
        this.subscription = subscribeToEvents(this.onEvent);
    }

    disconnectedCallback() {
        super.connectedCallback();
        if (this.subscription) {
            this.subscription();
            this.subscription = null;
        }
    }

    render() {
        return html`
          <div>
            {<span>${this.count}</span>}
          </div>
        `;
    }

    private onEvent = (e: object) => {
        if (this.count === 0) {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this.count = 0;
            }, 10000);
        }
        switch (e['name']) {
            case "+":
                this.count++;
                this.total++;
                break;
            case "-":
                this.count--;
                this.total--;
                break;
        }
        console.log(this.total);

        // @ts-ignore
        const threshold: number = window.threshold || 10;
        if (this.count > threshold) {
            this.resetCount();
            playWin();
            return;
        }

        if (this.count < -threshold) {
            this.resetCount();
            this.count = 0;
            playFail();
            return;
        }
    }


    private resetCount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.count = 0;
    }

    static styles = css`
        :host {
            display: flex;
            height: 100%;
            flex-direction: column;
            overflow: hidden;
            justify-content: center;
            align-items: center;
            font-family: monospace;
            font-size: 350px;
            background: #957DAD;
            color: orange;
        }

        div {
            vertical-align: center;
        }

        span {
            color: white;
        }


    `;

}