open System.Xml
open System.Xml.Linq
open System.IO
open System.Collections

System.Console.WriteLine "insert project folder, please"

let path = System.Console.ReadLine()

System.Console.WriteLine "insert project's package, please"

let package = System.Console.ReadLine()

let writeToFile fn (str : string) =
   let conv = System.Text.Encoding.UTF8
   use f = File.CreateText fn
   f.WriteLine(str)

let append (stringBuilder : System.Text.StringBuilder) (str : string) = stringBuilder.Append(str) |> ignore
let insert (stringBuilder : System.Text.StringBuilder) (str : string) = stringBuilder.Insert(0, str) |> ignore

let transformXml (path : string) = 
    let newXml = new System.Text.StringBuilder()

    let reader = XmlReader.Create path
    append newXml "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n" 
    reader.Read() |> ignore
    let mutable currentDepth = 0
    let mutable hasAttr = false
    while reader.Read() do
        let depth = reader.Depth

        if hasAttr then
            if (currentDepth < depth) then
                append newXml " >\n"
            else
                append newXml " />\n"

        currentDepth <- depth

        let tab = "    "

        append newXml <| String.replicate depth tab
        let name = reader.Name
        let amount = reader.AttributeCount

        match amount with
        | 0 -> hasAttr <- false
        | _ -> hasAttr <- true

        if name <> "" then 
            if not hasAttr then 
                append newXml <| "</" + name + ">" + "\n"
            else
                append newXml <| "<" + name + "\n"
        else
            append newXml <| name + "\n"

        for i in 0..amount - 1 do
            append newXml <| String.replicate (depth + 1) tab
            reader.MoveToAttribute i
            let name = reader.Name
            let app pref = append newXml <| pref + "=" + "\"" + reader.Value + "\""
            match name with
            | "xmlns" -> app <| name + ":android"
            | _ -> app <| "android:" + reader.Name

            if i <> amount - 1 then append newXml "\n"

    reader.Close()
    writeToFile path (newXml.ToString())
    
// permissions register
let permissions = new Hashtable()

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
    let imports = new Hashtable()

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
    append activity <| currentImports.ToString()
    append activity <| "\npublic class " + form + " extends Activity {"

    let reader = XmlReader.Create(path + @"\res\layout\" + form + ".xml")
    while reader.Read() do 
        match reader.Name with
        | "Button" ->
            let onClickName = reader.GetAttribute "android:onClick"

            if not (imports.ContainsKey("android.content.Intent")) then 
                insert activity "\nimport android.content.Intent;"
                imports.Add("android.content.Intent", "android.content.Intent")

            append activity <| "\n\n    public void " + onClickName + "(View v) {"

            let readerTrans = XmlReader.Create(path + @"\Transition2.xml")
            let id = reader.GetAttribute "android:id"

            while ((readerTrans.Read()) && not (readerTrans.GetAttribute("id") = id )) do
                ignore()

            let nextForm = readerTrans.GetAttribute "name_to"

            append activity <| "
        Intent intent = new Intent(this, " + nextForm + ".class);
        startActivity(intent);"
            append activity "\n    }"

        | "WebView" ->
            if not (permissions.ContainsKey("Internet")) then 
                append manifest "    <uses-permission android:name=\"android.permission.INTERNET\" />\n"
                permissions.Add("Internet", "Internet")

            if not (imports.ContainsKey("android.webkit.WebView")) then 
                insert activity "\nimport android.webkit.WebView;"
                imports.Add("android.webkit.WebView", "android.webkit.WebView")

            append onCreate <| "\n        WebView webView = (WebView) findViewById(R.id.webViewInfo);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl(\"http://www.lanit-tercom.ru\");" // сайт зашит в код (было необходимо для теста)
        | _ -> ()
    append onCreate "\n    }"
    append activity <| onCreate.ToString()

    append activity "\n}"

    insert activity <| "package com.qrealclouds." + package + ";\n"

    writeToFile (path + @"\src\com\qrealclouds\" + package + "\\" + form + ".java") (activity.ToString())

System.IO.Directory.CreateDirectory(path + @"\src\com\qrealclouds\" + package) |> ignore

let listOffiles = (new DirectoryInfo(path + @"\res\layout")).GetFiles()

let createSource (file : FileInfo) =
    let currentName = file.Name
    transformXml file.FullName
    let length = currentName.Length
    createImplementation(currentName.Substring(0, length - 4))

Array.iter(createSource) listOffiles

append manifest <| "\n    <application android:label=\"@string/app_name\"
        android:theme=\"@android:style/Theme.Light.NoTitleBar\">\n"
append manifest <| activities.ToString()
append manifest <| "\n    </application>
</manifest>"
writeToFile (path + "\AndroidManifest.xml") (manifest.ToString())

let createApk =
    let createBuildXml = "android update project --target 1 -p " + path
    System.Threading.Thread.Sleep(1000);
    let pathToAndroidSdk = @"D:\android-sdk\sdk\tools\" //для работы на другом компе нужно заменть путь до android sdk
    System.Diagnostics.Process.Start("cmd.exe", "/C " + pathToAndroidSdk + createBuildXml) |> ignore
    System.Threading.Thread.Sleep(1000);
    System.Diagnostics.Process.Start("cmd.exe", "/C " + "cd /d " + path + " & ant debug") |> ignore

createApk

