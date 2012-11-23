(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Formlet,Formlet1,List,Website,FormDesigner,JQueryUI,Tabs,TabsConfiguration,Html,Default,Accordion,Controls,Enhance,JQueryUI1,Controls1,Data,Enhance1,SliderConfiguration,Operators,Button,T;
 Runtime.Define(Global,{
  Website:{
   FormDesigner:{
    FIgnore:function(f)
    {
     return Formlet1.Map(function(value)
     {
      value;
     },f);
    },
    Main:function()
    {
     var menuTabElems,menuTabs,pallete,objectArg,arg00,submitControls,objectArg1,arg001,leftPanel,objectArg2,arg002,objectArg3,arg003,sceneTabElems,sceneTabs,scene,objectArg4,arg004,objectArg5,arg005,objectArg6,arg006,propertiesEditor,objectArg7,arg007,objectArg8,arg008,objectArg9,arg009,page;
     menuTabElems=List.ofArray([["Controls",FormDesigner.MenuAccordion()]]);
     menuTabs=Tabs.New1(menuTabElems,TabsConfiguration.New());
     pallete=Default.Div(List.ofArray([menuTabs]));
     objectArg=pallete["HtmlProvider@32"];
     ((arg00=pallete.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg.SetCss(arg00,arg10,arg20);
      };
     })("width"))("300px");
     submitControls=FormDesigner.SubmitControls();
     objectArg1=submitControls["HtmlProvider@32"];
     ((arg001=submitControls.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg1.SetCss(arg001,arg10,arg20);
      };
     })("width"))("300px");
     leftPanel=Default.Div(List.ofArray([pallete,submitControls]));
     objectArg2=leftPanel["HtmlProvider@32"];
     ((arg002=leftPanel.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg2.SetCss(arg002,arg10,arg20);
      };
     })("margin"))("10px");
     objectArg3=leftPanel["HtmlProvider@32"];
     ((arg003=leftPanel.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg3.SetCss(arg003,arg10,arg20);
      };
     })("float"))("left");
     sceneTabElems=List.ofArray([["Screen 1",FormDesigner.Screen()]]);
     sceneTabs=Tabs.New1(sceneTabElems,TabsConfiguration.New());
     scene=Default.Div(List.ofArray([sceneTabs]));
     objectArg4=scene["HtmlProvider@32"];
     ((arg004=scene.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg4.SetCss(arg004,arg10,arg20);
      };
     })("width"))("600px");
     objectArg5=scene["HtmlProvider@32"];
     ((arg005=scene.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg5.SetCss(arg005,arg10,arg20);
      };
     })("float"))("left");
     objectArg6=scene["HtmlProvider@32"];
     ((arg006=scene.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg6.SetCss(arg006,arg10,arg20);
      };
     })("margin"))("10px");
     propertiesEditor=Default.Div(List.ofArray([FormDesigner.PropertiesEditor()]));
     objectArg7=propertiesEditor["HtmlProvider@32"];
     ((arg007=propertiesEditor.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg7.SetCss(arg007,arg10,arg20);
      };
     })("float"))("left");
     objectArg8=propertiesEditor["HtmlProvider@32"];
     ((arg008=propertiesEditor.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg8.SetCss(arg008,arg10,arg20);
      };
     })("width"))("300px");
     objectArg9=propertiesEditor["HtmlProvider@32"];
     ((arg009=propertiesEditor.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg9.SetCss(arg009,arg10,arg20);
      };
     })("margin"))("10px");
     page=Default.Div(List.ofArray([leftPanel,scene,propertiesEditor]));
     return page;
    },
    MenuAccordion:function()
    {
     var accElems;
     accElems=List.ofArray([["Buttons",Default.Div(List.ofArray([Default.Text("Some buttons will appear here")]))],["Headers and footers",Default.Div(List.ofArray([Default.Text("Some headers and footers will appear here")]))]]);
     return Default.Div(List.ofArray([Accordion.New2(accElems)]));
    },
    PropertiesEditor:function()
    {
     var SearchFlight,fromC,x,f,toC,x1,f1,sDate,x2,f2,eDate,x3,f3,x4,x5,x6,f5,f6,ChooseColor,rgb,slider,xa,colorPanel,xb,xc,_builder_,fa,fb,AddLabels,xf,_builder_1,f15,f16,x16,f17;
     SearchFlight=(fromC=(x=Controls.Input(""),(f=function(formlet)
     {
      return Enhance.WithTextLabel("From",formlet);
     },f(x))),(toC=(x1=Controls.Input(""),(f1=function(formlet)
     {
      return Enhance.WithTextLabel("To",formlet);
     },f1(x1))),(sDate=(x2=Controls1.InputDatepicker({
      $:0
     }),(f2=function(formlet)
     {
      return Enhance.WithTextLabel("Depart",formlet);
     },f2(x2))),(eDate=(x3=Controls1.InputDatepicker({
      $:0
     }),(f3=function(formlet)
     {
      return Enhance.WithTextLabel("Return",formlet);
     },f3(x3))),(x4=(x5=Data.$(Data.$(Data.$(Data.$((x6=function()
     {
      return function()
      {
       return function()
       {
        return function()
        {
         return null;
        };
       };
      };
     },Formlet1.Return(x6)),fromC),toC),sDate),eDate),(f5=function(formlet)
     {
      return Enhance1.WithLegend("Search for a Flight",formlet);
     },f5(x5))),(f6=function(formlet)
     {
      return Enhance1.WithSubmitButton("Search",formlet);
     },f6(x4)))))));
     ChooseColor=(rgb=(slider=function(label)
     {
      var x7,x8,x9,inputRecord,Width,Values,f4,f7,f8;
      x7=(x8=(x9=(inputRecord=SliderConfiguration.get_Default(),(Width={
       $:1,
       $0:300
      },(Values=[125],Runtime.New(SliderConfiguration,{
       Animate:inputRecord.Animate,
       Orientation:inputRecord.Orientation,
       Values:Values,
       Min:0,
       Max:255,
       Width:Width,
       Height:inputRecord.Height,
       Range:inputRecord.Range
      })))),(f4=function(arg0)
      {
       return{
        $:1,
        $0:arg0
       };
      },f4(x9))),(f7=function(conf)
      {
       return Controls1.Slider(conf);
      },f7(x8)));
      f8=function(formlet)
      {
       return Enhance.WithTextLabel(label,formlet);
      };
      return f8(x7);
     },Data.$(Data.$(Data.$((xa=function(r)
     {
      return function(g)
      {
       return function(b)
       {
        return[r,g,b];
       };
      };
     },Formlet1.Return(xa)),slider("Red")),slider("Green")),slider("Blue"))),(colorPanel=function(r,g,b)
     {
      var rgb1,style,genElem;
      rgb1=Global.String(r)+","+Global.String(g)+","+Global.String(b);
      style="background-color:rgb("+rgb1+");width:140px;height:100px;";
      genElem=function()
      {
       var _this;
       return Operators.add(Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("style",style))])),List.ofArray([Default.Text("")]));
      };
      return Formlet1.OfElement(genElem);
     },(xb=(xc=(_builder_=Formlet1.Do(),_builder_.Delay(function()
     {
      return _builder_.Bind(rgb,Runtime.Tupled(function(_arg2)
      {
       var rL,gL,bL,patternInput,r,g,b,x7,x8,f4,x9,f7,xd,f8,xe,f9;
       rL=_arg2[0];
       gL=_arg2[1];
       bL=_arg2[2];
       patternInput=[rL.$0,gL.$0,bL.$0];
       r=patternInput[0];
       g=patternInput[1];
       b=patternInput[2];
       return _builder_.Bind(Data.$(Data.$(Data.$(Data.$((x7=function()
       {
        return function()
        {
         return function()
         {
          return function()
          {
           return null;
          };
         };
        };
       },Formlet1.Return(x7)),(x8=colorPanel(r,g,b),(f4=function(formlet)
       {
        return Enhance.WithTextLabel("Result",formlet);
       },f4(x8)))),(x9=Controls.Input(Global.String(r)),(f7=function(formlet)
       {
        return Enhance.WithTextLabel("R:",formlet);
       },f7(x9)))),(xd=Controls.Input(Global.String(g)),(f8=function(formlet)
       {
        return Enhance.WithTextLabel("G:",formlet);
       },f8(xd)))),(xe=Controls.Input(Global.String(b)),(f9=function(formlet)
       {
        return Enhance.WithTextLabel("B:",formlet);
       },f9(xe)))),function()
       {
        return _builder_.Return([r,g,b]);
       });
      }));
     })),(fa=function(formlet)
     {
      return Enhance1.WithLegend("Select Color",formlet);
     },fa(xc))),(fb=function(formlet)
     {
      return Enhance1.WithSubmitAndResetButtons("Submit","Reset",formlet);
     },fb(xb)))));
     AddLabels=(xf=(_builder_1=Formlet1.Do(),_builder_1.Delay(function()
     {
      var x7,x8,x9,xd,xe,f4,f7,f8,f9,fc;
      return _builder_1.Bind((x7=(x8=(x9=(xd=(xe=Controls.Input(""),(f4=function(arg10)
      {
       return Data.Validator().IsNotEmpty("Empty value not allowed",arg10);
      },f4(xe))),(f7=function(formlet)
      {
       return Enhance1.WithValidationIcon(formlet);
      },f7(xd))),(f8=function(formlet)
      {
       return Enhance1.Many(formlet);
      },f8(x9))),(f9=function(formlet)
      {
       return Enhance1.WithLegend("Add Label",formlet);
      },f9(x8))),(fc=function(formlet)
      {
       return Enhance1.WithSubmitAndResetButtons("Test","Reset",formlet);
      },fc(x7))),function(_arg5)
      {
       var x10,x11,fd,mapping,f10,f11;
       return _builder_1.Bind((x10=(x11=(fd=(mapping=function(label)
       {
        var x12,fe,ff;
        x12=Formlet1.OfElement(function()
        {
         var x13,_this;
         x13=List.ofArray([Default.Text(label)]);
         _this=Default.Tags();
         return _this.NewTag("label",x13);
        });
        fe=(ff=function()
        {
         return label;
        },function(formlet)
        {
         return Formlet1.Map(ff,formlet);
        });
        return fe(x12);
       },function(list)
       {
        return List.map(mapping,list);
       }),fd(_arg5)),(f10=function(fs)
       {
        return Controls1.Sortable(fs);
       },f10(x11))),(f11=function(formlet)
       {
        return Enhance1.WithLegend("Order",formlet);
       },f11(x10))),function(_arg4)
       {
        var x12,x13,fe,mapping1,ff,dc,f12;
        return _builder_1.Bind((x12=(x13=(fe=(mapping1=function(label)
        {
         return[label,label,false];
        },function(list)
        {
         return List.map(mapping1,list);
        }),fe(_arg4)),(ff=(dc={
         $:0
        },function(vs)
        {
         return Controls1.DragAndDrop(dc,vs);
        }),ff(x13))),(f12=function(formlet)
        {
         return Enhance1.WithLegend("Drag & Drop",formlet);
        },f12(x12))),function()
        {
         var x14,x15,f13,f14;
         return _builder_1.ReturnFrom((x14=(x15=Controls1.Autocomplete("",_arg4),(f13=function(formlet)
         {
          return Enhance.WithTextLabel("Label",formlet);
         },f13(x15))),(f14=function(formlet)
         {
          return Enhance1.WithLegend("Autocomplete",formlet);
         },f14(x14))));
        });
       });
      });
     })),(f15=(f16=function(value)
     {
      value;
     },function(formlet)
     {
      return Formlet1.Map(f16,formlet);
     }),f15(xf)));
     x16=List.ofArray([["Search Flight",FormDesigner.FIgnore(SearchFlight)],["RGB",FormDesigner.FIgnore(ChooseColor)],["Labels",FormDesigner.FIgnore(AddLabels)]]);
     f17=function(fs)
     {
      return Controls1.TabsChoose(0,fs);
     };
     return f17(x16);
    },
    Screen:function()
    {
     var sceneDiv;
     sceneDiv=Default.Div(List.ofArray([Default.Text("Mobile will appear here")]));
     return sceneDiv;
    },
    SubmitControls:function()
    {
     var newScreenButton,newScreenButtonDiv,objectArg,arg00,objectArg1,arg001,testButton,testButtonDiv,objectArg2,arg002,objectArg3,arg003,generateButton,generateButtonDiv,objectArg4,arg004,objectArg5,arg005,submitControlsDiv;
     newScreenButton=Button.New4("New screen");
     newScreenButtonDiv=Default.Div(List.ofArray([newScreenButton]));
     objectArg=newScreenButtonDiv["HtmlProvider@32"];
     ((arg00=newScreenButtonDiv.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg.SetCss(arg00,arg10,arg20);
      };
     })("text-align"))("center");
     objectArg1=newScreenButtonDiv["HtmlProvider@32"];
     ((arg001=newScreenButtonDiv.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg1.SetCss(arg001,arg10,arg20);
      };
     })("margin"))("10px");
     testButton=Button.New4("Test");
     testButtonDiv=Default.Div(List.ofArray([testButton]));
     objectArg2=testButtonDiv["HtmlProvider@32"];
     ((arg002=testButtonDiv.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg2.SetCss(arg002,arg10,arg20);
      };
     })("text-align"))("center");
     objectArg3=testButtonDiv["HtmlProvider@32"];
     ((arg003=testButtonDiv.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg3.SetCss(arg003,arg10,arg20);
      };
     })("margin"))("10px");
     generateButton=Button.New4("Generate");
     generateButtonDiv=Default.Div(List.ofArray([generateButton]));
     objectArg4=generateButtonDiv["HtmlProvider@32"];
     ((arg004=generateButtonDiv.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg4.SetCss(arg004,arg10,arg20);
      };
     })("text-align"))("center");
     objectArg5=generateButtonDiv["HtmlProvider@32"];
     ((arg005=generateButtonDiv.Body,function(arg10)
     {
      return function(arg20)
      {
       return objectArg5.SetCss(arg005,arg10,arg20);
      };
     })("margin"))("10px");
     submitControlsDiv=Default.Div(List.ofArray([newScreenButtonDiv,Default.Div(Runtime.New(T,{
      $:0
     })),testButtonDiv,Default.Div(Runtime.New(T,{
      $:0
     })),generateButtonDiv]));
     return submitControlsDiv;
    }
   },
   FormDesignerViewer:Runtime.Class({
    get_Body:function()
    {
     return FormDesigner.Main();
    }
   })
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  Formlet1=Runtime.Safe(Formlet.Formlet);
  List=Runtime.Safe(WebSharper.List);
  Website=Runtime.Safe(Global.Website);
  FormDesigner=Runtime.Safe(Website.FormDesigner);
  JQueryUI=Runtime.Safe(WebSharper.JQueryUI);
  Tabs=Runtime.Safe(JQueryUI.Tabs);
  TabsConfiguration=Runtime.Safe(JQueryUI.TabsConfiguration);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  Accordion=Runtime.Safe(JQueryUI.Accordion);
  Controls=Runtime.Safe(Formlet.Controls);
  Enhance=Runtime.Safe(Formlet.Enhance);
  JQueryUI1=Runtime.Safe(Formlet.JQueryUI);
  Controls1=Runtime.Safe(JQueryUI1.Controls);
  Data=Runtime.Safe(Formlet.Data);
  Enhance1=Runtime.Safe(JQueryUI1.Enhance);
  SliderConfiguration=Runtime.Safe(Controls1.SliderConfiguration);
  Operators=Runtime.Safe(Html.Operators);
  Button=Runtime.Safe(JQueryUI.Button);
  return T=Runtime.Safe(List.T);
 });
 Runtime.OnLoad(function()
 {
 });
}());
