open System.IO
open System.Xml
open System.Text
open System.Collections
open System.Net

let path =
    let args = System.Environment.GetCommandLineArgs()
    if args.Length <> 2 then
        printfn "Specify project folder as command line arguments"
        exit 1
    args.[1]

let writeToFile fn (str : string) =
   use f = File.CreateText fn
   f.WriteLine str

let append (stringBuilder : StringBuilder) (str : string) = stringBuilder.Append str |> ignore
let insert (stringBuilder : StringBuilder) (str : string) = stringBuilder.Insert(0, str) |> ignore

let download (fileLocation:string) (url:string) = 
    let webClient = new WebClient()
    webClient.DownloadFile(url, fileLocation)

let mutable projectName = "Default"

let csprojItems = new StringBuilder()
let csprojPages = new StringBuilder()
let resourcesBuilder = new StringBuilder()
let referencesBuilder = new StringBuilder()
let resources = new Hashtable()
let references = new Hashtable()

exception NotFoundAttributeException of string

let parseXml = 
    let newXaml = new StringBuilder()
    let newCs = new StringBuilder()
    let constructorCs = new StringBuilder()
    let additions = new StringBuilder()
    let reader = XmlReader.Create(path + @"\forms.xml")
    let appendXaml = append newXaml
    let appendCs = append newCs
    let appendConstructor = append constructorCs
    let appendAdditions = append additions
    let mutable hasAttr = false
    let mutable fileName = ""
    let mutable imageCounter = 1
    let tab = "    "
    let actions  = new Hashtable()
    let actionsAdditions = new Hashtable()
    let triggers = new Hashtable()
    let triggersAdditions = new Hashtable()
    let usingsBuilder = new StringBuilder()
    let xmlnsBuilder = new StringBuilder()
    let usings = new Hashtable()
    let xmlns = new Hashtable()
    let currentBuilder = new StringBuilder()
    let currentAdditionsBuilder = new StringBuilder()
    let builderAppend = append currentBuilder
    let tempStack = new Stack()
    let getNumber (sizeAttr : string) = 
        let number = System.Convert.ToDouble(sizeAttr.Substring(0, sizeAttr.Length - 2))
        string (System.Math.Round(number * 1.5))
    let getAttr (nodeName : string) (attrName : string) =
        let value = reader.GetAttribute(attrName)
        if value = null then raise ( NotFoundAttributeException ("A node \"" + nodeName + "\" doesn't have an attribute " + "\"" + attrName + "\""))
        else value
    let tryGetAttribute (nodeName : string) (attrName : string) =
        try getAttr nodeName attrName
        with
        | NotFoundAttributeException(str) -> 
            printfn "%s" str
            exit 2
    try
        while reader.Read() do
            let name = reader.Name
            let depth = reader.Depth
            let depthTab = if depth > 0 then String.replicate (reader.Depth - 1) tab else ""
            match name with
            | "application" when reader.NodeType <> XmlNodeType.EndElement -> 
                projectName <- tryGetAttribute name "name"
            | "action" when reader.NodeType <> XmlNodeType.EndElement ->
                tempStack.Push(tryGetAttribute name "control-id")
            | "action" when reader.NodeType = XmlNodeType.EndElement ->
                // ключ - id контрола, значение - код, который нужно выполнить
                let id = tempStack.Pop() :?> string
                actions.Add(id, currentBuilder.ToString())
                actionsAdditions.Add(id, currentAdditionsBuilder.ToString())
                currentBuilder.Clear() |> ignore
                currentAdditionsBuilder.Clear() |> ignore
            | "trigger" when reader.NodeType <> XmlNodeType.EndElement ->
                tempStack.Push(tryGetAttribute name "event")
                tempStack.Push(tryGetAttribute name "form-id")
            | "trigger" when reader.NodeType = XmlNodeType.EndElement ->
                // ключ - пара, в которой 1 элемент - имя формы, 2 элемент - событие, занчение - код, который нужно выполнить
                let formName = tempStack.Pop() :?> string
                let event = tempStack.Pop() :?> string;
                triggers.Add((formName, event), currentBuilder.ToString())
                triggersAdditions.Add((formName, event), currentAdditionsBuilder.ToString())
                currentBuilder.Clear() |> ignore
                currentAdditionsBuilder.Clear() |> ignore
            | "if" when reader.NodeType <> XmlNodeType.EndElement -> builderAppend <| "\nif (" + (tryGetAttribute name "condition") + ")"
            | "then" when reader.NodeType <> XmlNodeType.EndElement -> builderAppend <| "\n{"
            | "then" when reader.NodeType = XmlNodeType.EndElement -> builderAppend <| "\n}"
            | "else" when reader.NodeType <> XmlNodeType.EndElement -> builderAppend <| "\nelse\n{"
            | "else" when reader.NodeType = XmlNodeType.EndElement -> builderAppend <| "\n}"
            | "transition" -> builderAppend <| "\nDispatcher.BeginInvoke(new Action( () => NavigationService.Navigate(new Uri(\"/" + (tryGetAttribute name "form-id") + ".xaml\", UriKind.Relative))));"
            | "login-request" -> 
                builderAppend <| ("\nHttpWebRequest loginRequest = (HttpWebRequest)HttpWebRequest.Create(\"" + (tryGetAttribute name "url") + "\");
loginRequest.Method = \"POST\";
loginRequest.ContentType = \"application/x-www-form-urlencoded\";
login = " + tryGetAttribute name "login-id" + ".Text;
password = " + tryGetAttribute name "password-id" + ".Text;
loginRequest.BeginGetRequestStream(new AsyncCallback(LoginRequestStreamCallback), loginRequest);")
                append currentAdditionsBuilder <| "\nprivate string login = \"\";
private string password = \"\";
private void LoginRequestStreamCallback(IAsyncResult callbackResult)
{
    HttpWebRequest loginRequest = (HttpWebRequest)callbackResult.AsyncState;
    Stream postStream = loginRequest.EndGetRequestStream(callbackResult);

    string postData = \"login?login=\" + login + \"&password=\" + password;
    byte[] byteArray = Encoding.UTF8.GetBytes(postData);

    postStream.Write(byteArray, 0, byteArray.Length);
    postStream.Close();
 
    loginRequest.BeginGetResponse(new AsyncCallback(LoginResponsetStreamCallback), loginRequest);
}"

            | "save-session" -> 
                append currentAdditionsBuilder <| "\nprivate string sessionId;"
                builderAppend <| "\nint semicolonPos = result.IndexOf(';');
sessionId = result.Substring(semicolonPos + 1, result.Length - semicolonPos - 1);"
            | "patients-request" -> 
                builderAppend <| "\nHttpWebRequest patientsRequest = (HttpWebRequest)HttpWebRequest.Create(\"" + (tryGetAttribute name "url") + "\");
patientsRequest.Method = \"POST\";
patientsRequest.ContentType = \"application/x-www-form-urlencoded\";
patientsRequest.BeginGetRequestStream(new AsyncCallback(PatientsRequestStreamCallback), patientsRequest);"
                append currentAdditionsBuilder <| "\nprivate void PatientsRequestStreamCallback(IAsyncResult callbackResult)
{
    HttpWebRequest patientsRequest = (HttpWebRequest)callbackResult.AsyncState;
    Stream postStream = patientsRequest.EndGetRequestStream(callbackResult);

    string postData = \"coordinates\";
    byte[] byteArray = Encoding.UTF8.GetBytes(postData);

    postStream.Write(byteArray, 0, byteArray.Length);
    postStream.Close();
 
    patientsRequest.BeginGetResponse(new AsyncCallback(PatientsResponsetStreamCallback), patientsRequest);
}"
            // разбор строки patients и выставление пациентов на карте
            | "showmap" ->
                builderAppend <| "\nint count = 0;
int length = patients.Length;
StringBuilder latitude = new StringBuilder();
StringBuilder longitude = new StringBuilder();
StringBuilder comment = new StringBuilder();
for (int i = 0; i < length; i++)
{
    if (patients[i] == ';')
    {
        count++;
    }
    else
    {
        switch (count)
        {
            case 0:
                latitude.Append(patients[i]);
                break;
            case 1:
                longitude.Append(patients[i]);
                break;
            case 2:
                comment.Append(patients[i]);
                break;
        }
    }
    if (count == 3 || i == length - 1)
    {
        createPushpin(latitude.ToString(), longitude.ToString(), comment.ToString());
        latitude.Clear();
        longitude.Clear();
        comment.Clear();
        count = 0;
    }
}"
            | "form" ->
                if reader.NodeType = XmlNodeType.EndElement then
                    insert newCs <| "using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.IO;
using System.Text;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;" + usingsBuilder.ToString()
                    insert newXaml <| ("<phone:PhoneApplicationPage 
    x:Class=\"" + projectName + "." + fileName + "\"
    xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"
    xmlns:x=\"http://schemas.microsoft.com/winfx/2006/xaml\"
    xmlns:phone=\"clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone\"
    xmlns:shell=\"clr-namespace:Microsoft.Phone.Shell;assembly=Microsoft.Phone\"
    xmlns:d=\"http://schemas.microsoft.com/expression/blend/2008\"
    xmlns:mc=\"http://schemas.openxmlformats.org/markup-compatibility/2006\"" + xmlnsBuilder.ToString() + "
    mc:Ignorable=\"d\" d:DesignWidth=\"480\" d:DesignHeight=\"768\"
    FontFamily=\"{StaticResource PhoneFontFamilyNormal}\"
    FontSize=\"{StaticResource PhoneFontSizeNormal}\"
    Foreground=\"{StaticResource PhoneForegroundBrush}\"
    SupportedOrientations=\"Portrait\" Orientation=\"Portrait\"
    shell:SystemTray.IsVisible=\"True\">\n")
                    appendXaml <| "\n</phone:PhoneApplicationPage>"
                    writeToFile (path + "\\" + fileName + ".xaml") <| newXaml.ToString()
                    newXaml.Clear() |> ignore
                    appendConstructor <| "\n}"
                    appendCs <| constructorCs.ToString()
                    constructorCs.Clear() |> ignore
                    appendCs <| additions.ToString()
                    additions.Clear() |> ignore
                    appendCs <| "\n}\n}"
                    writeToFile (path + "\\" + fileName + ".xaml.cs") <| newCs.ToString()
                    newCs.Clear() |> ignore
                else
                    fileName <- tryGetAttribute name "form_name"

                    append csprojItems <| "\n     <Compile Include=\"" + fileName + ".xaml.cs\">
      <DependentUpon>" + fileName + ".xaml</DependentUpon>
    </Compile>"

                    append csprojPages <| "\n     <Page Include=\"" + fileName + ".xaml\">
      <SubType>Designer</SubType>
      <Generator>MSBuild:Compile</Generator>
    </Page>"

                    appendCs <| "\nnamespace " + projectName + "
{
public partial class " + fileName + ": PhoneApplicationPage
{\n"
            
                    appendConstructor <| "public " + fileName + "()\n{\nInitializeComponent();"

                    if triggers.Contains((fileName, "onTimer")) then
                        if triggersAdditions.Contains((fileName, "onTimer")) then
                            appendAdditions <| (triggersAdditions.Item((fileName, "onTimer")) :?> string)
                        appendConstructor <| "\nSystem.Windows.Threading.DispatcherTimer timer = new System.Windows.Threading.DispatcherTimer();
timer.Interval = new TimeSpan(0, 0, 0, 0, 2000);
timer.Tick += new EventHandler(timerTick);
timer.Start();"
                        appendAdditions <| "\nprivate void timerTick(object sender, EventArgs e)\n{" + (triggers.Item((fileName, "onTimer")) :?> string) + "\n}"
                    
                    if triggers.Contains((fileName, "onLoginResponse")) then
                        if triggersAdditions.Contains((fileName, "onLoginResponse")) then
                            appendAdditions <| (triggersAdditions.Item((fileName, "onLoginResponse")) :?> string)
                        appendAdditions <| "\nprivate void LoginResponsetStreamCallback(IAsyncResult callbackResult)
{
HttpWebRequest request = (HttpWebRequest)callbackResult.AsyncState;
HttpWebResponse response = (HttpWebResponse)request.EndGetResponse(callbackResult);
string result = \"\";
using (StreamReader httpWebStreamReader = new StreamReader(response.GetResponseStream()))
{
result = httpWebStreamReader.ReadToEnd();
}

bool loginSuccess = false;
bool loginFailed = true;
if (!result.Equals(\"fail\"))
{
loginSuccess = true;
loginFailed = false;\n}" + (triggers.Item((fileName, "onLoginResponse")) :?> string) + "\n}"

                    if triggers.Contains((fileName, "onPatientsResponse")) then
                        if triggersAdditions.Contains((fileName, "onPatientsResponse")) then
                            appendAdditions <| (triggersAdditions.Item((fileName, "onPatientsResponse")) :?> string)
                        appendAdditions <| "\nprivate string patients;"
                        appendAdditions <| "\nprivate void PatientsResponsetStreamCallback(IAsyncResult callbackResult)
{
HttpWebRequest request = (HttpWebRequest)callbackResult.AsyncState;
HttpWebResponse response = (HttpWebResponse)request.EndGetResponse(callbackResult);
using (StreamReader httpWebStreamReader = new StreamReader(response.GetResponseStream()))
{
patients = httpWebStreamReader.ReadToEnd();\n}" + (triggers.Item((fileName, "onPatientsResponse")) :?> string) + "\n}"

                    if triggers.Contains((fileName, "onShow")) then
                        if triggersAdditions.Contains((fileName, "onShow")) then
                            appendAdditions <| (triggersAdditions.Item((fileName, "onShow")) :?> string)
                        appendConstructor <| (triggers.Item((fileName, "onShow")) :?> string)

            | "LinearLayout" when reader.NodeType <> XmlNodeType.EndElement -> 
                appendXaml <| "\n" + depthTab + "<StackPanel Margin=\"5,5,5,0\">"
            | "LinearLayout" when reader.NodeType = XmlNodeType.EndElement -> 
                appendXaml <| "\n" + depthTab + "</StackPanel>"
            | "TextView" -> 
                let textSize = getNumber(tryGetAttribute name "textSize")
                appendXaml <| "\n" + depthTab + "<TextBlock Text=\"" + (tryGetAttribute name "text") + "\" HorizontalAlignment=\"Center\" FontSize=\"" + textSize + "\"/>"
            | "EditText" ->
                appendXaml <| "\n" + depthTab + "<TextBox x:Name=\"" + (tryGetAttribute name "id") + "\" IsReadOnly=\"False\" MinWidth=\"350\" HorizontalAlignment=\"Center\"  FontSize=\"30\" />"
            | "Button" -> 
                let name = tryGetAttribute name "id"
                let textSize = getNumber(tryGetAttribute name "textSize")
                if actions.ContainsKey(name) then
                    let click = name + "Click"
                    appendXaml <| "\n" + depthTab + "<Button Name=\"" + name + "\" HorizontalAlignment=\"Center\" Click=\"" + click + "\" FontSize=\"" + textSize + "\" Content=\"" + (tryGetAttribute name "text") + "\"> </Button>"
                    appendAdditions <| "\nprivate void " + click + "(object sender, RoutedEventArgs e)\n{"
                    appendAdditions <| (actions.Item(name) :?> string)
                    appendAdditions <| "\n}"
                    if actionsAdditions.ContainsKey(name) then
                        appendAdditions <| (actionsAdditions.Item(name) :?> string)
                else 
                    appendXaml <| "\n" + depthTab + "<Button Name=\"" + name + "\" HorizontalAlignment=\"Center\" FontSize=\"" + textSize + "\" Content=\"" + (tryGetAttribute name "text") + "\"> </Button>"
            | "ImageView" -> 
                let url = tryGetAttribute name "src"
                let fileName = "image" + string imageCounter + url.Substring(url.Length - 4, 4)
                let fullFileName = path + "\\" + fileName
                download fullFileName url
                appendXaml <| "\n" + depthTab + "<Image Source=\"" + fileName + "\" />"
                imageCounter <- imageCounter + 1
                if not (resources.ContainsKey(fileName)) then
                    append resourcesBuilder <| "\n<Resource Include=\"" + fileName + "\" />"
                    resources.Add(fileName, referencesBuilder.ToString()) 
            | "WebView" -> 
                let name = tryGetAttribute name "id"
                appendXaml <| "\n" + depthTab + "<phone:WebBrowser x:Name=\"" + name + "\" IsScriptEnabled=\"True\" Height=\"763\" Width=\"475\" />"
                appendConstructor <| "\n" + name + ".Navigate(new Uri(\"" + (tryGetAttribute name "url") + "\", UriKind.RelativeOrAbsolute));"
            | "Map" ->
                if not (references.ContainsKey("mapsReferences")) then
                    append referencesBuilder <| "\n<Reference Include=\"Microsoft.Phone.Controls.Maps, Version=7.0.0.0, Culture=neutral, PublicKeyToken=24eec0d8c86cda1e, processorArchitecture=MSIL\" />
<Reference Include=\"System.Device\" />
<Reference Include=\"System.Servicemodel\" />"
                    references.Add("mapsReferences", referencesBuilder.ToString())
                if not (xmlns.ContainsKey("mapsXmlns")) then
                    append xmlnsBuilder <| "\nxmlns:maps=\"clr-namespace:Microsoft.Phone.Controls.Maps;assembly=Microsoft.Phone.Controls.Maps\""
                    xmlns.Add("mapsXmlns", xmlnsBuilder.ToString())
                if not (usings.ContainsKey("mapsUsings")) then
                    append usingsBuilder <| "\nusing Microsoft.Phone.Controls.Maps;
using System.Device.Location;"
                    usings.Add("mapsUsings", usingsBuilder.ToString())
                let name = tryGetAttribute name "id"
                appendXaml <| "\n" + depthTab + "<maps:Map Name=\"" + name + "\" HorizontalAlignment=\"Stretch\" VerticalAlignment=\"Stretch\"
            ScaleVisibility=\"Visible\"
            Height=\"768\"
            ZoomBarVisibility=\"Visible\"
            CopyrightVisibility=\"Collapsed\"
            CredentialsProvider=\"Al8CCFBXNKVlW0cm4lfHbXmzMmuiHr96NmftGF25_hI0hxtaVLeQ7KvIeHacrDBh\" >
        </maps:Map>"
                appendConstructor <| "\nPushpinLayer = new MapLayer();\n" + name + ".Children.Add(PushpinLayer);\n" + name + ".SetView(new GeoCoordinate(55.698099, 37.392397), 12);
PairComparer pairComparer = new PairComparer();
pushpins = new Dictionary<Pair, string>(pairComparer);"
                appendAdditions <| "\nprivate void createPushpin(string latitude, string longitude, string comment)
{
    double x = Convert.ToDouble(latitude);
    double y = Convert.ToDouble(longitude);
    Pair currentPair = new Pair(x, y);

    if (!pushpins.ContainsKey(currentPair))
    {
        Dispatcher.BeginInvoke( () =>
        {
            pushpins.Add(currentPair, comment);
            Pushpin pushpin = new Pushpin();
            pushpin.Background = new SolidColorBrush(Colors.Red);
            pushpin.Tap += new EventHandler<GestureEventArgs>(pushPin_Tap);
            pushpin.Location = new GeoCoordinate(x, y);
            Border border = new Border();
            border.Visibility = System.Windows.Visibility.Collapsed;
            border.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
            pushpin.Content = border;
            TextBlock text = new TextBlock();
            text.Text = comment;
            border.Child = text;
            PushpinLayer.AddChild(pushpin, pushpin.Location);
        });
    }
}

private void pushPin_Tap(object sender, System.Windows.Input.GestureEventArgs e)
{
    if (((Border)(((Pushpin)sender).Content)).Visibility == System.Windows.Visibility.Collapsed)
    {
        ((Border)(((Pushpin)sender).Content)).Visibility = System.Windows.Visibility.Visible;
    }
    else
    {
        ((Border)(((Pushpin)sender).Content)).Visibility = System.Windows.Visibility.Collapsed;
    }

    e.Handled = true;
}

private class Pair
{
    public Pair(double first, double second)
    {
        this.First = first;
        this.Second = second;
    }

    public double First { get; set; }
    public double Second { get; set; }
};

private class PairComparer : IEqualityComparer<Pair>
{

    public bool Equals(Pair x, Pair y)
    {
        return (x.First == y.First) && (x.Second == y.Second);
    }

    public int GetHashCode(Pair obj)
    {
        return obj.First.GetHashCode() + obj.Second.GetHashCode();
    }
};

private MapLayer PushpinLayer;
private Dictionary<Pair, string> pushpins;"
            | _ -> ()

        with | :? XmlException as e ->
            printfn "Error while parsing %s: %s" path e.Message
            exit 3

    reader.Close()

parseXml
// стандратные картинки
File.Copy("SplashScreenImage.jpg", path + "\SplashScreenImage.jpg", true)
File.Copy("ApplicationIcon.png", path + "\ApplicationIcon.png", true)
File.Copy("Background.png", path + "\Background.png", true)

let App = "<Application 
    x:Class=\"" + projectName + ".App\"
    xmlns=\"http://schemas.microsoft.com/winfx/2006/xaml/presentation\"       
    xmlns:x=\"http://schemas.microsoft.com/winfx/2006/xaml\"
    xmlns:phone=\"clr-namespace:Microsoft.Phone.Controls;assembly=Microsoft.Phone\"
    xmlns:shell=\"clr-namespace:Microsoft.Phone.Shell;assembly=Microsoft.Phone\">

    <!--Ресурсы приложения-->
    <Application.Resources>
    </Application.Resources>

    <Application.ApplicationLifetimeObjects>
        <!--Обязательный объект, обрабатывающий события времени жизни приложения-->
        <shell:PhoneApplicationService 
            Launching=\"Application_Launching\" Closing=\"Application_Closing\" 
            Activated=\"Application_Activated\" Deactivated=\"Application_Deactivated\"/>
    </Application.ApplicationLifetimeObjects>

</Application>"

writeToFile (path + "\App.xaml") App

let Appcs = "using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;

namespace " + projectName + "
{
    public partial class App : Application
    {
        public PhoneApplicationFrame RootFrame { get; private set; }

        public App()
        {
            UnhandledException += Application_UnhandledException;

            InitializeComponent();

            InitializePhoneApplication();

            if (System.Diagnostics.Debugger.IsAttached)
            {
                Application.Current.Host.Settings.EnableFrameRateCounter = true;
                PhoneApplicationService.Current.UserIdleDetectionMode = IdleDetectionMode.Disabled;
            }

        }

        private void Application_Launching(object sender, LaunchingEventArgs e)
        {
        }

        private void Application_Activated(object sender, ActivatedEventArgs e)
        {
        }

        private void Application_Deactivated(object sender, DeactivatedEventArgs e)
        {
        }

        private void Application_Closing(object sender, ClosingEventArgs e)
        {
        }

        private void RootFrame_NavigationFailed(object sender, NavigationFailedEventArgs e)
        {
            if (System.Diagnostics.Debugger.IsAttached)
            {
                System.Diagnostics.Debugger.Break();
            }
        }

        private void Application_UnhandledException(object sender, ApplicationUnhandledExceptionEventArgs e)
        {
            if (System.Diagnostics.Debugger.IsAttached)
            {
                System.Diagnostics.Debugger.Break();
            }
        }

        #region Initialize App

        private bool phoneApplicationInitialized = false;

        private void InitializePhoneApplication()
        {
            if (phoneApplicationInitialized)
                return;

            RootFrame = new PhoneApplicationFrame();
            RootFrame.Navigated += CompleteInitializePhoneApplication;

            RootFrame.NavigationFailed += RootFrame_NavigationFailed;

            phoneApplicationInitialized = true;
        }

        private void CompleteInitializePhoneApplication(object sender, NavigationEventArgs e)
        {
            if (RootVisual != RootFrame)
                RootVisual = RootFrame;

            RootFrame.Navigated -= CompleteInitializePhoneApplication;
        }

        #endregion
    }
}"

writeToFile (path + "\App.xaml.cs") Appcs

let csprojFile = "<?xml version=\"1.0\" encoding=\"utf-8\"?>
<Project ToolsVersion=\"4.0\" DefaultTargets=\"Build\" xmlns=\"http://schemas.microsoft.com/developer/msbuild/2003\">
  <PropertyGroup>
    <Configuration Condition=\" '$(Configuration)' == '' \">Debug</Configuration>
    <Platform Condition=\" '$(Platform)' == '' \">AnyCPU</Platform>
    <ProductVersion>10.0.20506</ProductVersion>
    <SchemaVersion>2.0</SchemaVersion>
    <ProjectGuid>{00000000-0000-0000-0000-000000000000}</ProjectGuid>
    <ProjectTypeGuids>{C089C8C0-30E0-4E22-80C0-CE093F111A43};{fae04ec0-301f-11d3-bf4b-00c04f79efbc}</ProjectTypeGuids>
    <OutputType>Library</OutputType>
    <AppDesignerFolder>Properties</AppDesignerFolder>
    <RootNamespace>" + projectName + "</RootNamespace>
    <AssemblyName>" + projectName + "</AssemblyName>
    <TargetFrameworkVersion>v4.0</TargetFrameworkVersion>
    <SilverlightVersion>$(TargetFrameworkVersion)</SilverlightVersion>
    <TargetFrameworkProfile>WindowsPhone71</TargetFrameworkProfile>
    <TargetFrameworkIdentifier>Silverlight</TargetFrameworkIdentifier>
    <SilverlightApplication>true</SilverlightApplication>
    <SupportedCultures>
    </SupportedCultures>
    <XapOutputs>true</XapOutputs>
    <GenerateSilverlightManifest>true</GenerateSilverlightManifest>
    <XapFilename>" + projectName + ".xap</XapFilename>
    <SilverlightManifestTemplate>Properties\AppManifest.xml</SilverlightManifestTemplate>
    <SilverlightAppEntry>" + projectName + ".App</SilverlightAppEntry>
    <ValidateXaml>true</ValidateXaml>
    <ThrowErrorsInValidation>true</ThrowErrorsInValidation>
  </PropertyGroup>
  <PropertyGroup Condition=\" '$(Configuration)|$(Platform)' == 'Debug|AnyCPU' \">
    <DebugSymbols>true</DebugSymbols>
    <DebugType>full</DebugType>
    <Optimize>false</Optimize>
    <OutputPath>Bin\Debug</OutputPath>
    <DefineConstants>DEBUG;TRACE;SILVERLIGHT;WINDOWS_PHONE</DefineConstants>
    <NoStdLib>true</NoStdLib>
    <NoConfig>true</NoConfig>
    <ErrorReport>prompt</ErrorReport>
    <WarningLevel>4</WarningLevel>
  </PropertyGroup>
  <PropertyGroup Condition=\" '$(Configuration)|$(Platform)' == 'Release|AnyCPU' \">
    <DebugType>pdbonly</DebugType>
    <Optimize>true</Optimize>
    <OutputPath>Bin\Release</OutputPath>
    <DefineConstants>TRACE;SILVERLIGHT;WINDOWS_PHONE</DefineConstants>
    <NoStdLib>true</NoStdLib>
    <NoConfig>true</NoConfig>
    <ErrorReport>prompt</ErrorReport>
    <WarningLevel>4</WarningLevel>
  </PropertyGroup>
  <ItemGroup>" + referencesBuilder.ToString() + "
    <Reference Include=\"Microsoft.Phone\" />
    <Reference Include=\"Microsoft.Phone.Interop\" />
    <Reference Include=\"System.Windows\" />
    <Reference Include=\"system\" />
    <Reference Include=\"System.Core\" />
    <Reference Include=\"System.Net\" />
    <Reference Include=\"System.Xml\" />
    <Reference Include=\"mscorlib.extensions\" />
  </ItemGroup>
  <ItemGroup>
    <Compile Include=\"App.xaml.cs\">
      <DependentUpon>App.xaml</DependentUpon>
    </Compile>" + csprojItems.ToString() + "
    <Compile Include=\"Properties\AssemblyInfo.cs\" />
  </ItemGroup>
  <ItemGroup>
    <ApplicationDefinition Include=\"App.xaml\">
      <SubType>Designer</SubType>
      <Generator>MSBuild:Compile</Generator>
    </ApplicationDefinition>" + csprojPages.ToString() + "
  </ItemGroup>
  <ItemGroup>
    <None Include=\"Properties\AppManifest.xml\" />
    <None Include=\"Properties\WMAppManifest.xml\" />
  </ItemGroup>
  <ItemGroup>
    <Content Include=\"ApplicationIcon.png\">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </Content>
    <Content Include=\"Background.png\">
      <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </Content>" + resourcesBuilder.ToString() + "
    <Content Include=\"SplashScreenImage.jpg\" />
  </ItemGroup>
  <Import Project=\"$(MSBuildExtensionsPath)\Microsoft\Silverlight for Phone\$(TargetFrameworkVersion)\Microsoft.Silverlight.$(TargetFrameworkProfile).Overrides.targets\" />
  <Import Project=\"$(MSBuildExtensionsPath)\Microsoft\Silverlight for Phone\$(TargetFrameworkVersion)\Microsoft.Silverlight.CSharp.targets\" />
  <!-- To modify your build process, add your task inside one of the targets below and uncomment it. 
       Other similar extension points exist, see Microsoft.Common.targets.
  <Target Name=\"BeforeBuild\">
  </Target>
  <Target Name=\"AfterBuild\">
  </Target>
  -->
  <ProjectExtensions />
</Project>"

writeToFile (path + "\\" + projectName + ".csproj") csprojFile

let csprojUserFile = "<?xml version=\"1.0\" encoding=\"utf-8\"?>
<Project ToolsVersion=\"4.0\" xmlns=\"http://schemas.microsoft.com/developer/msbuild/2003\">
  <ProjectExtensions>
    <VisualStudio>
      <FlavorProperties GUID=\"{00000000-0000-0000-0000-000000000000}\">
        <SilverlightMobileCSProjectFlavor>
          <FullDeploy>True</FullDeploy>
        </SilverlightMobileCSProjectFlavor>
      </FlavorProperties>
    </VisualStudio>
  </ProjectExtensions>
</Project>"

writeToFile (path + "\\" + projectName + ".csproj.user") csprojUserFile

(* Данный код пока что не изменяется (потом можно убрать некоторые Capabilities [что-то типа permissions в android]
из последнего файла). Все файлы относятся к папке Properties, нужны для сборки*)
Directory.CreateDirectory(path + "\Properties") |> ignore

let AppManifest = "<Deployment xmlns=\"http://schemas.microsoft.com/client/2007/deployment\"
    xmlns:x=\"http://schemas.microsoft.com/winfx/2006/xaml\"
>
    <Deployment.Parts>
    </Deployment.Parts>
</Deployment>"

writeToFile (path + "\Properties\AppManifest.xml") AppManifest

let AssemblyInfo = "using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Resources;

// Управление общими сведениями о сборке осуществляется с помощью следующего 
// набора атрибутов. Измените значения этих атрибутов для изменения
// сведений о сборке.
[assembly: AssemblyTitle(\"" + projectName + "\")]
[assembly: AssemblyDescription(\"\")]
[assembly: AssemblyConfiguration(\"\")]
[assembly: AssemblyCompany(\"\")]
[assembly: AssemblyProduct(\"" + projectName + "\")]
[assembly: AssemblyCopyright(\"Copyright ©  2013\")]
[assembly: AssemblyTrademark(\"\")]
[assembly: AssemblyCulture(\"\")]

[assembly: ComVisible(false)]

[assembly: Guid(\"00000000-0000-0000-0000-000000000000\")]

[assembly: AssemblyVersion(\"1.0.0.0\")]
[assembly: AssemblyFileVersion(\"1.0.0.0\")]
[assembly: NeutralResourcesLanguageAttribute(\"ru-RU\")]"

writeToFile (path + "\Properties\AssemblyInfo.cs") AssemblyInfo

let WMAppManifest = "<?xml version=\"1.0\" encoding=\"utf-8\"?>

<Deployment xmlns=\"http://schemas.microsoft.com/windowsphone/2009/deployment\" AppPlatformVersion=\"7.1\">
  <App xmlns=\"\" ProductID=\"{00000000-0000-0000-0000-000000000000}\" Title=\"" + projectName + "\" RuntimeType=\"Silverlight\" Version=\"1.0.0.0\" Genre=\"apps.normal\"  Author=\"author\" Description=\"Sample description\" Publisher=\"" + projectName + "\">
    <IconPath IsRelative=\"true\" IsResource=\"false\">ApplicationIcon.png</IconPath>
    <Capabilities>
      <Capability Name=\"ID_CAP_GAMERSERVICES\"/>
      <Capability Name=\"ID_CAP_IDENTITY_DEVICE\"/>
      <Capability Name=\"ID_CAP_IDENTITY_USER\"/>
      <Capability Name=\"ID_CAP_LOCATION\"/>
      <Capability Name=\"ID_CAP_MEDIALIB\"/>
      <Capability Name=\"ID_CAP_MICROPHONE\"/>
      <Capability Name=\"ID_CAP_NETWORKING\"/>
      <Capability Name=\"ID_CAP_PHONEDIALER\"/>
      <Capability Name=\"ID_CAP_PUSH_NOTIFICATION\"/>
      <Capability Name=\"ID_CAP_SENSORS\"/>
      <Capability Name=\"ID_CAP_WEBBROWSERCOMPONENT\"/>
      <Capability Name=\"ID_CAP_ISV_CAMERA\"/>
      <Capability Name=\"ID_CAP_CONTACTS\"/>
      <Capability Name=\"ID_CAP_APPOINTMENTS\"/>
    </Capabilities>
    <Tasks>
      <DefaultTask  Name =\"_default\" NavigationPage=\"main.xaml\"/>
    </Tasks>
    <Tokens>
      <PrimaryToken TokenID=\"" + projectName + "Token\" TaskName=\"_default\">
        <TemplateType5>
          <BackgroundImageURI IsRelative=\"true\" IsResource=\"false\">Background.png</BackgroundImageURI>
          <Count>0</Count>
          <Title>" + projectName + "</Title>
        </TemplateType5>
      </PrimaryToken>
    </Tokens>
  </App>
</Deployment>"

writeToFile (path + "\Properties\WMAppManifest.xml") WMAppManifest

let createXap() =
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
        printfn "%s" <| so.ReadToEnd()
        match proc.ExitCode with
        | 0 -> ()
        | x -> 
            printfn "%s exited with code %d" name x
            exit x
    // Путь до msbuild должен быть прописан в перменную среды PATH
    start ("cd /d " + path + " & msbuild " + projectName + ".csproj") "msbuild"

createXap()