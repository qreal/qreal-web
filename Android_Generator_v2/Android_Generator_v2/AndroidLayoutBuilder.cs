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
            return String.Format(template, layoutStringBuilder.ToString());
        }
        public void addElement(String element)
        {
            layoutStringBuilder.Append(element);
        }

        private StringBuilder layoutStringBuilder = new StringBuilder();

        private static String template = @"
            <LinearLayout xmlns:android=""http://schemas.android.com/apk/res/android""
                xmlns:tools=""http://schemas.android.com/tools""
                android:layout_width=""match_parent""
                android:layout_height=""match_parent""
                android:orientation=""vertical"" >
                    {0}
            </LinearLayout>";
    }
}
