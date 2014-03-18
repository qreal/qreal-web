using System.Web;
using System.Web.Mvc;

namespace QReal_MobileDesigner
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
