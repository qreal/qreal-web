using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class HeaderElement : Element
    {
        public void setId(String id)
        {
            this.id = id;
        }

        public void setTitle(String title)
        {
            this.title = title;
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
            return String.Format(xmlTemplate, id, title);
        }

        public String getOnCreateActions()
        {
            return "";
        }

        public HashSet<String> getImports()
        {
            return imports;
        }

        public String getVariables()
        {
            return "";
        }

        private String id;
        private String title;
        private StringBuilder xmlAttrs = new StringBuilder();
        private StringBuilder onCreateActions = new StringBuilder();
        private HashSet<String> imports = new HashSet<String>();
        private static String xmlTemplate = @"
            <TextView 
                android:id=""@+id/{0}""
                android:layout_width=""match_parent""
                android:layout_height=""35dp""
                android:gravity=""center""
                android:background=""@android:color/background_dark""
                android:textColor=""@android:color/white""
                android:textStyle=""bold""
                android:text=""{1}""/>";
    }
}
