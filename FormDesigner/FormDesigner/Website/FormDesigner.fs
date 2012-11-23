namespace Website

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.JQueryUI 
open IntelliFactory.WebSharper.Formlet
open IntelliFactory.WebSharper.Formlet.JQueryUI

module FormDesigner =

    [<JavaScript>]
    let MenuAccordion () =
        let accElems =
            [
                "Buttons", Div [ Text "Some buttons will appear here" ]
                "Headers and footers", Div [ Text "Some headers and footers will appear here" ]
            ]
        Div [Accordion.New(accElems)]

    [<JavaScript>]
    let SubmitControls ()= 
        let newScreenButton = Button.New "New screen"
        let newScreenButtonDiv = Div [ newScreenButton ]
        newScreenButtonDiv.SetCss("text-align", "center")
        newScreenButtonDiv.SetCss("margin", "10px")
        let testButton = Button.New "Test"
        let testButtonDiv = Div [ testButton ]
        testButtonDiv.SetCss("text-align", "center")
        testButtonDiv.SetCss("margin", "10px")
        let generateButton = Button.New "Generate"
        let generateButtonDiv = Div [generateButton]
        generateButtonDiv.SetCss("text-align", "center")
        generateButtonDiv.SetCss("margin", "10px")
        let submitControlsDiv =
            Div
                [
                    newScreenButtonDiv
                    Div []
                    testButtonDiv
                    Div []
                    generateButtonDiv
                ]
        submitControlsDiv

    [<JavaScript>]
    let FIgnore f = Formlet.Map ignore f

    [<JavaScript>]
    let Screen () =
        let sceneDiv = Div [ Text "Mobile will appear here" ]
        sceneDiv
        
    [<JavaScript>]
    let PropertiesEditor () = 
        let SearchFlight =
            let fromC =
                Controls.Input ""
                |> Enhance.WithTextLabel "From"
            let toC =
                Controls.Input ""
                |> Enhance.WithTextLabel "To"
            let sDate =
                Controls.InputDatepicker None
                |> Enhance.WithTextLabel "Depart"
            let eDate = 
                Controls.InputDatepicker None 
                |> Enhance.WithTextLabel "Return"
            (
                Formlet.Yield (fun f t s e  -> ())
                <*> fromC
                <*> toC
                <*> sDate
                <*> eDate
            )
            |> Enhance.WithLegend "Search for a Flight"
            |> Enhance.WithSubmitButton "Search"
        let ChooseColor =
            let rgb =
                let slider label = 
                    {Controls.SliderConfiguration.Default with
                        Min = 0
                        Max = 255
                        Width = Some 300
                        Values = [|125|]
                    }
                    |> Some
                    |> Controls.Slider
                    |> Enhance.WithTextLabel label
                Formlet.Yield (fun r g b -> (r,g,b))
                <*> (slider "Red")
                <*> (slider "Green")
                <*> (slider "Blue")

            let colorPanel (r:int) (g:int) (b:int)  =
                let rgb = string r + "," + string g + "," + string b
                let style = "background-color:rgb(" + rgb + ");width:140px;height:100px;"
                Formlet.OfElement <| fun _ ->
                    Div [Attr.Style style] -< [Text ""]
            Formlet.Do {
                let! (rL, gL, bL) = rgb
                let (r, g, b) = (rL.Head, gL.Head, bL.Head)
                let! _ =
                        Formlet.Yield (fun _ _ _ _-> ())
                        <*> (colorPanel r g b |> Enhance.WithTextLabel "Result")
                        <*> (Controls.Input (string r) |> Enhance.WithTextLabel "R:")
                        <*> (Controls.Input (string g) |> Enhance.WithTextLabel "G:")
                        <*> (Controls.Input (string b) |> Enhance.WithTextLabel "B:")
                return (r,g,b)
            }
            |> Enhance.WithLegend "Select Color"
            |> Enhance.WithSubmitAndResetButtons "Submit" "Reset"
        let AddLabels =
            Formlet.Do {
                let! labels = 
                    Controls.Input "" 
                    |> Validator.IsNotEmpty "Empty value not allowed"
                    |> Enhance.WithValidationIcon
                    |> Enhance.Many
                    |> Enhance.WithLegend "Add Label"
                    |> Enhance.WithSubmitAndResetButtons "Test" "Reset"
                let! orderedLabels =
                    labels
                    |> List.map (fun label ->
                        Formlet.OfElement (fun _ -> Label [Text label])
                        |> Formlet.Map (fun _ -> label)
                    )
                    |> Controls.Sortable
                    |> Enhance.WithLegend "Order"
                let! selectedLabels =
                    orderedLabels
                    |> List.map (fun label ->
                        label, label, false
                    )
                    |> Controls.DragAndDrop None
                    |> Enhance.WithLegend "Drag & Drop"
                return! 
                    Controls.Autocomplete "" orderedLabels
                    |> Enhance.WithTextLabel "Label"
                    |> Enhance.WithLegend "Autocomplete"
            }
            |> Formlet.Map ignore
        [
            "Search Flight" , FIgnore SearchFlight
            "RGB" , FIgnore ChooseColor
            "Labels" , FIgnore AddLabels
        ]
        |> Controls.TabsChoose 0

    [<JavaScript>]
    let Main () =
        let menuTabElems =
            [
                "Controls", MenuAccordion ()
            ]
        let menuTabs = Tabs.New(menuTabElems, new TabsConfiguration())
        let pallete = Div [menuTabs]
        pallete.SetCss("width", "300px")
        let submitControls = SubmitControls()
        submitControls.SetCss("width", "300px")
        let leftPanel = Div [ pallete; submitControls ]
        leftPanel.SetCss("margin", "10px")
        leftPanel.SetCss("float", "left")
        let sceneTabElems = 
            [
                "Screen 1", Screen()
            ]
        let sceneTabs = Tabs.New(sceneTabElems, new TabsConfiguration())
        let scene = Div [ sceneTabs ]
        scene.SetCss("width", "600px")
        scene.SetCss("float", "left")
        scene.SetCss("margin", "10px")
        let propertiesEditor = Div [ PropertiesEditor()]
        propertiesEditor.SetCss("float", "left")
        propertiesEditor.SetCss("width", "300px")
        propertiesEditor.SetCss("margin", "10px")
        let page = Div [ leftPanel; scene; propertiesEditor ]
        page

type FormDesignerViewer() =
    inherit Web.Control()
    [<JavaScript>]
    override this.Body = FormDesigner.Main () :> _
