(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,JQueryUI,Accordion,Utils,Pagelet,jQuery,Html,Operators,List,Default,AccordionConfiguration,AccordionIconConfiguration,Autocomplete,AutocompleteConfiguration,T,Button,EventsPervasives,ButtonConfiguration,ButtonIconsConfiguration,Datepicker,DatepickerConfiguration,DatepickerShowOptionsConfiguration,Dialog,DialogConfiguration,Draggable,DraggableConfiguration,DraggableStackConfiguration,DraggablecursorAtConfiguration,Droppable,DroppableConfiguration,Position,PositionConfiguration,String,Progressbar,ProgressbarConfiguration,Resizable,ResizableConfiguration,Selectable,SelectableConfiguration,Slider,SliderConfiguration,Sortable,SortableConfiguration,Tabs,Math,Seq,TabsConfiguration,TabsAjaxOptionsConfiguration,TabsCookieConfiguration,TabsFxConfiguration;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    JQueryUI:{
     Accordion:Runtime.Class({
      OnChange:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("accordionchange",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnChangeStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("accordionchangestart",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("accordioncreate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).accordion("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(els,conf)
      {
       var a,panel,els1,x,f,mapping,f1,x1,f2,f3;
       a=Accordion.New();
       panel=(els1=(x=(f=(mapping=Runtime.Tupled(function(tupledArg)
       {
        var header,el,_this;
        header=tupledArg[0];
        el=tupledArg[1];
        return List.ofArray([Default.H3(List.ofArray([Default.A(List.ofArray([(_this=Default.Attr(),_this.NewAttr("href","#")),Default.Text(header)]))])),Default.Div(List.ofArray([el]))]);
       }),function(list)
       {
        return List.map(mapping,list);
       }),f(els)),(f1=function(lists)
       {
        return List.concat(lists);
       },f1(x))),(x1=Default.Div(els1),(f2=(f3=function(el)
       {
        var el1;
        el1=el.Body;
        return jQuery(el1).accordion(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f3,w);
       }),(f2(x1),x1))));
       a.element=panel;
       return a;
      },
      New2:function(els)
      {
       return Accordion.New1(els,AccordionConfiguration.New());
      }
     }),
     AccordionConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     AccordionIconConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(AccordionIconConfiguration,{
        header:"ui-icon-triangle-1-e",
        headerSelected:"ui-icon-triangle-1-s"
       });
      }
     }),
     Autocomplete:Runtime.Class({
      OnChange:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("autocompletechange",function(x1,y)
        {
         (f(x1))(y.item);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnClose:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("autocompleteclose",function(x1)
        {
         f(x1);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnCreate:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("autocompletecreate",function(x1)
        {
         f(x1);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnFocus:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("autocompletefocus",function(x1,y)
        {
         (f(x1))(y.item);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnOpen:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("autocompleteopen",function(x1)
        {
         f(x1);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnSearch:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("autocompletesearch",function(x1)
        {
         f(x1);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnSelect:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("autocompleteselect",function(x1,y)
        {
         (f(x1))(y.item);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      Render:function()
      {
       return this.element.Render();
      },
      get_Body:function()
      {
       return this.element.get_Body();
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).autocomplete("widget");
      }
     },{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var a,f,f1;
       a=Autocomplete.New();
       f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).autocomplete(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       });
       f(el);
       a.element=el;
       return a;
      },
      New2:function(el)
      {
       return Autocomplete.New1(el,AutocompleteConfiguration.New());
      },
      New3:function()
      {
       return Autocomplete.New1(Default.Input(Runtime.New(T,{
        $:0
       })),AutocompleteConfiguration.New());
      },
      New4:function(conf)
      {
       return Autocomplete.New1(Default.Input(Runtime.New(T,{
        $:0
       })),conf);
      }
     }),
     AutocompleteConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Button:Runtime.Class({
      Disable:function()
      {
       this.isEnabled=false;
       return jQuery(this.element.Body).button("disable");
      },
      Enable:function()
      {
       this.isEnabled=true;
       return jQuery(this.element.Body).button("enable");
      },
      OnClick:function(f)
      {
       var x,f1,arg00,_this=this;
       x=this.element;
       f1=(arg00=function()
       {
        return function(ev)
        {
         if(_this.isEnabled)
          {
           return f(ev);
          }
         else
          {
           return null;
          }
        };
       },function(arg10)
       {
        return EventsPervasives.Events().OnClick(arg00,arg10);
       });
       return f1(x);
      },
      OnCreate:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("buttoncreate",function(x1)
        {
         f(x1);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      get_IsEnabled:function()
      {
       return this.isEnabled;
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).button("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var b,x,f,f1,f2;
       b=Button.New();
       b.isEnabled=true;
       x=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).button(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),f(el));
       f2=function(value)
       {
        value;
       };
       f2(x);
       b.element=el;
       return b;
      },
      New2:function(genEl,conf)
      {
       var button,x,f,f1;
       button=Button.New();
       button.isEnabled=true;
       button.element=(x=genEl(null),(f=(f1=function(el)
       {
        var el1;
        el1=el.Body;
        return jQuery(el1).button(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(x),x)));
       return button;
      },
      New3:function(conf)
      {
       return Button.New1(Default.Button(Runtime.New(T,{
        $:0
       })),conf);
      },
      New4:function(label)
      {
       var conf;
       conf=ButtonConfiguration.New();
       conf.label=label;
       return Button.New3(conf);
      }
     }),
     ButtonConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     ButtonIconsConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(ButtonIconsConfiguration,{
        primary:"ui-icon-gear",
        Secondary:"ui-icon-triangle-1-s"
       });
      }
     }),
     Datepicker:Runtime.Class({
      OnBeforeShow:function(f)
      {
       var x,f1,f2,_this1=this,f3;
       x=(f1=(f2=function()
       {
        var arg00;
        arg00=function()
        {
         return function(d)
         {
          var _this;
          return(f(jQuery((_this=_this1.element,_this.Body)).datepicker("getDate")))(d);
         };
        };
        return jQuery(_this1.element.Body).datepicker({
         beforeShow:function(x1,y)
         {
          (arg00(x1))(y);
         }
        });
       },function(w)
       {
        return Operators.OnBeforeRender(f2,w);
       }),f1(_this1));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnBeforeShowDay:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).datepicker({
         beforeShowDay:function(x1)
         {
          f(x1);
         }
        });
       },function(w)
       {
        return Operators.OnBeforeRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnChangeMonthYear:function(f)
      {
       var x,f1,f2,_this=this,f3;
       x=(f1=(f2=function()
       {
        return jQuery(_this.element.Body).datepicker({
         beforeShowDay:function(x1,y,z)
         {
          ((f(x1))(y))(z);
         }
        });
       },function(w)
       {
        return Operators.OnBeforeRender(f2,w);
       }),f1(_this));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnClose:function(f)
      {
       var x,f1,f2,_this1=this,f3;
       x=(f1=(f2=function()
       {
        var arg00;
        arg00=function()
        {
         return function(d)
         {
          var _this;
          return(f(jQuery((_this=_this1.element,_this.Body)).datepicker("getDate")))(d);
         };
        };
        return jQuery(_this1.element.Body).datepicker({
         onClose:function(x1,y)
         {
          (arg00(x1))(y);
         }
        });
       },function(w)
       {
        return Operators.OnBeforeRender(f2,w);
       }),f1(_this1));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      OnSelect:function(f)
      {
       var x,f1,f2,_this1=this,f3;
       x=(f1=(f2=function()
       {
        var arg00;
        arg00=function()
        {
         return function(d)
         {
          var _this;
          return(f(jQuery((_this=_this1.element,_this.Body)).datepicker("getDate")))(d);
         };
        };
        return jQuery(_this1.element.Body).datepicker({
         onSelect:function(x1,y)
         {
          (arg00(x1))(y);
         }
        });
       },function(w)
       {
        return Operators.OnBeforeRender(f2,w);
       }),f1(_this1));
       f3=function(value)
       {
        value;
       };
       return f3(x);
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).datepicker("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var dp,x,f,f1,f2;
       dp=Datepicker.New();
       dp.element=el;
       x=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).datepicker(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),f(el));
       f2=function(value)
       {
        value;
       };
       f2(x);
       return dp;
      },
      New2:function(el)
      {
       return Datepicker.New1(el,DatepickerConfiguration.New());
      },
      New3:function(conf)
      {
       return Datepicker.New1(Default.Div(Runtime.New(T,{
        $:0
       })),conf);
      },
      New4:function()
      {
       return Datepicker.New1(Default.Div(Runtime.New(T,{
        $:0
       })),DatepickerConfiguration.New());
      }
     }),
     DatepickerConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     DatepickerShowOptionsConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(DatepickerShowOptionsConfiguration,{
        showOptions:"up"
       });
      }
     }),
     Dialog:Runtime.Class({
      OnBeforeClose:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogbeforeclose",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnClose:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogclose",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogcreate",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDrag:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogdrag",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDragStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogdragstart",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDragStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogdragstop",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnFocus:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogfocus",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnOpen:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogopen",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnResize:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogresize",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnResizeStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogresizestart",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnResizeStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dialogresizestop",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).dialog("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var d,f,f1;
       d=Dialog.New();
       f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).dialog(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       });
       f(el);
       d.element=el;
       return d;
      },
      New2:function(el)
      {
       return Dialog.New1(el,DialogConfiguration.New());
      }
     }),
     DialogConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Draggable:Runtime.Class({
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dragcreate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDrag:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("drag",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dragstart",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dragstop",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).draggable("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var a,f,f1;
       a=Draggable.New();
       a.element=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).draggable(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(el),el));
       return a;
      },
      New2:function(el)
      {
       var conf;
       conf=DraggableConfiguration.New();
       return Draggable.New1(el,conf);
      }
     }),
     DraggableConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     DraggableStackConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(DraggableStackConfiguration,{
        group:"prouducts",
        min:50
       });
      }
     }),
     DraggablecursorAtConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(DraggablecursorAtConfiguration,{
        top:1,
        left:1
       });
      }
     }),
     Droppable:Runtime.Class({
      OnActivate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dropactivate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dropcreate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDeactivate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dropdeactivate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDrop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("drop",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnOut:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dropout",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnOver:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("dropover",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).droppable("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var a,f,f1;
       a=Droppable.New();
       a.element=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).droppable(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(el),el));
       return a;
      },
      New2:function(el)
      {
       var conf;
       conf=DroppableConfiguration.New();
       return Droppable.New1(el,conf);
      }
     }),
     DroppableConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Position:Runtime.Class({},{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var a,f,f1;
       a=Position.New();
       a.element=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).position(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(el),el));
       return a;
      },
      New2:function(el)
      {
       var conf;
       conf=PositionConfiguration.New();
       return Position.New1(el,conf);
      }
     }),
     PositionConfiguration:Runtime.Class({
      get_Of:function()
      {
       return this.ofTarget;
      },
      get_Offset:function()
      {
       return this.offsetTuple;
      },
      set_Of:function(t)
      {
       this.ofTarget=t;
       this.of=String(t);
      },
      set_Offset:function(pos)
      {
       var y,x;
       this.offsetTuple=pos;
       y=pos[1];
       x=pos[0];
       this.offset=Global.String(x)+" "+Global.String(y);
      }
     },{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Progressbar:Runtime.Class({
      OnChange:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("accordionchange",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnComplete:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("accordioncomplete",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("accordioncreate",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Value:function()
      {
       return jQuery(this.element.Body).progressbar("value");
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).progressbar("widget");
      },
      set_Value:function(v)
      {
       return jQuery(this.element.Body).progressbar("value",v);
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var pb,f,f1;
       pb=Progressbar.New();
       pb.element=el;
       f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).progressbar(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       });
       f(el);
       return pb;
      },
      New2:function(el)
      {
       return Progressbar.New1(el,ProgressbarConfiguration.New());
      },
      New3:function(conf)
      {
       return Progressbar.New1(Default.Div(Runtime.New(T,{
        $:0
       })),conf);
      },
      New4:function()
      {
       return Progressbar.New1(Default.Div(Runtime.New(T,{
        $:0
       })),ProgressbarConfiguration.New());
      }
     }),
     ProgressbarConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Resizable:Runtime.Class({
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("resizecreate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnResize:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("resize",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("resizestart",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("resizestop",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var a,f,f1;
       a=Resizable.New();
       a.element=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).resizable(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(el),el));
       return a;
      },
      New2:function(el)
      {
       var conf;
       conf=ResizableConfiguration.New();
       return Resizable.New1(el,conf);
      }
     }),
     ResizableConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Selectable:Runtime.Class({
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).selectable({
         create:function(x,y)
         {
          (f(x))(y.create);
         }
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnSelected:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).selectable({
         selected:function(x,y)
         {
          (f(x))(y.selected);
         }
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnSelecting:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).selectable({
         selecting:function(x,y)
         {
          (f(x))(y.selecting);
         }
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).selectable({
         start:function(x)
         {
          f(x);
         }
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).selectable({
         stop:function(x)
         {
          f(x);
         }
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnUnselected:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).selectable({
         unselected:function(x,y)
         {
          (f(x))(y.unselected);
         }
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnUnselecting:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).selectable({
         unselecting:function(x,y)
         {
          (f(x))(y.unselecting);
         }
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).selectable("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var a,f,f1;
       a=Selectable.New();
       a.element=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).selectable(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(el),el));
       return a;
      },
      New2:function(el)
      {
       var conf;
       conf=SelectableConfiguration.New();
       return Selectable.New1(el,conf);
      }
     }),
     SelectableConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Slider:Runtime.Class({
      OnChange:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sliderchange",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnSlide:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sliderslide",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sliderstart",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sliderstop",function(x)
        {
         f(x);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Value:function()
      {
       return jQuery(this.element.Body).slider("value");
      },
      get_Values:function()
      {
       return jQuery(this.element.Body).slider("values");
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).slider("widget");
      },
      set_Value:function(v)
      {
       return jQuery(this.element.Body).slider("value",v);
      },
      set_Values:function(v)
      {
       return jQuery(this.element.Body).slider("values",v);
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(conf)
      {
       var s,x,f,f1;
       s=Slider.New();
       s.element=(x=Default.Div(Runtime.New(T,{
        $:0
       })),(f=(f1=function(el)
       {
        var el1;
        el1=el.Body;
        return jQuery(el1).slider(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(x),x)));
       return s;
      },
      New2:function()
      {
       return Slider.New1(SliderConfiguration.New());
      }
     }),
     SliderConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Sortable:Runtime.Class({
      OnActivate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortactivate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnBeforeStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortbeforestop",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnChange:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortchange",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortcreate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDeactivate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortdeactivate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnOver:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortout",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnReceive:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortreceive",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnRemove:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortremove",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnSort:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sort",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStart:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortstart",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnStop:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortstop",function(event,ui)
        {
         (f(event))(ui);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnUpdate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("sortupdate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Widget:function()
      {
       return this.sortable("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(el,conf)
      {
       var s,f,f1;
       s=Sortable.New();
       s.element=(f=(f1=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).sortable(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f1,w);
       }),(f(el),el));
       return s;
      },
      New2:function(el)
      {
       var conf;
       conf=SortableConfiguration.New();
       return Sortable.New1(el,conf);
      }
     }),
     SortableConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     Tabs:Runtime.Class({
      Add:function(el,label,ix)
      {
       var id,tab,_this,url;
       id="id"+Math.round(Math.random()*100000000);
       tab=Operators.add(Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("id",id))])),List.ofArray([el]));
       this.element.AppendI(tab);
       url="#"+id;
       return jQuery(this.element.Body).tabs("add",url,label,ix);
      },
      Add1:function(el,label)
      {
       var id,tab,_this,url,index;
       id="id"+Math.round(Math.random()*100000000);
       tab=Operators.add(Default.Div(List.ofArray([(_this=Default.Attr(),_this.NewAttr("id",id))])),List.ofArray([el]));
       this.element.AppendI(tab);
       url="#"+id;
       index=this.get_Length();
       return jQuery(this.element.Body).tabs("add",url,label,index);
      },
      OnAdd:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("tabsadd",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnCreate:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("tabscreate",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnDisable:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("tabsdisable",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnEnable:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("tabsenable",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnLoad:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("tabsload",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnSelect:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("tabsselect",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      OnShow:function(f)
      {
       var f1,f2,_this=this;
       f1=(f2=function()
       {
        return jQuery(_this.element.Body).bind("tabsshow",function(x,y)
        {
         (f(x))(y);
        });
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       });
       return f1(_this);
      },
      get_Length:function()
      {
       return jQuery(this.element.Body).tabs("length");
      },
      get_Widget:function()
      {
       return jQuery(this.element.Body).tabs("widget");
      }
     },{
      New:function()
      {
       var r;
       r=Pagelet.New();
       return Runtime.New(this,r);
      },
      New1:function(els,conf)
      {
       var el,itemPanels,f,mapping,ul,x1,tabs,f1,f2;
       el=(itemPanels=(f=(mapping=Runtime.Tupled(function(tupledArg)
       {
        var label,panel,id,item,_this,x,tab,_this1;
        label=tupledArg[0];
        panel=tupledArg[1];
        id="id"+Math.round(Math.random()*100000000);
        item=Default.LI(List.ofArray([Default.A(List.ofArray([(_this=Default.Attr(),(x="#"+id,_this.NewAttr("href",x))),Default.Text(label)])),panel]));
        tab=Operators.add(Default.Div(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("id",id))])),List.ofArray([panel]));
        return[item,tab];
       }),function(list)
       {
        return List.map(mapping,list);
       }),f(els)),(ul=(x1=Seq.map(Runtime.Tupled(function(tuple)
       {
        return tuple[0];
       }),itemPanels),Default.UL(x1)),Operators.add(Default.Div(List.ofArray([ul])),List.map(Runtime.Tupled(function(tuple)
       {
        return tuple[1];
       }),itemPanels))));
       tabs=Tabs.New();
       tabs.element=(f1=(f2=function(el1)
       {
        var el2;
        el2=el1.Body;
        return jQuery(el2).tabs(conf);
       },function(w)
       {
        return Operators.OnAfterRender(f2,w);
       }),(f1(el),el));
       return tabs;
      },
      New2:function(els)
      {
       return Tabs.New1(els,TabsConfiguration.New());
      }
     }),
     TabsAjaxOptionsConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(TabsAjaxOptionsConfiguration,{
        ajaxOptions:false
       });
      }
     }),
     TabsConfiguration:Runtime.Class({},{
      New:function()
      {
       var r;
       r={};
       return Runtime.New(this,r);
      }
     }),
     TabsCookieConfiguration:Runtime.Class({},{
      get_Default:function()
      {
       return Runtime.New(TabsCookieConfiguration,{
        cookie:30
       });
      }
     }),
     TabsFxConfiguration:Runtime.Class({},{
      get_Dafault:function()
      {
       return Runtime.New(TabsFxConfiguration,{
        fx:"toggle"
       });
      }
     }),
     Target:Runtime.Class({
      toString:function()
      {
       var ev,str,el;
       if(this.$==1)
        {
         ev=this.$0;
         return ev;
        }
       else
        {
         if(this.$==2)
          {
           str=this.$0;
           return"#"+str;
          }
         else
          {
           el=this.$0;
           return el;
          }
        }
      }
     }),
     Utils:{
      Pagelet:Runtime.Class({
       Render:function()
       {
        return this.element.Render();
       },
       get_Body:function()
       {
        return this.element.Body;
       }
      },{
       New:function()
       {
        var r;
        r={};
        return Runtime.New(this,r);
       }
      })
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  JQueryUI=Runtime.Safe(WebSharper.JQueryUI);
  Accordion=Runtime.Safe(JQueryUI.Accordion);
  Utils=Runtime.Safe(JQueryUI.Utils);
  Pagelet=Runtime.Safe(Utils.Pagelet);
  jQuery=Runtime.Safe(Global.jQuery);
  Html=Runtime.Safe(WebSharper.Html);
  Operators=Runtime.Safe(Html.Operators);
  List=Runtime.Safe(WebSharper.List);
  Default=Runtime.Safe(Html.Default);
  AccordionConfiguration=Runtime.Safe(JQueryUI.AccordionConfiguration);
  AccordionIconConfiguration=Runtime.Safe(JQueryUI.AccordionIconConfiguration);
  Autocomplete=Runtime.Safe(JQueryUI.Autocomplete);
  AutocompleteConfiguration=Runtime.Safe(JQueryUI.AutocompleteConfiguration);
  T=Runtime.Safe(List.T);
  Button=Runtime.Safe(JQueryUI.Button);
  EventsPervasives=Runtime.Safe(Html.EventsPervasives);
  ButtonConfiguration=Runtime.Safe(JQueryUI.ButtonConfiguration);
  ButtonIconsConfiguration=Runtime.Safe(JQueryUI.ButtonIconsConfiguration);
  Datepicker=Runtime.Safe(JQueryUI.Datepicker);
  DatepickerConfiguration=Runtime.Safe(JQueryUI.DatepickerConfiguration);
  DatepickerShowOptionsConfiguration=Runtime.Safe(JQueryUI.DatepickerShowOptionsConfiguration);
  Dialog=Runtime.Safe(JQueryUI.Dialog);
  DialogConfiguration=Runtime.Safe(JQueryUI.DialogConfiguration);
  Draggable=Runtime.Safe(JQueryUI.Draggable);
  DraggableConfiguration=Runtime.Safe(JQueryUI.DraggableConfiguration);
  DraggableStackConfiguration=Runtime.Safe(JQueryUI.DraggableStackConfiguration);
  DraggablecursorAtConfiguration=Runtime.Safe(JQueryUI.DraggablecursorAtConfiguration);
  Droppable=Runtime.Safe(JQueryUI.Droppable);
  DroppableConfiguration=Runtime.Safe(JQueryUI.DroppableConfiguration);
  Position=Runtime.Safe(JQueryUI.Position);
  PositionConfiguration=Runtime.Safe(JQueryUI.PositionConfiguration);
  String=Runtime.Safe(Global.String);
  Progressbar=Runtime.Safe(JQueryUI.Progressbar);
  ProgressbarConfiguration=Runtime.Safe(JQueryUI.ProgressbarConfiguration);
  Resizable=Runtime.Safe(JQueryUI.Resizable);
  ResizableConfiguration=Runtime.Safe(JQueryUI.ResizableConfiguration);
  Selectable=Runtime.Safe(JQueryUI.Selectable);
  SelectableConfiguration=Runtime.Safe(JQueryUI.SelectableConfiguration);
  Slider=Runtime.Safe(JQueryUI.Slider);
  SliderConfiguration=Runtime.Safe(JQueryUI.SliderConfiguration);
  Sortable=Runtime.Safe(JQueryUI.Sortable);
  SortableConfiguration=Runtime.Safe(JQueryUI.SortableConfiguration);
  Tabs=Runtime.Safe(JQueryUI.Tabs);
  Math=Runtime.Safe(Global.Math);
  Seq=Runtime.Safe(WebSharper.Seq);
  TabsConfiguration=Runtime.Safe(JQueryUI.TabsConfiguration);
  TabsAjaxOptionsConfiguration=Runtime.Safe(JQueryUI.TabsAjaxOptionsConfiguration);
  TabsCookieConfiguration=Runtime.Safe(JQueryUI.TabsCookieConfiguration);
  return TabsFxConfiguration=Runtime.Safe(JQueryUI.TabsFxConfiguration);
 });
 Runtime.OnLoad(function()
 {
  Runtime.Inherit(Accordion,Pagelet);
  Runtime.Inherit(Button,Pagelet);
  Runtime.Inherit(Datepicker,Pagelet);
  Runtime.Inherit(Dialog,Pagelet);
  Runtime.Inherit(Draggable,Pagelet);
  Runtime.Inherit(Droppable,Pagelet);
  Runtime.Inherit(Position,Pagelet);
  Runtime.Inherit(Progressbar,Pagelet);
  Runtime.Inherit(Resizable,Pagelet);
  Runtime.Inherit(Selectable,Pagelet);
  Runtime.Inherit(Slider,Pagelet);
  Runtime.Inherit(Sortable,Pagelet);
  Runtime.Inherit(Tabs,Pagelet);
 });
}());
