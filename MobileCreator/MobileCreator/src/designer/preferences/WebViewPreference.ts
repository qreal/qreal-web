import mElementPreferences = module("designer/preferences/ElementPreferences");

export class WebViewPreferences extends mElementPreferences.ElementPreferences {
    private url: string;
    get Url() {
        return this.url;
    }
    set Url(url: string) {
        this.url = url;
    }
    private webViewId: string;
    get WebViewId() {
        return this.webViewId;
    }
    set WebViewId(webViewId: string) {
        this.webViewId = webViewId;
    }
}