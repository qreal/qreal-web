using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class TextElement : Element
    {
        public TextElement()
        {
            imports.Add("import android.widget.TextView;");
        }

        public void setId(String id)
        {
            this.id = id;
            String initTextView = String.Format(@"
                TextView {0} = (TextView) findViewById(R.id.{1});", id, id);
            onCreateActions.Append(initTextView);
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
            return String.Format(xmlTemplate, xmlAttrs.ToString());;
        }

        public String getOnCreateActions()
        {
            return onCreateActions.ToString();
        }

        public HashSet<String> getImports()
        {
            return imports;
        }

        private StringBuilder onCreateActions = new StringBuilder();
        private StringBuilder xmlAttrs = new StringBuilder();
        private String id;
        private HashSet<String> imports = new HashSet<String>();
        private static String xmlTemplate = @"
            <TextView 
                android:layout_height=""wrap_content""
                android:layout_width=""match_parent""
                {0}
                >
            </TextView>";
    }
}
