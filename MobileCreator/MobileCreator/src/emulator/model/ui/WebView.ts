import mControl = module("emulator/model/ui/Control");
import mWebViewTag = module("emulator/model/attributes/WebViewTag");

export class WebView extends mControl.Control {

    constructor(tag: mWebViewTag.WebViewTag);
    constructor(tag: mWebViewTag.WebViewTag, $control: JQuery);
    constructor(tag: mWebViewTag.WebViewTag, $control?: JQuery = $("<iframe></iframe>")) {
        super(tag, $control);       
        this.setDimensions($control);
        this.$Control.attr('src', (<mWebViewTag.WebViewTag>this.Tag).Url);
    }
}