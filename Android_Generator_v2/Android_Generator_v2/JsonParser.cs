using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;

namespace Android_Generator_v2
{
    class JsonParser { 
        public static void parse(String filename, String appDirectory, String srcDirectory, String layoutDirectory)
        {
            StreamReader streamReader = File.OpenText(filename);
            reader = new JsonTextReader(streamReader);
            while (reader.Read())
            {
                object value = reader.Value;
                if (value != null)
                {
                    if (reader.TokenType.ToString().Equals("PropertyName") && reader.Depth == 1)
                    {
                        currentActivityName = reader.Value.ToString();
                        activityBuider = new AndroidActivityBuilder(currentActivityName);
                        layoutBuilder = new AndroidLayoutBuilder();
                    }
                    else
                    {
                        if (reader.TokenType.ToString().Equals("PropertyName")) 
                        {
                            if (value.Equals("Main"))
                            {
                                reader.Read();
                                if ((Boolean)reader.Value)
                                {
                                    manifestBuilder.addActivity(ManifestActivity.
                                        createNewManifestActivity(currentActivityName, true));
                                }
                                else
                                {
                                    manifestBuilder.addActivity(ManifestActivity.
                                        createNewManifestActivity(currentActivityName, false));
                                }
                            }
                            if (value.Equals("Button")) 
                            { 
                                parseButton();
                            }
                        }
                    }
                }
                else
                {
                    if (reader.Depth == 1 && reader.TokenType.ToString().Equals("EndObject"))
                    {
                        File.WriteAllText(Path.Combine(srcDirectory, currentActivityName + ".java"),
                            activityBuider.build());
                        File.WriteAllText(Path.Combine(layoutDirectory, currentActivityName.ToLower() + "_layout.xml"),
                            layoutBuilder.build());
                    }
                    if ((reader.Depth == 0 && reader.TokenType.ToString().Equals("EndObject")))
                    {
                        File.WriteAllText(Path.Combine(appDirectory, "AndroidManifest.xml"), 
                            manifestBuilder.build());
                    }
                }
            }
        }

        private static void parseButton()
        {
            ButtonElement element = new ButtonElement();

            while (!reader.TokenType.ToString().Equals("EndObject"))
            {
                reader.Read();
                object value = reader.Value;
                if (value != null)
                {
                    if (reader.TokenType.ToString().Equals("PropertyName"))
                    {
                        if (value.Equals("Id"))
                        {
                            reader.Read();
                            element.setId(reader.Value.ToString());
                        }
                        if (value.Equals("Text"))
                        {
                            reader.Read();
                            element.addXmlAttr("text", reader.Value.ToString());
                        }
                        if (value.Equals("Link"))
                        {
                            reader.Read();
                            element.addOnClickTransition(currentActivityName, reader.Value.ToString());
                        }
                        if (value.Equals("Inline"))
                        {
                            reader.Read();
                            String attrValue = reader.Value.ToString();
                            if (attrValue.Equals("No"))
                            {
                                element.addXmlAttr("layout_width", "match_parent");
                            }
                            else
                            {
                                element.addXmlAttr("layout_width", "wrap_content");
                            }
                        }
                    }
                }
            }

            layoutBuilder.addElement(element.getXml());
            activityBuider.addActionsToOnCreate(element.getOnCreateActions());
            activityBuider.addImports(element.getImports());
            activityBuider.addMethods(element.getOnClickSrc());
        }

        private static JsonTextReader reader;
        private static ActivityBuilderInterface activityBuider = null;
        private static LayoutBuilderInterface layoutBuilder = null;
        private static ManifestBuilderInterface manifestBuilder = new AndroidManifestBuilder();
        private static String currentActivityName;
    }
}
