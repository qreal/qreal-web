// algoritm to get a key

declare function ContextMenu() : void;

class StandardsCustomEvent {
    static get(eventType: string, data: {}) {
        var customEvent = <any>CustomEvent;
        var event = new customEvent(eventType, data);
        return <CustomEvent> event;
    }
}
        
class KeyGiver {

    private list: utils.PairArray = [];
    private contextMenu;
    private contextMenuX: number;
    private contextMenuY: number;
    private prevKey: number;
    private controller: DiagramController;

    private minX: number;
    private minY: number;
    private maxX: number;
    private maxY: number;

    private gestures: Gesture[];

    constructor(newController: DiagramController) {
        this.controller = newController;
        this.contextMenu = new ContextMenu();
        this.gestures = this.controller.getGestureData();
        this.list = this.controller.getGestureList();
        this.minX = this.list[0].first;
        this.minY = this.list[0].second;
        this.maxX = this.list[0].first;
        this.maxY = this.list[0].second;
        for (var i = 1; i < this.list.length; i++) {
            if (this.list[i].first < this.minX) this.minX = this.list[i].first;
            if (this.list[i].first > this.maxX) this.maxX = this.list[i].first;
            if (this.list[i].second < this.minY) this.minY = this.list[i].second;
            if (this.list[i].second > this.maxY) this.maxY = this.list[i].second;
        }
        if (this.maxX - this.minX > this.maxY - this.minY) {
            var ratio = (this.maxY - this.minY) / (this.maxX - this.minX);
            var midValue = (this.maxY + this.minY) / 2;
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].second = midValue - (midValue - this.list[i].second) * ratio;
            }
        }
        if (this.maxX - this.minX < this.maxY - this.minY) {
            var ratio = (this.maxX - this.minX) / (this.maxY - this.minY);
            var midValue = (this.maxX + this.minX) / 2;
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].first = midValue - (midValue - this.list[i].first) * ratio;
            }
        }
        this.minX = this.list[0].first;
        this.minY = this.list[0].second;
        for (var i = 1; i < this.list.length; i++) {
            if (this.list[i].first < this.minX) this.minX = this.list[i].first;
            if (this.list[i].second < this.minY) this.minY = this.list[i].second;
        }
        this.contextMenuX = this.controller.getMouseupEvent().x;
        this.contextMenuY = this.controller.getMouseupEvent().y;
    }

    private getSymbol(pair:utils.Pair) {
        var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        var curX = pair.first - this.minX;
        var curY= pair.second - this.minY;

        return columnNames[Math.floor(curX * 9 / (this.maxX + 1 - this.minX))] + +(Math.floor(curY * 9 / Math.floor(this.maxY + 1 - this.minY)));
    }

    public getKey() {
        var key = [];
        var index = 0;
        var firstCell = this.getSymbol(this.list[0]);
        key[index] = firstCell;
        index++;
        for (var i = 1; i < this.list.length; i++) {
            var secondCell = this.getSymbol(this.list[i]);
            if (secondCell != firstCell) {
                firstCell = secondCell;
                key[index] = firstCell;
                index++;
            }
        }
        key.sort();
        for (var i = key.length - 2; i >= 0; i--) {
            if (key[i] === key[i + 1])
                key.splice(i, 1);
        }
        this.isGesture(key);

        return key;
    }

    public isGesture(key) {
        for (var i = 0; i < this.gestures.length; i++) {
            var curr = this.gestures[i];
            this.prevKey = i - 1;
            var curRes = this.gestureDistance(this.gestures[i].key, key) / Math.max(this.gestures[i].key.length, key.length);

            while (this.prevKey >= 0
            && this.gestureDistance(this.gestures[this.prevKey].key, key) / Math.max(this.gestures[this.prevKey].key.length, key.length) > curRes) {
                this.gestures[this.prevKey + 1] = this.gestures[this.prevKey];
                this.gestures[this.prevKey] = curr;
                this.prevKey--;
            }
        }
        this.prevKey = 0;
        while (this.prevKey < this.gestures.length)
        {
            var factor = this.gestureDistance(this.gestures[this.prevKey].key, key) / Math.max(this.gestures[this.prevKey].key.length, key.length);
            if (factor > this.gestures[this.prevKey].factor)
                break;
            this.prevKey++;
        }

        if (this.prevKey === 0)
            return;

        var names = new Array();
        for (var i = 0; i < this.prevKey; ++i)
            names[i] = this.gestures[i].name;

        var getItems = function() {
            var items = new Array();
            var tempController = this.controller;
            for (var i = 0; i < this.prevKey; ++i) {
                items.push({"name": names[i],
                            "action": function(text) {
                                tempController.createNode(text, tempController.getMouseupEvent().x, tempController.getMouseupEvent().y); }.bind(null, names[i])
                });
            }
            return items;
        }

        var contextMenuEvent = StandardsCustomEvent.get("myevent", {
            detail: {
                message: "Hello World!",
                time: new Date(),
            },
            bubbles: true,
            cancelable: true
        });

        function showContextMenu(keyGiver, e) {
            e.preventDefault();
            var menuDiv = document.createElement("div");
            menuDiv.style.left = keyGiver.contextMenuX + "px";
            menuDiv.style.top = keyGiver.contextMenuY + "px";
            menuDiv.style.width = "320px";
            menuDiv.style.height = "240px";
            menuDiv.style.position = "absolute";
            menuDiv.style["z-index"] = 100;
            document.body.appendChild(menuDiv);
            keyGiver.contextMenu.showMenu("myevent", menuDiv, getItems.bind(keyGiver)());
        }
        var diagramPaper = document.getElementById('diagram_paper');
        var bindContextMenu = showContextMenu.bind(null, this);
        diagramPaper.addEventListener("myevent", bindContextMenu, false);
        diagramPaper.setAttribute("oncontextmenu", "javascript: context_menu.showMenu('myevent', this, getItems());");
        diagramPaper.dispatchEvent(contextMenuEvent);
        diagramPaper.removeEventListener("myevent", bindContextMenu, false);
    }

    // Calculate  distance between gestures s1 and s2
    private gestureDistance(s1, s2) {
        var ans = 0;

        for (var i = 0; i < s1.length; i++) {
            var minDist = 1000;
            for (var j = 0; j < s2.length; j++) {
                var d1 = Math.abs(s1[i].charCodeAt(0) - s2[j].charCodeAt(0));
                var d2 = Math.abs(s1[i][1] - s2[j][1]);
                if (d1 + d2 < minDist)
                    minDist = d1 + d2;
            }
            ans += minDist;
        }

        for (var i = 0; i < s2.length; i++) {
            var minDist = 1000;
            for (var j = 0; j < s1.length; j++) {
                var d1 = Math.abs(s2[i].charCodeAt(0) - s1[j].charCodeAt(0));
                var d2 = Math.abs(s2[i][1] - s1[j][1]);
                if (d1 + d2 < minDist)
                    minDist = d1 + d2;
            }
            ans += minDist;
        }
        return ans / 2;
    }
}
