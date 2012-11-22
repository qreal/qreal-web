namespace Website

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html


module JQueryUI =
    open IntelliFactory.WebSharper.JQueryUI
    [<JavaScript>]
    let maxZ = ref 0

    [<JavaScript>]
    let bringToTop (e : Element) = 
        incr maxZ
        e.SetCss("z-index", string (!maxZ))

    [<JavaScript>]
    let Main () =
        
        let divsCSS = "height:400px;
        float:left; 
        margin-left:15px; 
        text-align:center"
        let button = Button.New "Open"
        let pan = Div [button]
        let activity1pan = Div []
        activity1pan.SetCss("height", "600px")
        let tabScene =
            [
                "Activity1", activity1pan
            ]

        let tabMenu =
            [
                "Dialog", pan
            ]
        let tabs = Tabs.New(tabMenu, new TabsConfiguration())
        let tabsScene = Tabs.New(tabScene, new TabsConfiguration())
        let menu = Div [ tabs ]
        let scene = Div [ tabsScene]
        menu.SetStyle(divsCSS)
        scene.SetStyle(divsCSS)
        scene.SetCss("width", "600px")
        
        let createButton () =  
            let buttonDiv = Div [ Text "Some element will be here" ]
            buttonDiv.SetCss("background-color", "silver")
            buttonDiv |>! OnMouseDown (fun _ _ -> bringToTop buttonDiv) |> ignore
            JQueryUI.Draggable.New(buttonDiv, JQueryUI.DraggableConfiguration(containment = "parent")) |> ignore
            activity1pan.Append(buttonDiv)

        button.OnClick (fun _ -> createButton ())        
        
        Div [
             menu 
             scene
        ]


type JQueryUIViewer() =
    inherit Web.Control()
    [<JavaScript>]
    override this.Body = JQueryUI.Main () :> _
