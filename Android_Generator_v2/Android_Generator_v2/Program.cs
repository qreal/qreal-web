using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace Android_Generator_v2
{
    class Program 
    {
        static int Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("Too few arguments.");
                return 1;
            }

            switch (args[0])
            {
                case "-c":
                    {
                        return createProject(args);
                    }
                case "-b":
                    {
                        return build(args);
                    }
                default:
                    Console.WriteLine("Invalid arguments.");
                    return 2;
            }
        }

        private static int createProject(string[] args)
        {
            if (args.Length != 4)
            {
                Console.WriteLine("Invalid arguments.");
                return 2;
            }

            String folderPath = args[1];
            String appName = args[2];
            String packageName = args[3];

            Regex rgx = new Regex("\\.");
            String packagePath = rgx.Replace(packageName, "\\");

            String appDirectory = Path.Combine(folderPath, appName);
            Directory.CreateDirectory(appDirectory);

            try
            {
                DirectoryCopyManager.DirectoryCopy(Path.Combine("Templates", "res"), Path.Combine(appDirectory, "res"), true);
                DirectoryCopyManager.DirectoryCopy(Path.Combine("Templates", "libs"), Path.Combine(appDirectory, "libs"), true);
            }
            catch (DirectoryNotFoundException e)
            {
                Console.WriteLine(e.StackTrace);
                return 3;
            }

            Directory.CreateDirectory(Path.Combine(appDirectory, @"res\layout"));

            String srcDirectory = Path.Combine(appDirectory, Path.Combine("src", packagePath));
            Directory.CreateDirectory(srcDirectory);

            String layoutDirectory = Path.Combine(appDirectory, @"res\layout");

            // create strings.xml
            String strings = File.ReadAllText(Path.Combine("Templates", "stringsTemplate.xml"));
            strings = String.Format(strings, appName, "");
            File.WriteAllText(Path.Combine(appDirectory, @"res\values\strings.xml"), strings);

            return 0;
        }

        private static int build(string[] args)
        {
            if (args.Length != 4)
            {
                Console.WriteLine("Invalid arguments.");
                return 2;
            }

            String folderPath = args[1];
            String appName = args[2];
            String packageName = args[3];


            Regex rgx = new Regex("\\.");
            String packagePath = rgx.Replace(packageName, "\\");

            String appDirectory = Path.Combine(folderPath, appName);

            JsonParser parser = new JsonParser(appDirectory, packageName);

            String srcDirectory = Path.Combine(appDirectory, Path.Combine("src", packagePath));
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

            // build an application
            Process process = new Process();
            process.StartInfo.FileName = "run.bat";
            process.StartInfo.Arguments = String.Format("/c {0} \"{1}\"", appName, appDirectory);
            process.Start();

            return 0;
        }
    }
}
