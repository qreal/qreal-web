open System.Xml
open System.Xml.Linq
open System.IO
open System.Collections.Generic

let path, package =
    let args = System.Environment.GetCommandLineArgs()
    if args.Length <> 3 then
        failwith "Specify project folder and package as command line arguments"
    args.[1], args.[2]

let writeToFile fn (str : string) =
   let conv = System.Text.Encoding.UTF8
   use f = File.CreateText fn
   f.WriteLine str

let append (stringBuilder : System.Text.StringBuilder) (str : string) = stringBuilder.Append str |> ignore
let insert (stringBuilder : System.Text.StringBuilder) (str : string) = stringBuilder.Insert(0, str) |> ignore

let transformXml = 
    System.IO.Directory.CreateDirectory(path + @"\res\layout") |> ignore
    let newXml = new System.Text.StringBuilder()
    let reader = XmlReader.Create(path + @"\forms.xml")
    let appendXml = append newXml
    let mutable currentDepth = 0
    let mutable hasAttr = false
    let mutable fileName = ""
    try
        while reader.Read() do
            let name = reader.Name
            match name with
            | "form" ->
                if reader.NodeType = XmlNodeType.EndElement then
                    writeToFile (path + @"\res\layout\" + fileName + ".xml") <| newXml.ToString()
                    newXml.Clear() |> ignore
                else
                    fileName <- reader.GetAttribute("form_name")
                    appendXml "<?xml version=\"1.0\" encoding=\"utf-8\"?>" 
            |  "" | "xml" | "forms" -> ()
            | _ -> 
                let depth = reader.Depth

                if hasAttr then
                    if currentDepth < depth then " >\n"
                    elif (reader.NodeType = XmlNodeType.EndElement) && (currentDepth = depth) then " >\n"
                    else " />\n"
                    |> appendXml

                currentDepth <- depth

                let tab = "    "

                appendXml <| String.replicate (depth - 2) tab
                let amount = reader.AttributeCount

                match amount with
                | 0 -> hasAttr <- false
                | _ -> hasAttr <- true

                appendXml "\n"

                appendXml <|
                if not hasAttr then "</" + name + ">" + "\n"
                else "<" + name + "\n"

                for i in 0..amount - 1 do
                    appendXml <| String.replicate (depth - 1) tab
                    reader.MoveToAttribute i

                    match reader.Name with
                    | "xmlns" -> reader.Name + ":android"
                    | _ -> "android:" + reader.Name
                    |> fun pref -> appendXml <| pref + "=" + "\"" + reader.Value + "\""

                    if i <> amount - 1 then appendXml "\n"
        with | :? System.Xml.XmlException as e ->
            failwithf "Error while parsing %s: %s" path e.Message

    reader.Close()

let transitions = 
    let transitions = new Dictionary<_,_>()
    if System.IO.File.Exists(path + @"\Transition.xml") then 
        let readerTrans = XmlReader.Create(path + @"\Transition.xml")
        while readerTrans.Read() do 
            match readerTrans.Name with
            | "Button" | "WebView" ->
                let attributes =
                    readerTrans.GetAttribute("name_to")
                    , readerTrans.GetAttribute("name_from")
                    , readerTrans.GetAttribute("action")
                transitions.Add (readerTrans.GetAttribute("id"), attributes)
            | _ -> ()
    transitions

// permissions register
let permissions = new Dictionary<_,_>()

let activities = new System.Text.StringBuilder()

let manifest = new System.Text.StringBuilder()
append manifest <| "<?xml version=\"1.0\" encoding=\"utf-8\"?>
<manifest xmlns:android=\"http://schemas.android.com/apk/res/android\"
    package=\"com.qrealclouds." + package + "\"
    android:versionCode=\"1\"
    android:versionName=\"1.0\">

    <uses-sdk android:minSdkVersion=\"8\"/>\n"

let createImplementation form =
    if form = "main" then
        append activities <| "        <activity android:name=\".main\"
            android:label=\"@string/app_name\">
            <intent-filter>
                <action android:name=\"android.intent.action.MAIN\"/>
                <category android:name=\"android.intent.category.LAUNCHER\"/>
            </intent-filter>
        </activity>"
    else
        append activities <| "\n        <activity android:name=\"." + form + "\"></activity>"

    // imports register
    let imports = new Dictionary<_,_>()

    let currentImports = new System.Text.StringBuilder()
    append currentImports <| "\nimport android.app.Activity;
import android.os.Bundle;
import android.view.View;\n"

    let onCreate = new System.Text.StringBuilder()
    append onCreate <| "\n\n    /**
    * Called when the activity is first created.
    */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout." + form + ");"
            
    let activity = System.Text.StringBuilder()
    let appendAct = append activity
    let insertAct = insert activity
    appendAct <| currentImports.ToString()
    appendAct <| "\npublic class " + form + " extends Activity {"

    let reader = XmlReader.Create(path + @"\res\layout\" + form + ".xml")
    try
        while reader.Read() do 
            match reader.Name with
            | "Button" ->
                let onClickName = reader.GetAttribute "android:onClick"
                let id = reader.GetAttribute "android:id"
                appendAct <| "\n\n    public void " + onClickName + "(View v) {"

                if transitions.ContainsKey id then
                    if not <| imports.ContainsKey "android.content.Intent" then
                        insertAct "\nimport android.content.Intent;"
                        imports.Add ("android.content.Intent", "android.content.Intent")

                    let nextForm,_,_ = transitions.[id]

                    appendAct <| "
                Intent intent = new Intent(this, " + nextForm + ".class);
                startActivity(intent);"

                appendAct "\n    }"

            | "WebView" ->
                if not <| permissions.ContainsKey "Internet" then
                    append manifest "    <uses-permission android:name=\"android.permission.INTERNET\" />\n"
                    permissions.Add ("Internet", "Internet")

                if not <| imports.ContainsKey "android.webkit.WebView" then
                    insertAct "\nimport android.webkit.WebView;"
                    imports.Add ("android.webkit.WebView", "android.webkit.WebView")

                append onCreate <| "\n        WebView webView = (WebView) findViewById(R.id.webViewInfo);
            webView.getSettings().setJavaScriptEnabled(true);
            webView.loadUrl(\"http://www.lanit-tercom.ru\");" // сайт зашит в код (было необходимо для теста)
            | _ -> ()
    with | :? System.Xml.XmlException as e ->
        failwithf "Error while parsing %s: %s" form e.Message
    append onCreate "\n    }"
    appendAct <| onCreate.ToString()

    appendAct "\n}"

    insertAct <| "package com.qrealclouds." + package + ";\n"

    activity.ToString()
    |> writeToFile (path + @"\src\com\qrealclouds\" + package + "\\" + form + ".java")

System.IO.Directory.CreateDirectory(path + @"\src\com\qrealclouds\" + package) |> ignore

transformXml

for file in (new DirectoryInfo(path + @"\res\layout")).GetFiles() do
    let currentName = file.Name
    let length = currentName.Length
    createImplementation <| currentName.Substring(0, length - 4)

append manifest <| "\n    <application android:label=\"@string/app_name\"
        android:theme=\"@android:style/Theme.Light.NoTitleBar\">\n"
append manifest <| activities.ToString()
append manifest <| "\n    </application>
</manifest>"
writeToFile (path + "\AndroidManifest.xml") <| manifest.ToString()

let createApk () =
    let start exe name =
        let proc = new System.Diagnostics.Process()
        let startInfo = proc.StartInfo
        startInfo.FileName <- "cmd.exe"
        startInfo.Arguments <- "/C " + exe
        startInfo.UseShellExecute <- false
        //startInfo.CreateNoWindow <- true
        startInfo.RedirectStandardInput <- true
        startInfo.RedirectStandardOutput <- true
        startInfo.RedirectStandardError <- true
        proc.Start() |> ignore
        let so = proc.StandardOutput
        proc.WaitForExit()
        printfn "%s" <| so.ReadToEnd()
        match proc.ExitCode with
        | 0 -> ()
        | x -> failwithf "%s exited with code %d" name x

    System.Threading.Thread.Sleep 1000
    // Путь до android должен быть прописан в перменную среды PATH
    let createBuildXml = "android update project --target 1 -p " + path
    start createBuildXml "android"
    System.Threading.Thread.Sleep 3000
    start ("cd /d " + path + " & ant debug") "cd..ant"

createApk ()