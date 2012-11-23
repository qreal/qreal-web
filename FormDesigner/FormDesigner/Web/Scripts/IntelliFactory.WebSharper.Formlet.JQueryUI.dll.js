(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Array,WebSharper,Formlet,JQueryUI,Utils,Reactive,Reactive1,List,Arrays,_HotStream_1,JQueryUI1,Accordion,jQuery,Html,Operators,Lazy,Formlet1,Base,_Result_1,Seq,Default,EventsPervasives,Autocomplete,AutocompleteConfiguration,ButtonConfiguration,Controls,T,Button,Operators1,Datepicker,Dialog,DragAndDropConfig,Collections,Dictionary,DraggableConfiguration,Math,Draggable,Enumerator,Droppable,CssConstants,SliderConfiguration,SliderConfiguration1,Slider,Control,_FSharpEvent_1,Sortable,Util,Formlet2,Tabs,Body,Tree,_Edit_1,_Tree_1,_Form_2,Data,Option,Enhance,ManyConfiguration,DialogConfiguration,Enhance1,ValidationIconConfiguration,_FormletProvider_1;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Formlet:{
     JQueryUI:{
      Controls:{
       AccordionChoose:function(fs)
       {
        var f;
        f=function()
        {
         var res,fs1,x,f1,mapping,f3,state,accordion,accordion1,update,reset,accordion2,state1;
         res=Array(fs.get_Length());
         fs1=(x=(f1=(mapping=function()
         {
          return Runtime.Tupled(function(tupledArg)
          {
           var l,f2,patternInput,form,elem;
           l=tupledArg[0];
           f2=tupledArg[1];
           patternInput=Utils.FormAndElement(f2);
           form=patternInput[0];
           elem=patternInput[1];
           return[l,Reactive1.Heat(form.State),form.Notify,elem];
          });
         },function(list)
         {
          return List.mapi(mapping,list);
         }),f1(fs)),(f3=function(list)
         {
          return Arrays.ofSeq(list);
         },f3(x)));
         state=_HotStream_1.New1();
         accordion=function()
         {
          var x1,x2,x3,f2,mapping1,f4,f5,f6,f7;
          x1=(x2=(x3=(f2=(mapping1=Runtime.Tupled(function(tupledArg)
          {
           var label,_arg1,_arg2,elem;
           label=tupledArg[0];
           _arg1=tupledArg[1];
           _arg2=tupledArg[2];
           elem=tupledArg[3];
           return[label,elem];
          }),function(array)
          {
           return Arrays.map(mapping1,array);
          }),f2(fs1)),(f4=function(array)
          {
           return List.ofArray(array);
          },f4(x3))),(f5=function(arg00)
          {
           return Accordion.New2(arg00);
          },f5(x2)));
          f6=(f7=function(acc)
          {
           update(0);
           return jQuery(acc.element.Body).accordion("activate",0);
          },function(w)
          {
           return Operators.OnAfterRender(f7,w);
          });
          f6(x1);
          return x1;
         };
         accordion1=Lazy.Create(accordion);
         update=function(index)
         {
          var patternInput,s;
          patternInput=fs1[index];
          s=patternInput[1];
          return state.Trigger(s);
         };
         reset=function()
         {
          var f2,action,self;
          f2=(action=Runtime.Tupled(function(tupledArg)
          {
           var _arg3,_arg4,n,_arg5;
           _arg3=tupledArg[0];
           _arg4=tupledArg[1];
           n=tupledArg[2];
           _arg5=tupledArg[3];
           return n(null);
          }),function(array)
          {
           return Arrays.iter(action,array);
          });
          f2(fs1);
          self=Lazy.Force(accordion1);
          jQuery(self.element.Body).accordion("activate",0);
          return update(0);
         };
         accordion2=Lazy.Force(accordion1);
         accordion2.OnChange(function()
         {
          return function()
          {
           var x1,x2,f2;
           x1=(x2=accordion2.get_Body(),(f2=function(acc)
           {
            return jQuery(acc).accordion("option","active");
           },f2(x2)));
           return update(x1);
          };
         });
         state1=Reactive1.Switch(state);
         return[accordion2,reset,state1];
        };
        return Utils.MkFormlet(f);
       },
       AccordionList:function(fs)
       {
        var f;
        f=function()
        {
         var fs1,f1,mapping,state,state1,x,f3,mapping1,f4,acc,x1,f5,mapping2,f6,reset;
         fs1=(f1=(mapping=Runtime.Tupled(function(tupledArg)
         {
          var l,f2,patternInput,form,elem;
          l=tupledArg[0];
          f2=tupledArg[1];
          patternInput=Utils.FormAndElement(f2);
          form=patternInput[0];
          elem=patternInput[1];
          return[l,form,elem];
         }),function(list)
         {
          return List.map(mapping,list);
         }),f1(fs));
         state=(state1=(x=(f3=(mapping1=Runtime.Tupled(function(tupledArg)
         {
          var _arg1,f2,_arg2;
          _arg1=tupledArg[0];
          f2=tupledArg[1];
          _arg2=tupledArg[2];
          return f2.State;
         }),function(list)
         {
          return List.map(mapping1,list);
         }),f3(fs1)),(f4=function(ios)
         {
          return Reactive1.Sequence(ios);
         },f4(x))),Reactive1.Select(state1,function(rs)
         {
          return _Result_1.Sequence(rs);
         }));
         acc=(x1=(f5=(mapping2=Runtime.Tupled(function(tupledArg)
         {
          var label,_arg3,elem;
          label=tupledArg[0];
          _arg3=tupledArg[1];
          elem=tupledArg[2];
          return[label,elem];
         }),function(list)
         {
          return List.map(mapping2,list);
         }),f5(fs1)),(f6=function(arg00)
         {
          return Accordion.New2(arg00);
         },f6(x1)));
         reset=function()
         {
          var f2,action;
          jQuery(acc.element.Body).accordion("activate",0);
          f2=(action=Runtime.Tupled(function(tupledArg)
          {
           var _arg4,f7,_arg5;
           _arg4=tupledArg[0];
           f7=tupledArg[1];
           _arg5=tupledArg[2];
           return f7.Notify.call(null,null);
          }),function(list)
          {
           return Seq.iter(action,list);
          });
          return f2(fs1);
         };
         return[acc,reset,state];
        };
        return Utils.MkFormlet(f);
       },
       Autocomplete:function(def,source)
       {
        var f;
        f=function()
        {
         var state,input,_this,upd,f2,arg001,f3,arg002,ac,returnVal,reset;
         state=_HotStream_1.New(Runtime.New(_Result_1,{
          $:0,
          $0:def
         }));
         input=Default.Input(List.ofArray([(_this=Default.Attr(),_this.NewAttr("value",def))]));
         upd=function()
         {
          var x,f1;
          x=Runtime.New(_Result_1,{
           $:0,
           $0:input.get_Value()
          });
          f1=function(arg00)
          {
           return state.Trigger(arg00);
          };
          return f1(x);
         };
         f2=(arg001=function()
         {
          return function()
          {
           return upd(null);
          };
         },function(arg10)
         {
          return EventsPervasives.Events().OnKeyUp(arg001,arg10);
         });
         f2(input);
         f3=(arg002=function()
         {
          return upd(null);
         },function(arg10)
         {
          return EventsPervasives.Events().OnChange(arg002,arg10);
         });
         f3(input);
         ac=Autocomplete.New1(input,(returnVal=[AutocompleteConfiguration.New()],(null,returnVal[0].source=Arrays.ofSeq(source),returnVal[0])));
         ac.OnChange(function()
         {
          return function()
          {
           return upd(null);
          };
         });
         reset=function()
         {
          input.set_Value(def);
          return state.Trigger(Runtime.New(_Result_1,{
           $:0,
           $0:def
          }));
         };
         return[ac,reset,state];
        };
        return Utils.MkFormlet(f);
       },
       Button:function(label)
       {
        var x,returnVal,f;
        x=(returnVal=[ButtonConfiguration.New()],(null,returnVal[0].label=label,returnVal[0]));
        f=function(conf)
        {
         return Controls.CustomButton(conf);
        };
        return f(x);
       },
       CustomButton:function(conf)
       {
        var f;
        f=function()
        {
         var state,count,button,genEl,matchValue,reset;
         state=_HotStream_1.New(Runtime.New(_Result_1,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
         count={
          contents:0
         };
         button=(genEl=function()
         {
          return Default.Button(List.ofArray([Default.Text(conf.label)]));
         },Button.New2(genEl,conf));
         try
         {
          button.Render();
         }
         catch(matchValue)
         {
         }
         button.OnClick(function()
         {
          state.Trigger(Runtime.New(_Result_1,{
           $:0,
           $0:count.contents
          }));
          return Operators1.Increment(count);
         });
         reset=function()
         {
          count.contents=0;
          return state.Trigger(Runtime.New(_Result_1,{
           $:1,
           $0:Runtime.New(T,{
            $:0
           })
          }));
         };
         return[button,reset,state];
        };
        return Utils.MkFormlet(f);
       },
       Datepicker:function(def)
       {
        return Controls.DatepickerInput(true,def);
       },
       DatepickerInput:function(showCalendar,def)
       {
        var f;
        f=function()
        {
         var inp,arg0,date,inp1,state,date1,reset,f1,f2;
         inp=showCalendar?{
          $:0
         }:(arg0=Default.Input(Runtime.New(T,{
          $:0
         })),{
          $:1,
          $0:arg0
         });
         date=inp.$==1?(inp1=inp.$0,Datepicker.New2(inp1)):Datepicker.New4();
         state=def.$==0?_HotStream_1.New1():(date1=def.$0,_HotStream_1.New(Runtime.New(_Result_1,{
          $:0,
          $0:date1
         })));
         date.OnSelect(function(date2)
         {
          return function()
          {
           return state.Trigger(Runtime.New(_Result_1,{
            $:0,
            $0:date2
           }));
          };
         });
         reset=function()
         {
          var inp2,d;
          if(def.$==0)
           {
            if(inp.$==0)
             {
             }
            else
             {
              inp2=inp.$0;
              inp2.set_Value("");
             }
            return state.Trigger(Runtime.New(_Result_1,{
             $:1,
             $0:Runtime.New(T,{
              $:0
             })
            }));
           }
          else
           {
            d=def.$0;
            jQuery(date.element.Body).datepicker("setDate",d);
            return state.Trigger(Runtime.New(_Result_1,{
             $:0,
             $0:d
            }));
           }
         };
         f1=(f2=function()
         {
          return reset(null);
         },function(w)
         {
          return Operators.OnAfterRender(f2,w);
         });
         f1(date);
         return[date,reset,state];
        };
        return Utils.MkFormlet(f);
       },
       Dialog:function(genEl)
       {
        var f;
        f=function()
        {
         var state,dialog,reset;
         state=_HotStream_1.New(Runtime.New(_Result_1,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
         dialog=Dialog.New2(genEl(null));
         dialog.OnClose(function()
         {
          return state.Trigger(Runtime.New(_Result_1,{
           $:0,
           $0:null
          }));
         });
         jQuery(dialog.element.Body).dialog("enable");
         jQuery(dialog.element.Body).dialog("open");
         reset=function()
         {
          jQuery(dialog.element.Body).dialog("close");
          return state.Trigger(Runtime.New(_Result_1,{
           $:1,
           $0:Runtime.New(T,{
            $:0
           })
          }));
         };
         return[Default.Div(List.ofArray([dialog])),reset,state];
        };
        return Utils.MkFormlet(f);
       },
       DragAndDrop:function(dc,vs)
       {
        var f;
        f=function()
        {
         var dc1,dc2,resList,state,dict,dragElem,dropElem,dragCnf,idDrs,f1,mapping,ids,draggables,initials,dropPanel,update,addItem,dropCnf,reset,droppable,clo1,dragPanel,body,x5,f6,f7;
         dc1=dc.$==0?DragAndDropConfig.get_Default():(dc2=dc.$0,dc2);
         resList={
          contents:Runtime.New(T,{
           $:0
          })
         };
         state=_HotStream_1.New1();
         dict=Dictionary.New2();
         dragElem=function(id,label)
         {
          var _this;
          return Operators.add(Operators.add(Operators.add(Default.Span(Controls.GetStyle(dc1.DraggableStyle)),List.ofArray([Default.Attr().Class(dc1.DraggableClass)])),List.ofArray([(_this=Default.Attr(),_this.NewAttr("id",id))])),List.ofArray([Default.Text(label)]));
         };
         dropElem=function(id,label)
         {
          var _this;
          return Operators.add(Operators.add(Operators.add(Default.Span(Controls.GetStyle(dc1.DroppableStyle)),List.ofArray([Default.Attr().Class(dc1.DroppableClass)])),List.ofArray([(_this=Default.Attr(),_this.NewAttr("id",id))])),List.ofArray([Default.Text(label)]));
         };
         dragCnf=DraggableConfiguration.New();
         dragCnf.helper="clone";
         idDrs=(f1=(mapping=Runtime.Tupled(function(tupledArg)
         {
          var label,value,added,id,elem;
          label=tupledArg[0];
          value=tupledArg[1];
          added=tupledArg[2];
          id="id"+Math.round(Math.random()*100000000);
          dict.set_Item(id,[label,value]);
          elem=dragElem(id,label);
          return[id,Draggable.New1(elem,dragCnf),added];
         }),function(list)
         {
          return List.map(mapping,list);
         }),f1(vs));
         ids=List.map(Runtime.Tupled(function(tupledArg)
         {
          var x,_arg1,_arg2;
          x=tupledArg[0];
          _arg1=tupledArg[1];
          _arg2=tupledArg[2];
          return x;
         }),idDrs);
         draggables=List.map(Runtime.Tupled(function(tupledArg)
         {
          var _arg3,y,_arg4;
          _arg3=tupledArg[0];
          y=tupledArg[1];
          _arg4=tupledArg[2];
          return y;
         }),idDrs);
         initials=List.choose(Runtime.Tupled(function(tupledArg)
         {
          var id,_arg5,add;
          id=tupledArg[0];
          _arg5=tupledArg[1];
          add=tupledArg[2];
          if(add)
           {
            return{
             $:1,
             $0:id
            };
           }
          else
           {
            return{
             $:0
            };
           }
         }),idDrs);
         dropPanel=Operators.add(Operators.add(Default.Div(List.ofArray([Default.Attr().Class(dc1.DropContainerClass)])),Controls.GetStyle(dc1.DropContainerStyle)),Controls.GetStyle(dc1.DropContainerStyle));
         update=function()
         {
          var x,x1,x2,x3,f2,f3,mapping1,f4,f5;
          x=(x1=(x2=(x3=resList.contents,(f2=function(list)
          {
           return List.rev(list);
          },f2(x3))),(f3=(mapping1=Runtime.Tupled(function(tupledArg)
          {
           var _arg6,x4;
           _arg6=tupledArg[0];
           x4=tupledArg[1];
           return x4;
          }),function(list)
          {
           return List.map(mapping1,list);
          }),f3(x2))),(f4=function(arg0)
          {
           return Runtime.New(_Result_1,{
            $:0,
            $0:arg0
           });
          },f4(x1)));
          f5=function(arg00)
          {
           return state.Trigger(arg00);
          };
          return f5(x);
         };
         addItem=function(id)
         {
          var patternInput,value,label,newId,isAdded,p,l,elem,x,f2,arg00;
          patternInput=dict.get_Item(id);
          value=patternInput[1];
          label=patternInput[0];
          newId="id"+Math.round(Math.random()*100000000);
          isAdded=(p=Runtime.Tupled(function(tupledArg)
          {
           var i,_arg7;
           i=tupledArg[0];
           _arg7=tupledArg[1];
           return i===id;
          }),(l=resList.contents,Seq.exists(p,l)));
          if(!dc1.AcceptMany)
           {
            jQuery("#"+id).hide();
           }
          if(!isAdded?true:dc1.AcceptMany)
           {
            elem=(x=dropElem(newId,label),(f2=(arg00=function(el)
            {
             return function()
             {
              el["HtmlProvider@32"].Remove(el.Body);
              resList.contents=List.filter(Runtime.Tupled(function(tupledArg)
              {
               var elId,_arg8;
               elId=tupledArg[0];
               _arg8=tupledArg[1];
               return elId!==newId;
              }),resList.contents);
              if(!dc1.AcceptMany)
               {
                jQuery("#"+id).show();
               }
              return update(null);
             };
            },function(arg10)
            {
             return EventsPervasives.Events().OnClick(arg00,arg10);
            }),(f2(x),x)));
            dropPanel.AppendI(elem);
            resList.contents=Runtime.New(T,{
             $:1,
             $0:[newId,value],
             $1:resList.contents
            });
            return update(null);
           }
          else
           {
            return null;
           }
         };
         dropCnf={
          accept:"."+dc1.DraggableClass,
          drop:Runtime.Tupled(function(tupledArg)
          {
           var ev,d,value;
           ev=tupledArg[0];
           d=tupledArg[1];
           return addItem((value=d.draggable.attr("id"),Global.String(value)));
          })
         };
         reset=function()
         {
          var enumerator,id;
          enumerator=Enumerator.Get(ids);
          while(enumerator.MoveNext())
           {
            id=enumerator.get_Current();
            jQuery("#"+id).show();
            resList.contents=Runtime.New(T,{
             $:0
            });
            dropPanel["HtmlProvider@32"].Clear(dropPanel.Body);
            Seq.iter(addItem,initials);
            update(null);
           }
         };
         droppable=Droppable.New1(dropPanel,(clo1=function(value)
         {
          return value;
         },clo1(dropCnf)));
         dragPanel=Operators.add(Operators.add(Default.Div(List.ofArray([Default.Attr().Class(dc1.DragContainerClass)])),Controls.GetStyle(dc1.DragContainerStyle)),draggables);
         body=(x5=Default.Div(List.ofArray([dragPanel,dropPanel])),(f6=(f7=function()
         {
          return reset(null);
         },function(w)
         {
          return Operators.OnAfterRender(f7,w);
         }),(f6(x5),x5)));
         return[body,reset,state];
        };
        return Utils.MkFormlet(f);
       },
       DragAndDropConfig:Runtime.Class({},{
        get_Default:function()
        {
         var DragContainerStyle,DroppableStyle,DraggableStyle;
         DragContainerStyle={
          $:0
         };
         DroppableStyle={
          $:0
         };
         DraggableStyle={
          $:0
         };
         return Runtime.New(DragAndDropConfig,{
          AcceptMany:true,
          DropContainerClass:CssConstants.DropContainerClass(),
          DragContainerClass:CssConstants.DragContainerClass(),
          DroppableClass:CssConstants.DroppableClass(),
          DraggableClass:CssConstants.DraggableClass(),
          DropContainerStyle:{
           $:0
          },
          DragContainerStyle:DragContainerStyle,
          DroppableStyle:DroppableStyle,
          DraggableStyle:DraggableStyle
         });
        }
       }),
       GetClass:function(c)
       {
        var v;
        if(c.$==0)
         {
          return Runtime.New(T,{
           $:0
          });
         }
        else
         {
          v=c.$0;
          return List.ofArray([Default.Attr().Class(v)]);
         }
       },
       GetStyle:function(c)
       {
        var v,_this;
        if(c.$==0)
         {
          return Runtime.New(T,{
           $:0
          });
         }
        else
         {
          v=c.$0;
          return List.ofArray([(_this=Default.Attr(),_this.NewAttr("style",v))]);
         }
       },
       InputDatepicker:function(def)
       {
        return Controls.DatepickerInput(false,def);
       },
       OnSelect:function(tabs,f)
       {
        var f1,f2;
        f1=(f2=function()
        {
         return jQuery(tabs.element.el).tabs({
          select:function(x,ui)
          {
           f(ui.index);
          }
         });
        },function(w)
        {
         return Operators.OnAfterRender(f2,w);
        });
        return f1(tabs);
       },
       Slider:function(conf)
       {
        var f;
        f=function()
        {
         var conf1,c,jqConf,returnVal,matchValue,b,matchValue1,style,width,height,matchValue2,h1,_this,x,w1,_this1,x1,h2,w2,_this2,x2,slider,state,reset,slider1,x6,f4,f5;
         conf1=conf.$==0?SliderConfiguration.get_Default():(c=conf.$0,c);
         jqConf=(returnVal=[SliderConfiguration1.New()],(null,returnVal[0].animate=conf1.Animate,returnVal[0].values=conf1.Values,returnVal[0].min=conf1.Min,returnVal[0].max=conf1.Max,returnVal[0]));
         matchValue=conf1.Range;
         if(matchValue.$==2)
          {
           jqConf.range="max";
          }
         else
          {
           if(matchValue.$==1)
            {
             jqConf.range="min";
            }
           else
            {
             b=matchValue.$0;
             jqConf.range=b;
            }
          }
         matchValue1=conf1.Orientation;
         if(matchValue1==="vertical")
          {
           jqConf.orientation="vertical";
          }
         else
          {
           jqConf.orientation="horizontal";
          }
         style=(width=function(w)
         {
          return"width: "+Global.String(w)+"px;";
         },(height=function(h)
         {
          return"height: "+Global.String(h)+"px;";
         },(matchValue2=[conf1.Width,conf1.Height],matchValue2[0].$==0?matchValue2[1].$==0?Runtime.New(T,{
          $:0
         }):(h1=matchValue2[1].$0,List.ofArray([(_this=Default.Attr(),(x=height(h1),_this.NewAttr("style",x)))])):matchValue2[1].$==0?(w1=matchValue2[0].$0,List.ofArray([(_this1=Default.Attr(),(x1=width(w1),_this1.NewAttr("style",x1)))])):(h2=matchValue2[1].$0,(w2=matchValue2[0].$0,List.ofArray([(_this2=Default.Attr(),(x2=width(w2)+height(h2),_this2.NewAttr("style",x2)))]))))));
         slider=Slider.New1(jqConf);
         state=_HotStream_1.New1();
         slider.OnChange(function()
         {
          var x3,x4,x5,f1,f2,f3;
          x3=(x4=(x5=slider.get_Values(),(f1=function(array)
          {
           return List.ofArray(array);
          },f1(x5))),(f2=function(arg0)
          {
           return Runtime.New(_Result_1,{
            $:0,
            $0:arg0
           });
          },f2(x4)));
          f3=function(arg00)
          {
           return state.Trigger(arg00);
          };
          return f3(x3);
         });
         reset=function()
         {
          var x3,x4,x5,f1,f2,f3;
          slider.set_Values(conf1.Values);
          x3=(x4=(x5=conf1.Values,(f1=function(array)
          {
           return List.ofArray(array);
          },f1(x5))),(f2=function(arg0)
          {
           return Runtime.New(_Result_1,{
            $:0,
            $0:arg0
           });
          },f2(x4)));
          f3=function(arg00)
          {
           return state.Trigger(arg00);
          };
          return f3(x3);
         };
         slider1=(x6=Operators.add(Default.Div(style),List.ofArray([slider])),(f4=(f5=function()
         {
          return reset(null);
         },function(w)
         {
          return Operators.OnAfterRender(f5,w);
         }),(f4(x6),x6)));
         return[slider1,reset,state];
        };
        return Utils.MkFormlet(f);
       },
       SliderConfiguration:Runtime.Class({},{
        get_Default:function()
        {
         return Runtime.New(SliderConfiguration,{
          Animate:false,
          Orientation:"horizontal",
          Values:[0],
          Min:0,
          Max:100,
          Width:{
           $:0
          },
          Height:{
           $:0
          },
          Range:{
           $:0,
           $0:false
          }
         });
        }
       }),
       Sortable:function(fs)
       {
        var f;
        f=function()
        {
         var dict,stateEv,state,x,f3,state1,list1,_this,stopEv,config,sortList,clo1,update,x3,f4,reset,list2,f5,f6;
         dict=Dictionary.New2();
         stateEv=_HotStream_1.New1();
         state=(x=Reactive1.Select(stateEv,function(ids)
         {
          var x1,x2,f1,mapping,f2;
          x1=(x2=(f1=(mapping=function(id)
          {
           return dict.get_Item(id);
          },function(list)
          {
           return List.map(mapping,list);
          }),f1(ids)),(f2=function(ios)
          {
           return Reactive1.Sequence(ios);
          },f2(x2)));
          return Reactive1.Select(x1,function(source)
          {
           return List.ofSeq(source);
          });
         }),(f3=function(io)
         {
          return Reactive1.Switch(io);
         },f3(x)));
         state1=Reactive1.Select(state,function(arg00)
         {
          return _Result_1.Sequence(arg00);
         });
         list1=Default.OL(List.ofArray([(_this=Default.Attr(),_this.NewAttr("style","list-style-type: none; margin: 0; padding: 0;"))]));
         stopEv=_FSharpEvent_1.New();
         config={
          stop:function()
          {
           return stopEv.event.Trigger(null);
          }
         };
         sortList=Sortable.New1(list1,(clo1=function(value)
         {
          return value;
         },clo1(config)));
         update=function()
         {
          var x1,x2,f1,f2;
          x1=(x2=jQuery(sortList.element.Body).sortable("toArray"),(f1=function(array)
          {
           return List.ofArray(array);
          },f1(x2)));
          f2=function(arg00)
          {
           return stateEv.Trigger(arg00);
          };
          return f2(x1);
         };
         x3=Util.subscribeTo(stopEv.event,function()
         {
          return update(null);
         });
         f4=function(value)
         {
          value;
         };
         f4(x3);
         reset=function()
         {
          var x1,f1,mapping,f2,action;
          dict.Clear();
          list1["HtmlProvider@32"].Clear(list1.Body);
          x1=(f1=(mapping=function(formlet)
          {
           var patternInput,form,elem,id,icon,tbl,_this1;
           patternInput=Utils.FormAndElement(formlet);
           form=patternInput[0];
           elem=patternInput[1];
           id="id"+Math.round(Math.random()*100000000);
           dict.set_Item(id,Reactive1.Heat(form.State));
           icon=Default.Span(List.ofArray([Default.Attr().Class("ui-icon ui-icon-arrowthick-2-n-s")]));
           tbl=Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([Default.TD(List.ofArray([icon])),Default.TD(List.ofArray([elem]))]))]))]));
           return Operators.add(Default.LI(List.ofArray([(_this1=Default.Attr(),_this1.NewAttr("id",id))])),List.ofArray([tbl]));
          },function(list)
          {
           return List.map(mapping,list);
          }),f1(fs));
          f2=(action=function(el)
          {
           return list1.AppendI(el);
          },function(list)
          {
           return Seq.iter(action,list);
          });
          f2(x1);
          return update(null);
         };
         list2=(f5=(f6=function()
         {
          return reset(null);
         },function(w)
         {
          return Operators.OnAfterRender(f6,w);
         }),(f5(list1),list1));
         return[list2,reset,state1];
        };
        return Formlet2.BuildFormlet(f);
       },
       TabsChoose:function(defIndex,fs)
       {
        var f;
        f=function()
        {
         var res,fs1,x,f1,mapping,f3,states,state,update,reset,tabs1,x1,x2,x3,f4,mapping1,f5,f6,f7,f8;
         res=Array(fs.get_Length());
         fs1=(x=(f1=(mapping=function()
         {
          return Runtime.Tupled(function(tupledArg)
          {
           var l,f2,patternInput,form,elem;
           l=tupledArg[0];
           f2=tupledArg[1];
           patternInput=Utils.FormAndElement(f2);
           form=patternInput[0];
           elem=patternInput[1];
           return[l,Reactive1.Heat(form.State),form.Notify,elem];
          });
         },function(list)
         {
          return List.mapi(mapping,list);
         }),f1(fs)),(f3=function(list)
         {
          return Arrays.ofSeq(list);
         },f3(x)));
         states=_HotStream_1.New1();
         state=Reactive1.Switch(states);
         update=function(index)
         {
          var patternInput,s;
          patternInput=fs1[index];
          s=patternInput[1];
          return states.Trigger(s);
         };
         reset=function(tabs)
         {
          var f2,action;
          f2=(action=Runtime.Tupled(function(tupledArg)
          {
           var _arg1,_arg2,n,_arg3;
           _arg1=tupledArg[0];
           _arg2=tupledArg[1];
           n=tupledArg[2];
           _arg3=tupledArg[3];
           return n(null);
          }),function(array)
          {
           return Arrays.iter(action,array);
          });
          f2(fs1);
          jQuery(tabs.element.Body).tabs("select",defIndex);
          return update(defIndex);
         };
         tabs1=(x1=(x2=(x3=(f4=(mapping1=Runtime.Tupled(function(tupledArg)
         {
          var label,_arg4,_arg5,elem;
          label=tupledArg[0];
          _arg4=tupledArg[1];
          _arg5=tupledArg[2];
          elem=tupledArg[3];
          return[label,elem];
         }),function(array)
         {
          return Arrays.map(mapping1,array);
         }),f4(fs1)),(f5=function(array)
         {
          return List.ofArray(array);
         },f5(x3))),(f6=function(arg00)
         {
          return Tabs.New2(arg00);
         },f6(x2))),(f7=(f8=reset,function(w)
         {
          return Operators.OnAfterRender(f8,w);
         }),(f7(x1),x1)));
         Controls.OnSelect(tabs1,update);
         tabs1.OnSelect(function()
         {
          return function(ui)
          {
           return update(ui.index);
          };
         });
         return[tabs1,function()
         {
          return reset(tabs1);
         },state];
        };
        return Utils.MkFormlet(f);
       },
       TabsList:function(defIndex,fs)
       {
        var f;
        f=function()
        {
         var fs1,f1,mapping,state,state1,x,f3,mapping1,f4,reset,tabs1,x1,x2,f6,mapping2,f7,f8,f9;
         fs1=(f1=(mapping=Runtime.Tupled(function(tupledArg)
         {
          var l,f2,patternInput,form,elem;
          l=tupledArg[0];
          f2=tupledArg[1];
          patternInput=Utils.FormAndElement(f2);
          form=patternInput[0];
          elem=patternInput[1];
          return[l,form,elem];
         }),function(list)
         {
          return List.map(mapping,list);
         }),f1(fs));
         state=(state1=(x=(f3=(mapping1=Runtime.Tupled(function(tupledArg)
         {
          var _arg1,f2,_arg2;
          _arg1=tupledArg[0];
          f2=tupledArg[1];
          _arg2=tupledArg[2];
          return f2.State;
         }),function(list)
         {
          return List.map(mapping1,list);
         }),f3(fs1)),(f4=function(ios)
         {
          return Reactive1.Sequence(ios);
         },f4(x))),Reactive1.Select(state1,function(rs)
         {
          return _Result_1.Sequence(rs);
         }));
         reset=function(tabs)
         {
          var f2,action;
          jQuery(tabs.element.Body).tabs("select",defIndex);
          f2=(action=Runtime.Tupled(function(tupledArg)
          {
           var _arg3,f5,_arg4;
           _arg3=tupledArg[0];
           f5=tupledArg[1];
           _arg4=tupledArg[2];
           return f5.Notify.call(null,null);
          }),function(list)
          {
           return Seq.iter(action,list);
          });
          return f2(fs1);
         };
         tabs1=(x1=(x2=(f6=(mapping2=Runtime.Tupled(function(tupledArg)
         {
          var label,_arg5,elem;
          label=tupledArg[0];
          _arg5=tupledArg[1];
          elem=tupledArg[2];
          return[label,elem];
         }),function(list)
         {
          return List.map(mapping2,list);
         }),f6(fs1)),(f7=function(arg00)
         {
          return Tabs.New2(arg00);
         },f7(x2))),(f8=(f9=reset,function(w)
         {
          return Operators.OnAfterRender(f9,w);
         }),(f8(x1),x1)));
         return[tabs1,function()
         {
          return reset(tabs1);
         },state];
        };
        return Utils.MkFormlet(f);
       },
       TabsMany:function(defIndex,fs,add)
       {
        var x,arg00,f14;
        x=(arg00=function()
        {
         var initLabelFormElems,f,mapping,currLabelFormElems,states,updateCurrState,tabs,x4,x5,f4,mapping2,f5,state1,x6,f6,f7,tabsBody,Label,xb,fc,fd,addForm,xc,fe,body,left,xd,ff,f10,right,xe,xf,x10,f11,f12,f13,reset;
         initLabelFormElems=(f=(mapping=Runtime.Tupled(function(tupledArg)
         {
          var l,f1,patternInput,form,elem,state;
          l=tupledArg[0];
          f1=tupledArg[1];
          patternInput=Utils.FormAndElement(f1);
          form=patternInput[0];
          elem=patternInput[1];
          state=Reactive1.Heat(form.State);
          return[l,state,elem,form];
         }),function(list)
         {
          return List.map(mapping,list);
         }),f(fs));
         currLabelFormElems={
          contents:initLabelFormElems
         };
         states=_FSharpEvent_1.New();
         updateCurrState=function()
         {
          var x1,x2,x3,f1,mapping1,f2,f3;
          x1=(x2=(x3=currLabelFormElems.contents,(f1=(mapping1=function()
          {
           return Runtime.Tupled(function(tupledArg)
           {
            var _arg1,state,_arg2,_arg3;
            _arg1=tupledArg[0];
            state=tupledArg[1];
            _arg2=tupledArg[2];
            _arg3=tupledArg[3];
            return state;
           });
          },function(list)
          {
           return List.mapi(mapping1,list);
          }),f1(x3))),(f2=function(arg001)
          {
           return Utils.RX().Sequence(arg001);
          },f2(x2)));
          f3=function(arg001)
          {
           return states.event.Trigger(arg001);
          };
          return f3(x1);
         };
         tabs=(x4=(x5=currLabelFormElems.contents,(f4=(mapping2=Runtime.Tupled(function(tupledArg)
         {
          var label,_arg4,elem,_arg5;
          label=tupledArg[0];
          _arg4=tupledArg[1];
          elem=tupledArg[2];
          _arg5=tupledArg[3];
          return[label,elem];
         }),function(list)
         {
          return List.map(mapping2,list);
         }),f4(x5))),(f5=function(arg001)
         {
          return Tabs.New2(arg001);
         },f5(x4)));
         jQuery(tabs.element.Body).tabs("select",defIndex);
         state1=(x6=Utils.RX().Switch(states.event),(f6=(f7=function(xs)
         {
          var res,x1,x2,f1,mapping1,f2,chooser,fa,fb,arg002,chooser1;
          res=(x1=(x2=(f1=(mapping1=function(i)
          {
           return function(x3)
           {
            return[i,x3];
           };
          },function(source)
          {
           return Seq.mapi(mapping1,source);
          }),f1(xs)),(f2=(chooser=Runtime.Tupled(function(tupledArg)
          {
           var ix,x3,x7,x8,x9,f3,mapping3,f8,predicate,f9,mapping4;
           ix=tupledArg[0];
           x3=tupledArg[1];
           if(x3.$==0)
            {
             if(x3.$0.$==0)
              {
               jQuery(tabs.element.Body).tabs("remove",ix);
               currLabelFormElems.contents=(x7=(x8=(x9=currLabelFormElems.contents,(f3=(mapping3=function(ix1)
               {
                return Runtime.Tupled(function(xa)
                {
                 return[ix1,xa];
                });
               },function(list)
               {
                return List.mapi(mapping3,list);
               }),f3(x9))),(f8=(predicate=Runtime.Tupled(function(tupledArg1)
               {
                var cIx,_arg6;
                cIx=tupledArg1[0];
                _arg6=tupledArg1[1];
                return cIx!==ix;
               }),function(list)
               {
                return List.filter(predicate,list);
               }),f8(x8))),(f9=(mapping4=Runtime.Tupled(function(tuple)
               {
                return tuple[1];
               }),function(list)
               {
                return List.map(mapping4,list);
               }),f9(x7)));
               return{
                $:0
               };
              }
             else
              {
               return{
                $:1,
                $0:x3
               };
              }
            }
           else
            {
             return{
              $:1,
              $0:x3
             };
            }
          }),function(source)
          {
           return Seq.choose(chooser,source);
          }),f2(x2))),(fa=function(arg001)
          {
           return _Result_1.Sequence(arg001);
          },fa(x1)));
          fb=(arg002=(chooser1=function(x3)
          {
           return x3;
          },function(list)
          {
           return List.choose(chooser1,list);
          }),function(arg10)
          {
           return _Result_1.Map(arg002,arg10);
          });
          return fb(res);
         },function(s)
         {
          return Utils.RMap(f7,s);
         }),f6(x6)));
         tabsBody=(Label={
          $:0
         },Runtime.New(Body,{
          Element:(xb=Default.Div(List.ofArray([tabs])),(fc=(fd=function()
          {
           var x1,x2,x3,f1,mapping1,f2,f3;
           x1=(x2=(x3=currLabelFormElems.contents,(f1=(mapping1=Runtime.Tupled(function(tupledArg)
           {
            var label,state,elem,_arg7;
            label=tupledArg[0];
            state=tupledArg[1];
            elem=tupledArg[2];
            _arg7=tupledArg[3];
            return state;
           }),function(list)
           {
            return List.map(mapping1,list);
           }),f1(x3))),(f2=function(arg001)
           {
            return Utils.RX().Sequence(arg001);
           },f2(x2)));
           f3=function(arg001)
           {
            return states.event.Trigger(arg001);
           };
           return f3(x1);
          },function(w)
          {
           return Operators.OnAfterRender(fd,w);
          }),(fc(xb),xb))),
          Label:Label
         }));
         addForm=Formlet2.BuildForm(add);
         xc=Util.subscribeTo(addForm.State,function(res)
         {
          var label,formlet,patternInput,form,element,state,a,b;
          if(res.$==1)
           {
            return null;
           }
          else
           {
            label=res.$0[0];
            formlet=res.$0[1];
            patternInput=Utils.FormAndElement(formlet);
            form=patternInput[0];
            element=patternInput[1];
            state=Reactive1.Heat(form.State);
            tabs.Add1(element,label);
            currLabelFormElems.contents=(a=currLabelFormElems.contents,(b=List.ofArray([[label,state,element,form]]),List.append(a,b)));
            return updateCurrState(null);
           }
         });
         fe=function(value)
         {
          value;
         };
         fe(xc);
         body=(left=(xd=addForm.Body,(ff=(f10=function(arg0)
         {
          return Runtime.New(_Edit_1,{
           $:1,
           $0:arg0
          });
         },function(s)
         {
          return Utils.RMap(f10,s);
         }),ff(xd))),(right=(xe=(xf=(x10=Runtime.New(_Tree_1,{
          $:1,
          $0:tabsBody
         }),(f11=function(arg0)
         {
          return Runtime.New(_Edit_1,{
           $:0,
           $0:arg0
          });
         },f11(x10))),(f12=function(arg0)
         {
          return Runtime.New(_Edit_1,{
           $:2,
           $0:arg0
          });
         },f12(xf))),(f13=function(arg001)
         {
          return Utils.RX().Return(arg001);
         },f13(xe))),Utils.RX().Merge(left,right)));
         reset=function()
         {
          var numInits,f1,x1,x2,f2,f3,action,enumerator,forLoopVar,form;
          numInits=(f1=function(list)
          {
           return Seq.length(list);
          },f1(initLabelFormElems));
          x1=(x2=Seq.toList(Operators1.range(numInits,tabs.get_Length()-1)),(f2=function(list)
          {
           return List.rev(list);
          },f2(x2)));
          f3=(action=function(ix)
          {
           return jQuery(tabs.element.Body).tabs("remove",ix);
          },function(list)
          {
           return Seq.iter(action,list);
          });
          f3(x1);
          jQuery(tabs.element.Body).tabs("select",defIndex);
          currLabelFormElems.contents=initLabelFormElems;
          addForm.Notify.call(null,{});
          enumerator=Enumerator.Get(initLabelFormElems);
          while(enumerator.MoveNext())
           {
            forLoopVar=enumerator.get_Current();
            form=forLoopVar[3];
            form.Notify.call(null,{});
           }
          return updateCurrState(null);
         };
         return Runtime.New(_Form_2,{
          Body:body,
          Dispose1:function()
          {
           return null;
          },
          Notify:reset,
          State:state1
         });
        },Utils.BaseFormlet().New(arg00));
        f14=function(formlet)
        {
         return Data.OfIFormlet(formlet);
        };
        return f14(x);
       }
      },
      CssConstants:{
       AddIconClass:Runtime.Field(function()
       {
        return"addIcon ui-icon ui-icon-circle-plus";
       }),
       DragContainerClass:Runtime.Field(function()
       {
        return"dragContainer";
       }),
       DraggableClass:Runtime.Field(function()
       {
        return"draggableItem";
       }),
       DropContainerClass:Runtime.Field(function()
       {
        return"dropContainer";
       }),
       DroppableClass:Runtime.Field(function()
       {
        return"droppableItem";
       }),
       ErrorIconClass:Runtime.Field(function()
       {
        return"errorIcon icon ui-icon ui-icon-alert";
       }),
       FormContainerClass:Runtime.Field(function()
       {
        return"formlet-jqueryui";
       }),
       LegendClass:Runtime.Field(function()
       {
        return"ui-widget-content ui-corner-all";
       }),
       RemIconClass:Runtime.Field(function()
       {
        return"removeIcon ui-icon ui-icon-circle-minus";
       }),
       ValidIconClass:Runtime.Field(function()
       {
        return"validIcon ui-icon ui-icon-check";
       })
      },
      Enhance:{
       MakeWithSubmitAndResetButtons:function(submitLabel,resetLabel,formlet)
       {
        var x,arg00,f10;
        x=(arg00=function()
        {
         var submitButton,f,mapping,resetButton,f3,mapping1,formBody,Label,x2,x3,f4,chooser,f5,form,x4,f7,state,button1,count,submitButtonClickState,latestCount,x5,arg001,arg10,f8,f9,body,right,x6,x7,x8,fa,fb,fc,left,x9,fd,fe,reset,ff,action1;
         submitButton=(f=(mapping=function(label)
         {
          var isRendered,button,x1,returnVal,f1,f2;
          isRendered={
           contents:false
          };
          button=(x1=Button.New3((returnVal=[ButtonConfiguration.New()],(null,returnVal[0].disabled=true,returnVal[0].label=label,returnVal[0]))),(f1=(f2=function()
          {
           isRendered.contents=true;
          },function(w)
          {
           return Operators.OnAfterRender(f2,w);
          }),(f1(x1),x1)));
          return[button,isRendered];
         },function(option)
         {
          return Option.map(mapping,option);
         }),f(submitLabel));
         resetButton=(f3=(mapping1=function(label)
         {
          return Button.New4(label);
         },function(option)
         {
          return Option.map(mapping1,option);
         }),f3(resetLabel));
         formBody=(Label={
          $:0
         },Runtime.New(Body,{
          Element:(x2=(x3=List.ofArray([Option.map(Runtime.Tupled(function(tuple)
          {
           return tuple[0];
          }),submitButton),resetButton]),(f4=(chooser=function(x1)
          {
           return x1;
          },function(list)
          {
           return List.choose(chooser,list);
          }),f4(x3))),(f5=function(x1)
          {
           return Default.Div(x1);
          },f5(x2))),
          Label:Label
         }));
         form=Formlet2.BuildForm(formlet);
         x4=Util.subscribeTo(form.State,function(res)
         {
          var f1,action;
          f1=(action=Runtime.Tupled(function(tupledArg)
          {
           var button,isRendered,fs,f2,f6;
           button=tupledArg[0];
           isRendered=tupledArg[1];
           if(res.$==1)
            {
             fs=res.$0;
             return button.Disable();
            }
           else
            {
             if(isRendered.contents)
              {
               return button.Enable();
              }
             else
              {
               f2=(f6=function()
               {
                return button.Enable();
               },function(w)
               {
                return Operators.OnAfterRender(f6,w);
               });
               return f2(button);
              }
            }
          }),function(option)
          {
           return Option.iter(action,option);
          });
          return f1(submitButton);
         });
         f7=function(value)
         {
          value;
         };
         f7(x4);
         state=submitButton.$==0?form.State:(button1=submitButton.$0[0],(count={
          contents:0
         },(submitButtonClickState=_FSharpEvent_1.New(),(button1.OnClick(function()
         {
          var x1;
          Operators1.Increment(count);
          x1=count.contents;
          return submitButtonClickState.event.Trigger(x1);
         }),(latestCount={
          contents:0
         },(x5=(arg001=form.State,(arg10=submitButtonClickState.event,function(arg20)
         {
          return Utils.RX().CombineLatest(arg001,arg10,arg20);
         })(function(value)
         {
          return function(count1)
          {
           return[value,count1];
          };
         })),(f8=(f9=Runtime.Tupled(function(tupledArg)
         {
          var value,count1;
          value=tupledArg[0];
          count1=tupledArg[1];
          if(count1!==latestCount.contents)
           {
            latestCount.contents=count1;
            return{
             $:1,
             $0:value
            };
           }
          else
           {
            return{
             $:0
            };
           }
         }),function(s)
         {
          return Utils.RChoose(f9,s);
         }),f8(x5))))))));
         body=(right=(x6=(x7=(x8=Runtime.New(_Tree_1,{
          $:1,
          $0:formBody
         }),(fa=function(arg0)
         {
          return Runtime.New(_Edit_1,{
           $:0,
           $0:arg0
          });
         },fa(x8))),(fb=function(arg0)
         {
          return Runtime.New(_Edit_1,{
           $:2,
           $0:arg0
          });
         },fb(x7))),(fc=function(arg002)
         {
          return Utils.RX().Return(arg002);
         },fc(x6))),(left=(x9=form.Body,(fd=(fe=function(arg0)
         {
          return Runtime.New(_Edit_1,{
           $:1,
           $0:arg0
          });
         },function(s)
         {
          return Utils.RMap(fe,s);
         }),fd(x9))),Utils.RX().Merge(left,right)));
         reset=function(x1)
         {
          return form.Notify.call(null,x1);
         };
         ff=(action1=function(button)
         {
          return button.OnClick(function()
          {
           return reset(null);
          });
         },function(option)
         {
          return Option.iter(action1,option);
         });
         ff(resetButton);
         return Runtime.New(_Form_2,{
          Body:body,
          Dispose1:function()
          {
           return null;
          },
          Notify:reset,
          State:state
         });
        },Utils.BaseFormlet().New(arg00));
        f10=function(formlet1)
        {
         return Data.OfIFormlet(formlet1);
        };
        return f10(x);
       },
       Many:function(formlet)
       {
        var f,config,inputRecord;
        f=(config=(inputRecord=ManyConfiguration.get_Default(),Runtime.New(ManyConfiguration,{
         AddIconClass:CssConstants.AddIconClass(),
         RemoveIconClass:CssConstants.RemIconClass()
        })),function(formlet1)
        {
         return Enhance.CustomMany(config,formlet1);
        });
        return f(formlet);
       },
       WithDialog:function(title,formlet)
       {
        var f;
        f=function()
        {
         var state,conf,returnVal,dialogOpt,el,f1,f2,dialog1,reset;
         state=_HotStream_1.New(Runtime.New(_Result_1,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
         conf=(returnVal=[DialogConfiguration.New()],(null,returnVal[0].modal=true,returnVal[0].dialogClass="dialog",returnVal[0].title=title,returnVal[0]));
         dialogOpt={
          contents:{
           $:0
          }
         };
         el=Default.Div(List.ofArray([(f1=(f2=function(confirmed)
         {
          var matchValue,dialog;
          matchValue=dialogOpt.contents;
          if(matchValue.$==0)
           {
            return null;
           }
          else
           {
            dialog=matchValue.$0;
            state.Trigger(Runtime.New(_Result_1,{
             $:0,
             $0:confirmed
            }));
            return jQuery(dialog.element.Body).dialog("close");
           }
         },function(formlet1)
         {
          return Formlet2.Run(f2,formlet1);
         }),f1(formlet))]));
         dialog1=Dialog.New1(el,conf);
         dialogOpt.contents={
          $:1,
          $0:dialog1
         };
         reset=function()
         {
          jQuery(dialog1.element.Body).dialog("close");
          return state.Trigger(Runtime.New(_Result_1,{
           $:1,
           $0:Runtime.New(T,{
            $:0
           })
          }));
         };
         return[Default.Div(List.ofArray([dialog1])),reset,state];
        };
        return Formlet2.BuildFormlet(f);
       },
       WithFormContainer:function(formlet)
       {
        var f,f1;
        f=(f1=function(el)
        {
         return Operators.add(Default.Div(List.ofArray([Default.Attr().Class(CssConstants.FormContainerClass())])),List.ofArray([el]));
        },function(formlet1)
        {
         return Formlet2.MapElement(f1,formlet1);
        });
        return f(formlet);
       },
       WithLegend:function(label,formlet)
       {
        var f,f1;
        f=(f1=function(body)
        {
         var element,x,_this,x1,_this1,matchValue,label1;
         element=Operators.add((x=List.ofArray([Default.Attr().Class(CssConstants.LegendClass())]),(_this=Default.Tags(),_this.NewTag("fieldset",x))),List.ofArray([(x1=List.ofArray([Default.Tags().text(label)]),(_this1=Default.Tags(),_this1.NewTag("legend",x1))),(matchValue=body.Label,matchValue.$==0?body.Element:(label1=matchValue.$0,Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([Default.TD(List.ofArray([label1(null)])),Default.TD(List.ofArray([body.Element]))]))]))]))))]));
         return Runtime.New(Body,{
          Element:element,
          Label:{
           $:0
          }
         });
        },function(formlet1)
        {
         return Formlet2.MapBody(f1,formlet1);
        });
        return f(formlet);
       },
       WithResetButton:function(label,formlet)
       {
        return Enhance1.MakeWithSubmitAndResetButtons({
         $:0
        },{
         $:1,
         $0:label
        },formlet);
       },
       WithSubmitAndResetButtons:function(submitLabel,resetLabel,formlet)
       {
        return Enhance1.MakeWithSubmitAndResetButtons({
         $:1,
         $0:submitLabel
        },{
         $:1,
         $0:resetLabel
        },formlet);
       },
       WithSubmitButton:function(label,formlet)
       {
        return Enhance1.MakeWithSubmitAndResetButtons({
         $:1,
         $0:label
        },{
         $:0
        },formlet);
       },
       WithValidationIcon:function(formlet)
       {
        var f,vic;
        f=(vic=Runtime.New(ValidationIconConfiguration,{
         ValidIconClass:CssConstants.ValidIconClass(),
         ErrorIconClass:CssConstants.ErrorIconClass()
        }),function(formlet1)
        {
         return Enhance.WithCustomValidationIcon(vic,formlet1);
        });
        return f(formlet);
       }
      },
      Utils:{
       BaseFormlet:Runtime.Field(function()
       {
        return _FormletProvider_1.New(Data.UtilsProvider());
       }),
       FormAndElement:function(formlet)
       {
        var formlet1,form,matchValue,body;
        formlet1=Formlet2.WithLayoutOrDefault(formlet);
        form=Formlet2.BuildForm(formlet1);
        matchValue=formlet1.get_Layout().Apply.call(null,form.Body);
        if(matchValue.$==0)
         {
          return[form,Default.Div(Runtime.New(T,{
           $:0
          }))];
         }
        else
         {
          body=matchValue.$0[0];
          return[form,body.Element];
         }
       },
       MkFormlet:function(f)
       {
        var f1;
        f1=function()
        {
         var patternInput,s,r,b,panel;
         patternInput=f(null);
         s=patternInput[2];
         r=patternInput[1];
         b=patternInput[0];
         panel=Default.Div(List.ofArray([b]));
         return[panel,r,s];
        };
        return Formlet2.BuildFormlet(f1);
       },
       RChoose:function(f,s)
       {
        return Utils.RX().Choose(s,f);
       },
       RMap:function(f,s)
       {
        return Utils.RX().Select(s,f);
       },
       RX:Runtime.Field(function()
       {
        return Data.UtilsProvider().Reactive;
       })
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Array=Runtime.Safe(Global.Array);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  JQueryUI=Runtime.Safe(Formlet.JQueryUI);
  Utils=Runtime.Safe(JQueryUI.Utils);
  Reactive=Runtime.Safe(Global.IntelliFactory.Reactive);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  List=Runtime.Safe(WebSharper.List);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  _HotStream_1=Runtime.Safe(Reactive["HotStream`1"]);
  JQueryUI1=Runtime.Safe(WebSharper.JQueryUI);
  Accordion=Runtime.Safe(JQueryUI1.Accordion);
  jQuery=Runtime.Safe(Global.jQuery);
  Html=Runtime.Safe(WebSharper.Html);
  Operators=Runtime.Safe(Html.Operators);
  Lazy=Runtime.Safe(WebSharper.Lazy);
  Formlet1=Runtime.Safe(Global.IntelliFactory.Formlet);
  Base=Runtime.Safe(Formlet1.Base);
  _Result_1=Runtime.Safe(Base["Result`1"]);
  Seq=Runtime.Safe(WebSharper.Seq);
  Default=Runtime.Safe(Html.Default);
  EventsPervasives=Runtime.Safe(Html.EventsPervasives);
  Autocomplete=Runtime.Safe(JQueryUI1.Autocomplete);
  AutocompleteConfiguration=Runtime.Safe(JQueryUI1.AutocompleteConfiguration);
  ButtonConfiguration=Runtime.Safe(JQueryUI1.ButtonConfiguration);
  Controls=Runtime.Safe(JQueryUI.Controls);
  T=Runtime.Safe(List.T);
  Button=Runtime.Safe(JQueryUI1.Button);
  Operators1=Runtime.Safe(WebSharper.Operators);
  Datepicker=Runtime.Safe(JQueryUI1.Datepicker);
  Dialog=Runtime.Safe(JQueryUI1.Dialog);
  DragAndDropConfig=Runtime.Safe(Controls.DragAndDropConfig);
  Collections=Runtime.Safe(WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  DraggableConfiguration=Runtime.Safe(JQueryUI1.DraggableConfiguration);
  Math=Runtime.Safe(Global.Math);
  Draggable=Runtime.Safe(JQueryUI1.Draggable);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  Droppable=Runtime.Safe(JQueryUI1.Droppable);
  CssConstants=Runtime.Safe(JQueryUI.CssConstants);
  SliderConfiguration=Runtime.Safe(Controls.SliderConfiguration);
  SliderConfiguration1=Runtime.Safe(JQueryUI1.SliderConfiguration);
  Slider=Runtime.Safe(JQueryUI1.Slider);
  Control=Runtime.Safe(WebSharper.Control);
  _FSharpEvent_1=Runtime.Safe(Control["FSharpEvent`1"]);
  Sortable=Runtime.Safe(JQueryUI1.Sortable);
  Util=Runtime.Safe(WebSharper.Util);
  Formlet2=Runtime.Safe(Formlet.Formlet);
  Tabs=Runtime.Safe(JQueryUI1.Tabs);
  Body=Runtime.Safe(Formlet.Body);
  Tree=Runtime.Safe(Base.Tree);
  _Edit_1=Runtime.Safe(Tree["Edit`1"]);
  _Tree_1=Runtime.Safe(Tree["Tree`1"]);
  _Form_2=Runtime.Safe(Base["Form`2"]);
  Data=Runtime.Safe(Formlet.Data);
  Option=Runtime.Safe(WebSharper.Option);
  Enhance=Runtime.Safe(Formlet.Enhance);
  ManyConfiguration=Runtime.Safe(Enhance.ManyConfiguration);
  DialogConfiguration=Runtime.Safe(JQueryUI1.DialogConfiguration);
  Enhance1=Runtime.Safe(JQueryUI.Enhance);
  ValidationIconConfiguration=Runtime.Safe(Enhance.ValidationIconConfiguration);
  return _FormletProvider_1=Runtime.Safe(Base["FormletProvider`1"]);
 });
 Runtime.OnLoad(function()
 {
  Utils.RX();
  Utils.BaseFormlet();
  CssConstants.ValidIconClass();
  CssConstants.RemIconClass();
  CssConstants.LegendClass();
  CssConstants.FormContainerClass();
  CssConstants.ErrorIconClass();
  CssConstants.DroppableClass();
  CssConstants.DropContainerClass();
  CssConstants.DraggableClass();
  CssConstants.DragContainerClass();
  CssConstants.AddIconClass();
 });
}());
