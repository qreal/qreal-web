using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class InputElement : Element
    {
        public InputElement()
        {
            imports.Add("import android.widget.EditText;");
        }

        public void setId(String id)
        {
            this.id = id;
            String init = String.Format("\n{0} = (EditText) findViewById(R.id.{0});", id);
            addOnCreateActions(init);
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

        public String getXml()
        {
            return String.Format(xmlTemplate, id, xmlAttrs.ToString());
        }

        public String getOnCreateActions()
        {
            return onCreateActions.ToString();
        }

        public HashSet<String> getImports()
        {
            return imports;
        }

        public String getVariables()
        {
            return String.Format("private EditText {0};", id);
        }

        public String getValueGetter() {
            return String.Format(valueGetterTemplate, id);
        }

        private StringBuilder onCreateActions = new StringBuilder();
        private StringBuilder xmlAttrs = new StringBuilder();
        private HashSet<String> imports = new HashSet<String>();
        private String id;
        private static String valueGetterTemplate = @"
            private String get{0}Value() {{
    	        return {0}.getText().toString();
        }}";
        private static String xmlTemplate = @"
            <EditText 
                android:id=""@+id/{0}""
                android:layout_height=""wrap_content""
                {1}
                >
            </EditText>";
    }
}
