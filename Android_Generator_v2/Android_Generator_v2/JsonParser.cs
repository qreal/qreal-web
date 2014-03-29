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
        public JsonParser(String filename)
        {
            this.filename = filename;
            StreamReader streamReader = File.OpenText(filename);
            reader = new JsonTextReader(streamReader);
        }

        public String getProjectName()
        {
            while (reader.Read())
            {
                if (reader.TokenType.ToString().Equals("PropertyName") && reader.Value.Equals("type"))
                {
                    reader.Read();
                    if (reader.Value.Equals("App"))
                    {
                        // next two reads need to get project id
                        reader.Read();
                        reader.Read();
                        return reader.Value.ToString();
                    }
                }
            }
            throw new NotFoundElementException("Project id");
        } 

        public void parseToEnd(String appDirectory, String srcDirectory, String layoutDirectory)
        {     
            while (reader.Read())
            {
                object value = reader.Value;
                if (value != null)
                {
                    if (reader.TokenType.ToString().Equals("PropertyName") && reader.Value.Equals("Pages"))
                    {
                        parsePages(srcDirectory, layoutDirectory);
                    }
                }
                else
                {
                    if ((reader.Depth == 0 && reader.TokenType.ToString().Equals("EndObject")))
                    {
                        File.WriteAllText(Path.Combine(appDirectory, "AndroidManifest.xml"), 
                            manifestBuilder.build());
                    }
                }
            }
        }

        private void parsePages(String srcDirectory, String layoutDirectory)
        {
            String currentActivityName = null;
            int pagesCount = 0;
            while (reader.Read())
            {
                object value = reader.Value;
                if (value != null)
                {
                    if (reader.TokenType.ToString().Equals("PropertyName"))
                    {
                        if (reader.Value.Equals("type") && reader.Depth == 3) 
                        {
                            reader.Read();
                            if (reader.Value.Equals("Page"))
                            {
                                // next two reads need to get page id
                                reader.Read();
                                reader.Read();
                                currentActivityName = reader.Value.ToString();
                                activityBuider = new AndroidActivityBuilder(currentActivityName);
                                layoutBuilder = new AndroidLayoutBuilder();
                                pagesCount++;
                                if (pagesCount == 1)
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
                            else
                            {
                                throw new NotFoundElementException("Project id");
                            }
                        }
                        if (reader.Value.Equals("Controls"))
                        {
                            parseControls(currentActivityName);
                        }
                    }
                }
                else
                {
                    if (reader.Depth == 2 && reader.TokenType.ToString().Equals("EndObject"))
                    {
                        File.WriteAllText(Path.Combine(srcDirectory, currentActivityName + ".java"),
                            activityBuider.build());
                        File.WriteAllText(Path.Combine(layoutDirectory, currentActivityName.ToLower() + "_layout.xml"),
                            layoutBuilder.build());
                    }
                    if (reader.Depth == 1 && reader.TokenType.ToString().Equals("EndArray"))
                    {
                        return;
                    }
                }
            }
        }

        private void parseControls(String currentActivityName)
        {
            while (reader.Read())
            {
                object value = reader.Value;
                if (value != null)
                {
                    if (reader.TokenType.ToString().Equals("PropertyName") && reader.Value.Equals("type"))
                    {
                        // read for get type value
                        reader.Read();
                        if (reader.Value.Equals("Button"))
                        {
                            parseButtonElement(currentActivityName);
                        }               
                        else if (reader.Value.Equals("Input"))
                        {
                            parseInputElement();
                        }
                    }
                }
                else
                {
                    if (reader.Depth == 3 && reader.TokenType.ToString().Equals("EndArray"))
                    {
                        return;
                    }
                }
            }
        }

        private void parseButtonElement(String currentActivityName)
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
                        if (value.Equals("id"))
                        {
                            reader.Read();
                            buttonElement.setId(reader.Value.ToString());
                        }
                        if (value.Equals("text"))
                        {
                            reader.Read();
                            buttonElement.addXmlAttr("text", reader.Value.ToString());
                        }
                        if (value.Equals("inline"))
                        {
                            reader.Read();
                            if (!(Boolean)reader.Value)
                            {
                                buttonElement.addXmlAttr("layout_width", "match_parent");
                            }
                            else
                            {
                                buttonElement.addXmlAttr("layout_width", "wrap_content");
                            }
                        }
                        if (value.Equals("corners"))
                        {

                        }
                        if (value.Equals("mini"))
                        {

                        }
                        if (value.Equals("theme"))
                        {

                        }
                    }
                }
            }

            layoutBuilder.addElement(buttonElement.getXml());
            activityBuider.addActionsToOnCreate(buttonElement.getOnCreateActions());
            activityBuider.addImports(buttonElement.getImports());
            activityBuider.addMethods(buttonElement.getOnClickSrc());
        }

        private void parseInputElement()
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
                        if (value.Equals("id"))
                        {
                            reader.Read();
                            inputElement.setId(reader.Value.ToString());
                        }
                        if (value.Equals("title"))
                        {

                        }
                        if (value.Equals("inline"))
                        {
                            reader.Read();
                            if (!(Boolean)reader.Value)
                            {
                                inputElement.addXmlAttr("layout_width", "match_parent");
                            }
                            else
                            {
                                inputElement.addXmlAttr("layout_width", "wrap_content");
                            }
                        }
                        if (value.Equals("mini"))
                        {

                        }
                        if (value.Equals("theme"))
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

        private String filename;
        private JsonTextReader reader;
        private ActivityBuilderInterface activityBuider = null;
        private LayoutBuilderInterface layoutBuilder = null;
        private ManifestBuilderInterface manifestBuilder = new AndroidManifestBuilder();
    }
}
