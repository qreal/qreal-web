(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,JQueryUI,Button,Html,Default,List,T,Tabs,TabsConfiguration,Website,JQueryUI1,EventsPervasives,Draggable,DraggableConfiguration,Operators;
 Runtime.Define(Global,{
  Website:{
   JQueryUI:{
    Main:function()
    {
     var button,pan,activity1pan,objectArg,arg00,tabScene,tabMenu,tabs,tabsScene,menu,scene,objectArg1,arg001,objectArg2,arg002,objectArg3,arg003,createButton;
     button=Button.New4("Open");
     pan=Default.Div(List.ofArray([button]));
     activity1pan=Default.Div(Runtime.New(T,{
      $:0
     }));
     objectArg=activity1pan["HtmlProvider@32"];
     ((arg00=activity1pan.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg.SetCss(arg00,arg10,arg20);
      };
     })("height"))("600px");
     tabScene=List.ofArray([["Activity1",activity1pan]]);
     tabMenu=List.ofArray([["Dialog",pan]]);
     tabs=Tabs.New1(tabMenu,TabsConfiguration.New());
     tabsScene=Tabs.New1(tabScene,TabsConfiguration.New());
     menu=Default.Div(List.ofArray([tabs]));
     scene=Default.Div(List.ofArray([tabsScene]));
     objectArg1=menu["HtmlProvider@32"];
     (arg001=menu.Body,function(arg10)
     {
      return objectArg1.SetStyle(arg001,arg10);
     })("height:400px;\r\n        float:left; \r\n        margin-left:15px; \r\n        text-align:center");
     objectArg2=scene["HtmlProvider@32"];
     (arg002=scene.Body,function(arg10)
     {
      return objectArg2.SetStyle(arg002,arg10);
     })("height:400px;\r\n        float:left; \r\n        margin-left:15px; \r\n        text-align:center");
     objectArg3=scene["HtmlProvider@32"];
     ((arg003=scene.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg3.SetCss(arg003,arg10,arg20);
      };
     })("width"))("600px");
     createButton=function()
     {
      var buttonDiv,objectArg4,arg004,x,f,x1,f1,x2,returnVal,f2;
      buttonDiv=Default.Div(List.ofArray([Default.Text("Some element will be here")]));
      objectArg4=buttonDiv["HtmlProvider@32"];
      ((arg004=buttonDiv.Body,function(arg10)
      {
       return function(arg20)
       {
        return objectArg4.SetCss(arg004,arg10,arg20);
       };
      })("background-color"))("silver");
      x=(f=(x1=function()
      {
       return function()
       {
        return JQueryUI1.bringToTop(buttonDiv);
       };
      },function(arg10)
      {
       return EventsPervasives.Events().OnMouseDown(x1,arg10);
      }),(f(buttonDiv),buttonDiv));
      f1=function(value)
      {
       value;
      };
      f1(x);
      x2=Draggable.New1(buttonDiv,(returnVal=[DraggableConfiguration.New()],(null,returnVal[0].containment="parent",returnVal[0])));
      f2=function(value)
      {
       value;
      };
      f2(x2);
      return activity1pan.AppendI(buttonDiv);
     };
     button.OnClick(function()
     {
      return createButton(null);
     });
     return Default.Div(List.ofArray([menu,scene]));
    },
    bringToTop:function(e)
    {
     var prop,objectArg,arg00;
     Operators.Increment(JQueryUI1.maxZ());
     prop=Global.String(JQueryUI1.maxZ().contents);
     objectArg=e["HtmlProvider@32"];
     return((arg00=e.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg.SetCss(arg00,arg10,arg20);
      };
     })("z-index"))(prop);
    },
    maxZ:Runtime.Field(function()
    {
     return{
      contents:0
     };
    })
   },
   JQueryUIViewer:Runtime.Class({
    get_Body:function()
    {
     return JQueryUI1.Main();
    }
   })
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  JQueryUI=Runtime.Safe(WebSharper.JQueryUI);
  Button=Runtime.Safe(JQueryUI.Button);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  Tabs=Runtime.Safe(JQueryUI.Tabs);
  TabsConfiguration=Runtime.Safe(JQueryUI.TabsConfiguration);
  Website=Runtime.Safe(Global.Website);
  JQueryUI1=Runtime.Safe(Website.JQueryUI);
  EventsPervasives=Runtime.Safe(Html.EventsPervasives);
  Draggable=Runtime.Safe(JQueryUI.Draggable);
  DraggableConfiguration=Runtime.Safe(JQueryUI.DraggableConfiguration);
  return Operators=Runtime.Safe(WebSharper.Operators);
 });
 Runtime.OnLoad(function()
 {
  JQueryUI1.maxZ();
 });
}());
