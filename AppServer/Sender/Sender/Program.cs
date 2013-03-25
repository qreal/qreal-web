using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sender
{
    public class Login
    {
        public string login;
        public string password;
        public Login() { }
        public Login(string login, string password) { this.login = login; this.password = password; }
    }
    class Program
    {
        public static string HttpPost(string URI, string Parameters)
        {
            System.Net.WebRequest req = System.Net.WebRequest.Create(URI);
            //req.Proxy = new System.Net.WebProxy(ProxyString, true);
            //Add these, as we're doing a POST
            req.ContentType = "application/x-www-form-urlencoded";
            req.Method = "POST";
            //We need to count how many bytes we're sending. 
            //Post'ed Faked Forms should be name=value&
            byte[] bytes = System.Text.Encoding.ASCII.GetBytes(Parameters);
            req.ContentLength = bytes.Length;
            System.IO.Stream os = req.GetRequestStream();
            os.Write(bytes, 0, bytes.Length); //Push it out there
            os.Close();
            System.Net.WebResponse resp = req.GetResponse();
            if (resp == null) return null;
            return new System.IO.StreamReader(resp.GetResponseStream()).ReadToEnd().Trim();
        }
        static void Main(string[] args)
        {
            var a = HttpPost("http://localhost:54321/", "Login:" + new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(new Login("Chizh", "passwor")));
            Console.WriteLine(a);
        }
    }
}
