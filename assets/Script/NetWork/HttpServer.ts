export class HttpServer {
    public base_url: string = "";

    constructor(base_url: string) {
        this.base_url = base_url;
    }

    public get(uri: string, time_out?: number, headers?: any, success?: Function, fail?: Function) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.base_url + uri, true);
        xhr.timeout = time_out;
        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        xhr.onreadystatechange =  () =>{
            console.log("get 地址 = ", this.base_url + uri);
            console.log("xhr.readyState  = ",xhr.readyState,"xhr.status  = ",xhr.status);
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                const response = JSON.parse(xhr.responseText as string);
                console.log("get 得到的数据 ", xhr.responseText);
                if (response.code == -1) {
                    fail && fail(response);
                } else {
                    success && success(response.result);
                }
            }
        };
        xhr.send();
    }

    public post(uri: string, time_out: number, body?: string, content_type?: string, headers?: any, success?: Function, fail?: Function, error?: Function) {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", this.base_url + uri, true);
        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        xhr.onreadystatechange =  () =>{
            console.log("post 地址 = ", this.base_url + uri);
            console.log("xhr.readyState  = ",xhr.readyState,"xhr.status  = ",xhr.status);
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                const response = JSON.parse(xhr.responseText);
                console.log("post 得到的数据 ", xhr.responseText);
                if (response.code == 0) {
                    success && success(response.result);
                } else {
                    fail && fail(response);
                }
            }
        };
        if (content_type) {
            xhr.setRequestHeader("Content-Type", content_type);
        }

        xhr.timeout = time_out | 5000;
        xhr.send(body);
    }
}