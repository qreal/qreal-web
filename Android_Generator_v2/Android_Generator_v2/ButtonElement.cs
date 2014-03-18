using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class ButtonElement : Element
    {
        public ButtonElement()
        {
            imports.Add("import android.widget.Button;");
        }

        public void setId(String id)
        {
            this.id = id;
        }

        public void addXmlAttr(String attr, String value)
        {
            xmlAttrs.Append(String.Format(@"android:{0}=""{1}""
                ", attr, value));
        }

        public void addOnCreateActions(String actions)
        {
            onCreateActions.Append(actions);
        }

        public void addOnClickTransition(String from, String to)
        {
            String transitionSrc = String.Format(@"
                Intent intent = new Intent(this, {0}.class);
                startActivity(intent);", to);
            onClickActions.Append(transitionSrc);
            imports.Add("import android.content.Intent;");
            imports.Add("import android.view.View;");
        }

        public String getXml()
        {
            return String.Format(xmlTemplate, id, xmlAttrs.ToString());
        }

        public String getOnCreateActions()
        {
            return onCreateActions.ToString();
        }

        public String getOnClickSrc()
        {
            return String.Format(onClickSrc, id, onClickActions.ToString());
        }

        public HashSet<String> getImports()
        {
            return imports;
        }

        private String onClickSrc = @"
            public void onClick{0}(View v) {{
                {1}
            }}";
        private StringBuilder onClickActions = new StringBuilder();
        private StringBuilder onCreateActions = new StringBuilder();
        private StringBuilder xmlAttrs = new StringBuilder();
        private HashSet<String> imports = new HashSet<String>();
        private String id;
        private static String xmlTemplate = @"
            <Button 
                android:layout_height=""wrap_content""
                android:onClick=""onClick{0}""
                {1}
                >
            </Button>";
    }
}
