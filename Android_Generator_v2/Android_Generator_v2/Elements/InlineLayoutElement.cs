using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class InlineLayoutElement
    {
        public void addElement(String element)
        {
            elementsStringBuilder.Append(element);
        }

        public String getXml()
        {
            return String.Format(xmlTemplate, elementsStringBuilder.ToString());
        }

        private StringBuilder elementsStringBuilder = new StringBuilder();

        private static String xmlTemplate = @"
            <com.library.inlinelayout.InlineLayout
	            android:layout_width=""match_parent""
	            android:layout_height=""wrap_content""
                android:layout_marginTop=""5dp""
                android:layout_marginBottom=""5dp"">

                    {0}

            </com.library.inlinelayout.InlineLayout>
        ";
    }
}
