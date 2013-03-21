(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,_,Primitives,Button,VisiblePrimitive,ImageView,LinearLayout,TextView,WebView,Raphael,Website,Forms,Canvas,SampleInternals,WebSharper,Html,Default,List,T,Operators,jQuery,document,Number,Seq,Operators1,Formlet,Enhance,FormContainerConfiguration,Remoting,Formlet1,Controls,Data,FormButtonConfiguration,window,Control,_FSharpEvent_1,Formlet2,Base,_Result_1,Concurrency;
 Runtime.Define(Global,{
  "":{
   Primitives:{
    Button:Runtime.Class({
     draw:function(raph,x,y)
     {
      var _this=this;
      return(function(arg20)
      {
       return function(arg30)
       {
        return _this.DrawRect(raph,x,arg20,arg30);
       };
      }(y))("#FF0000");
     }
    },{
     New:function(id,width,height,marginTop,padding,text,textSize,onClick)
     {
      var r;
      r=VisiblePrimitive.New(width,height,marginTop,padding);
      r.width=width;
      r.height=height;
      r.marginTop=marginTop;
      r.padding=padding;
      r["id@193"]=id;
      r["text@194"]=text;
      r["textSize@195"]=textSize;
      r["onClick@196"]=onClick;
      return Runtime.New(this,r);
     }
    }),
    ImageView:Runtime.Class({},{
     New:function(width,height,marginTop,padding,src,gravity)
     {
      var r;
      r=VisiblePrimitive.New(width,height,marginTop,padding);
      r.width=width;
      r.height=height;
      r.marginTop=marginTop;
      r.padding=padding;
      r["src@144"]=src;
      r["gravity@145"]=gravity;
      return Runtime.New(this,r);
     }
    }),
    LinearLayout:Runtime.Class({},{
     New:function(orient,width,height,background,children)
     {
      var r;
      r=VisiblePrimitive.New(width,height,0,0);
      r.width=width;
      r.height=height;
      r["orient@117"]=orient;
      r["background@118"]=background;
      r["children@119"]=children;
      return Runtime.New(this,r);
     }
    }),
    TextView:Runtime.Class({},{
     New:function(width,height,marginTop,padding,text,textSize)
     {
      var r;
      r=VisiblePrimitive.New(width,height,marginTop,padding);
      r.width=width;
      r.height=height;
      r.marginTop=marginTop;
      r.padding=padding;
      r["text@168"]=text;
      r["textSize@169"]=textSize;
      return Runtime.New(this,r);
     }
    }),
    Transition:Runtime.Class({},{
     New:function(from,_to_,button)
     {
      var r;
      r={};
      r["from@226"]=from;
      r["to'@227"]=_to_;
      r["button@228"]=button;
      return Runtime.New(this,r);
     }
    }),
    VisiblePrimitive:Runtime.Class({
     DrawRect:function(raph,x,y,col)
     {
      this.rect=Primitives.drawRect(raph,x+this["padding@72"],y+this["marginTop@71"],Primitives.sizeToFloat(this["width@69"]),Primitives.sizeToFloat(this["height@70"]),col);
     },
     IsInside:function(x,y)
     {
      if((this["padding@72"]<=x?x<=this["padding@72"]+Primitives.sizeToFloat(this["width@69"]):false)?this["marginTop@71"]<=y:false)
       {
        return y<=this["marginTop@71"]+Primitives.sizeToFloat(this["height@70"]);
       }
      else
       {
        return false;
       }
     },
     Move:function(dx,dy)
     {
      var x,f;
      x=this.rect.translate(dx,dy);
      f=function(value)
      {
       value;
      };
      f(x);
      this["padding@72"]=this["padding@72"]+dx;
      this["marginTop@71"]=this["marginTop@71"]+dy;
     }
    },{
     New:function(width,height,marginTop,padding)
     {
      var r;
      r={};
      r["width@69"]=width;
      r["height@70"]=height;
      r["marginTop@71"]=marginTop;
      r["padding@72"]=padding;
      r.rect=undefined;
      return Runtime.New(this,r);
     }
    }),
    WebView:Runtime.Class({},{
     New:function(id,width,height,marginTop,padding)
     {
      var r;
      r=VisiblePrimitive.New(width,height,marginTop,padding);
      r["id@249"]=id;
      return Runtime.New(this,r);
     }
    }),
    drawRect:function(raph,x,y,w,h,col)
    {
     return raph.rect(x,y,w,h).attr("fill",col);
    },
    line:function(raph,x1,y1,x2,y2)
    {
     var path,x,f;
     path=new Raphael.pathBuilder();
     x=raph.path(path.m(x1,y1).l(x2-x1,y2-y1).z().mk());
     f=function(value)
     {
      value;
     };
     return f(x);
    },
    sizeToFloat:function(_arg1)
    {
     var x;
     if(_arg1.$==2)
      {
       x=_arg1.$0;
       return x;
      }
     else
      {
       return 100;
      }
    }
   }
  },
  Website:{
   AddMovieControl:Runtime.Class({
    get_Body:function()
    {
     return Forms.AddMovie();
    }
   }),
   Canvas:{
    RaphaelViewer:Runtime.Class({
     get_Body:function()
     {
      return SampleInternals.Main();
     }
    }),
    SampleInternals:{
     Main:function()
     {
      var x,f,f1;
      x=Default.Div(Runtime.New(T,{
       $:0
      }));
      f=(f1=function(elem)
      {
       var canvas,patternInput,startY,startX,x1,f2,line,genBtn,num,tools,existing,rot,patternInput1,prevY,prevX,patternInput2,topY,topX,selected,isTool,curh,x4,f4,x5,f5,x6,f6;
       canvas=new Raphael(elem.Body,150+300,500);
       patternInput=[150,0];
       startY=patternInput[1];
       startX=patternInput[0];
       x1=canvas.rect(0,0,150+300,500);
       f2=function(value)
       {
        value;
       };
       f2(x1);
       line=function(x11,y1,x2,y2)
       {
        var path,x3,f3;
        path=new Raphael.pathBuilder();
        x3=canvas.path(path.m(x11,y1).l(x2-x11,y2-y1).z().mk());
        f3=function(value)
        {
         value;
        };
        return f3(x3);
       };
       line(150,0,150,500);
       genBtn=(num={
        contents:0
       },function()
       {
        var btn;
        Operators.Increment(num);
        btn=Button.New("button",{
         $:2,
         $0:100
        },{
         $:2,
         $0:50
        },50,25-150,"someText",20,"method");
        ((function(arg10)
        {
         return function(arg20)
         {
          return btn.draw(canvas,arg10,arg20);
         };
        }(150))(0));
        return btn;
       });
       tools={
        contents:List.ofArray([genBtn(null)])
       };
       existing={
        contents:Runtime.New(T,{
         $:0
        })
       };
       rot={
        contents:0
       };
       patternInput1=[{
        contents:0
       },{
        contents:0
       }];
       prevY=patternInput1[1];
       prevX=patternInput1[0];
       patternInput2=[canvas.top.attr("x"),canvas.top.attr("y")];
       topY=patternInput2[1];
       topX=patternInput2[0];
       selected={
        contents:{
         $:0
        }
       };
       isTool={
        contents:false
       };
       curh={
        contents:200
       };
       x4=jQuery(document).mousedown(function(e)
       {
        var findElems,predicate,matchValue,matchValue1,elem2,elem3;
        findElems=(predicate=function(elem1)
        {
         var arg00,arg10;
         arg00=Number(e.pageX)-150-216;
         arg10=Number(e.pageY)-152;
         return elem1.IsInside(arg00,arg10);
        },function(list)
        {
         return Seq.tryFind(predicate,list);
        });
        matchValue=findElems(tools.contents);
        if(matchValue.$==0)
         {
          matchValue1=findElems(existing.contents);
          if(matchValue1.$==0)
           {
           }
          else
           {
            elem2=matchValue1.$0;
            selected.contents={
             $:1,
             $0:elem2
            };
            isTool.contents=false;
           }
         }
        else
         {
          elem3=matchValue.$0;
          selected.contents={
           $:1,
           $0:elem3
          };
          prevX.contents=e.pageX;
          prevY.contents=e.pageY;
          isTool.contents=true;
         }
        curh.contents=curh.contents+20;
        return canvas.safari();
       });
       f4=function(value)
       {
        value;
       };
       f4(x4);
       x5=jQuery(document).mousemove(function(e)
       {
        var matchValue,elem1,arg00,arg10;
        matchValue=selected.contents;
        if(matchValue.$==1)
         {
          elem1=matchValue.$0;
          arg00=Number(e.pageX-prevX.contents);
          arg10=Number(e.pageY-prevY.contents);
          elem1.Move(arg00,arg10);
          prevX.contents=e.pageX;
          prevY.contents=e.pageY;
          return canvas.safari();
         }
        else
         {
          return null;
         }
       });
       f5=function(value)
       {
        value;
       };
       f5(x5);
       x6=jQuery(document).mouseup(function()
       {
        var matchValue,elem1;
        matchValue=selected.contents;
        if(matchValue.$==1)
         {
          elem1=matchValue.$0;
          selected.contents={
           $:0
          };
         }
        else
         {
          return null;
         }
       });
       f6=function(value)
       {
        value;
       };
       return f6(x6);
      },function(w)
      {
       return Operators1.OnAfterRender(f1,w);
      });
      f(x);
      return x;
     },
     SimpleExample:function()
     {
      var x,f,f1;
      x=Default.Div(Runtime.New(T,{
       $:0
      }));
      f=(f1=function(elem)
      {
       var paper,c,x1,f2,x2,f3,x3,f4,x4,f5,x5,f6;
       paper=new Raphael(elem.Body,400,250);
       c=paper.circle(90,90,70);
       x1=paper.text(50,50,"Hello\nRaphael");
       f2=function(value)
       {
        value;
       };
       f2(x1);
       x2=paper.path("M10 10L90 90");
       f3=function(value)
       {
        value;
       };
       f3(x2);
       x3=paper.ellipse(250,50,40,20);
       f4=function(value)
       {
        value;
       };
       f4(x3);
       x4=paper.rect(250,140,50,50,10);
       f5=function(value)
       {
        value;
       };
       f5(x4);
       x5=c.attr("fill","#d0d");
       f6=function(value)
       {
        value;
       };
       return f6(x5);
      },function(w)
      {
       return Operators1.OnAfterRender(f1,w);
      });
      f(x);
      return x;
     }
    }
   },
   Forms:{
    AddMovie:function()
    {
     var textForm,x,x1,f,f1,fc,inputRecord,Description,x2,f2,f3,x3,f4,f5,proc,x6,_builder_,f7;
     textForm=(x=(x1=Forms.MovieTitleForm(),(f=function(formlet)
     {
      return Enhance.WithSubmitButton(formlet);
     },f(x1))),(f1=(fc=(inputRecord=FormContainerConfiguration.get_Default(),(Description=(x2=(f2=function(arg0)
     {
      return{
       $:0,
       $0:arg0
      };
     },f2("Please enter movie title.")),(f3=function(arg0)
     {
      return{
       $:1,
       $0:arg0
      };
     },f3(x2))),Runtime.New(FormContainerConfiguration,{
      Header:(x3=(f4=function(arg0)
      {
       return{
        $:0,
        $0:arg0
       };
      },f4("Type Movie title to add")),(f5=function(arg0)
      {
       return{
        $:1,
        $0:arg0
       };
      },f5(x3))),
      Padding:inputRecord.Padding,
      Description:Description,
      BackgroundColor:inputRecord.BackgroundColor,
      BorderColor:inputRecord.BorderColor,
      CssClass:inputRecord.CssClass,
      Style:inputRecord.Style
     }))),function(formlet)
     {
      return Enhance.WithCustomFormContainer(fc,formlet);
     }),f1(x)));
     proc=function(title)
     {
      return function()
      {
       var value,x4,f6,_this;
       value=Remoting.Call("Website:2",[title]);
       value;
       x4=List.ofArray([Default.P(List.ofArray([(f6=function(x5)
       {
        return Default.Text(x5);
       },f6("Title is succesfully added"))]))]);
       _this=Default.Tags();
       return _this.NewTag("fieldset",x4);
      };
     };
     x6=(_builder_=Formlet1.Do(),_builder_.Delay(function()
     {
      return _builder_.Bind(textForm,function(_arg1)
      {
       return _builder_.ReturnFrom(Formlet1.OfElement(proc(_arg1)));
      });
     }));
     f7=function(formlet)
     {
      return Formlet1.Flowlet(formlet);
     };
     return f7(x6);
    },
    Input:function(label,err)
    {
     var x,x1,x2,f,f1,f2;
     x=(x1=(x2=Controls.Input(""),(f=function(arg10)
     {
      return Data.Validator().IsNotEmpty(err,arg10);
     },f(x2))),(f1=function(formlet)
     {
      return Enhance.WithValidationIcon(formlet);
     },f1(x1)));
     f2=function(formlet)
     {
      return Enhance.WithTextLabel(label,formlet);
     };
     return f2(x);
    },
    InputInt:function(label,err)
    {
     var x,x1,x2,x3,f,f1,f2,f3,f4;
     x=(x1=(x2=(x3=Controls.Input(""),(f=Data.Validator().IsInt(err),f(x3))),(f1=function(formlet)
     {
      return Enhance.WithValidationIcon(formlet);
     },f1(x2))),(f2=function(formlet)
     {
      return Enhance.WithTextLabel(label,formlet);
     },f2(x1)));
     f3=(f4=function(value)
     {
      return value<<0;
     },function(formlet)
     {
      return Formlet1.Map(f4,formlet);
     });
     return f3(x);
    },
    LoginForm:function(redirectUrl)
    {
     var uName,x,x1,x2,f,f1,f2,pw,x3,x4,x5,f3,f4,f5,loginF,x6,x7,_builder_,f8;
     uName=(x=(x1=(x2=Controls.Input(""),(f=function(arg10)
     {
      return Data.Validator().IsNotEmpty("Enter Username",arg10);
     },f(x2))),(f1=function(formlet)
     {
      return Enhance.WithValidationIcon(formlet);
     },f1(x1))),(f2=function(formlet)
     {
      return Enhance.WithTextLabel("Username",formlet);
     },f2(x)));
     pw=(x3=(x4=(x5=Controls.Password(""),(f3=function(arg10)
     {
      return Data.Validator().IsNotEmpty("Enter Password",arg10);
     },f3(x5))),(f4=function(formlet)
     {
      return Enhance.WithValidationIcon(formlet);
     },f4(x4))),(f5=function(formlet)
     {
      return Enhance.WithTextLabel("Password",formlet);
     },f5(x3)));
     loginF=Data.$(Data.$((x6=function(n)
     {
      return function(pw1)
      {
       return{
        Name:n,
        Password:pw1
       };
      };
     },Formlet1.Return(x6)),uName),pw);
     x7=(_builder_=Formlet1.Do(),_builder_.Delay(function()
     {
      var f6,submitConf,inputRecord,resetConf,inputRecord1;
      return _builder_.Bind((f6=(submitConf=(inputRecord=FormButtonConfiguration.get_Default(),Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Login"
       },
       Style:inputRecord.Style,
       Class:inputRecord.Class
      })),(resetConf=(inputRecord1=FormButtonConfiguration.get_Default(),Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Reset"
       },
       Style:inputRecord1.Style,
       Class:inputRecord1.Class
      })),function(formlet)
      {
       return Enhance.WithCustomSubmitAndResetButtons(submitConf,resetConf,formlet);
      })),f6(loginF)),function(_arg1)
      {
       var a,f7;
       return _builder_.ReturnFrom((a=Remoting.Async("Website:0",[_arg1]),(f7=function(loggedIn)
       {
        var _1;
        if(loggedIn)
         {
          _1=window;
          _1.location=redirectUrl;
          redirectUrl;
          return Formlet1.Return(null);
         }
        else
         {
          return Forms.WarningPanel("Login failed");
         }
       },Forms.WithLoadingPane(a,f7))));
      });
     }));
     f8=function(formlet)
     {
      return Enhance.WithFormContainer(formlet);
     };
     return f8(x7);
    },
    MovieTitleForm:function()
    {
     var x;
     return Data.$((x=function(name)
     {
      return name;
     },Formlet1.Return(x)),Forms.Input("Title","Please enter a title"));
    },
    RegisterForm:function()
    {
     var uName,x,x1,x2,f,f1,f2,pw,x3,x4,x5,f3,f4,f5,registerF,x6,x7,_builder_,f8;
     uName=(x=(x1=(x2=Controls.Input(""),(f=function(arg10)
     {
      return Data.Validator().IsNotEmpty("Enter Username",arg10);
     },f(x2))),(f1=function(formlet)
     {
      return Enhance.WithValidationIcon(formlet);
     },f1(x1))),(f2=function(formlet)
     {
      return Enhance.WithTextLabel("Username",formlet);
     },f2(x)));
     pw=(x3=(x4=(x5=Controls.Password(""),(f3=function(arg10)
     {
      return Data.Validator().IsNotEmpty("Enter Password",arg10);
     },f3(x5))),(f4=function(formlet)
     {
      return Enhance.WithValidationIcon(formlet);
     },f4(x4))),(f5=function(formlet)
     {
      return Enhance.WithTextLabel("Password",formlet);
     },f5(x3)));
     registerF=Data.$(Data.$(Data.$((x6=function(n)
     {
      return function(pw1)
      {
       return function(pw2)
       {
        return[n,pw1,pw2];
       };
      };
     },Formlet1.Return(x6)),uName),pw),pw);
     x7=(_builder_=Formlet1.Do(),_builder_.Delay(function()
     {
      var f6,submitConf,inputRecord,resetConf,inputRecord1;
      return _builder_.Bind((f6=(submitConf=(inputRecord=FormButtonConfiguration.get_Default(),Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Login"
       },
       Style:inputRecord.Style,
       Class:inputRecord.Class
      })),(resetConf=(inputRecord1=FormButtonConfiguration.get_Default(),Runtime.New(FormButtonConfiguration,{
       Label:{
        $:1,
        $0:"Reset"
       },
       Style:inputRecord1.Style,
       Class:inputRecord1.Class
      })),function(formlet)
      {
       return Enhance.WithCustomSubmitAndResetButtons(submitConf,resetConf,formlet);
      })),f6(registerF)),Runtime.Tupled(function(_arg1)
      {
       var a,user,pass,confirm,f7;
       return _builder_.ReturnFrom((a=(user=_arg1[0],(pass=_arg1[1],(confirm=_arg1[2],Remoting.Async("Website:1",[user,pass,confirm])))),(f7=function(_arg2)
       {
        var _1;
        if(_arg2.$==2)
         {
          return Forms.WarningPanel("User with this name already exists");
         }
        else
         {
          if(_arg2.$==1)
           {
            return Forms.WarningPanel("Password is not confirmed");
           }
          else
           {
            _1=window;
            _1.location="/";
            return Formlet1.Return(null);
           }
         }
       },Forms.WithLoadingPane(a,f7))));
      }));
     }));
     f8=function(formlet)
     {
      return Enhance.WithFormContainer(formlet);
     };
     return f8(x7);
    },
    WarningPanel:function(label)
    {
     var _builder_;
     _builder_=Formlet1.Do();
     return _builder_.Delay(function()
     {
      var genElem;
      return _builder_.Bind((genElem=function()
      {
       return Operators1.add(Default.Div(List.ofArray([Default.Attr().Class("warningPanel")])),List.ofArray([Default.Text(label)]));
      },Formlet1.OfElement(genElem)),function()
      {
       return _builder_.ReturnFrom(Formlet1.Never());
      });
     });
    },
    WithLoadingPane:function(a,f)
    {
     var loadingPane,f1;
     loadingPane=(f1=function()
     {
      var elem,state,x,f2,f4;
      elem=Default.Div(List.ofArray([Default.Attr().Class("loadingPane")]));
      state=_FSharpEvent_1.New();
      x=(f2=function()
      {
       var f3;
       f3=function(_arg11)
       {
        var x1;
        x1=Runtime.New(_Result_1,{
         $:0,
         $0:_arg11
        });
        state.event.Trigger(x1);
        return Concurrency.Return(null);
       };
       return Concurrency.Bind(a,f3);
      },Concurrency.Delay(f2));
      f4=function(arg00)
      {
       var t;
       t={
        $:0
       };
       return Concurrency.Start(arg00);
      };
      f4(x);
      return[elem,function(value)
      {
       value;
      },state.event];
     },Formlet1.BuildFormlet(f1));
     return Formlet1.Replace(loadingPane,f);
    }
   },
   LoginControl:Runtime.Class({
    get_Body:function()
    {
     return Forms.LoginForm(this.redirectUrl);
    }
   }),
   RegisterControl:Runtime.Class({
    get_Body:function()
    {
     return Forms.RegisterForm();
    }
   })
  }
 });
 Runtime.OnInit(function()
 {
  _=Runtime.Safe(Global[""]);
  Primitives=Runtime.Safe(_.Primitives);
  Button=Runtime.Safe(Primitives.Button);
  VisiblePrimitive=Runtime.Safe(Primitives.VisiblePrimitive);
  ImageView=Runtime.Safe(Primitives.ImageView);
  LinearLayout=Runtime.Safe(Primitives.LinearLayout);
  TextView=Runtime.Safe(Primitives.TextView);
  WebView=Runtime.Safe(Primitives.WebView);
  Raphael=Runtime.Safe(Global.Raphael);
  Website=Runtime.Safe(Global.Website);
  Forms=Runtime.Safe(Website.Forms);
  Canvas=Runtime.Safe(Website.Canvas);
  SampleInternals=Runtime.Safe(Canvas.SampleInternals);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  Operators=Runtime.Safe(WebSharper.Operators);
  jQuery=Runtime.Safe(Global.jQuery);
  document=Runtime.Safe(Global.document);
  Number=Runtime.Safe(Global.Number);
  Seq=Runtime.Safe(WebSharper.Seq);
  Operators1=Runtime.Safe(Html.Operators);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  Enhance=Runtime.Safe(Formlet.Enhance);
  FormContainerConfiguration=Runtime.Safe(Enhance.FormContainerConfiguration);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  Formlet1=Runtime.Safe(Formlet.Formlet);
  Controls=Runtime.Safe(Formlet.Controls);
  Data=Runtime.Safe(Formlet.Data);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  window=Runtime.Safe(Global.window);
  Control=Runtime.Safe(WebSharper.Control);
  _FSharpEvent_1=Runtime.Safe(Control["FSharpEvent`1"]);
  Formlet2=Runtime.Safe(Global.IntelliFactory.Formlet);
  Base=Runtime.Safe(Formlet2.Base);
  _Result_1=Runtime.Safe(Base["Result`1"]);
  return Concurrency=Runtime.Safe(WebSharper.Concurrency);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Button,VisiblePrimitive);
  Runtime.Inherit(ImageView,VisiblePrimitive);
  Runtime.Inherit(LinearLayout,VisiblePrimitive);
  Runtime.Inherit(TextView,VisiblePrimitive);
  Runtime.Inherit(WebView,VisiblePrimitive);
 });
}());
