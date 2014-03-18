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
                                parseButtonElement();
                            }
                            if (value.Equals("Input"))
                            {
                                parseInputElement();
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

        private static void parseButtonElement()
        {
            ButtonElement buttonElement = new ButtonElement();

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
                            buttonElement.setId(reader.Value.ToString());
                        }
                        if (value.Equals("Text"))
                        {
                            reader.Read();
                            buttonElement.addXmlAttr("text", reader.Value.ToString());
                        }
                        if (value.Equals("Link"))
                        {
                            reader.Read();
                            buttonElement.addOnClickTransition(currentActivityName, reader.Value.ToString());
                        }
                        if (value.Equals("Inline"))
                        {
                            reader.Read();
                            String attrValue = reader.Value.ToString();
                            if (attrValue.Equals("No"))
                            {
                                buttonElement.addXmlAttr("layout_width", "match_parent");
                            }
                            else
                            {
                                buttonElement.addXmlAttr("layout_width", "wrap_content");
                            }
                        }
                    }
                }
            }

            layoutBuilder.addElement(buttonElement.getXml());
            activityBuider.addActionsToOnCreate(buttonElement.getOnCreateActions());
            activityBuider.addImports(buttonElement.getImports());
            activityBuider.addMethods(buttonElement.getOnClickSrc());
        }

        private static void parseInputElement()
        {
            InputElement inputElement = new InputElement();

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
                            inputElement.setId(reader.Value.ToString());
                        }
                        if (value.Equals("Inline"))
                        {
                            reader.Read();
                            String attrValue = reader.Value.ToString();
                            if (attrValue.Equals("No"))
                            {
                                inputElement.addXmlAttr("layout_width", "match_parent");
                            }
                            else
                            {
                                inputElement.addXmlAttr("layout_width", "wrap_content");
                            }
                        }
                        if (value.Equals("Title"))
                        {

                        }
                        if (value.Equals("Rounded corners"))
                        {

                        }
                        if (value.Equals("Title"))
                        {

                        }
                        if (value.Equals("Mini"))
                        {

                        }
                        if (value.Equals("Theme"))
                        {

                        }
                    }
                }
            }

            layoutBuilder.addElement(inputElement.getXml());
            activityBuider.addActionsToOnCreate(inputElement.getOnCreateActions());
            activityBuider.addImports(inputElement.getImports());
            activityBuider.addMethods(inputElement.getValueGetter());
            activityBuider.addVariables(inputElement.getVariables());
        }

        private static JsonTextReader reader;
        private static ActivityBuilderInterface activityBuider = null;
        private static LayoutBuilderInterface layoutBuilder = null;
        private static ManifestBuilderInterface manifestBuilder = new AndroidManifestBuilder();
        private static String currentActivityName;
    }
}
