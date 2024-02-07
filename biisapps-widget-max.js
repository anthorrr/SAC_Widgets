var getPromisify = (url, data, dataType) => {
  return new Promise((resolve, reject) => {
    $.get(url, data, (response, status, xhr) => {
      if (status === 'success') {
        resolve({ response, status, xhr })
      } else {
        const err = new Error('xhr error')
        err.target = xhr
        reject(err)
      }
    }, dataType)
  })
}

var postPromisify = (url, data, dataType) => {
  return new Promise((resolve, reject) => {
    $.post(url, data, (response, status, xhr) => {
      if (status === 'success') {
        resolve({ response, status, xhr })
      } else {
        const err = new Error('xhr error')
        err.target = xhr
        reject(err)
      }
    }, dataType)
  })
}

(function () {
  const template = document.createElement('template')
  template.innerHTML = "";

  class BIISAPPSWidget2 extends HTMLElement {
    constructor() {
        super(); 
        let shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.addEventListener("click", event => {
        	var event = new Event("onClick");
        	this.dispatchEvent(event);
        });
        this._props = {};
    }
    
    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
    }
    
    onCustomWidgetAfterUpdate(changedProperties) {
        if ("color" in changedProperties) {
        	this.style["background-color"] = changedProperties["color"];
        }
        if ("opacity" in changedProperties) {
        	this.style["opacity"] = changedProperties["opacity"];
        }
    }
    
    // ------------------
    // Scripting methods
    // ------------------
    async queryBIISAPPS (url, data, dataType) {
      const r = await getPromisify(url, data, dataType)
      return r.response;
    }
    
    async writeBIISAPPS (url, data, dataType) {
      const r = await postPromisify(url, data, 'json')
      return 'Success'
    }

  }

  customElements.define('gov-hhs-biisapps-widget-sapmax', BIISAPPSWidget2)
})()