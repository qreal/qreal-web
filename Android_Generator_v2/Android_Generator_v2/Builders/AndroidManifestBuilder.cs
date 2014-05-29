using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Android_Generator_v2
{
    class AndroidManifestBuilder : ManifestBuilderInterface
    {
        public AndroidManifestBuilder()
        {
            template = File.ReadAllText(Path.Combine("Templates", "ManifestTemplate.xml"));
        }

        public String build()
        {
            return String.Format(template, package, setToString(permissions),
                setToString(features), activitiesBuilder.ToString());
        }

        public void setPackage(String package)
        {
            this.package = package;
        }

        public void addPermission(String permissionString)
        {
            permissions.Add(permissionString);
        }

        public void addFeature(String featureString)
        {
            features.Add(featureString);
        }

        public void addActivity(String activity)
        {
            activitiesBuilder.Append(activity);
        }

        private String setToString(HashSet<String> set)
        {
            StringBuilder stringBuilder = new StringBuilder();
            foreach (String str in set)
            {
                stringBuilder.Append(str);
                stringBuilder.Append("\n");
            }
            return stringBuilder.ToString();
        }

        private String template;
        private String package;
        private HashSet<String> permissions = new HashSet<String>();
        private HashSet<String> features = new HashSet<String>();
        private StringBuilder activitiesBuilder = new StringBuilder();
    }
}
