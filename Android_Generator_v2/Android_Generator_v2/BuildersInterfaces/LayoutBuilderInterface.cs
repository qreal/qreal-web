using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    interface LayoutBuilderInterface
    {
        String build();
        void addElementToHeader(String element);
        void addElementToBody(String element);
        void addElementToFooter(String element);
        void setPadding(String value);
    }
}
