
export default class HTTPResponse {
  constructor(response, body) {
    let _text, _data;
    this.status = response.statusCode;
    this.headers = response.headers || {};
    this.cookies = this.headers["set-cookie"];
    
    this.body = body;
    if (typeof body == 'string') {
      _text = body;
    } else if (Buffer.isBuffer(body)) {
      this.buffer = body;
    } else if (typeof body == 'object') {
      _data = body;
    }

    let getText = () => {
      if (!_text && this.buffer) {
          _text = this.buffer.toString('utf-8');
        } else if (!_text && _data) {
          _text = JSON.stringify(_data);
        }
        return _text; 
    }

    let getData = () => {
      if (!_data) {
          try {
              _data = JSON.parse(getText());
          } catch (e) {}
        }
        return _data;
    }

    Object.defineProperty(this, 'text', {
      enumerable: true,
      get: getText
    });

    Object.defineProperty(this, 'data', {
      enumerable: true,
      get: getData
    });
  }
}
