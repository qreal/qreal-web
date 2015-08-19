class Runner {

    private timeoutId: number;
    private boost: number = 2;

    run(robotItem: RobotItem, displayWidget: DisplayWidget, result: any): void {
        $("#display").css("z-index", 100);
        var trajectory = JSON.parse(result.trace);
        var runner: Runner = this;
        var counter: number = 0;
        runner.timeoutId = setTimeout(function nextPoint() {
            var point: any = trajectory[counter];
            runner.doPointActions(robotItem, displayWidget, point);
            if (counter < trajectory.length - 1) {
                counter++;
                var delay: number = (trajectory[counter].timestamp - point.timestamp) / runner.boost;
                if (!delay) {
                    nextPoint();
                } else {
                    runner.timeoutId = setTimeout(nextPoint, delay);
                }
            } else {
                runner.parseReport(result.report);
                $("#display").css("z-index", -1);
                displayWidget.reset();
            }
        }, 0);
    }

    stop(robotItem: RobotItem, displayWidget: DisplayWidget) {
        $("#display").css("z-index", -1);
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
        robotItem.clearCurrentPosition();
        displayWidget.reset();
    }

    private parseReport(report) {
        var messageText = "";
        var level = report.messages[0].level;
        report.messages.forEach( function(message) {
            messageText += message.message + " ";
        });
        if (level === "info") {
            $("#infoAlert").removeClass("alert-danger");
            $("#infoAlert").addClass("alert-success");
        } else {
            if (level === "error") {
                $("#infoAlert").removeClass("alert-success");
                $("#infoAlert").addClass("alert-danger");
            }
        }
        $("#infoAlert").contents().last()[0].textContent = messageText;
        $("#infoAlert").show();
    }

    private doPointActions(robotItem: RobotItem, displayWidget: DisplayWidget, point): void {
        if (point.device) {
            switch (point.device) {
                case "display":
                    this.doDisplayActions(displayWidget, point);
                    break;
                case "led":
                    this.doLedActions(displayWidget, point);
                    break;
                default:
            }
        } else {
            robotItem.moveToPoint(point.x, point.y, point.rotation);
        }
    }

    private doDisplayActions(displayWidget: DisplayWidget, point): void {
        switch (point.property) {
            case "smiles":
                if (point.value) {
                    displayWidget.drawSmile();
                } else {
                    displayWidget.clearSmile();
                }
                break;
            case "sadSmiles":
                if (point.value) {
                    displayWidget.drawSadSmile();
                } else {
                    displayWidget.clearSadSmile();
                }
                break;
        }
    }

    private doLedActions(displayWidget: DisplayWidget, point): void {
        if (point.property === "color") {
            displayWidget.setLedColor(point.value);
        }
    }
}