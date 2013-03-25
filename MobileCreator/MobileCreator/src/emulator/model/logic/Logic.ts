import mEmulator = module("emulator/model/Emulator");
import mLog = module("utils/log/Log");

export class FunctionFactory {
    private logger = new mLog.Logger("FunctionFactory");

    public seqFunc(func1: Function, func2: Function): Function {
        return function () {
            func1();
            func2();
        }
    }

    public ifFunc(conditionFunc: Function, thenFunc: Function, elseFunc: Function): Function {
        return function () {
            if (conditionFunc()) {
                thenFunc();
            } else if (elseFunc) {
                elseFunc();
            }
        }
    }

    public transitionFunc(pageId: string): Function {
        return function () {
            mEmulator.Emulator.instance.NavigationManager.showPage(pageId);
        }
    }

    public loginRequestFunc(url: string, login_id: string, password_id: string):Function {
        var login = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(login_id);
        var password = mEmulator.Emulator.instance.EmulatorViewModel.getInputText(password_id);
        return function () {
            this.sendLoginRequest(url, login, password);
        }
    }

    public sendLoginRequest(url: string, login: string, password: string): void {
        this.logger.log("sendLoginRequest: url="+url+" login="+login+" password="+password);
        var parameters = jQuery.param({
            login: login,
            password: password
        });
        $.ajax({
            type: "POST",
            url: url,
            data: parameters,
            success: function (data) {
                mEmulator.Emulator.instance.trigger("LoginResponse", data);
                alert("Response "+data);
            },
            dataType: "text"
        });
    }
}

