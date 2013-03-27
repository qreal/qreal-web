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

namespace Server
{
    public class Login
    {
        public string login;
        public string password;
        public Login() { }
        public Login(string login, string password) { this.login = login; this.password = password; }
    }

    public class Coordinate
    {
        public float x, y;
        public string comment;
        public Coordinate() { }
        public Coordinate(float x, float y, string comment) { this.x = x; this.y = y; this.comment = comment; }
    }

    class DB
    {
        private static string sqlConn = "Data Source=(local);Initial Catalog=Doctor;Integrated Security=True";
        private static SqlConnection doctorDB = new SqlConnection(sqlConn);

        public static void Open() { doctorDB.Open(); }

        public static bool existsUser(string user)
        {
            var sql = "Select CASE WHEN EXISTS (SELECT * FROM [User] us WHERE us.Login = @login) THEN 1 ELSE 0 END";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@login", user);
            return (int)cmd.ExecuteScalar() != 0;
        }

        public static bool existsCookie(string cookie)
        {
            var sql = "Select CASE WHEN EXISTS (SELECT * FROM [Cookies] us WHERE us.cookie = @cook) THEN 1 ELSE 0 END";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            return (int)cmd.ExecuteScalar() != 0;
        }


        public static int checkLogin(string login, string password)
        {
            var sql = "SELECT userid FROM [User] us WHERE us.Login = @login and us.Password = @password";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@login", login);
            cmd.Parameters.AddWithValue("@password", password);
            var reader = cmd.ExecuteReader();
            var res = -1;
            if (reader.Read())
            {
                res = (int)reader[0];
            }
            else
            {
                res = -1;
            }
            reader.Close();
            return res;
        }

        public static Coordinate[] getCoordinates(int id)
        {
            Console.WriteLine("Getting " + id);
            var sql = "SELECT x,y,comment FROM [Coordinates] us WHERE us.id = @id";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@id", id);
            var res = new List<Coordinate>();
            var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                res.Add(new Coordinate((float)Convert.ToDouble(reader[0]), (float)Convert.ToDouble(reader[1]), ""));
            }
            reader.Close();
            return res.ToArray();
        }

        public static int checkCookie(string cookie)
        {
            var sql = "Select c.id from Cookies c where c.cookie = @cook";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            var reader = cmd.ExecuteReader();
            var res = -1;
            if (reader.Read())
            {
                res = (int)reader[0];
            }
            else
            {
                res = -1;
            }
            reader.Close();
            return res;
        }

        public static void deleteCookie(string cookie)
        {
            Console.WriteLine("Logout");
            var sql = "delete Cookies where cookie = @cook";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            cmd.ExecuteNonQuery();
        }

        public static void addCookie(string cookie, int id)
        {
            var sql = "insert into Cookies values(@cook, @id)";
            var cmd = new SqlCommand(sql, doctorDB);
            cmd.Parameters.AddWithValue("@cook", cookie);
            cmd.Parameters.AddWithValue("@id", id);
            cmd.ExecuteNonQuery();
        }

    }

    class Program
    {
        static void Main()
        {
            DB.Open();
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:54321/");
            listener.Start();
            //Console.WriteLine(DB.existsUser("Chizh"));
            Console.WriteLine("Listening...");
            for (; ; )
            {
                HttpListenerContext ctx = listener.GetContext();
                ctx.Response.AddHeader("Access-Control-Allow-Origin", "*");
                new Thread(new Worker(ctx).ProcessRequest).Start();
            }
        }

        class Worker
        {
            private HttpListenerContext context;

            public Worker(HttpListenerContext context)
            {
                this.context = context;
            }

            private Cookie getCookie(HttpListenerContext ctx)
            {
                foreach (Cookie c in context.Request.Cookies)
                {
                    if (c.Name == "Session")
                    {
                        return c;
                    }
                }
                return null;
            }

            public void ProcessRequest()
            {
                try
                {
                    string input = new StreamReader(context.Request.InputStream).ReadToEnd();
                    string msg = context.Request.HttpMethod + " " + context.Request.Url;
                    Console.Write(msg);

                    StringBuilder sb = new StringBuilder();
                    /*

                    var delimiter = input.IndexOf(":");
                    var name = input.Substring(0, delimiter);
                    var data = input.Substring(delimiter + 1);
                    Console.WriteLine(" " + name);
                    var json = new System.Web.Script.Serialization.JavaScriptSerializer();

                    if (name.ToLower() == "login") {
                        var login = json.Deserialize<Login>(data);
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
                            var id = DB.checkCookie(cook.Value);
                            if (id != -1) {
                                var coords = DB.getCoordinates(id);
                                sb.Append(json.Serialize(coords));
                            }
                        }
                    }
                    */
                    sb.Append("success");
                    byte[] b = Encoding.UTF8.GetBytes(sb.ToString());
                    context.Response.ContentLength64 = b.Length;
                    var stream = context.Response.OutputStream;
                    stream.Write(b, 0, b.Length);
                    stream.Flush();
                    stream.Close();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            }
        }
    }
}
