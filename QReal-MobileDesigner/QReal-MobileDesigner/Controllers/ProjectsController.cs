using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using QReal_MobileDesigner.Models;
using Microsoft.AspNet.Identity;
using System.Diagnostics;
using System.IO;
using System.Text;

namespace QReal_MobileDesigner.Controllers
{
    public class ProjectsController : Controller
    {
        private ProjectsEntities db = new ProjectsEntities();
        private ApplicationDbContext usersDb = new ApplicationDbContext();
        private static string phonegapLocation = String.Format(@"{0}PhoneGap\", HttpRuntime.AppDomainAppPath);

        public ActionResult Designer(int projectId = -1)
        {
            if (projectId == -1)
            {
                ViewBag.ProjectName = "HelloWorld";
                ViewBag.Package = "com.example.hello";
            }
            else
            {
                var userId = User.Identity.GetUserId();
                var project = (from up in db.UserProjects
                               where up.UserId == userId && up.Project.ID == projectId
                               select up.Project).Single();

                ViewBag.ProjectName = project.Name;
                ViewBag.Package = project.Package;
            }
            return View();
        }

        [HttpPost]
        public string NewProject(string project_name, string project_package)
        {
            var username = User.Identity.GetUserName();

            var project = new Project()
            {
                Name = project_name,
                Package = project_package,
                Type = "Android"
            };

            db.Projects.Add(project);
            db.SaveChanges();
            var userProject = new UserProject()
            {
                ProjectId = project.ID,
                UserId = User.Identity.GetUserId()
            };
            db.UserProjects.Add(userProject);
            db.SaveChanges();

            var workingDir = String.Format(@"{0}Projects\{1}", phonegapLocation, username);
            Directory.CreateDirectory(workingDir);
            var createPsi = new ProcessStartInfo("cmd.exe", String.Format("/c {0}create.bat {1} {2} {3}", phonegapLocation, project_name, project_package, project_name))
            {
                WorkingDirectory = workingDir,
                CreateNoWindow = true,
                UseShellExecute = false
            };

            using (var process = Process.Start(createPsi))
            {
                process.WaitForExit();
            }
            return "{ \"project_id\":\"" + project.ID + "\" }";
        }

        [HttpPost]
        public string BuildProject(string project_name, string appHtml, string appJs, string appCss)
        {
            var username = User.Identity.GetUserName();
            var AppHtmlModel = new AppHtml()
            {
                Html = appHtml
            };
            string html = RenderRazorViewToString(this, "~/Views/PhoneGapTemplate/index.cshtml", AppHtmlModel);

            XCopy(String.Format(@"{0}MobileAppTemplate\www", HttpRuntime.AppDomainAppPath), String.Format(@"{0}Projects\{1}\{2}\www", phonegapLocation, username, project_name), true);

            FileStream fIndexHtml = new FileStream(String.Format(@"{0}Projects\{1}\{2}\www\index.html", phonegapLocation, username, project_name), FileMode.Create);
            StreamWriter swIndexhtml = new StreamWriter(fIndexHtml);
            swIndexhtml.Write(html);
            swIndexhtml.Close();
            fIndexHtml.Close();

            var buildPsi = new ProcessStartInfo("cmd.exe", String.Format("/c {0}build.bat", phonegapLocation))
            {
                WorkingDirectory = String.Format(@"{0}Projects\{1}\{2}", phonegapLocation, username, project_name),
                CreateNoWindow = true,
                UseShellExecute = false
            };

            using (var process = Process.Start(buildPsi))
            {
                process.WaitForExit();
            }

            return "{ \"project_name\":\"" + project_name + "\" }";
        }

        public ActionResult Emulator()
        {
            var username = User.Identity.GetUserName();
            ViewBag.Html = html;
            return View();
        }

        private static string html;

        [HttpPost]
        public string EmulatorData(string project_name, string appHtml, string appJs, string appCss)
        {         
            html = appHtml;
            return "ok";
        }

        public string RenderRazorViewToString(Controller controller, string viewName, object model)
        {
            controller.ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(controller.ControllerContext, viewName);
                var viewContext = new ViewContext(controller.ControllerContext, viewResult.View, controller.ViewData, controller.TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(controller.ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }

        public FileResult DownloadApk(string projectName)
        {
            return File(String.Format(@"{0}Projects\{1}\{2}\platforms\android\ant-build\{2}-debug.apk", phonegapLocation, User.Identity.GetUserName(), projectName), "application/octet-stream", projectName + "-debug.apk");
        }

        [HttpPost]
        public void TestHtml(string appHtml)
        {
            Console.WriteLine(appHtml);
        }

        // GET: /Projects/
        public ActionResult Index()
        {
            return View(db.Projects.ToList());
        }

        // GET: /Projects/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }

        // GET: /Projects/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /Projects/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Name,Package,Type")] Project project)
        {
            if (ModelState.IsValid)
            {
                db.Projects.Add(project);
                db.SaveChanges();
                var userProject = new UserProject()
                {
                    ProjectId = project.ID,
                    UserId = User.Identity.GetUserId()
                };
                db.UserProjects.Add(userProject);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(project);
        }

        // GET: /Projects/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }

        // POST: /Projects/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Name,Package,Type")] Project project)
        {
            if (ModelState.IsValid)
            {
                db.Entry(project).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(project);
        }

        // GET: /Projects/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return HttpNotFound();
            }
            return View(project);
        }

        // POST: /Projects/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Project project = db.Projects.Find(id);
            db.Projects.Remove(project);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        //TODO: move to util

        private void XCopy(String src, String dest, Boolean isOverwrite)
        {
            DirectoryInfo currentDirectory;
            currentDirectory = new DirectoryInfo(src);
            if (!Directory.Exists(dest))
            {
                Directory.CreateDirectory(dest);
            }
            foreach (FileInfo filein in currentDirectory.GetFiles())
            {
                filein.CopyTo(System.IO.Path.Combine(dest, filein.Name), true);
                // To move files uncomment following line  
                // filein.Delete();  
            }
            foreach (DirectoryInfo dr in currentDirectory.GetDirectories())
            {
                XCopy(dr.FullName, Path.Combine(dest, dr.Name), isOverwrite);
            }
        }

    }
}
