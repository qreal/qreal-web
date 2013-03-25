import mEmulator = module("emulator/model/Emulator");

export class FunctionFactory {

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

    public loginRequestFunc(url: string, login_id: string, password_id: string) {
       // mEmulator.Emulator.instance.
    }
}

