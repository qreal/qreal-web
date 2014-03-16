using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    interface Element
    {
        void addXmlAttr(String attr, String value);

        void addOnCreateActions(String actions);

        String getXml();

        String getOnCreateActions();

        HashSet<String> getImports();
    }
}
