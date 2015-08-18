class Runner {

    private timeoutId: number;
    private boost: number = 2;

    run(robotItem: RobotItem, displayWidget: DisplayWidget, result: any): void {
        var trajectory = JSON.parse(result.trace);
        var runner: Runner = this;
        var counter: number = 0;
        runner.timeoutId = setTimeout(function run() {
            var point: any = trajectory[counter];
            runner.doPointActions(robotItem, displayWidget, point);
            if (counter < trajectory.length - 1) {
                counter++;
                runner.timeoutId = setTimeout(run, (trajectory[counter].timestamp - point.timestamp) / runner.boost);
            } else {
                runner.parseReport(result.report);
            }
        }, 0);
    }

    stop(robotItem: RobotItem, displayWidget: DisplayWidget) {
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
                }
                break;
            case "sadSmiles":
                if (point.value) {
                    displayWidget.drawSadSmile();
                }
                break;
        }
    }
}