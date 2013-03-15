module Primitives

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Raphael
open IntelliFactory.WebSharper.JQuery
open Microsoft.FSharp.Text.StructuredFormat
open Microsoft.FSharp.Text.StructuredFormat.LayoutOps

type Length = float
type Orient =
    | Vert | Horiz
    override this.ToString() =
        match this with
        | Vert -> "vertical"
        | Horiz -> "horizontal"
type Size =
    | FillParent | WrapContent | Value of Length
    override this.ToString() =
        match this with
        | FillParent -> "fill_parent"
        | WrapContent -> "wrap_content"
        | Value v -> v.ToString() + "px"
type Color = string
let drawColor (c : Color) = c//"#" + System.Convert.ToString c
type Gravity =
    | Top | Bottom | Left | Right
    | CenterVert | FillVert | CenterHoriz | FillHoriz
    | Center | Fill | ClipVert | ClipHoriz
    override this.ToString() =
        match this with
        | Top -> "top"
        | Bottom -> "bottom"
        | Left -> "left"
        | Right -> "right"
        | CenterVert -> "center_vertical"
        | FillVert -> "fill_vertical"
        | CenterHoriz -> "center_horizontal"
        | FillHoriz -> "fill_horizontal"
        | Center -> "center"
        | Fill -> "fill"
        | ClipVert -> "clip_vertical"
        | ClipHoriz -> "clip_horizontal"
        

[<JavaScript>]
let line (raph : Raphael) x1 y1 x2 y2 =
    let path = new Path()
    raph.Path(path.MoveTo(x1, y1).LineTo(x2-x1, y2-y1).ClosePath()) |> ignore
[<JavaScript>]
let drawRect (raph : Raphael) x y w h col =
    raph.Rect(x,y,w,h).Fill(col)

type Primitive =
    abstract member toXML : Layout
    [<JavaScript>]
    abstract member draw : Raphael -> float -> float -> unit

let printXML (prim : Primitive) =
    prim.toXML
    |> Display.layout_to_string FormatOptions.Default

[<JavaScript>]
let sizeToFloat = function
    | Value x -> x
    | _ -> 100.0

type VisiblePrimitive [<JavaScript>] (width : Size, height : Size, marginTop : Length, padding : Length) =
    let mutable width = width
    let mutable height = height
    let mutable marginTop = marginTop
    let mutable padding = padding
    let mutable rect = Unchecked.defaultof<_>
    member this.Width
        with get () = width
        and set v = width <- v
    member this.Height
        with get () = height
        and set v = height <- v
    member this.MarginTop
        with get () = marginTop
        and set v = marginTop <- v
    member this.Padding
        with get () = padding
        and set v = padding <- v
    [<JavaScript>]
    member this.IsInside x y =
        padding <= x && x <= padding + (sizeToFloat width)
            && marginTop <= y && y <= marginTop + (sizeToFloat height)
    [<JavaScript>]
    member this.DrawRect raph x y col =
        rect <- drawRect raph (x+padding) (y+marginTop) (sizeToFloat width) (sizeToFloat height) col
    [<JavaScript>]
    member this.Move dx dy =
        rect.Translate(dx, dy) |> ignore
        padding <- padding + dx
        marginTop <- marginTop + dy

let printTag name (children : Primitive list) (attrs : string list) =
    let hasChildren = List.isEmpty children
    let head = 
        wordL ("<" + name) @@--
            (attrs |> List.map wordL |> aboveListL)
            -- (if hasChildren then wordL ">" else wordL "/>")
    if not hasChildren then head
    else
        head @@--
            (children |> List.map (fun ch -> ch.toXML)
                |> aboveListL)
        @@ wordL ("</" + name + ">")

let map attr value =
    attr + "=\"" + value.ToString() + "\""

type LinearLayout [<JavaScript>] (orient : Orient, width : Size, height : Size, background : Color, children : Primitive list) =
    inherit VisiblePrimitive (width, height, 0.0, 0.0)
    let mutable orient = orient
    let mutable background = background
    let mutable children = children
    member this.Orient
        with get () = orient
        and set v = orient <- v
    member this.Background
        with get () = background
        and set v = background <- v
    member this.Children
        with get () = children
        and set v = children <- v
    interface Primitive with
        member this.toXML =
            printTag "LinearLayout" children
                [
                    map "orientation" orient
                    map "width" width
                    map "height" height
                    "background=\"" + drawColor background + "\""
                ]
            
        member this.draw raph x y =
            children |> List.iter (fun ch -> ch.draw raph x y)

type ImageView [<JavaScript>] (width : Size, height : Size, marginTop : Length, padding : Length, src : Color, gravity : Gravity) =
    inherit VisiblePrimitive (width, height, marginTop, padding)
    let mutable src = src
    let mutable gravity = gravity
    member this.Src
        with get () = src
        and set v = src <- v
    member this.Gravity
        with get () = gravity
        and set v = gravity <- v
    interface Primitive with
        member this.toXML =
            printTag "ImageView" []
                [
                    map "width" width
                    map "height" height
                    map "marginTop" marginTop
                    map "padding" padding
                    "src=\"" + drawColor src + "\""
                    map "gravity" gravity
                ]

        member this.draw raph x y = ()

type TextView [<JavaScript>] (width : Size, height : Size, marginTop : Length, padding : Length, text : string, textSize : Length) =
    inherit VisiblePrimitive (width, height, marginTop, padding)
    let mutable text = text
    let mutable textSize = textSize
    member this.Text
        with get () = text
        and set v = text <- v
    member this.TextSize
        with get () = textSize
        and set v = textSize <- v
    interface Primitive with
        member this.toXML =
            printTag "TextView" []
                [
                    map "width" width
                    map "height" height
                    map "marginTop" marginTop
                    map "padding" padding
                    map "text" text
                    map "textSize" textSize
                ]

        member this.draw raph x y = ()

type Button [<JavaScript>] (id : string, width : Size, height : Size, marginTop : Length, padding : Length, text : string, textSize : Length, onClick : string) =
    inherit VisiblePrimitive (width, height, marginTop, padding)
    
    let mutable id = id
    let mutable text = text
    let mutable textSize = textSize
    let mutable onClick = onClick
    member this.Id
        with get () = id
        and set v = id <- v
    member this.Text
        with get () = text
        and set v = text <- v
    member this.TextSize
        with get () = textSize
        and set v = textSize <- v
    member this.OnClick
        with get () = onClick
        and set v = onClick <- v
    interface Primitive with
        member this.toXML =
            printTag "Button" []
                [
                    map "width" width
                    map "height" height
                    map "marginTop" marginTop
                    map "padding" padding
                    map "text" text
                    map "textSize" textSize
                    map "onClick" onClick
                ]

        [<JavaScript>]
        member this.draw raph x y = this.DrawRect raph x y "#FF0000"

type Transition [<JavaScript>] (from : string, to' : string, button : Button) =
    let mutable from = from
    let mutable to' = to'
    let mutable button = button
    member this.From
        with get() = from
        and set v = from <- v
    member this.To
        with get() = to'
        and set v = to' <- v
    member this.Button
        with get() = button
        and set v = button <- v
    interface Primitive with
        member this.toXML =
            printTag "Transition" [button]
                [
                    map "from" from
                    map "to" to'
                ]
        member this.draw raph x y = (button :> Primitive).draw raph x y

type WebView [<JavaScript>] (id : string, width : Size, height : Size, marginTop : Length, padding : Length) =
    inherit VisiblePrimitive (width, height, marginTop, padding)
    let mutable id = id
    member this.Id
        with get () = id
        and set v = id <- v
    interface Primitive with
        member this.toXML =
            printTag "WebView" []
                [
                    map "id" id
                ]
        member this.draw raph x y = ()
