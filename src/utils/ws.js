import logger from './logger';

class WS {
  #ws = null;
  #pollingFn = null;
  #isPolling = false;
  constructor() {}
  join(url, token) {
    return new Promise((resolve, reject) => {
      this.#ws = new WebSocket(url, token);

      this.#ws.addEventListener('message', event => {
        try {
          const jsonObj = JSON.parse(event.data);
          // logger.info('jsonObj:', jsonObj, this.#isPolling, this.#pollingFn);
          this.#isPolling && this.#pollingFn(jsonObj);
        } catch (error) {
          logger.error('error:', error);
        }
      });

      switch (this.#ws.readyState) {
        case WebSocket.CONNECTING:
          // logger.info('connecting');
          break;
        case WebSocket.OPEN:
          break;
        case WebSocket.CLOSING:
          // logger.info('CLOSING');
          break;
        case WebSocket.CLOSED:
          // logger.info('CLOSED');
          break;
        default:
          // this never happens
          break;
      }

      this.#ws.onopen = () => {
        logger.info('ws client open');
        resolve();
      };
      this.#ws.onerror = event => {
        logger.info('error:', event);
        reject();
      };
    });
  }
  addPollingFn(fn) {
    this.#pollingFn = fn;
  }
  joinPolling() {
    this.#isPolling = true;
    this.#ws.send('{"type":"joinPooling"}');
  }
  send(data) {
    this.#ws.send(data);
  }
  close() {
    this.#ws.send('{"type":"leavePooling"}');
    this.#ws.close();

    this.#ws = null;
    this.#pollingFn = null;
    this.#isPolling = false;
  }
}

export default WS;
