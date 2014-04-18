using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;

namespace Android_Generator_v2
{
    class JsonParser {
        public JsonParser(String filename)
        {
            this.filename = filename;
            projectObj = (JObject)JToken.ReadFrom(new JsonTextReader(File.OpenText(filename)));  
            StreamReader streamReader = File.OpenText(filename);
            reader = new JsonTextReader(streamReader);
            reader.Read();
        }

        public String getProjectName()
        {
            try
            {
                return projectObj.GetValue("name").ToString();
            }
            catch (NullReferenceException e)
            {
                throw new NotFoundElementException("Project name");
            }
        }

        public String getProjectPackage()
        {
            try
            {
                package = projectObj.GetValue("projectPackage").ToString();
                manifestBuilder.setPackage(package);
                return package;
            }
            catch (NullReferenceException e)
            {
                throw new NotFoundElementException("Project package");
            }
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
                                activityBuider.setPackage(package);
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
                                continue;
                            }
                            else
                            {
                                throw new NotFoundElementException("Project id");
                            }
                        }
                        if (reader.Value.Equals("header"))
                        {
                            parseHeaderElement();
                            continue;
                        }
                        if (reader.Value.Equals("padding"))
                        {
                            reader.Read();
                            layoutBuilder.setPadding(reader.Value.ToString());
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

        private void parseHeaderElement()
        {
            HeaderElement headerElement = new HeaderElement();
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
                            headerElement.setId(reader.Value.ToString());
                        }
                        if (value.Equals("title"))
                        {
                            reader.Read();
                            headerElement.setTitle(reader.Value.ToString());
                        }
                    }
                }
            }

            layoutBuilder.addElementToHeader(headerElement.getXml());
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
                            reader.Read();
                            buttonElement.setRoundValue((Boolean)reader.Value);
                        }
                        if (value.Equals("mini"))
                        {
                            reader.Read();
                            if (!(Boolean)reader.Value)
                            {
                                buttonElement.addXmlAttr("layout_height", "wrap_content");
                            }
                            else
                            {
                                buttonElement.addXmlAttr("layout_height", "28dp");
                                buttonElement.addXmlAttr("textSize", "11sp");
                            }
                        }
                        if (value.Equals("theme"))
                        {
                            reader.Read();
                            buttonElement.setTheme(reader.Value.ToString());
                        }
                    }
                }
            }

            layoutBuilder.addElementToBody(buttonElement.getXml());
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
                            reader.Read();
                            inputElement.setTitle(reader.Value.ToString());
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

            layoutBuilder.addElementToBody(inputElement.getXml());
            activityBuider.addActionsToOnCreate(inputElement.getOnCreateActions());
            activityBuider.addImports(inputElement.getImports());
            activityBuider.addMethods(inputElement.getValueGetter());
            activityBuider.addVariables(inputElement.getVariables());
        }

        private String package;
        private JObject projectObj;
        private String filename;
        private JsonTextReader reader;
        private ActivityBuilderInterface activityBuider = null;
        private LayoutBuilderInterface layoutBuilder = null;
        private ManifestBuilderInterface manifestBuilder = new AndroidManifestBuilder();
    }
}
