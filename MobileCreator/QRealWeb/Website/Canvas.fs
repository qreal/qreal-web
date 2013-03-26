module Website.Canvas

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Raphael
open IntelliFactory.WebSharper.JQuery

module SampleInternals =
    open Primitives
    [<JavaScript>]
    let SimpleExample () =
        Div []
        |>! OnAfterRender (fun elem -> 
            let paper = Raphael(elem.Body, 400., 250.)
            let c = paper.Circle(90., 90., 70.)
            paper.Text(50., 50., "Hello\nRaphael") |> ignore
            paper.Path("M10 10L90 90") |> ignore
            paper.Ellipse(250., 50., 40., 20.) |> ignore
            paper.Rect(250., 140., 50., 50., 10.) |> ignore
            c.Fill("#d0d") |> ignore)

    [<JavaScript>]
    let Main () = 
        Div []
        |>! OnAfterRender (fun elem -> 
            let leftWidth = 150.0
            let width = 300.0
            let height = 500.0
            let canvas = new Raphael(elem.Body, leftWidth + width, height)
            let startX, startY = leftWidth, 0.0
            canvas.Rect(0.0, 0.0, leftWidth + width, height) |> ignore
            let line x1 y1 x2 y2 =
                let path = new Path()
                canvas.Path(path.MoveTo(x1, y1).LineTo(x2-x1, y2-y1).ClosePath()) |> ignore
            //canvas.Rect(startX - leftWidth, startY, leftWidth, height) |> ignore
            line leftWidth 0.0 leftWidth height
            let genBtn =
                let num = ref 0
                fun () ->
                    incr num
                    let btn = new Button("button", Value 100.0, Value 50.0, 50.0, 25.0 - leftWidth, "someText", 20.0, "method")
                    (btn :> Primitive).draw canvas leftWidth 0.0
                    btn
            let (tools : VisiblePrimitive list ref) = ref [genBtn()]
            
            let existing = ref []
                //genBtn()
            //let rect = canvas.Rect(50.0, 50.0, 100.0, 50.0)
            //rect.Translate(300.0, 100.0)
            //(btn :> Primitive).draw canvas leftWidth 0.0
            
            (*let text = "Hello World"
            let txt = 
                [| "120deg"
                   "0"
                   "240deg" |]
                |> Array.map (fun fill ->
                    canvas.Text(150., 160., text)
                        .Font("50px Helvetica, Arial")
                        .Opacity(0.5)
                        .Fill("hsb(" + fill + ", .5, 1)"))*)
            //let mouse = ref None
            let rot = ref 0.
            let prevX, prevY = ref 0, ref 0
            let topX, topY = canvas.Top.X(), canvas.Top.Y()
            let selected = ref None
            let isTool = ref false
            //JQuery.JQuery.Of(Dom.Document.Current).Mousedown(fun _ e ->
            let curh = ref 200.0
            JQuery.JQuery.Of(Dom.Document.Current).Mousedown(fun _ e ->
                let findElems = List.tryFind (fun (elem : VisiblePrimitive) ->
                    elem.IsInside (float e.PageX - leftWidth - 216.0) (float e.PageY - 152.0))
                match findElems !tools with
                | Some elem ->
                    selected := Some elem
                    prevX := e.PageX
                    prevY := e.PageY
                    isTool := true
                | None ->
                    match findElems !existing with
                    | Some elem ->
                        selected := Some elem
                        isTool := false
                    | None -> ()
                curh := !curh + 20.0
                canvas.Safari()
            ) |> ignore
            JQuery.JQuery.Of(Dom.Document.Current).Mousemove(fun _ e -> 
                match !selected with
                | None -> ()
                | Some elem -> 
                    elem.Move (float (e.PageX - !prevX)) (float (e.PageY - !prevY))
                    prevX := e.PageX
                    prevY := e.PageY
                    canvas.Safari()
            ) |> ignore
            JQuery.JQuery.Of(Dom.Document.Current).Mouseup(fun _ e -> 
                match !selected with
                | None -> ()
                | Some elem -> 
                    selected := None
            ) |> ignore
            )


type RaphaelViewer() =
    inherit Web.Control()

    [<JavaScript>]
    override this.Body = SampleInternals.Main() :> IPagelet
