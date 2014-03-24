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

namespace QReal_MobileDesigner.Controllers
{
    public class ProjectsController : Controller
    {
        private ProjectsEntities db = new ProjectsEntities();
        //private static string projectsLocation = @"C:\Users\Nikita\PhoneGapProjects\";
        private static string projectsLocation = HttpRuntime.AppDomainAppPath + @"\PhoneGap\";// @"C:\PhoneGapProjects\";
        

        [HttpPost]
        public string NewProject(string project_name, string project_package)
        {         
            Directory.CreateDirectory(projectsLocation + User.Identity.GetUserName());
            var psi = new ProcessStartInfo( "cmd.exe", "/c " + projectsLocation + "run.bat")
            {
                WorkingDirectory = projectsLocation + User.Identity.GetUserName(),   
                CreateNoWindow = true,
                UseShellExecute = false                
            };

            using (var process = Process.Start(psi))
            {
                process.WaitForExit();
                string filePath = projectsLocation + User.Identity.GetUserName() + @"\hello\platforms\android\ant-build\HelloWorld-debug.apk";
                FileInfo file = new FileInfo(filePath);                   
            }
            return "{result:'success'}";     
        }

        public FileResult DownloadApk(string projectName)
        {
            //Parameters to file are
            //1. The File Path on the File Server
            //2. The content type MIME type
            //3. The parameter for the file save by the browser
            return File(projectsLocation + User.Identity.GetUserName() + @"\hello\platforms\android\ant-build\HelloWorld-debug.apk", "application/octet-stream", "HelloWorld-debug.apk");
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
