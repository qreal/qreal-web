using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Android_Generator_v2
{
    class ManifestActivity
    {
        public static String createNewManifestActivity(String name, bool isMain)
        {
            String intentFilter = "";
            if (isMain)
            {
                intentFilter = @"<intent-filter>
                                    <action android:name=""android.intent.action.MAIN"" />
                                    <category android:name=""android.intent.category.LAUNCHER"" />
                                </intent-filter>";
            }
            return String.Format(template, name, intentFilter);
        }

        private static String template = @"
            <activity
                android:name=""{0}"" >
                {1}
            </activity>";
    }
}
