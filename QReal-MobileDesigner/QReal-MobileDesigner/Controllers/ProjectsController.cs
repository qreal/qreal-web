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
        private static string projectsLocation = HttpRuntime.AppDomainAppPath + @"\PhoneGap\";


        [HttpPost]
        public string NewProject(string project_name, string project_package)
        {
            var username = User.Identity.GetUserName();
            var AppHtmlModel = new AppHtml() { Html = "<h1>Test</h1>" };
            string html = RenderRazorViewToString(this, "~/Views/PhoneGapTemplate/index.cshtml", AppHtmlModel);

            Directory.CreateDirectory(projectsLocation + @"Projects\" + username);
            var psi = new ProcessStartInfo("cmd.exe", String.Format("/c {0}run.bat {1} {2} {3}", projectsLocation, project_name, project_package, project_name))
            {
                WorkingDirectory = projectsLocation + @"Projects\" + username,
                CreateNoWindow = true,
                UseShellExecute = false
            };

            using (var process = Process.Start(psi))
            {
                process.WaitForExit();
            }

            FileStream fcreate = new FileStream(String.Format(@"{0}Projects\{1}\{2}\www\index.html", projectsLocation, username, project_name), FileMode.Create);
            StreamWriter swOverwrite = new StreamWriter(fcreate);
            swOverwrite.Write(html);
            swOverwrite.Close();
            fcreate.Close();           

            return "{ \"project_name\":\"" + project_name + "\" }";
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
            //Parameters to file are
            //1. The File Path on the File Server
            //2. The content type MIME type
            //3. The parameter for the file save by the browser
            return File(String.Format(@"{0}Projects\{1}\{2}\platforms\android\ant-build\{2}-debug.apk", projectsLocation, User.Identity.GetUserName(), projectName), "application/octet-stream", projectName + "-debug.apk");
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

    }
}
