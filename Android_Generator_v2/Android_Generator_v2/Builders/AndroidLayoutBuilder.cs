using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class AndroidLayoutBuilder : LayoutBuilderInterface
    {
        public String build()
        {
            return String.Format(template, headerStringBuilder.ToString(), bodyStringBuilder.ToString(),
                footerStringBuilder.ToString(), paddingValue);
        }
        public void addElementToHeader(String element)
        {
            headerStringBuilder.Append(element);
        }

        public void addElementToBody(String element)
        {
            bodyStringBuilder.Append(element);
        }

        public void addElementToFooter(String element)
        {
            footerStringBuilder.Append(element);
        }

        public void setPadding(String value)
        {
            paddingValue = value;
        }

        private StringBuilder headerStringBuilder = new StringBuilder();
        private StringBuilder bodyStringBuilder = new StringBuilder();
        private StringBuilder footerStringBuilder = new StringBuilder();
        private String paddingValue = "0dp";

        private static String template = @"
            <LinearLayout xmlns:android=""http://schemas.android.com/apk/res/android""
                xmlns:tools=""http://schemas.android.com/tools""
                android:layout_width=""match_parent""
                android:layout_height=""match_parent""
                android:orientation=""vertical"" >
                    {0}

                <LinearLayout
                    android:layout_width=""match_parent""
                    android:layout_height=""match_parent""
                    android:orientation=""vertical""
                    android:padding=""{3}"">
                        {1}

                </LinearLayout>
                    {2}
            </LinearLayout>";
    }
}
