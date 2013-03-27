using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;

namespace Sender {
    public class Login {
        public string login;
        public string password;
        public Login() { }
        public Login(string login, string password) { this.login = login; this.password = password; }
    }
    class Program {
        private static CookieContainer cookies = new CookieContainer();

        public static string HttpPost(string URI, string Parameters, bool updateCookies) {
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(URI);
            //req.Proxy = new System.Net.WebProxy(ProxyString, true);
            //Add these, as we're doing a POST
            req.ContentType = "application/x-www-form-urlencoded";
            req.Method = "POST";
            req.CookieContainer = cookies;
            //We need to count how many bytes we're sending. 
            //Post'ed Faked Forms should be name=value&
            byte[] bytes = System.Text.Encoding.ASCII.GetBytes(Parameters);
            //req.ContentLength = bytes.Length;
            System.IO.Stream os = req.GetRequestStream();
            os.Write(bytes, 0, bytes.Length); //Push it out there
            os.Close();
            var resp = (HttpWebResponse)req.GetResponse();
            if (resp == null) return null;
            foreach (Cookie c in resp.Cookies) {
                cookies.Add(c);
            }
            return new System.IO.StreamReader(resp.GetResponseStream()).ReadToEnd().Trim();
        }
        static void process(string login) {
            Console.WriteLine("Start " + login);
            var json = new System.Web.Script.Serialization.JavaScriptSerializer();
            var a = HttpPost("http://localhost:54321/", "Login?login=" + login + "&password=password", true);
            Console.WriteLine(a);
            var coords = HttpPost("http://localhost:54321/", "coordinates", false);
            Console.WriteLine(coords);
            HttpPost("http://localhost:54321/", "logout", false);
        }

        static void Main(string[] args) {
            cookies.MaxCookieSize = 80;
            process("Chizh");
            process("Chizh2");
            process("Chizh3");
        }
    }
}
