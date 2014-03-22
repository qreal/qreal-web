using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using QReal_MobileDesigner.Models;

namespace QReal_MobileDesigner.Controllers
{
    public class UserProjectController : Controller
    {
        private QRealDesignerDBContext db = new QRealDesignerDBContext();

        // GET: /UserProject/
        public ActionResult Index()
        {
            return View(db.UserProject.ToList());
        }

        // GET: /UserProject/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserProject userproject = db.UserProject.Find(id);
            if (userproject == null)
            {
                return HttpNotFound();
            }
            return View(userproject);
        }

        // GET: /UserProject/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: /UserProject/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include="ID,Name,Package,Type")] UserProject userproject)
        {
            if (ModelState.IsValid)
            {
                db.UserProject.Add(userproject);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(userproject);
        }

        // GET: /UserProject/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserProject userproject = db.UserProject.Find(id);
            if (userproject == null)
            {
                return HttpNotFound();
            }
            return View(userproject);
        }

        // POST: /UserProject/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include="ID,Name,Package,Type")] UserProject userproject)
        {
            if (ModelState.IsValid)
            {
                db.Entry(userproject).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(userproject);
        }

        // GET: /UserProject/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            UserProject userproject = db.UserProject.Find(id);
            if (userproject == null)
            {
                return HttpNotFound();
            }
            return View(userproject);
        }

        // POST: /UserProject/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            UserProject userproject = db.UserProject.Find(id);
            db.UserProject.Remove(userproject);
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
