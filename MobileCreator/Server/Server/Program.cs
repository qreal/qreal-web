using System;
using System.Collections;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Web;
using System.Globalization;

namespace Server {
    public class Login {
        public string login;
        public string password;
        public Login() { }
        public Login(string login, string password) { this.login = login; this.password = password; }
    }

    public class Coordinate {
        public float x, y;
        public string comment;
        public Coordinate() { }
        public Coordinate(float x, float y, string comment) { this.x = x; this.y = y; this.comment = comment; }
    }

    class DB {
        private static string sqlConn = "Data Source=.\\SQLEXPRESS;Initial Catalog=Doctor;Integrated Security=True";
        private static SqlConnection doctorDB = new SqlConnection(sqlConn);
        private static int count = 0;
        private static bool done = false;

        public static void Open() { doctorDB.Open(); }

        public static bool existsUser(string user) {
            var sql = "Select CASE WHEN EXISTS (SELECT * FROM [User] us WHERE us.Login = @login) THEN 1 ELSE 0 END";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@login", user);
            return (int)cmd.ExecuteScalar() != 0;
        }

        public static bool existsCookie(string cookie) {
            var sql = "Select CASE WHEN EXISTS (SELECT * FROM [Cookies] us WHERE us.cookie = @cook) THEN 1 ELSE 0 END";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            return (int)cmd.ExecuteScalar() != 0;
        }


        public static int checkLogin(string login, string password) {
            var sql = "SELECT userid FROM [User] us WHERE us.Login = @login and us.Password = @password";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@login", login);
            cmd.Parameters.AddWithValue("@password", password);
            var reader = cmd.ExecuteReader();
            var res = -1;
            if (reader.Read()) {
                res = (int)reader[0];
            } else {
                res = -1;
            }
            reader.Close();
            return res;
        }

        public static Coordinate[] getCoordinates(int id) {
            /*
            Console.WriteLine("Getting " + id);
            var sql = "SELECT x,y,comment FROM [Coordinates] us WHERE us.id = @id";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@id", id);
            var res = new List<Coordinate>();
            var reader = cmd.ExecuteReader();
            while (reader.Read()) {
                res.Add(new Coordinate((float)Convert.ToDouble(reader[0]),
                            (float)Convert.ToDouble(reader[1]), Convert.ToString(reader[2])));
            }
            reader.Close();
            return res.ToArray();
            */
            var res = new List<Coordinate>();
            res.Add(new Coordinate((float)55.698099, (float)37.392397, "Kill the christian"));
            res.Add(new Coordinate((float)55.710238, (float)37.409563, "Hammer smashed face"));
            res.Add(new Coordinate((float)55.723823, (float)37.397289, "Slowly we rot"));
            DB.count++;
            if (DB.count > 5 && done == false)
            {
                res.Add(new Coordinate((float)55.730058, (float)37.392225, "Make them suffer!"));
                DB.done = true;
            }
            return res.ToArray();
        }

        public static int checkCookie(string cookie) {
            var sql = "Select c.id from Cookies c where c.cookie = @cook";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            var reader = cmd.ExecuteReader();
            var res = -1;
            if (reader.Read()) {
                res = (int)reader[0];
            } else {
                res = -1;
            }
            reader.Close();
            return res;
        }

        public static void deleteCookie(string cookie) {
            Console.WriteLine("Logout");
            var sql = "delete Cookies where cookie = @cook";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            cmd.ExecuteNonQuery();
        }

        public static void addCookie(string cookie, int id) {
            var sql = "insert into Cookies values(@cook, @id)";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.ExecuteNonQuery();
        }

    }

    class Program {
        static void Main() {
            DB.Open();
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:54321/");
            listener.Start();
            //Console.WriteLine(DB.existsUser("Chizh"));
            Console.WriteLine("Listening...");
            for (; ; ) {
                HttpListenerContext ctx = listener.GetContext();
                new Thread(new Worker(ctx).ProcessRequest).Start();
            }
        }

        class Worker {
            private HttpListenerContext context;

            public Worker(HttpListenerContext context) {
                this.context = context;
            }

            private Cookie getCookie(HttpListenerContext ctx) {
                foreach (Cookie c in context.Request.Cookies) {
                    if (c.Name == "Session") {
                        return c;
                    }
                }
                return null;
            }

            public void ProcessRequest() {
                try {
                    string input = new StreamReader(context.Request.InputStream).ReadToEnd();
                    string msg = context.Request.HttpMethod + " " + context.Request.Url;
                    Console.Write(msg);
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    context.Response.Headers.Add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

                    StringBuilder sb = new StringBuilder();

                    var delimiter = input.IndexOf("?");
                    var data = "";
                    if (delimiter == -1) {
                        delimiter = input.Length;
                    } else {
                        data = input.Substring(delimiter + 1);
                    }
                    var name = input.Substring(0, delimiter);
                    Console.WriteLine(" " + name);

                    if (name.ToLower() == "login") {
                        var parameters = HttpUtility.ParseQueryString(data);
                        var login = new Login(parameters["login"], parameters["password"]); //json.Deserialize<Login>(data);
                        var id = DB.checkLogin(login.login, login.password);
                        if (id != -1) {
                            var loginCookie = new Cookie();
                            loginCookie.Name = "Session";
                            var cookie = "";
                            do {
                                cookie = System.Web.Security.Membership.GeneratePassword(22, 11);
                            } while (DB.checkCookie(cookie) != -1);
                            DB.addCookie(cookie, id);
                            loginCookie.Value = cookie;
                            loginCookie.Expires = DateTime.Now.AddDays(1);
                            
                            context.Response.Cookies.Add(loginCookie);
                            sb.Append("success");
                        } else {
                            sb.Append("fail");
                        }
                    } else if (name.ToLower() == "logout") {
                        var cook = getCookie(context);
                        if (cook != null) {
                            var expCookie = new Cookie();
                            expCookie.Name = "Session";
                            expCookie.Expires = DateTime.Now.AddDays(-1d);
                            context.Response.Cookies.Add(expCookie);
                            if (DB.checkCookie(cook.Value) != -1) {
                                DB.deleteCookie(cook.Value);
                            }
                        }
                    } else if (name.ToLower() == "coordinates") {
                        var cook = getCookie(context);
                        if (cook != null) {
                            //var id = DB.checkCookie(cook.Value);
                            //if (id != -1) {
                            var id = 1;
                                var coords = DB.getCoordinates(id);
                                var json = new System.Web.Script.Serialization.JavaScriptSerializer();
                                  foreach(var coordinate in coords){
                                    sb.Append(String.Format(CultureInfo.InvariantCulture, "{0};{1};{2};", coordinate.x, coordinate.y, coordinate.comment));
                                }
                            //}
                        }
                    }

                    byte[] b = Encoding.UTF8.GetBytes(sb.ToString());
                    context.Response.ContentLength64 = b.Length;
                    var stream = context.Response.OutputStream;
                    stream.Write(b, 0, b.Length);
                    stream.Flush();
                    stream.Close();
                } catch (Exception e) {
                    Console.WriteLine(e);
                }
            }
        }
    }
}
