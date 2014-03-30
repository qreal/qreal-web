﻿using System;
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
            return String.Format(template, package, permissionsBuilder.ToString(), activitiesBuilder.ToString());
        }

        public void setPackage(String package)
        {
            this.package = package;
        }

        public void addPermissions(String permissions)
        {
            permissionsBuilder.Append(permissions);
        }

        public void addActivity(String activity)
        {
            activitiesBuilder.Append(activity);
        }

        private String template;
        private String package;
        private StringBuilder permissionsBuilder = new StringBuilder();
        private StringBuilder activitiesBuilder = new StringBuilder();
    }
}
