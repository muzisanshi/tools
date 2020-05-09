/**
 * websocket工具
 */
class Socket {
	
  constructor(options) {
    this.url = options.url; // socket的url
    this.ip = options.ip; // socket的ip
    this.port = options.port; // socket的端口
    this.protocol = options.protocol; // 协议
    this.path = options.path; // 路径及参数
		this.si = null;// socket实例
  }

  connect() {
		
    if(this.si &&
			(this.si.readyState === WebSocket.CONNECTING ||
      this.si.readyState === WebSocket.OPEN ||
      this.si.readyState === WebSocket.CLOSING)
    ) {
			
      return false;
    }

    if (this.ip && this.port) {
			
      let url =
        (this.protocol || "ws") +
        "://" +
        this.ip +
        ":" +
        this.port +
        (this.path || "");
			
      if (this.url) {
        url = this.url + (this.path || "");
      }
			
      this.si = new WebSocket(url);
			
      this.si.onopen = e => {
        this.onConnected(e);
      };
      this.si.onmessage = e => {
        this.onMessage(e);
      };
      this.si.onerror = e => {
        this.onError(e);
      };
      this.si.onclose = e => {
        this.onClose(e);
      };
			
      return true;
    }

    return false;
  }

  send(data) {
    if (this.si && this.si.readyState === WebSocket.OPEN) {
      // 已连接才能发数据
      this.si.send(data);
    }
  }

  close() {
    if (this.si) {
      this.si.close();
    }
  }

  /*******下面的回调可以重写********/
  onConnected(e) {}

  onMessage(e) {}

  onError(e) {}

  onClose(e) {}
	
}

module.exports = Socket;
