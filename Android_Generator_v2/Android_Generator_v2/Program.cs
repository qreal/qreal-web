using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Diagnostics;

namespace Android_Generator_v2
{
    class Program 
    {
        static int Main(string[] args)
        {
            /**if (args.Length > 1)
            {
                Console.WriteLine("Too much arguments.");
                return 1;
            }
            if (args.Length == 0)
            {
                Console.WriteLine("Please enter an application name.");
                return 2;
            }
            String appName = args[0];**/

            JsonParser parser = new JsonParser("test.txt");

            String appName;
            try
            {
                appName = parser.getProjectName();
            }
            catch (NotFoundElementException e)
            {
                Console.WriteLine(e.Message);
                return 4;
            }

            String appDirectory = appName;
            Directory.CreateDirectory(appDirectory);

            Directory.CreateDirectory(Path.Combine(appDirectory, "libs"));

            String pathToAndroidSup4 = @"libs\android-support-v4.jar";
            File.Copy(Path.Combine("Templates", pathToAndroidSup4), Path.Combine(appDirectory, pathToAndroidSup4), true);

            try {
                DirectoryCopyManager.DirectoryCopy(Path.Combine("Templates", "res"), Path.Combine(appDirectory, "res"), true);
            }
            catch (DirectoryNotFoundException e)
            {
                Console.WriteLine(e.StackTrace);
                return 3;
            }

            String srcDirectory = Path.Combine(appDirectory, @"src\com\example\test");
            Directory.CreateDirectory(srcDirectory);

            String layoutDirectory = Path.Combine(appDirectory, @"res\layout");

            try
            {
                parser.parseToEnd(appDirectory, srcDirectory, layoutDirectory);
            }
            catch (NotFoundElementException e)
            {
                Console.WriteLine(e.Message);
                return 4;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return 4;
            }

            // create strings.xml
            String strings = File.ReadAllText(Path.Combine("Templates", "stringsTemplate.xml"));
            strings = String.Format(strings, appName, "");
            File.WriteAllText(Path.Combine(appDirectory, @"res\values\strings.xml"), strings);

            // build an application
            Process process = new Process();
            process.StartInfo.FileName = "run.bat";
            process.StartInfo.Arguments = appName;
            process.Start();
            return 0;
        }
    }
}
