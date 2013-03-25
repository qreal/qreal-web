using System;
using System.Collections;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading;

namespace Server {
    public class Login {
        public string login;
        public string password;
        public Login() { }
        public Login(string login, string password) { this.login = login; this.password = password; }
    }

    class Program {
        static void Main() {
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:54321/");
            listener.Start();
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

            public void ProcessRequest() {
                string input = new StreamReader(context.Request.InputStream).ReadToEnd();
                string msg = context.Request.HttpMethod + " " + context.Request.Url;
                Console.WriteLine(msg);

                StringBuilder sb = new StringBuilder();

                var delimiter = input.IndexOf(":");
                var name = input.Substring(0, delimiter);
                var data = input.Substring(delimiter + 1);
                Console.WriteLine(data);

                if (name.ToLower() == "login") {
                    var login = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<Login>(data);
                    if (login.login == "Chizh" && login.password == "password") {
                        sb.Append("success:1");
                    }
                    else {
                        sb.Append("fail");
                    }
                }

                byte[] b = Encoding.UTF8.GetBytes(sb.ToString());
                context.Response.ContentLength64 = b.Length;
                context.Response.OutputStream.Write(b, 0, b.Length);
                context.Response.OutputStream.Close();
            }
        }
    }
}
