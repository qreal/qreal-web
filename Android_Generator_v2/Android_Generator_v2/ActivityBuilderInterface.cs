using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    interface ActivityBuilderInterface
    {
        String build();
        void addImports(HashSet<String> imports);
        void addMethods(String method);
        void addVariables(String variable);
        void addActionsToOnCreate(String action);
    }
}
