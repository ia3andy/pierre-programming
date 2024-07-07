
export function subscribeToEvents(onEvent: (e: object) => void): () => void {
    let stream : EventSource;
    let i = 0;
    function connect() {
        console.log('Connecting to event stream');
        stream = new EventSource(`/pierre/events`);
        stream.onopen = () => {
            i = 0;
            console.log('Connected to event stream');
        };
        stream.onmessage = (m) => {
            console.log(`=> Received event: ${m.data}`);
            onEvent(JSON.parse(m.data));
        };
        stream.onerror = (e) => {
            console.error('Disconnecting from event stream on error', e);
            stream.close();
            if (i++ < 300) {
                setTimeout(connect, 2000);
            }
        };
    }
    connect();
    return () => {
        if (stream) {
            console.log('Disconnecting from event stream');
            stream.close();
        }
    };
}
