declare var $;
declare var jQuery;

jQuery(function ($) {
    $('.toolbox').layout();
    $('.border').layout();
});

window.onload = () => {
    new Designer.PalleteController();
};

module Log {
    export class LogManager {
        private tag: string;

        constructor (tag: string) {
            this.tag = tag;
        }

        log(message: string): void {
            console.log("(" + this.tag + ") " + message);
        }
    }
}

module Designer {
    export class PalleteController {
        static log = new Log.LogManager("PalleteController");

        constructor () {
            var paletteButton = document.getElementById('paletteButton');
            var designer = document.getElementById('designer');
            paletteButton.onclick = () => {
                alert("Hello!");
            }

            paletteButton.ondragstart = (ev: DragEvent) => this.drag(ev);
            designer.ondrop = (ev: DragEvent) => this.drop(ev);
            designer.ondragover = (ev: DragEvent) => this.allowDrop(ev);


            PalleteController.log.log("in constructor");
        }

        allowDrop(ev) {
            PalleteController.log.log("allowDrop");
            ev.preventDefault();
        }

        drag(ev) {
            PalleteController.log.log("drag");
            //ev.dataTransfer.setData("Text", ev.target.id);
        }

        drop(ev) {
            PalleteController.log.log("drop");
            ev.preventDefault();
            //var data = ev.dataTransfer.getData("Text");
            var button = $("<a>Button</a>");
            $('#designer').append(button);
            button.button();
        }
    }
}


/*
// Interface
interface IPoint {
    getDist(): number;
}

// Module
module Shapes {

    // Class
    export class Point implements IPoint {
        // Constructor
        constructor (public x: number, public y: number) { }

        // Instance member
        getDist() { return Math.sqrt(this.x * this.x + this.y * this.y); }

        // Static member
        static origin = new Point(0, 0);
    }

}

// Local variables
var p: IPoint = new Shapes.Point(3, 4);
var dist = p.getDist();
*/