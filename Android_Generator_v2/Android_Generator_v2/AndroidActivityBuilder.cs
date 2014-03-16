using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class AndroidActivityBuilder : ActivityBuilderInterface
    {
        public AndroidActivityBuilder(String name)
        {
            this.name = name;
            addActionsToOnCreate("setContentView(R.layout." + name.ToLower() + "_layout" + ");");
        }

        public String build()
        {
            return String.Format(template, importsToString(), name, onCreateActions.ToString(),
                methods.ToString(), variables.ToString());
        }

        public void addImports(HashSet<String> newImports)
        {
            imports.UnionWith(newImports);
        }

        public void addActionsToOnCreate(String action)
        {
            onCreateActions.Append(action);
        }

        public void addMethods(String method)
        {
            methods.Append(method);
        }

        public void addVariables(String variable)
        {
            variables.Append(variable);
        }

        private String importsToString() {
            StringBuilder importsStringBuilder = new StringBuilder();
            foreach (String import in imports)
            {
                importsStringBuilder.Append(import);
                importsStringBuilder.Append("\n");
            }
            return importsStringBuilder.ToString();
        }

        private String name;
        private HashSet<String> imports = new HashSet<String>();
        private StringBuilder onCreateActions = new StringBuilder();
        private StringBuilder methods = new StringBuilder();
        private StringBuilder variables = new StringBuilder();

        private static String template = @"
            package com.example.test;
            import android.os.Bundle;
            import android.app.Activity;
            {0}

            public class {1} extends Activity {{

                @Override
                protected void onCreate(Bundle savedInstanceState) {{
                    super.onCreate(savedInstanceState);
                    {2}
                }}
                {3}
                {4}
            }}";
    }
}
